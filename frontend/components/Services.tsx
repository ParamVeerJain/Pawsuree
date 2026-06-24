import Image from 'next/image';
import { services, type Service } from '@/lib/content';
import { Paw, Ear, Tail } from '@/components/icons';
import Reveal from '@/components/Reveal';

/**
 * Each service is a military-style pet ID tag: punched hole and split ring up
 * top, photo riveted on like a tag engraving. Hovering makes the tag swing on
 * its ring, the ears perk up, and the tail starts wagging.
 */
function TagCard({ service, index }: { service: Service; index: number }) {
  const live = service.status === 'Live now';
  return (
    <Reveal delay={(index % 3) * 110} className="pt-8">
      <article className="group relative h-full">
        {/* split ring the tag hangs from */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 h-9 w-9 -translate-x-1/2 rounded-full border-[5px] border-deepsea/70 bg-transparent"
        />
        <div className="tag-card sticker-frame relative h-full px-6 pb-8 pt-10 text-center">
          {/* punched hole */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-3 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-deepsea/30 bg-mist"
          />
          {/* ears that perk on hover */}
          <Ear className="tag-ear tag-ear-l absolute -top-5 left-5 h-10 w-8 -rotate-12" />
          <Ear flip className="tag-ear tag-ear-r absolute -top-5 right-5 h-10 w-8 rotate-12" />
          {/* tail that wags on hover */}
          <Tail className="tag-tail absolute -right-7 bottom-10 hidden h-7 w-10 sm:block" />

          <div className="relative mx-auto mt-2 w-fit">
            <Image
              src={service.image}
              alt={service.title}
              width={200}
              height={200}
              className="h-28 w-28 rounded-full border-[3px] border-deepsea object-cover shadow-sticker"
            />
            <span
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-deepsea px-3 py-0.5 font-display text-xs font-bold ${
                live ? 'bg-biscuit text-deepsea' : 'bg-ice text-pool'
              }`}
            >
              {service.status}
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-extrabold text-deepsea">{service.title}</h3>
          <p className="mt-2 font-semibold leading-relaxed text-deepsea/65">{service.description}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-mist py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">
              <Paw className="h-4 w-4" />
              {services.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-deepsea sm:text-5xl">
              {services.heading}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s, i) => (
            <TagCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
