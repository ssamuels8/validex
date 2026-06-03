const PANELS = [
  {
    index: '01',
    meta: '2015 · EU · Automotive',
    company: 'Volkswagen',
    statLabel: 'ESG Rating at time of scandal',
    statValue: 'AA',
    minus: false,
    body: 'While 11 million vehicles were actively falsifying emissions tests. The self-reported data showed compliance. The measured reality did not.',
    footer: 'Validex component: EMISSIONS — Scope 1 independent verification',
  },
  {
    index: '02',
    meta: '2021 · Germany/US · Asset Management',
    company: 'DWS / Deutsche Bank',
    statLabel: 'Assets marketed as ESG-integrated',
    statValue: '€900bn',
    minus: false,
    body: 'Their own sustainability chief became a whistleblower. A fraction of €900 billion had ESG criteria meaningfully applied. Declaration is not measurement.',
    footer: 'Validex component: CERTIFICATION — Third-party audit verification',
  },
  {
    index: '03',
    meta: '2020 · UK · Retail',
    company: 'Boohoo',
    statLabel: 'Share price fall in 48 hours',
    statValue: '50%',
    minus: true,
    body: 'Scored well on every ESG disclosure platform. Its Leicester supplier was paying workers £3.50/hour. The supply chain was invisible to every existing rating. £1.5bn vanished in two days.',
    footer: 'Validex component: SUPPLY CHAIN — Upstream verification',
  },
];

export default function Evidence() {
  return (
    <section className="evidence" id="evidence">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="evidence-header">
        <span className="section-label">§ 03 — The Evidence</span>
        <h2 className="evidence-headline display">
          <em>The problem is not theoretical.</em>
        </h2>
        <p className="evidence-sub">
          Three companies. Three failures. One missing instrument.
        </p>
      </div>

      {/* overflow:hidden on sticky-outer prevents ghost names from bleeding */}
      <div
        className="evidence-sticky-outer"
        id="evidence-sticky-outer"
        style={{ overflow: 'hidden' }}
      >
        <div className="evidence-sticky" id="evidence-sticky">
          <div className="evidence-panels" id="evidence-panels">
            {PANELS.map((p) => (
              <div
                className="evidence-panel"
                key={p.index}
                style={{ overflow: 'hidden' }}
              >
                {/* Ghost clipped inside the panel */}
                <div className="panel-ghost" aria-hidden="true">
                  {p.company}
                </div>
                <div className="panel-card">
                  <div className="panel-top">
                    <span className="panel-index mono">{p.index}</span>
                    <span className="panel-meta mono">{p.meta}</span>
                  </div>
                  <div className="panel-company display">{p.company}</div>
                  <div className="panel-stat-label mono">{p.statLabel}</div>
                  <div className="panel-stat-value display">
                    {p.minus && <span className="minus">−</span>}
                    {p.statValue}
                  </div>
                  <div className="panel-divider" />
                  <p className="panel-body">{p.body}</p>
                  <div className="panel-footer mono">{p.footer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="evidence-dots" id="evidence-dots">
        <div className="evidence-dot active" />
        <div className="evidence-dot" />
        <div className="evidence-dot" />
      </div>
    </section>
  );
}
