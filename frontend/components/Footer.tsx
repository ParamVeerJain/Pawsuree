import { footer, site } from '@/lib/content';
import Wordmark from '@/components/Wordmark';
import { Paw, Mail, Phone, MapPin } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="bg-night text-ice">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Wordmark theme="inverse" className="h-10 w-auto" />
            <div className="mt-5 flex gap-1.5" aria-hidden="true">
              {[-16, 10, -12, 14].map((tilt, i) => (
                <Paw key={i} className="h-4 w-4 text-pool/60" style={{ transform: `rotate(${tilt}deg)` }} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-extrabold text-white">{footer.contact.title}</h3>
            <ul className="mt-4 space-y-3 font-semibold text-ice/80">
              <li>
                <a href={`mailto:${footer.contact.email}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail className="h-5 w-5 shrink-0 text-pool" />
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footer.contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="h-5 w-5 shrink-0 text-pool" />
                  {footer.contact.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <MapPin className="h-5 w-5 shrink-0 text-pool" />
                {footer.contact.location}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-extrabold text-white">{footer.social.title}</h3>
            <div className="mt-4 flex gap-3">
              {footer.social.links.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-ice/25 font-display text-lg font-extrabold lowercase text-ice transition-all hover:-translate-y-0.5 hover:border-pool hover:bg-pool hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <ul className="mt-6 space-y-2.5 font-semibold text-ice/80">
              {footer.quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <Paw className="h-3.5 w-3.5 text-pool" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t-2 border-ice/10 pt-6 sm:flex-row">
          <span className="inline-flex items-center gap-2 font-display font-extrabold text-white">
            <Paw className="h-5 w-5 -rotate-12 text-pool" />
            {site.name}
          </span>
          <p className="text-sm font-semibold text-ice/60">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
