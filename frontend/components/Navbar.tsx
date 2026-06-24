'use client';

import { useState } from 'react';
import { nav, hero } from '@/lib/content';
import Wordmark from '@/components/Wordmark';
import { Paw, Bone, Menu, Close } from '@/components/icons';

const allLinks = [...nav.left, ...nav.right];

/** A nav link preceded by a little paw print — the trail walks across the bar. */
function PawLink({
  label,
  href,
  onClick,
  tilt,
}: {
  label: string;
  href: string;
  onClick?: () => void;
  tilt: number;
}) {
  return (
    <li className="flex items-center gap-2">
      <Paw
        className="h-3.5 w-3.5 shrink-0 text-pool/45 transition-transform duration-300 group-hover/nav:scale-110"
        style={{ transform: `rotate(${tilt}deg)` }}
      />
      <a
        href={href}
        onClick={onClick}
        className="font-display text-[15px] font-bold text-deepsea/80 transition-colors hover:text-pool"
      >
        {label}
      </a>
    </li>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-4">
      <nav
        aria-label="Main"
        className="group/nav mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border-[3px] border-deepsea/90 bg-white/90 py-2.5 pl-5 pr-2.5 shadow-stickerLg backdrop-blur-md"
      >
        <a href="#home" className="flex shrink-0 items-center" aria-label="PawSure — home">
          <Wordmark className="h-7 w-auto sm:h-8" />
        </a>

        {/* Desktop: links walk across the bar with paw separators */}
        <ul className="hidden items-center gap-5 lg:flex">
          {nav.left.map((l, i) => (
            <PawLink key={l.label} {...l} tilt={i % 2 ? 18 : -14} />
          ))}
          {nav.right.map((l, i) => (
            <PawLink key={l.label} {...l} tilt={i % 2 ? -16 : 12} />
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={hero.primaryCta.href} className="btn btn-primary hidden !py-2.5 text-sm md:inline-flex">
            <Bone className="h-4 w-7" />
            {hero.primaryCta.label}
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-deepsea bg-ice text-deepsea lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-[24px] border-[3px] border-deepsea bg-white p-5 shadow-stickerLg lg:hidden">
          <ul className="flex flex-col gap-4">
            {allLinks.map((l, i) => (
              <PawLink key={l.label} {...l} tilt={i % 2 ? 16 : -16} onClick={() => setOpen(false)} />
            ))}
            <li>
              <a
                href={hero.primaryCta.href}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                <Bone className="h-4 w-7" />
                {hero.primaryCta.label}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
