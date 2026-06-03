const CASES = [
  {
    slug: 'volkswagen',
    company: 'Volkswagen',
    category: 'EMISSIONS',
    claim: 'Rated AA.',
    reality: '11 million cars cheating.',
  },
  {
    slug: 'dws',
    company: 'DWS',
    category: 'DISCLOSURE',
    claim: '€900bn ESG AUM.',
    reality: 'Raided for greenwashing.',
  },
  {
    slug: 'boohoo',
    company: 'Boohoo',
    category: 'SUPPLY CHAIN',
    claim: 'Top-rated supply chain.',
    reality: '£3.50/hour wages.',
  },
  {
    slug: 'sfdr',
    company: 'SFDR Article 9',
    category: 'REGULATION',
    claim: 'Darkest-green funds.',
    reality: '350+ downgraded.',
  },
  {
    slug: 'verra',
    company: 'Verra',
    category: 'CARBON MARKETS',
    claim: 'Certified offsets.',
    reality: '~90% phantom.',
  },
  {
    slug: 'msci',
    company: 'MSCI',
    category: 'RATINGS',
    claim: 'ESG rating leader.',
    reality: '0.5 correlation between raters.',
  },
  {
    slug: 'defence',
    company: 'BAE Systems',
    category: 'DEFENCE',
    claim: 'Excluded as a sin stock.',
    reality: 'ESG-approved after 2022.',
  },
];

export default function CaseStudies() {
  return (
    <section className="cs-grid-section" id="case-studies">
      <div className="cs-grid-inner">
        <header className="cs-grid-header reveal">
          <span className="cs-grid-eyebrow">§ 02 — When The Score Lied</span>
          <h2 className="cs-grid-heading">
            Seven times the label said one thing. The truth said another.
          </h2>
        </header>
        <div className="cs-grid">
          {CASES.map((c, i) => (
            <a
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="cs-card reveal"
            >
              <div className="cs-card-top">
                <span className="cs-card-idx">0{i + 1}</span>
                <span className="cs-card-cat">{c.category}</span>
              </div>
              <div className="cs-card-mid">
                <div className="cs-card-company">{c.company}</div>
                <div className="cs-card-claim">&ldquo;{c.claim}&rdquo;</div>
                <div className="cs-card-reality">{c.reality}</div>
              </div>
              <div className="cs-card-bot">
                <span className="cs-card-link">Read case study →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
