import Image from 'next/image';
import { about } from '@/lib/content';
import { Paw } from '@/components/icons';
import Reveal from '@/components/Reveal';

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Photo collage: big dog + a cat polaroid sneaking in */}
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="sticker-frame -rotate-2 overflow-hidden p-2 sm:p-3">
            <Image
              src={about.dogImage.src}
              alt={about.dogImage.alt}
              width={about.dogImage.width}
              height={about.dogImage.height}
              className="h-auto w-full rounded-[20px] object-cover"
            />
          </div>
          <figure className="sticker-frame absolute -bottom-8 -right-2 w-32 rotate-6 p-1.5 transition-transform duration-300 hover:rotate-3 sm:-right-6 sm:w-40 sm:p-2">
            <Image
              src={about.catImage.src}
              alt={about.catImage.alt}
              width={about.catImage.width}
              height={about.catImage.height}
              unoptimized
              className="h-auto w-full rounded-2xl object-cover"
            />
            <Paw className="absolute -left-3 -top-3 h-8 w-8 rotate-[-24deg] text-biscuit drop-shadow" aria-hidden="true" />
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">
              <Paw className="h-4 w-4" />
              {about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-deepsea sm:text-4xl lg:text-[2.6rem]">
              {about.heading}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 text-lg font-semibold text-deepsea/65">{about.sub}</p>
          </Reveal>
          <ul className="mt-7 space-y-4">
            {about.bullets.map((b, i) => (
              <Reveal as="li" key={b} delay={220 + i * 90} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-deepsea/15 bg-ice">
                  <Paw className={`h-4 w-4 text-pool ${i % 2 ? 'rotate-12' : '-rotate-12'}`} />
                </span>
                <span className="pt-1 font-semibold text-deepsea/80">{b}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
