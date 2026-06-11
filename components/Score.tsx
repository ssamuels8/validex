const BARS = [
  { name: 'EMISSIONS & CLIMATE', pct: 82, grade: 'A' },
  { name: 'SUPPLY CHAIN',        pct: 74, grade: 'B' },
  { name: 'LIFECYCLE',           pct: 68, grade: 'B' },
  { name: 'WASTE & CIRCULARITY', pct: 71, grade: 'B' },
  { name: 'ENERGY USE',          pct: 89, grade: 'A' },
];

export default function Score() {
  return (
    <section className="score surface-ink" id="score" data-field="#15130E">
      <div className="score-inner">
        <div className="score-cols">
          <div className="score-left">
            <span className="score-eyebrow score-fade-up">THE SCORE</span>
            <h2 className="score-headline score-fade-up">This is what verification looks like.</h2>
            <p className="score-sub score-fade-up">Two grades. Both always disclosed. Neither can be hidden.</p>
            <p className="score-disclaimer score-fade-up">Score is illustrative. Actual scores issued under formal data agreement.</p>
          </div>

          <div className="score-right">
            <div className="score-depth-panel" aria-hidden="true" />
            <div className="scorecard-wrapper" id="scorecard-wrapper">
              <svg className="scorecard-svg-border" aria-hidden="true" id="scorecard-svg">
                <rect
                  className="border-rect"
                  id="border-rect"
                  x="0" y="0"
                  width="100%" height="100%"
                  rx="22" ry="22"
                  fill="none"
                  stroke="rgba(248,246,241,0.15)"
                  strokeWidth="1"
                />
              </svg>

              <div className="scorecard" id="scorecard">
                <div className="scorecard-head sc-reveal" data-delay="100">
                  <span>Validex — Verified Score</span>
                  <span>Q2 · 2025</span>
                </div>
                <div className="scorecard-body">
                  <div className="sc-company sc-reveal" data-delay="200">
                    <div className="company-name">Illustrative Company GmbH</div>
                    <div className="company-sector">Industrial Manufacturing · EU · ESRS-Aligned</div>
                  </div>
                  <div className="sc-grades">
                    <div
                      className="grade-box sc-reveal"
                      data-delay="300"
                      data-tip="Above threshold. Below sector leader."
                    >
                      <div className="grade-label">Absolute Grade</div>
                      <div className="grade-letter" style={{ opacity: 0 }}>B</div>
                      <div className="grade-meta">Full universe</div>
                      <div className="grade-meta">2,847 companies</div>
                    </div>
                    <div
                      className="grade-box sc-reveal"
                      data-delay="450"
                      data-tip="Ranked 1st in Industrial Manufacturing sector."
                    >
                      <div className="grade-label">Sector-Relative</div>
                      <div className="grade-letter accent" style={{ opacity: 0 }}>A</div>
                      <div className="grade-meta">Rank: 1 / 112</div>
                      <div className="grade-meta">Industrial sector</div>
                    </div>
                  </div>
                  <div className="sc-components">
                    {BARS.map((b, i) => (
                      <div
                        className="sc-component-row sc-reveal"
                        key={b.name}
                        data-delay={String(600 + i * 100)}
                      >
                        <span className="sc-comp-name">{b.name}</span>
                        <div className="sc-bar-track">
                          <div className="sc-bar-fill" data-width={String(b.pct)} />
                        </div>
                        <span className="sc-comp-pct">{b.pct}%</span>
                        <span className="sc-comp-grade">{b.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="scorecard-foot sc-reveal" data-delay="1100">
                  <span>ESRS · EU TAXONOMY ALIGNED</span>
                  <span className="sc-verified">INDEPENDENTLY VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
