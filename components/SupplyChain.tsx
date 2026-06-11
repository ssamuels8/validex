const STEPS = [
  { idx: '01', title: 'Discover', line: 'Measurement providers identified and screened per component.' },
  { idx: '02', title: 'License', line: 'Formal data agreements signed with verified providers.' },
  { idx: '03', title: 'Connect', line: 'Provider data integrated, normalised, and audited.' },
  { idx: '04', title: 'Score', line: 'Each component scored against ESRS legal standards.' },
  { idx: '05', title: 'Grade', line: 'Aggregated into one A–E grade. Both views always disclosed.' },
];

export default function SupplyChain() {
  return (
    <section className="chain-section" id="supply-chain" data-field="#F4EFE6">
      <div className="chain-inner">
        <span className="chain-eyebrow reveal">How The Score Is Built</span>
        <h2 className="chain-headline reveal">
          We don&rsquo;t read claims. We license the data behind them.
        </h2>
        <p className="chain-sub reveal">
          Every Validex grade is built from licensed, verified measurement data
          — not scraped marketing copy.
        </p>

        {/* Process rail — a hairline draws through, cards rise in sequence */}
        <div className="chain-rail" id="chain-rail">
          <svg className="chain-line" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 2">
            <path id="chain-line-path" d="M 0 1 H 100" pathLength={1} vectorEffect="non-scaling-stroke" />
          </svg>
          {STEPS.map((s) => (
            <article className="chain-card" key={s.idx}>
              <div className="chain-card-top">
                <span className="chain-card-idx">{s.idx}</span>
                <span className="chain-card-tick" aria-hidden="true" />
              </div>
              <h3 className="chain-card-title">{s.title}</h3>
              <p className="chain-card-line">{s.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
