'use client';

import { useEffect, useState } from 'react';
import { Paw } from '@/components/icons';

const STEPS = 12;

/**
 * A trail of paw prints down the left edge of the page. Prints "step" into
 * view one by one as the visitor scrolls — like a pup walking ahead of them.
 */
export default function PawTrail() {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        setLit(Math.min(STEPS, Math.ceil(progress * (STEPS + 0.5))));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-10 left-4 top-28 z-30 hidden w-10 flex-col justify-between xl:flex"
    >
      {Array.from({ length: STEPS }).map((_, i) => (
        <Paw
          key={i}
          className={`paw-step h-5 w-5 text-pool/50 ${i < lit ? 'is-on' : ''} ${
            i % 2 === 0 ? 'translate-x-0 rotate-[160deg]' : 'translate-x-4 rotate-[200deg]'
          }`}
          style={{ transitionDelay: `${(i % 2) * 60}ms` }}
        />
      ))}
    </div>
  );
}
