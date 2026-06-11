// The taxonomy diagram — static, geometric, computed. No rotation.
const COMPONENTS = [
  { id: 'E1', name: 'Emissions & Climate Impact', unit: 'tCO\u2082e', lines: ['Emissions &', 'Climate Impact'] },
  { id: 'E2', name: 'Energy Use & Efficiency', unit: 'kWh', lines: ['Energy Use &', 'Efficiency'] },
  { id: 'E3', name: 'Water Use & Stewardship', unit: 'm\u00B3', lines: ['Water Use &', 'Stewardship'] },
  { id: 'E4', name: 'Waste & Circularity', unit: 'tonnes', lines: ['Waste &', 'Circularity'] },
  { id: 'E5', name: 'Lifecycle Assessment', unit: 'kgCO\u2082e / unit', lines: ['Lifecycle', 'Assessment'] },
  { id: 'E6', name: 'Supply Chain Traceability', unit: '% traced', lines: ['Supply Chain', 'Traceability'] },
  { id: 'E7', name: 'Materials & Resource Use', unit: 'tonnes', lines: ['Materials &', 'Resource Use'] },
  { id: 'E8', name: 'Biodiversity & Ecosystems', unit: 'ha', lines: ['Biodiversity &', 'Ecosystems'] },
  { id: 'E9', name: 'Pollution & Chemicals', unit: 'kg', lines: ['Pollution &', 'Chemicals'] },
  { id: 'E10', name: 'Land Use & Deforestation', unit: 'ha', lines: ['Land Use &', 'Deforestation'] },
];

const C = 450;        // center of the 900x900 box
const DISC_R = 105;   // center disc
const R = 290;        // node ring
const NODE_R = 34;
const LABEL_OFF = 56; // name sits this far beyond the node edge

const nodes = COMPONENTS.map((comp, i) => {
  const angle = (i / COMPONENTS.length) * 2 * Math.PI - Math.PI / 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    ...comp,
    x: C + R * cos,
    y: C + R * sin,
    // Spoke: disc edge -> node edge, always touching both
    sx1: C + DISC_R * cos,
    sy1: C + DISC_R * sin,
    sx2: C + (R - NODE_R) * cos,
    sy2: C + (R - NODE_R) * sin,
    // Name label: a further LABEL_OFF along the same angle (group-relative)
    ldx: (NODE_R + LABEL_OFF) * cos,
    ldy: (NODE_R + LABEL_OFF) * sin,
  };
});

export default function System() {
  return (
    <section className="system-section surface-forest" id="system" data-field="#0A130D">
      <div className="system-cols">

        {/* LEFT - cream on the dark field */}
        <div className="system-left">
          <span className="system-eyebrow reveal">Component Taxonomy</span>
          <h2 className="system-headline reveal">Ten components. One verifiable grade.</h2>
          <p className="system-sub reveal">
            Validex decomposes environmental performance into ten independently
            scoreable components, each assessed against ESRS standards and
            aggregated into a single verifiable grade.
          </p>
          <p className="system-footnote reveal">
            Environmental first &mdash; hard physical units.
          </p>
        </div>

        {/* RIGHT - the diagram (entrance/hover/lock in SiteScripts; idle is still) */}
        <div className="system-right reveal">
          <div className="taxo-wrap">
            <svg
              id="taxo-svg"
              viewBox="0 0 900 900"
              aria-label="Validex component taxonomy - ten environmental components feeding one score"
            >
              {nodes.map((n, i) => (
                <line
                  key={`spoke-${i}`}
                  className="taxo-spoke"
                  x1={n.sx1}
                  y1={n.sy1}
                  x2={n.sx2}
                  y2={n.sy2}
                  pathLength={1}
                />
              ))}

              {nodes.map((n, i) => (
                <g
                  key={n.id}
                  className="taxo-node"
                  data-i={i}
                  data-name={n.name}
                  data-unit={n.unit}
                  transform={`translate(${n.x}, ${n.y})`}
                >
                  <g className="taxo-node-inner">
                    <circle className="taxo-node-circle" r={NODE_R} />
                    <text className="taxo-node-id" y="0">{n.id}</text>
                  </g>
                  <text
                    className="taxo-name"
                    x={n.ldx}
                    y={n.ldy - (n.lines.length - 1) * 8}
                  >
                    {n.lines.map((ln, j) => (
                      <tspan key={j} x={n.ldx} dy={j === 0 ? 0 : '1.2em'}>{ln}</tspan>
                    ))}
                  </text>
                </g>
              ))}

              {/* Center disc */}
              <g id="taxo-center">
                <circle className="taxo-center-circle" cx={C} cy={C} r={DISC_R} />
                <text className="taxo-center-label" x={C} y={C - 10}>VALIDEX</text>
                <text className="taxo-center-label" x={C} y={C + 14}>SCORE</text>
              </g>
            </svg>

            {/* Lock detail strip */}
            <p className="taxo-detail" id="taxo-detail" aria-live="polite"></p>
          </div>
        </div>

      </div>
    </section>
  );
}
