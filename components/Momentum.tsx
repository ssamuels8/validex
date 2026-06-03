const ITEMS = [
  {
    year: '2024',
    name: 'CSRD',
    status: 'In Force',
    body: '~50,000 companies operating in the EU are now required to report sustainability data under ESRS standards. Non-compliance carries legal liability.',
  },
  {
    year: '2025',
    name: 'EU Taxonomy',
    status: 'Mandatory Disclosure',
    body: 'Determines which economic activities qualify as sustainable for regulated institutional investment. Alignment requires measurement, not declaration.',
  },
  {
    year: '2026',
    name: 'CBAM',
    status: 'Pricing Mechanism',
    body: 'Goods imported into the EU face carbon pricing based on embedded emissions. Companies that can demonstrate performance gain advantage — those that cannot pay a tariff.',
  },
];

export default function Momentum() {
  return (
    <section className="momentum" id="momentum">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="momentum-inner">
        <span className="section-label">§ 06 — Regulatory Inevitability</span>
        <h2 className="momentum-headline display">
          Three instruments. One direction.
        </h2>
        <p className="momentum-sub">
          The argument is not that companies should want this score. The argument is that
          they will need it.
        </p>
        <div className="momentum-grid" id="momentum-grid">
          {ITEMS.map((item) => (
            <div className="momentum-item" key={item.name}>
              <div className="momentum-year mono">{item.year}</div>
              <div className="momentum-name display">{item.name}</div>
              <div className="momentum-status mono">{item.status}</div>
              <p className="momentum-body">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="momentum-close">
          <em>Together, they make one thing inevitable.</em>
        </p>
      </div>
    </section>
  );
}
