export default function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="problem-grid">
        <div className="problem-stat">
          <div className="stat-number display">
            <span id="stat-counter" data-target="85">—</span>
            <span className="stat-pct display">%</span>
          </div>
          <div className="stat-rule" />
          <p className="stat-attr mono">
            of sustainability reports rely on self-reported data with no independent
            verification of actual outcomes.
            <span className="stat-source">Harvard Business School, 2023</span>
            <span className="stat-source" style={{ marginTop: '0.4rem' }}>
              OECD, February 2025: 68% of ESG rating inputs are self-reported policies —
              not outcomes, not impact, not measurable change.
            </span>
          </p>
        </div>
        <div className="problem-right">
          <span className="section-label light">§ 02 — The Market Failure</span>
          <h2 className="problem-headline display">
            <em>The feedback loop has no ground truth.</em>
          </h2>
          <div className="problem-text">
            <p>
              Companies don&apos;t report what they&apos;ve changed. They report what
              they&apos;ve committed to, what policies they&apos;ve written, what targets
              they&apos;ve set. The capital follows the narrative, not the outcome.
            </p>
            <p>
              The result is a $35 trillion market operating without a unit of account.
              Capital is allocated on the basis of declarations. Procurement decisions are
              made on the basis of PDFs. Regulatory compliance is managed with spreadsheets
              that no one outside the company has verified.
            </p>
            <blockquote className="pull-quote">
              This is not a market inefficiency. It is a market deliberately left without a
              measurement system — because a measurement system would reveal how little most
              of it is actually doing.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
