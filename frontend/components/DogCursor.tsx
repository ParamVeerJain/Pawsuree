'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Replaces the cursor with a dog bone, and sends a little pup chasing after it
 * (eased, never glued to the pointer). When the cursor stops moving, the pup
 * catches up, sits down, and holds the bone in its mouth until you move again.
 *
 * Activates only on fine pointers at >=768px, and never when the visitor
 * prefers reduced motion. Pointer events pass straight through.
 */
export default function DogCursor() {
  const boneRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const sittingRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [sitting, setSitting] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (!fine || !wide || !motionOk) return;

    setEnabled(true);
    document.documentElement.classList.add('bone-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dog = { x: mouse.x - 120, y: mouse.y + 60 };
    let lastMove = performance.now();
    let facing = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMove = performance.now();
    };

    const tick = () => {
      const idle = performance.now() - lastMove > 1000;
      const dx = mouse.x - dog.x;
      const dy = mouse.y - dog.y;
      const dist = Math.hypot(dx, dy);

      // Chase a little faster once the bone has stopped, so the pup catches up.
      const ease = idle ? 0.14 : 0.085;
      dog.x += dx * ease;
      dog.y += dy * ease;
      if (Math.abs(dx) > 8) facing = dx > 0 ? 1 : -1;

      const isSitting = idle && dist < 26;
      if (isSitting !== sittingRef.current) {
        sittingRef.current = isSitting;
        setSitting(isSitting);
      }

      const dogEl = dogRef.current;
      const boneEl = boneRef.current;
      if (dogEl) {
        dogEl.style.transform = `translate3d(${dog.x}px, ${dog.y}px, 0)`;
        dogEl.classList.toggle('dog-running', !idle && dist > 16);
        const inner = dogEl.firstElementChild as HTMLElement | null;
        if (inner) inner.style.transform = `translate(-50%, -62%) scaleX(${facing})`;
      }
      if (boneEl) {
        boneEl.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
        boneEl.style.opacity = isSitting ? '0' : '1';
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('bone-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* The bone = the cursor */}
      <div ref={boneRef} className="cursor-layer bone-layer" aria-hidden="true">
        <svg viewBox="0 0 40 24">
          <path
            d="M11.5,3.5 C14.2,3.5 16.4,5.4 16.9,7.9 L23.1,7.9 C23.6,5.4 25.8,3.5 28.5,3.5 C31.5,3.5 34,5.9 34,8.9 C34,10.1 33.6,11.2 32.9,12 C33.6,12.8 34,13.9 34,15.1 C34,18.1 31.5,20.5 28.5,20.5 C25.8,20.5 23.6,18.6 23.1,16.1 L16.9,16.1 C16.4,18.6 14.2,20.5 11.5,20.5 C8.5,20.5 6,18.1 6,15.1 C6,13.9 6.4,12.8 7.1,12 C6.4,11.2 6,10.1 6,8.9 C6,5.9 8.5,3.5 11.5,3.5 Z"
            fill="#FFFDF4"
            stroke="#1D4E7E"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* The pup that chases it */}
      <div ref={dogRef} className="cursor-layer dog-layer" aria-hidden="true">
        <div style={{ position: 'absolute', width: 64, height: 64, transform: 'translate(-50%, -62%)' }}>
          {/* running pose */}
          <div className="dog-sprite" data-show={!sitting}>
            <svg viewBox="0 0 64 48" className="dog-body">
              <g fill="#1D4E7E">
                <path className="dog-tail" d="M14,26 C8,21 4,22 3,17 C7,18 12,18 16,22 Z" />
                <line className="dog-leg dog-leg-a" x1="22" y1="32" x2="18" y2="43" stroke="#1D4E7E" strokeWidth="5" strokeLinecap="round" />
                <line className="dog-leg dog-leg-b" x1="38" y1="32" x2="34" y2="43" stroke="#1D4E7E" strokeWidth="5" strokeLinecap="round" />
                <line className="dog-leg dog-leg-b" x1="27" y1="33" x2="29" y2="44" stroke="#1D4E7E" strokeWidth="5" strokeLinecap="round" />
                <line className="dog-leg dog-leg-a" x1="42" y1="33" x2="45" y2="43" stroke="#1D4E7E" strokeWidth="5" strokeLinecap="round" />
                <ellipse cx="30" cy="27" rx="17" ry="10.5" />
                <circle cx="46" cy="16" r="10" />
                <path d="M53,16 C58,15 61,17 61.5,20 C58,21.5 54,21 52,19 Z" />
                <circle cx="61" cy="19.5" r="2.4" />
                <path className="dog-ear" d="M42,7 C38,5 33,7 32,12 C34,16 39,17 42,15 Z" />
              </g>
              <rect x="38" y="22.4" width="9" height="4.6" rx="2.3" fill="#F6C453" transform="rotate(-12 42 24)" />
              <circle cx="49.5" cy="13.5" r="1.7" fill="#D9F1FB" />
            </svg>
          </div>

          {/* sitting pose, bone in mouth */}
          <div className="dog-sprite" data-show={sitting}>
            <svg viewBox="0 0 60 60">
              <g fill="#1D4E7E">
                <path className="dog-tail" d="M12,52 C5,52 2,48 3,44 C8,45 12,47 15,50 Z" />
                <ellipse cx="20" cy="44" rx="13" ry="12" />
                <path d="M20,52 C16,38 22,22 33,18 L40,26 C40,38 36,48 32,53 Z" />
                <line x1="30" y1="36" x2="30" y2="54" stroke="#1D4E7E" strokeWidth="6" strokeLinecap="round" />
                <line x1="38" y1="36" x2="38" y2="54" stroke="#1D4E7E" strokeWidth="6" strokeLinecap="round" />
                <circle cx="38" cy="15" r="11" />
                <path d="M46,16 C51,15 54,17 54.5,20 C51,21.5 47,21 45,19 Z" />
                <circle cx="54" cy="19.5" r="2.4" />
                <path className="dog-ear" d="M33,5 C29,3 24,6 24,11 C26,15 31,16 34,14 Z" />
              </g>
              <rect x="29" y="24" width="13" height="5" rx="2.5" fill="#F6C453" />
              <circle cx="41.5" cy="12.5" r="1.7" fill="#D9F1FB" />
              {/* the "cursor" bone, now held in the mouth */}
              <g transform="translate(54,21.5) rotate(18)">
                <path
                  transform="translate(-14.4,-8.6) scale(0.72)"
                  d="M11.5,3.5 C14.2,3.5 16.4,5.4 16.9,7.9 L23.1,7.9 C23.6,5.4 25.8,3.5 28.5,3.5 C31.5,3.5 34,5.9 34,8.9 C34,10.1 33.6,11.2 32.9,12 C33.6,12.8 34,13.9 34,15.1 C34,18.1 31.5,20.5 28.5,20.5 C25.8,20.5 23.6,18.6 23.1,16.1 L16.9,16.1 C16.4,18.6 14.2,20.5 11.5,20.5 C8.5,20.5 6,18.1 6,15.1 C6,13.9 6.4,12.8 7.1,12 C6.4,11.2 6,10.1 6,8.9 C6,5.9 8.5,3.5 11.5,3.5 Z"
                  fill="#FFFDF4"
                  stroke="#1D4E7E"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
