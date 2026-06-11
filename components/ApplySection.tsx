import Link from 'next/link';

export default function ApplySection() {
  return (
    <section className="apply-section" id="apply" data-field="#F4EFE6">
      <div className="apply-statement">
        <span className="apply-st-eyebrow reveal">Scoring Pilot</span>
        <h2 className="apply-st-headline reveal">Apply to be scored.</h2>
        <p className="apply-st-sub reveal">
          We onboard a small number of companies for verified pilot scores.
          Reviewed weekly.
        </p>
        <Link href="/apply" className="apply-st-cta reveal" id="apply-cta">
          Start Application ↗
        </Link>
      </div>
    </section>
  );
}
