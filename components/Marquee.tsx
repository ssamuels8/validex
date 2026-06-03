const ITEMS = [
  'ESRS', 'CSRD', 'EU TAXONOMY', 'CBAM', 'GRI', 'ISSB', 'TCFD', 'SBTi',
  'EU TAXONOMY', 'INDEPENDENTLY VERIFIED',
];

function MarqueeSet() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="marquee-item mono">
          {item}
          <span className="marquee-sep" aria-hidden="true"> / </span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track-outer">
        <div className="marquee-track">
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>
    </div>
  );
}
