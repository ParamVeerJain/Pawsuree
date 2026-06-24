import Image from 'next/image';
import { pups } from '@/lib/content';
import { Paw, Bone } from '@/components/icons';
import Reveal from '@/components/Reveal';

const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1'];

export default function Pups() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">
              <Paw className="h-4 w-4" />
              {pups.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-deepsea sm:text-5xl">
              {pups.heading}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-4 max-w-xl text-lg font-semibold text-deepsea/65">{pups.sub}</p>
          </Reveal>
        </div>

        {/* Polaroids pinned to the park noticeboard */}
        <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-3">
          {pups.dogs.map((dog, i) => (
            <Reveal key={dog.name} delay={(i % 3) * 100}>
              <figure
                className={`group sticker-frame ${tilts[i]} p-2 transition-transform duration-300 hover:rotate-0 hover:shadow-lift sm:p-3`}
              >
                <div className="overflow-hidden rounded-[18px]">
                  <Image
                    src={dog.image}
                    alt={dog.name}
                    width={400}
                    height={400}
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-2 px-2 pb-1 pt-3">
                  <span className="font-display text-lg font-extrabold text-deepsea sm:text-xl">
                    {dog.name}
                  </span>
                  <span className="relative inline-flex items-center rounded-full bg-ice px-3 py-1 font-display text-xs font-bold text-pool sm:text-sm">
                    <Bone className="mr-1.5 h-3 w-5 opacity-70" />
                    {dog.age}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
