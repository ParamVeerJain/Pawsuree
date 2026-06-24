'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { howItWorks } from '@/lib/content';
import { Paw } from '@/components/icons';

/**
 * The four steps are joined by little paw trails — three prints that "walk"
 * from one step to the next, popping in one after another when the section
 * scrolls into view. Horizontal trail on desktop, vertical on mobile.
 */
function PawConnector({ baseDelay, vertical }: { baseDelay: number; vertical?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={
        vertical
          ? 'flex h-14 items-center justify-center gap-0 py-1 lg:hidden'
          : 'hidden shrink-0 items-center justify-center pb-16 lg:flex lg:w-16'
      }
    >
      <div className={vertical ? 'flex flex-col items-center' : 'flex items-center'}>
        {[0, 1, 2].map((i) => (
          <Paw
            key={i}
            className={`paw-step h-5 w-5 text-pool ${
              vertical
                ? `rotate-180 ${i % 2 ? '-translate-x-2' : 'translate-x-2'}`
                : `rotate-90 ${i % 2 ? 'translate-y-2' : '-translate-y-2'}`
            }`}
            style={{ transitionDelay: `${baseDelay + i * 140}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

        <div ref={ref} className="mt-14 flex flex-col items-stretch lg:flex-row lg:items-start">
          {howItWorks.steps.map((step, i) => (
            <div key={step.n} className="contents">
              <div
                className="paw-step flex-1"
                style={{ transitionDelay: `${i * 460}ms` }}
              >
                <div className="relative mx-auto flex h-full max-w-xs flex-col items-center rounded-[28px] border-[3px] border-deepsea/10 bg-mist px-6 pb-7 pt-10 text-center transition-colors duration-300 hover:border-deepsea hover:bg-white hover:shadow-stickerLg">
                  <span className="absolute -top-5 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border-[3px] border-deepsea bg-biscuit font-display text-base font-extrabold text-deepsea shadow-sticker">
                    {step.n}
                  </span>
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={200}
                    height={200}
                    className="h-24 w-24 rounded-full border-[3px] border-deepsea object-cover"
                  />
                  <h3 className="mt-5 font-display text-xl font-extrabold text-deepsea">{step.title}</h3>
                  <p className="mt-2 text-[15px] font-semibold leading-relaxed text-deepsea/65">
                    {step.description}
                  </p>
                </div>
              </div>
              {i < howItWorks.steps.length - 1 && (
                <>
                  <PawConnector baseDelay={i * 460 + 180} />
                  <PawConnector baseDelay={i * 460 + 180} vertical />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
