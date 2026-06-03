const COMPONENTS = [
  {
    id: 'E1',
    name: 'Emissions',
    detail:
      'Verified greenhouse gas output: Scope 1 (direct), Scope 2 (energy), Scope 3 (value chain). We do not accept self-reported figures — every number is traced to primary data or a third-party verified source.',
  },
  {
    id: 'E2',
    name: 'Supply Chain',
    detail:
      'Upstream sustainability performance of direct and indirect suppliers. We work from supplier-level data, not declarations, and map to the actual procurement structure of the scored entity.',
  },
  {
    id: 'E3',
    name: 'Lifecycle',
    detail:
      'End-of-life, circularity, and product-level environmental footprint from manufacture to disposal. Lifecycle assessment methodology aligned to ISO 14040/14044.',
  },
  {
    id: 'E4',
    name: 'Circularity',
    detail:
      'Material recovery and reuse rates across operations. We measure what is actually recovered, reused, and recirculated — not what a company intends to do.',
  },
  {
    id: 'E5',
    name: 'Certification',
    detail:
      'Third-party verified standard compliance. Audit records, not self-declarations. We verify certification status, audit frequency, findings, and scope.',
  },
  {
    id: 'S1–4',
    name: 'Social & Labour',
    detail:
      'Wages, working conditions, freedom of association, supply chain labour standards. Verified against ILO conventions and sector-specific benchmarks.',
  },
  {
    id: 'G1',
    name: 'Governance',
    detail:
      'Oversight structures, accountability mechanisms, and the quality of sustainability governance within the entity. Assessed against ESRS G1 requirements.',
  },
];

export default function System() {
  return (
    <section className="system" id="system">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="system-inner">
        <span className="section-label">§ 04 — The System</span>
        <h2 className="system-headline display">
          The solution is measurement.
        </h2>
        <p className="system-intro">
          Sustainability is not one thing — it is carbon, water, waste, pollution,
          biodiversity, and the social and governance conditions under which a company
          operates. We assess each component against standards already legally codified
          in European law and convert the result into a quantifiable unit.
        </p>
        <p className="system-intro">
          The output is a letter grade, A to E. The same logic that made NutriScore work:
          complex data into the simplest possible signal, understood at a glance.
        </p>
        <blockquote className="system-quote">
          The system works only because it is independent. It sits outside the industry
          it measures, is not funded by the companies it scores, and is not influenced
          by the capital that flows around it.
        </blockquote>

        <div className="components-list" id="system-components">
          {COMPONENTS.map((c) => (
            <div className="component-row" key={c.id} data-id={c.id}>
              <div className="component-row-header">
                <span className="component-index mono">{c.id}</span>
                <span className="component-name">{c.name}</span>
                <span className="component-toggle mono" aria-label="expand">+</span>
              </div>
              <div className="component-detail">
                <p>{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="components-footer mono">
          No component compensates for another below minimum threshold.
        </p>
      </div>
    </section>
  );
}
