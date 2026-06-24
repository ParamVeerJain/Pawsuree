/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { hero } from '@/lib/content';
import Wordmark from '@/components/Wordmark';
import { Paw, Bone, Ear } from '@/components/icons';
import Reveal from '@/components/Reveal';

const avatarShades = ['bg-pool', 'bg-poolsoft', 'bg-deepsea', 'bg-biscuit text-deepsea'];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-10 pt-32 sm:pt-36">
      {/* ambient paws drifting in the background */}
      <Paw className="float-slower absolute left-[6%] top-36 h-10 w-10 text-ice [--tilt:-18deg]" aria-hidden="true" />
      <Paw className="float-slow absolute right-[8%] top-48 h-14 w-14 text-ice [--tilt:14deg]" aria-hidden="true" />
      <Paw className="float-slow absolute left-[14%] top-[460px] hidden h-8 w-8 text-ice [--tilt:30deg] lg:block" aria-hidden="true" />
      <Bone className="float-slower absolute right-[16%] top-[430px] hidden h-8 w-12 -rotate-12 opacity-60 lg:block" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 text-center">
        <Reveal>
          <span className="eyebrow">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-pool" />
            {hero.badge}
          </span>
        </Reveal>

        {/* The logo IS the headline */}
        <Reveal delay={90}>
          <h1 className="mx-auto mt-6 max-w-4xl">
            <span className="sr-only">PawSure — {hero.h1}</span>
            <Wordmark tagline className="mx-auto w-full max-w-[860px] drop-shadow-[0_10px_0_rgba(74,135,200,0.12)]" title={`PawSure — ${hero.h1}`} />
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-deepsea/70 sm:text-xl">
            {hero.sub}
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href={hero.primaryCta.href} className="btn btn-primary text-lg">
            <Bone className="h-5 w-8" />
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="btn btn-secondary text-lg">
            <Paw className="h-5 w-5 text-pool" />
            {hero.secondaryCta.label}
          </a>
        </Reveal>

        <Reveal delay={340} className="mt-7 flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {hero.avatars.map((a, i) => (
              <span
                key={a}
                className={`grid h-10 w-10 place-items-center rounded-full border-[3px] border-white font-display text-sm font-bold text-white shadow-sticker ${avatarShades[i % avatarShades.length]}`}
              >
                {a}
              </span>
            ))}
          </div>
          <p className="text-sm font-bold text-deepsea/70 sm:text-base">{hero.socialProof}</p>
        </Reveal>

        {/* Photo in a sticker frame with ears — the frame itself is a pup */}
        <Reveal delay={420} className="relative mx-auto mt-12 max-w-4xl">
          <div className="group relative">
            <Ear className="tag-ear tag-ear-l absolute -top-7 left-10 z-10 h-12 w-10 -rotate-6 sm:left-16 sm:h-14 sm:w-12" />
            <Ear flip className="tag-ear tag-ear-r absolute -top-7 right-10 z-10 h-12 w-10 rotate-6 sm:right-16 sm:h-14 sm:w-12" />
            <div className="tag-card sticker-frame relative -rotate-1 overflow-hidden p-2 sm:p-3">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                priority
                className="h-auto w-full rounded-[20px] object-cover"
              />
              <Paw className="absolute bottom-5 left-5 h-9 w-9 rotate-[-20deg] text-white/85 drop-shadow" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
