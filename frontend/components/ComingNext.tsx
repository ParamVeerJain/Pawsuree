import Image from 'next/image';
import { comingNext } from '@/lib/content';
import { Bone } from '@/components/icons';
import Reveal from '@/components/Reveal';

/** Each upcoming feature floats around the pup as a bone-shaped treat chip. */
function BoneChip({ label, className, delay }: { label: string; className?: string; delay: number }) {
  return (
    <Reveal delay={delay} className={className}>
      <span className="float-slow relative inline-flex items-center rounded-full border-[3px] border-deepsea bg-cream px-5 py-2.5 font-display text-sm font-extrabold text-deepsea shadow-sticker sm:text-base">
      <span aria-hidden="true" className="absolute -left-2.5 top-0 h-4 w-4 rounded-full border-[3px] border-deepsea bg-cream" />
      <span aria-hidden="true" className="absolute -left-2.5 bottom-0 h-4 w-4 rounded-full border-[3px] border-deepsea bg-cream" />
      <span aria-hidden="true" className="absolute -right-2.5 top-0 h-4 w-4 rounded-full border-[3px] border-deepsea bg-cream" />
      <span aria-hidden="true" className="absolute -right-2.5 bottom-0 h-4 w-4 rounded-full border-[3px] border-deepsea bg-cream" />
        {label}
      </span>
    </Reveal>
  );
}

export default function ComingNext() {
  const [c1, c2, c3, c4, c5, c6] = comingNext.chips;
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold text-deepsea sm:text-5xl">
              {comingNext.heading}
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-deepsea/65">
              {comingNext.sub}
            </p>
          </Reveal>
        </div>

        {/* Desktop: chips orbit the photo. Mobile: photo, then a treat pile. */}
        <div className="relative mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden flex-col items-end gap-9 lg:flex">
            <BoneChip label={c1} delay={120} className="[--tilt:-3deg] lg:mr-8" />
            <BoneChip label={c2} delay={240} className="[--tilt:2deg] lg:mr-0" />
            <BoneChip label={c3} delay={360} className="[--tilt:-2deg] lg:mr-10" />
          </div>

          <Reveal className="mx-auto w-full max-w-xs sm:max-w-sm">
            <div className="sticker-frame rotate-1 overflow-hidden p-2 sm:p-3">
              <Image
                src={comingNext.image.src}
                alt={comingNext.image.alt}
                width={comingNext.image.width}
                height={comingNext.image.height}
                className="h-auto w-full rounded-[20px] object-cover"
              />
            </div>
          </Reveal>

          <div className="hidden flex-col items-start gap-9 lg:flex">
            <BoneChip label={c4} delay={180} className="[--tilt:2deg] lg:ml-8" />
            <BoneChip label={c5} delay={300} className="[--tilt:-3deg] lg:ml-0" />
            <BoneChip label={c6} delay={420} className="[--tilt:3deg] lg:ml-10" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-7 gap-y-5 lg:hidden">
            {comingNext.chips.map((chip, i) => (
              <BoneChip key={chip} label={chip} delay={i * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
