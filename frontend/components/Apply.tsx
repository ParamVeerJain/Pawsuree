'use client';

import { useState, type FormEvent } from 'react';
import { apply } from '@/lib/content';
import { submitApplication } from '@/lib/api';
import { Paw, Bone, Check } from '@/components/icons';
import Reveal from '@/components/Reveal';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Apply() {
  const [availability, setAvailability] = useState<Set<string>>(new Set());
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const toggleSlot = (slot: string) => {
    setAvailability((prev) => {
      const next = new Set(prev);
      if (next.has(slot)) next.delete(slot);
      else next.add(slot);
      return next;
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const fd = new FormData(form);

    if (availability.size === 0) {
      setError('Please pick at least one availability slot.');
      return;
    }
    if (!consent) {
      setError('Please confirm the declaration to submit.');
      return;
    }

    setStatus('sending');
    try {
      await submitApplication({
        first_name: String(fd.get('first_name') || '').trim(),
        last_name: String(fd.get('last_name') || '').trim(),
        phone: `+91 ${String(fd.get('phone') || '').trim()}`,
        email: String(fd.get('email') || '').trim() || undefined,
        age: Number(fd.get('age')),
        area: String(fd.get('area') || '').trim(),
        experience: String(fd.get('experience') || ''),
        availability: Array.from(availability),
        motivation: String(fd.get('motivation') || '').trim() || undefined,
        id_proof: String(fd.get('id_proof') || ''),
        consent,
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'Could not reach the PawSure server. Start the FastAPI backend on port 8000 and try again.'
      );
    }
  }

  return (
    <section id="apply" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[5fr_7fr] lg:gap-14">
        {/* Pitch */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">
              <Paw className="h-4 w-4" />
              {apply.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-deepsea sm:text-5xl">
              {apply.heading}
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 max-w-md text-lg font-semibold text-deepsea/65">{apply.sub}</p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-7 space-y-3">
              {apply.footnote.split('. ').map((line) => (
                <li key={line} className="flex items-center gap-3 font-bold text-deepsea/75">
                  <Bone className="h-4 w-7 shrink-0" />
                  {line.endsWith('.') ? line : `${line}.`}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Form on a clipboard-style card */}
        <Reveal delay={120}>
          <div className="sticker-frame relative p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="absolute -top-5 left-1/2 h-9 w-28 -translate-x-1/2 rounded-full border-[3px] border-deepsea bg-biscuit shadow-sticker"
            />

            {status === 'success' ? (
              <div className="py-14 text-center" role="status">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[3px] border-deepsea bg-ice">
                  <Check className="h-10 w-10 text-pool" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-extrabold text-deepsea">
                  Application received!
                </h3>
                <p className="mx-auto mt-3 max-w-sm font-semibold text-deepsea/65">
                  Thanks for applying to walk with PawSure. Our team will reach out to you soon.
                </p>
                <Paw className="mx-auto mt-6 h-8 w-8 rotate-12 text-pool" aria-hidden="true" />
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate={false} className="grid gap-5 pt-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="field-label">First name *</label>
                  <input id="first_name" name="first_name" required className="field-input" autoComplete="given-name" />
                </div>
                <div>
                  <label htmlFor="last_name" className="field-label">Last name *</label>
                  <input id="last_name" name="last_name" required className="field-input" autoComplete="family-name" />
                </div>

                <div>
                  <label htmlFor="phone" className="field-label">Phone number *</label>
                  <div className="flex">
                    <span className="grid shrink-0 place-items-center rounded-l-2xl border-2 border-r-0 border-deepsea/15 bg-ice px-3 font-display font-bold text-deepsea">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[0-9 ]{10,12}"
                      className="field-input !rounded-l-none"
                      autoComplete="tel-national"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="field-label">Email address</label>
                  <input id="email" name="email" type="email" className="field-input" autoComplete="email" />
                </div>

                <div>
                  <label htmlFor="age" className="field-label">Age *</label>
                  <input id="age" name="age" type="number" min={14} max={99} required className="field-input" />
                </div>
                <div>
                  <label htmlFor="area" className="field-label">Your area / neighborhood *</label>
                  <input id="area" name="area" required className="field-input" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="experience" className="field-label">Experience with dogs *</label>
                  <select id="experience" name="experience" required defaultValue="" className="field-input">
                    <option value="" disabled>Select your experience</option>
                    {apply.experienceOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className="field-label">Availability *</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {apply.availabilityOptions.map((slot) => {
                      const on = availability.has(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleSlot(slot)}
                          className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 font-display text-sm font-bold transition-all ${
                            on
                              ? 'border-deepsea bg-pool text-white shadow-sticker'
                              : 'border-deepsea/20 bg-white text-deepsea/70 hover:border-pool hover:text-pool'
                          }`}
                        >
                          <Paw className={`h-3.5 w-3.5 ${on ? 'text-ice' : 'text-pool/50'}`} />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <label htmlFor="motivation" className="field-label">
                    Why do you want to be a PawSure walker?
                  </label>
                  <textarea id="motivation" name="motivation" rows={4} className="field-input resize-y" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="id_proof" className="field-label">ID proof available *</label>
                  <select id="id_proof" name="id_proof" required defaultValue="" className="field-input">
                    <option value="" disabled>Select ID type</option>
                    {apply.idOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 border-deepsea/25 bg-white transition-colors peer-checked:border-deepsea peer-checked:bg-pool peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-pool">
                    {consent && <Check className="h-4 w-4 text-white" />}
                  </span>
                  <span className="text-sm font-semibold leading-relaxed text-deepsea/70">
                    {apply.consent}
                  </span>
                </label>

                {error && (
                  <p role="alert" className="rounded-2xl border-2 border-biscuit bg-cream px-4 py-3 text-sm font-bold text-deepsea sm:col-span-2">
                    {error}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full text-lg disabled:opacity-60">
                    <Bone className={`h-5 w-8 ${status === 'sending' ? 'animate-spin' : ''}`} />
                    {status === 'sending' ? 'Sending…' : apply.submit}
                  </button>
                  <p className="mt-4 text-center text-sm font-bold text-deepsea/55">{apply.footnote}</p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
