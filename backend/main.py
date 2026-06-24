"""
PawSure API — FastAPI backend for the walker application form.

Run:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

Endpoints:
    GET  /                  – hello
    GET  /api/health        – health check
    POST /api/applications  – submit a walker application (used by the site form)
    GET  /api/applications  – list received applications (handy while testing)
"""

from __future__ import annotations

import json
import logging
import os
import re
import sqlite3
import urllib.request
from contextlib import asynccontextmanager, closing
from datetime import datetime, timezone
from typing import Iterator, List, Literal, Optional

from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

DB_PATH = os.environ.get("PAWSURE_DB", os.path.join(os.path.dirname(__file__), "pawsure.db"))
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
# Where new walker applications are emailed (override with the NOTIFY_EMAIL env var).
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "paramveerjain09@gmail.com")

logger = logging.getLogger("pawsure")

EXPERIENCE_OPTIONS = (
    "I own / have owned a dog",
    "Professional dog handler / walker",
    "Volunteered at shelters / NGOs",
    "No formal experience, but I love dogs",
)
AVAILABILITY_OPTIONS = (
    "Mornings (6-10 AM)",
    "Midday (10 AM-2 PM)",
    "Afternoons (2-6 PM)",
    "Evenings (6-9 PM)",
    "Weekdays",
    "Weekends",
)
ID_OPTIONS = ("Aadhaar Card", "PAN Card", "Voter ID", "Passport", "Driving License")


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with closing(get_db()) as conn, conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS walker_applications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                age INTEGER NOT NULL,
                area TEXT NOT NULL,
                experience TEXT NOT NULL,
                availability TEXT NOT NULL,
                motivation TEXT,
                id_proof TEXT NOT NULL,
                consent INTEGER NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="PawSure API",
    description="Backend for the PawSure landing page — walker applications.",
    version="1.0.0",
    lifespan=lifespan,
)

cors_origins = os.environ.get(
    "CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in cors_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ApplicationIn(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=80)
    last_name: str = Field(..., min_length=1, max_length=80)
    phone: str = Field(..., min_length=10, max_length=20)
    email: Optional[str] = Field(None, max_length=120)
    age: int = Field(..., ge=14, le=99)
    area: str = Field(..., min_length=2, max_length=120)
    experience: Literal[EXPERIENCE_OPTIONS]  # type: ignore[valid-type]
    availability: List[Literal[AVAILABILITY_OPTIONS]] = Field(..., min_length=1)  # type: ignore[valid-type]
    motivation: Optional[str] = Field(None, max_length=2000)
    id_proof: Literal[ID_OPTIONS]  # type: ignore[valid-type]
    consent: bool

    @field_validator("first_name", "last_name", "area")
    @classmethod
    def strip_text(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("This field cannot be empty.")
        return v

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        digits = re.sub(r"\D", "", v)
        if len(digits) < 10:
            raise ValueError("Phone number must contain at least 10 digits.")
        return v.strip()

    @field_validator("email")
    @classmethod
    def check_email(cls, v: Optional[str]) -> Optional[str]:
        if v is None or not v.strip():
            return None
        v = v.strip()
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", v):
            raise ValueError("Please provide a valid email address.")
        return v

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("The declaration must be accepted to submit an application.")
        return v


class ApplicationOut(BaseModel):
    id: int
    status: str = "received"


def row_to_dict(row: sqlite3.Row) -> dict:
    d = dict(row)
    d["availability"] = d["availability"].split("|")
    d["consent"] = bool(d["consent"])
    return d


def email_application(application: "ApplicationIn") -> None:
    """Email a new application to NOTIFY_EMAIL using FormSubmit (no SMTP/password
    needed). The very first submission triggers a one-time confirmation email
    from FormSubmit to NOTIFY_EMAIL — click the link in it once and every later
    application lands straight in the inbox."""
    if not NOTIFY_EMAIL:
        return
    payload = {
        "_subject": f"New PawSure walker application - {application.first_name} {application.last_name}",
        "_template": "table",
        "Name": f"{application.first_name} {application.last_name}",
        "Phone": application.phone,
        "Email": application.email or "-",
        "Age": application.age,
        "Area": application.area,
        "Experience": application.experience,
        "Availability": ", ".join(application.availability),
        "ID proof": application.id_proof,
        "Motivation": application.motivation or "-",
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"https://formsubmit.co/ajax/{NOTIFY_EMAIL}",
        data=data,
        headers={"Content-Type": "application/json", "Accept": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp.read()
        logger.info("Application emailed to %s", NOTIFY_EMAIL)
    except Exception as exc:  # noqa: BLE001 - never let email failure break the save
        logger.warning("Could not email application (saved anyway): %s", exc)


@app.get("/", include_in_schema=False)
def root() -> FileResponse:
    """Serve the single-page PawSure frontend."""
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@app.post("/api/applications", response_model=ApplicationOut, status_code=201)
def create_application(
    application: ApplicationIn, background_tasks: BackgroundTasks
) -> ApplicationOut:
    try:
        with closing(get_db()) as conn, conn:
            cur = conn.execute(
                """
                INSERT INTO walker_applications
                    (first_name, last_name, phone, email, age, area, experience,
                     availability, motivation, id_proof, consent, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    application.first_name,
                    application.last_name,
                    application.phone,
                    application.email,
                    application.age,
                    application.area,
                    application.experience,
                    "|".join(application.availability),
                    application.motivation,
                    application.id_proof,
                    int(application.consent),
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            new_id = cur.lastrowid
    except sqlite3.Error as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail="Could not save the application.") from exc
    background_tasks.add_task(email_application, application)
    return ApplicationOut(id=int(new_id or 0))


@app.get("/api/applications")
def list_applications() -> dict:
    with closing(get_db()) as conn:
        rows: Iterator[sqlite3.Row] = conn.execute(
            "SELECT * FROM walker_applications ORDER BY id DESC"
        )
        items = [row_to_dict(r) for r in rows]
    return {"count": len(items), "items": items}


# ---------------------------------------------------------------------------
# Serve the frontend from backend/static. Run the backend and open the root:
#     uvicorn main:app --reload --port 8000   ->   http://localhost:8000
# The walker form posts to /api/applications on this same origin.
# ---------------------------------------------------------------------------
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")