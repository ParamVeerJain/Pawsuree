'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { howItWorks, type Step } from '@/lib/content';
import { Paw } from '@/components/icons';

type Side = 'left' | 'right';

const WALK: Record<Side, { pts: [number, number, number][]; curve: string }> = {
  right: {
    pts: [
      [110, 16, 205],
      [133, 40, 192],
      [150, 68, 175],
      [150, 100, 162],
      [130, 126, 150],
    ],
    curve: 'M110,10 C150,34 165,78 150,108 C144,122 132,132 122,140',
  },
  left: {
    pts: [
      [110, 16, 155],
      [87, 40, 168],
      [70, 68, 185],
      [70, 100, 198],
      [90, 126, 210],
    ],
    curve: 'M110,10 C70,34 55,78 70,108 C76,122 88,132 98,140',
  },
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

function StepCard({ step, side }: { step: Step; side: Side }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`w-full max-w-md lg:w-[46%] ${side === 'right' ? 'lg:ml-auto' : 'lg:mr-auto'}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: 'opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1)',
      }}
    >
      <div className="relative flex items-center gap-5 rounded-[28px] border-[3px] border-deepsea/10 bg-mist px-6 py-6 transition-colors duration-300 hover:border-deepsea hover:bg-white hover:shadow-stickerLg">
        <div className="relative shrink-0">
          <img
            src={step.image}
            alt={step.title}
            width={200}
            height={200}
            loading="lazy"
            className="h-24 w-24 rounded-full border-[3px] border-deepsea object-cover"
          />
          <span className="absolute -left-3 -top-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-deepsea bg-biscuit font-display text-base font-extrabold text-deepsea shadow-sticker">
            {step.n}
          </span>
        </div>
        <div className="text-left">
          <h3 className="font-display text-xl font-extrabold text-deepsea">{step.title}</h3>
          <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-deepsea/65">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function WalkTrail({ dir }: { dir: Side }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const walk = WALK[dir];

  return (
    <div ref={ref} className="relative mx-auto" style={{ height: 150, width: 220 }}>
      <svg viewBox="0 0 220 150" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d={walk.curve}
          fill="none"
          stroke="#4A87C8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2 9"
          style={{ opacity: inView ? 0.35 : 0, transition: 'opacity .5s ease .1s' }}
        />
      </svg>
      {walk.pts.map(([left, top, rot], i) => (
        <Paw
          key={i}
          style={{
            position: 'absolute',
            left,
            top,
            width: 24,
            height: 24,
            color: 'rgba(74,135,200,.7)',
            opacity: inView ? 1 : 0,
            transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${inView ? 1 : 0.3})`,
            transition: 'opacity .4s ease, transform .45s cubic-bezier(.34,1.56,.64,1)',
            transitionDelay: `${i * 130}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <span className="eyebrow">
            <Paw className="h-4 w-4" />
            {howItWorks.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold text-deepsea sm:text-5xl">
            {howItWorks.heading}
          </h2>
        </div>

        <div className="relative mx-auto mt-14 flex max-w-3xl flex-col items-center">
          {howItWorks.steps.map((step, i) => {
            const side: Side = i % 2 === 0 ? 'left' : 'right';
            return (
              <Fragment key={step.n}>
                <StepCard step={step} side={side} />
                {i < howItWorks.steps.length - 1 && (
                  <WalkTrail dir={side === 'left' ? 'right' : 'left'} />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
