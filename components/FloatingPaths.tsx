// Thin flowing paths drifting slowly behind the application form.
// Deterministic geometry; CSS keyframes drive the drift (transform only).
const PATHS = Array.from({ length: 15 }, (_, i) => {
  const y = 40 + i * 52;
  const amp = 36 + (i % 5) * 20;
  const lean = (i % 3) * 60;
  return `M -120 ${y} C ${300 + lean} ${y - amp}, ${760 - lean} ${y + amp}, 1560 ${y - amp / 2}`;
});

const FOREST_INDEX = 7; // exactly one forest path

export default function FloatingPaths() {
  return (
    <svg
      className="floating-paths"
      viewBox="0 0 1440 840"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          className={i === FOREST_INDEX ? 'fp fp-forest' : 'fp'}
          style={{
            animationDuration: `${26 + (i % 5) * 7}s`,
            animationDelay: `${-i * 2.3}s`,
          }}
        />
      ))}
    </svg>
  );
}
