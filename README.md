# 🐾 PawSure:Your One Pet-Stop

A playful rebuild of the PawSure landing page. This is a demo redesign of the Pawsuree website (https://www.pawsuree.com/) created as a pitch for Radhika.

## Stack

| Part      | Tech                                        |
|-----------|---------------------------------------------|
| Frontend  | Next.js 14 (App Router) · TypeScript · Tailwind CSS |
| Backend   | FastAPI · SQLite (zero-config storage)      |

## Run it

### 1. Backend (port 8000)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API docs at http://localhost:8000/docs. Submitted applications are stored in
`backend/pawsure.db` and listed at `GET /api/applications`.

### 2. Frontend (port 3000)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. The "Become a Dog Walker" form posts to the backend.
To point at a different API URL, copy `.env.local.example` to `.env.local` and edit
`NEXT_PUBLIC_API_URL`.

## Project layout

```
pawsure/
├── frontend/
│   ├── app/            # layout, page, global styles, favicon
│   ├── components/     # one component per section + cursor/trail/icons
│   └── lib/            # content.ts (all copy in one place), api.ts
└── backend/
    └── main.py         # FastAPI app + SQLite storage
```
