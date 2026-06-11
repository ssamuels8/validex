'use client';

import { useState, type FormEvent } from 'react';

const SECTORS = [
  'Industrial Manufacturing',
  'Energy',
  'Consumer Goods',
  'Logistics',
  'Construction',
  'Agriculture',
  'Other',
];
const REGIONS = ['EU', 'UK', 'North America', 'Other'];

type Errors = Partial<Record<'company' | 'sector' | 'region' | 'email', string>>;

function SealMark({ size = 56 }: { size?: number }) {
  return (
    <svg className="apply-seal" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <path
          id="apply-seal-arc"
          d="M 32,32 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0"
          fill="none"
        />
      </defs>
      <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <text className="hero-seal-text">
        <textPath href="#apply-seal-arc">VALIDEX VERIFIED · EST 2026 · ESRS ·</textPath>
      </text>
      <text x="32" y="33" className="hero-seal-grade">A</text>
    </svg>
  );
}

export default function ApplySection() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      company: String(data.get('company') ?? '').trim(),
      sector: String(data.get('sector') ?? ''),
      region: String(data.get('region') ?? ''),
      email: String(data.get('email') ?? '').trim(),
      claim: String(data.get('claim') ?? '').trim(),
    };

    const errs: Errors = {};
    if (!payload.company) errs.company = 'Required';
    if (!payload.sector) errs.sector = 'Required';
    if (!payload.region) errs.region = 'Required';
    if (!payload.email) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errs.email = 'Enter a valid work email';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // TODO: wire to Formspree/Resend → samuels.semeiks@gmail.com.
    // NO email is sent today — front-end application only.
    console.log('[validex/apply]', payload);
    setSubmitted(true);
  }

  return (
    <section className="apply-section" id="apply">
      <div className="apply-inner">

        {/* LEFT — the pitch */}
        <div className="apply-left">
          <span className="apply-eyebrow reveal">Scoring Pilot</span>
          <h2 className="apply-headline reveal">Apply to be scored.</h2>
          <p className="apply-sub reveal">
            We are onboarding a small number of companies for verified pilot
            scores. Applications are reviewed weekly.
          </p>
        </div>

        {/* RIGHT — the application card */}
        <div className="apply-right reveal">
          {submitted ? (
            <div className="apply-card apply-success" role="status">
              <SealMark />
              <h3 className="apply-success-title">Application received.</h3>
              <p className="apply-success-sub">
                We review weekly and respond to your work email.
              </p>
            </div>
          ) : (
            <form className="apply-card" onSubmit={handleSubmit} noValidate>
              <div className="apply-field">
                <label className="apply-label" htmlFor="apply-company">Company Name</label>
                <input
                  className={`apply-input${errors.company ? ' apply-input-error' : ''}`}
                  id="apply-company" name="company" type="text" autoComplete="organization"
                />
                {errors.company && <span className="apply-error" role="alert">{errors.company}</span>}
              </div>

              <div className="apply-field-row">
                <div className="apply-field">
                  <label className="apply-label" htmlFor="apply-sector">Sector</label>
                  <select
                    className={`apply-input apply-select${errors.sector ? ' apply-input-error' : ''}`}
                    id="apply-sector" name="sector" defaultValue=""
                  >
                    <option value="" disabled>Select sector</option>
                    {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.sector && <span className="apply-error" role="alert">{errors.sector}</span>}
                </div>
                <div className="apply-field">
                  <label className="apply-label" htmlFor="apply-region">Region</label>
                  <select
                    className={`apply-input apply-select${errors.region ? ' apply-input-error' : ''}`}
                    id="apply-region" name="region" defaultValue=""
                  >
                    <option value="" disabled>Select region</option>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.region && <span className="apply-error" role="alert">{errors.region}</span>}
                </div>
              </div>

              <div className="apply-field">
                <label className="apply-label" htmlFor="apply-email">Work Email</label>
                <input
                  className={`apply-input${errors.email ? ' apply-input-error' : ''}`}
                  id="apply-email" name="email" type="email" autoComplete="email" inputMode="email"
                />
                {errors.email && <span className="apply-error" role="alert">{errors.email}</span>}
              </div>

              <div className="apply-field">
                <label className="apply-label" htmlFor="apply-claim">
                  What sustainability claim should we verify first? <span className="apply-optional">Optional</span>
                </label>
                <textarea className="apply-input apply-textarea" id="apply-claim" name="claim" rows={3} />
              </div>

              <button type="submit" className="apply-submit" id="apply-submit">
                Submit Application ↗
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
