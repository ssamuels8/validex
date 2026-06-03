const CASES = [
  {
    slug: 'volkswagen',
    company: 'Volkswagen',
    claim: 'Rated AA.',
    reality: '11 million cars cheating emissions.',
    context: 'DJSI ranked them first among global automakers. 11 million defeat devices were already installed.',
    tag: '→ EMISSIONS',
  },
  {
    slug: 'dws',
    company: 'DWS',
    claim: '€900bn \'ESG\'.',
    reality: 'Raided for greenwashing.',
    context: 'Own sustainability chief became a whistleblower. $19M SEC penalty followed.',
    tag: '→ CERTIFICATION',
  },
  {
    slug: 'sfdr',
    company: 'Boohoo',
    claim: 'Top-rated supply chain.',
    reality: 'Wages below legal minimum.',
    context: 'Supply chain scored highly on every ESG platform. Leicester supplier paid £3.50/hour.',
    tag: '→ SUPPLY CHAIN',
  },
  {
    slug: 'sfdr',
    company: 'SFDR Article 9',
    claim: 'Darkest-green funds.',
    reality: '350+ quietly downgraded.',
    context: 'Billions flowed in on the label. Regulators clarified the standard. One quarter, mass reclassification.',
    tag: '→ REGULATION',
  },
  {
    slug: 'verra',
    company: 'Verra',
    claim: 'Certified carbon offset.',
    reality: '~90% phantom credits.',
    context: 'REDD+ credits certified. Investigation found no real avoided emissions behind them.',
    tag: '→ CARBON MARKETS',
  },
  {
    slug: 'msci-mirage',
    company: 'MSCI',
    claim: 'ESG rating leader.',
    reality: '0.5 correlation between raters.',
    context: 'The same company, rated wildly differently by every major agency. No agreed standard exists.',
    tag: '→ RATINGS',
  },
];

export default function CaseStudies() {
  return (
    <section className="cs-section" id="case-studies">
      <div className="cs-track" id="cs-track">
        {CASES.map((c, i) => (
          <div className="cs-panel" key={c.slug + i}>
            <div className="cs-panel-inner">
              <span className="cs-idx">0{i + 1} — 06</span>
              <div className="cs-company">{c.company}</div>
              <div className="cs-claim">{c.claim}</div>
              <div className="cs-reality">{c.reality}</div>
              <p className="cs-context">{c.context}</p>
              <span className="cs-tag">{c.tag}</span>
              <a href={`/case-studies/${c.slug}`} className="cs-link">
                Read case study →
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="cs-progress-bar">
        <div className="cs-progress-fill" id="cs-progress-fill" />
      </div>
    </section>
  );
}
