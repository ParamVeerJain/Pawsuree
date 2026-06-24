import { testimonials } from '@/lib/content';
import { Paw } from '@/components/icons';
import Reveal from '@/components/Reveal';

const tilts = ['lg:-rotate-1', 'lg:rotate-1 lg:translate-y-4', 'lg:-rotate-1'];

export default function Testimonials() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">
              <Paw className="h-4 w-4" />
              {testimonials.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-deepsea sm:text-5xl">
              {testimonials.heading}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-7">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 130} className={tilts[i]}>
              <figure className="relative h-full">
                {/* speech bubble */}
                <blockquote className="sticker-frame relative h-full px-6 pb-7 pt-8">
                  <Paw className="absolute -top-4 left-6 h-9 w-9 rotate-[-14deg] text-pool drop-shadow" aria-hidden="true" />
                  <p className="font-semibold leading-relaxed text-deepsea/80">&ldquo;{t.quote}&rdquo;</p>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[13px] left-10 h-6 w-6 rotate-45 border-b-[3px] border-r-[3px] border-deepsea bg-white"
                  />
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pl-2">
                  <span className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-deepsea bg-pool font-display text-sm font-extrabold text-white shadow-sticker">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-extrabold text-deepsea">{t.name}</span>
                    <span className="block text-sm font-bold text-deepsea/55">{t.role}</span>
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
