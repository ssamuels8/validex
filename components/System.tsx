// The taxonomy instrument — exact component names from the scoring platform.
const COMPONENTS = [
  { id: 'E1', name: 'Emissions & Climate Impact', unit: 'tCO₂e', lines: ['Emissions &', 'Climate Impact'] },
  { id: 'E2', name: 'Energy Use & Efficiency', unit: 'kWh', lines: ['Energy Use &', 'Efficiency'] },
  { id: 'E3', name: 'Water Use & Stewardship', unit: 'm³', lines: ['Water Use &', 'Stewardship'] },
  { id: 'E4', name: 'Waste & Circularity', unit: 'tonnes', lines: ['Waste &', 'Circularity'] },
  { id: 'E5', name: 'Lifecycle Assessment', unit: 'kgCO₂e / unit', lines: ['Lifecycle', 'Assessment'] },
  { id: 'E6', name: 'Supply Chain Traceability', unit: '% traced', lines: ['Supply Chain', 'Traceability'] },
  { id: 'E7', name: 'Materials & Resource Use', unit: 'tonnes', lines: ['Materials &', 'Resource Use'] },
  { id: 'E8', name: 'Biodiversity & Ecosystems', unit: 'ha', lines: ['Biodiversity &', 'Ecosystems'] },
  { id: 'E9', name: 'Pollution & Chemicals', unit: 'kg', lines: ['Pollution &', 'Chemicals'] },
  { id: 'E10', name: 'Land Use & Deforestation', unit: 'ha', lines: ['Land Use &', 'Deforestation'] },
];

const CX = 320;
const CY = 320;
const R = 208;
const NODE_R = 22;

const nodes = COMPONENTS.map((comp, i) => {
  const angle = (i / COMPONENTS.length) * 2 * Math.PI - Math.PI / 2;
  return {
    ...comp,
    x: CX + R * Math.cos(angle),
    y: CY + R * Math.sin(angle),
  };
});

export default function System() {
  return (
    <section className="system-section surface-forest" id="system" data-field="#1A4D33">
      <div className="system-cols">

        {/* LEFT — cream on green */}
        <div className="system-left">
          <span className="system-eyebrow reveal">Component Taxonomy</span>
          <h2 className="system-headline reveal">Ten components. One verifiable grade.</h2>
          <p className="system-sub reveal">
            Validex decomposes environmental performance into ten independently
            scoreable components, each assessed against ESRS standards and
            aggregated into a single verifiable grade.
          </p>
          <p className="system-footnote reveal">
            Environmental first — hard physical units.
          </p>
        </div>

        {/* RIGHT — the instrument (rotation/hover/lock logic in SiteScripts) */}
        <div className="system-right reveal">
          <div className="taxo-wrap">
            <svg
              id="taxo-svg"
              viewBox="0 0 640 640"
              aria-label="Validex component taxonomy — ten environmental components feeding one score"
            >
              <g id="taxo-ring">
                {nodes.map((n, i) => (
                  <line
                    key={`spoke-${i}`}
                    className="taxo-spoke"
                    x1={CX}
                    y1={CY}
                    x2={n.x}
                    y2={n.y}
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
                      <text className="taxo-node-label" y={NODE_R + 16}>
                        {n.lines.map((ln, j) => (
                          <tspan key={j} x="0" dy={j === 0 ? 0 : 11}>{ln}</tspan>
                        ))}
                      </text>
                      {/* Hover chip — full name + illustrative unit */}
                      <g className="taxo-chip" aria-hidden="true">
                        <rect x="-86" y="-80" width="172" height="42" rx="5" />
                        <text className="taxo-chip-name" y="-63">{n.name}</text>
                        <text className="taxo-chip-unit" y="-49">{n.unit}</text>
                      </g>
                    </g>
                  </g>
                ))}
              </g>

              {/* Center disc — does not rotate */}
              <g id="taxo-center">
                <circle className="taxo-center-circle" cx={CX} cy={CY} r="64" />
                <text className="taxo-center-label" x={CX} y={CY - 8}>VALIDEX</text>
                <text className="taxo-center-label" x={CX} y={CY + 10}>SCORE</text>
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
