import { marquee } from '@/lib/content';
import { Paw } from '@/components/icons';

/** Blue collar-band marquee of everything PawSure does. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul
      className="flex items-center"
      aria-hidden={hidden || undefined}
    >
      {marquee.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-6 pr-6">
          <span className="whitespace-nowrap font-display text-lg font-bold text-white sm:text-xl">
            {item}
          </span>
          <Paw className={`h-4 w-4 shrink-0 text-ice/70 ${i % 2 ? 'rotate-12' : '-rotate-12'}`} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative -rotate-1 border-y-[3px] border-deepsea bg-pool py-3.5 shadow-stickerLg">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
