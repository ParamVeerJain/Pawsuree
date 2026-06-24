'use client';

import Image from 'next/image';
import { useState } from 'react';
import { join } from '@/lib/content';
import { Paw, WhatsApp, Bell } from '@/components/icons';
import Reveal from '@/components/Reveal';

/**
 * The classic "contact us" block, rebuilt as a dog house. Hover (or tap, or
 * keyboard-focus) and the door swings fully open on its hinge, the PawSure
 * mascot peeks out of the doorway, and the Join WhatsApp button springs up over
 * the roof. The text buttons remain alongside, so nothing is hidden behind hover.
 */
function DogHouse() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`house relative mx-auto w-full max-w-sm select-none ${open ? 'open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <a
        href={join.whatsapp.href}
        target="_blank"
        rel="noopener"
        className="house-cta btn btn-primary absolute -top-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-base shadow-lift"
      >
        <WhatsApp className="h-5 w-5" />
        {join.whatsapp.label}
      </a>

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close the dog house' : 'Open the dog house'}
        onClick={() => setOpen((v) => !v)}
        className="block w-full !outline-offset-8"
      >
        <svg viewBox="0 0 320 304" className="house-shake h-auto w-full drop-shadow-[0_14px_0_rgba(29,78,126,0.12)]">
          {/* ground */}
          <ellipse cx="160" cy="290" rx="132" ry="11" fill="#D9F1FB" />
          {/* walls */}
          <rect x="55" y="130" width="210" height="150" rx="14" fill="#EFF9FE" stroke="#1D4E7E" strokeWidth="6" />
          {/* doorway interior + peeking pup (clipped to the arch) */}
          <clipPath id="doorway">
            <path d="M116,279 L116,205 C116,180 136,162 160,162 C184,162 204,180 204,205 L204,279 Z" />
          </clipPath>
          <path
            d="M114,280 L114,205 C114,179 135,160 160,160 C185,160 206,179 206,205 L206,280 Z"
            fill="#142E4C"
            stroke="#1D4E7E"
            strokeWidth="6"
          />
          <g clipPath="url(#doorway)">
            <image
              href={join.mascot.src}
              x="110"
              y="166"
              width="100"
              height="126"
              preserveAspectRatio="xMidYMin slice"
              className="house-pup"
            />
          </g>
          {/* the swinging door (hinged on its left edge) */}
          <g className="house-door">
            <path
              d="M120,278 L120,208 C120,184 138,168 160,168 C182,168 200,184 200,208 L200,278 Z"
              fill="#4A87C8"
              stroke="#1D4E7E"
              strokeWidth="5.5"
            />
            <circle cx="188" cy="226" r="6" fill="#D9F1FB" />
            <g fill="#D9F1FB" opacity="0.9" transform="translate(146,194) scale(0.85)">
              <ellipse cx="7.6" cy="12.6" rx="3" ry="4" transform="rotate(-24 7.6 12.6)" />
              <ellipse cx="13.1" cy="8.2" rx="3" ry="4.2" />
              <ellipse cx="19.6" cy="8.2" rx="3" ry="4.2" />
              <ellipse cx="25" cy="12.6" rx="3" ry="4" transform="rotate(24 25 12.6)" />
              <path d="M16.3 14.6c4.6 0 8.4 3.9 8.4 7.7 0 3.6-3.3 5.4-8.4 5.4s-8.4-1.8-8.4-5.4c0-3.8 3.8-7.7 8.4-7.7Z" />
            </g>
          </g>
          {/* roof */}
          <path
            d="M160,18 L292,132 C296,136 293,143 287,143 L33,143 C27,143 24,136 28,132 Z"
            fill="#4A87C8"
            stroke="#1D4E7E"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* name plate */}
          <rect x="118" y="94" width="84" height="36" rx="11" fill="#FFFDF4" stroke="#1D4E7E" strokeWidth="4.5" />
          <text
            x="160"
            y="119"
            textAnchor="middle"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, fill: '#1D4E7E' }}
          >
            PawSure
          </text>
        </svg>
      </button>

      <p className="mt-4 text-center font-display text-lg font-extrabold text-deepsea">
        {join.cardLabel}
      </p>
    </div>
  );
}

export default function JoinCTA() {
  return (
    <section id="join" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="relative mx-auto inline-block lg:mx-0">
              <Image
                src={join.smallImage.src}
                alt={join.smallImage.alt}
                width={join.smallImage.width}
                height={join.smallImage.height}
                className="h-20 w-20 rounded-full border-[3px] border-deepsea object-cover shadow-sticker"
              />
              <Paw className="absolute -right-3 -top-2 h-7 w-7 rotate-12 text-biscuit drop-shadow" aria-hidden="true" />
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-deepsea sm:text-5xl">
              {join.heading}
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mx-auto mt-4 max-w-md text-lg font-semibold text-deepsea/65 lg:mx-0">
              {join.sub}
            </p>
          </Reveal>
          <Reveal delay={250} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href={join.whatsapp.href} target="_blank" rel="noopener" className="btn btn-primary">
              <WhatsApp className="h-5 w-5" />
              {join.whatsapp.label}
            </a>
            <a href={join.notify.href} target="_blank" rel="noopener" className="btn btn-secondary">
              <Bell className="h-5 w-5 text-pool" />
              {join.notify.label}
            </a>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <DogHouse />
        </Reveal>
      </div>
    </section>
  );
}
