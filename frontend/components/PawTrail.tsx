'use client';

import { useEffect, useState } from 'react';
import { Paw } from '@/components/icons';

const TRAIL_N = 14;

export default function PawTrail() {
  const [lit, setLit] = useState(0);
  const [dir, setDir] = useState<'down' | 'up'>('down');

  useEffect(() => {
    let raf = 0;
    let lastY = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) > 4) {
          setDir(y > lastY ? 'down' : 'up');
          lastY = y;
        }
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setLit(Math.round((max > 0 ? y / max : 0) * TRAIL_N));
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
      className="pointer-events-none fixed bottom-12 left-3 top-28 z-30 hidden w-12 xl:block"
    >
      <div className="relative h-full w-full">
        {Array.from({ length: TRAIL_N }).map((_, i) => {
          const isLeft = i % 2 === 0;
          const base = dir === 'down' ? 180 : 0;
          const skew = isLeft ? -15 : 15;
          const on = dir === 'down' ? i < lit : i >= TRAIL_N - lit;
          return (
            <Paw
              key={i}
              style={{
                position: 'absolute',
                top: `${(i / (TRAIL_N - 1)) * 100}%`,
                left: isLeft ? 3 : 23,
                width: 20,
                height: 20,
                color: 'rgba(74,135,200,.55)',
                opacity: on ? 1 : 0,
                transform: `translateY(-50%) rotate(${base + skew}deg) scale(${on ? 1 : 0.35})`,
                transition: 'opacity .4s ease, transform .45s cubic-bezier(.34,1.56,.64,1)',
                transitionDelay: `${(i % 3) * 45}ms`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
