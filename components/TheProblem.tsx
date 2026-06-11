const QUOTE =
  'Not a market inefficiency. A market deliberately left without a measurement system — because measurement would expose how little most of it does.';

export default function TheProblem() {
  return (
    <section className="problem-section surface-forest" id="problem" data-field="#0A130D">
      <span className="problem-eyebrow reveal">The Market Failure</span>
      <div className="problem-grid">

        {/* LEFT — stat number + caption */}
        <div className="problem-left">
          <div className="problem-number-wrap">
            <span className="problem-stat" id="problem-counter">0</span>
            <span className="problem-pct">%</span>
            {/* Scan rule — sweeps the digits once the count completes */}
            <span className="problem-scan" id="problem-scan" aria-hidden="true" />
          </div>
          <p className="problem-caption reveal">
            of sustainability reports rely on self-reported data with no
            independent verification of actual outcomes. — Harvard Business School, 2023
          </p>
        </div>

        {/* RIGHT — pull-quote, revealed word by word on scroll */}
        <div className="problem-right">
          <blockquote className="problem-pull" aria-label={QUOTE}>
            {QUOTE.split(' ').map((word, i) => (
              <span key={i} className="pq-word" aria-hidden="true">
                {word}&nbsp;
              </span>
            ))}
          </blockquote>
        </div>

      </div>
    </section>
  );
}
