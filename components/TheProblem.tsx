export default function TheProblem() {
  return (
    <section className="problem-section" id="problem">
      <span className="problem-eyebrow reveal">The Market Failure</span>
      <div className="problem-grid">

        {/* LEFT — stat number + caption */}
        <div className="problem-left">
          <div className="problem-number-wrap">
            <span className="problem-stat" id="problem-counter">0</span>
            <span className="problem-pct">%</span>
          </div>
          <p className="problem-caption reveal">
            of sustainability reports rely on self-reported data with no
            independent verification of actual outcomes. — Harvard Business School, 2023
          </p>
        </div>

        {/* RIGHT — pull-quote with moss rule */}
        <div className="problem-right">
          <blockquote className="problem-pull">
            Not a market inefficiency. A market deliberately left without a
            measurement system — because measurement would expose how little
            most of it does.
          </blockquote>
        </div>

      </div>
    </section>
  );
}
