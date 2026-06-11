const COMPONENTS = [
  { id: 'E1', lines: ['Emissions &', 'Climate'] },
  { id: 'E2', lines: ['Water Use'] },
  { id: 'E3', lines: ['Waste &', 'Circularity'] },
  { id: 'E4', lines: ['Biodiversity &', 'Ecosystems'] },
  { id: 'E5', lines: ['Energy Use'] },
  { id: 'E6', lines: ['Supply Chain'] },
  { id: 'E7', lines: ['Pollution &', 'Chemicals'] },
  { id: 'E8', lines: ['Land Use'] },
  { id: 'E9', lines: ['Materials &', 'Resource'] },
  { id: 'E10', lines: ['Lifecycle', 'Assessment'] },
];

const CX = 300;
const CY = 300;
const R = 168;
const NODE_R = 17;
const CENTER_R = 44;
const LABEL_GAP = 14;

const nodes = COMPONENTS.map((comp, i) => {
  const angle = (i / COMPONENTS.length) * 2 * Math.PI - Math.PI / 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  // Name sits radially outside its node; anchor follows the side of the circle
  const lx = CX + (R + NODE_R + LABEL_GAP) * cos;
  const ly = CY + (R + NODE_R + LABEL_GAP) * sin;
  const anchor: 'start' | 'middle' | 'end' =
    cos > 0.35 ? 'start' : cos < -0.35 ? 'end' : 'middle';
  return {
    ...comp,
    x: CX + R * cos,
    y: CY + R * sin,
    lx,
    ly,
    anchor,
  };
});

export default function System() {
  return (
    <section className="system-section" id="system" data-field="#1A4D33">
      <div className="system-inner">
        <span className="system-eyebrow reveal">The System</span>
        <h2 className="system-headline reveal">Ten components. One verifiable grade.</h2>
        <p className="system-sub reveal">
          Validex decomposes environmental performance into ten independently
          scoreable components, each assessed against ESRS standards and
          aggregated into a single verifiable grade.
        </p>

        <div className="system-diagram reveal">
          <svg viewBox="0 0 600 600" aria-label="Validex scoring system — ten environmental components feeding one score">
            {/* Connector lines from center to each node */}
            {nodes.map((node, i) => (
              <line
                key={`line-${i}`}
                className="diagram-line"
                x1={CX}
                y1={CY}
                x2={node.x}
                y2={node.y}
              />
            ))}

            {/* Component nodes — id inside, name radially outside */}
            {nodes.map((node, i) => (
              <g key={`node-${i}`} className="diagram-node">
                <circle
                  className="diagram-node-circle"
                  cx={node.x}
                  cy={node.y}
                  r={NODE_R}
                />
                <text
                  className="diagram-label diagram-id-label"
                  x={node.x}
                  y={node.y}
                >
                  {node.id}
                </text>
                <text
                  className="diagram-label diagram-name-label"
                  x={node.lx}
                  y={node.ly - (node.lines.length - 1) * 6}
                  style={{ textAnchor: node.anchor }}
                >
                  {node.lines.map((ln, j) => (
                    <tspan key={j} x={node.lx} dy={j === 0 ? 0 : 12}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              </g>
            ))}

            {/* Center node */}
            <g className="diagram-node" style={{ opacity: 1, transform: 'none' }}>
              <circle
                className="diagram-center-circle"
                cx={CX}
                cy={CY}
                r={CENTER_R}
              />
              <text
                className="diagram-label diagram-center-label"
                x={CX}
                y={CY - 7}
              >
                VALIDEX
              </text>
              <text
                className="diagram-label diagram-center-label"
                x={CX}
                y={CY + 7}
              >
                SCORE
              </text>
            </g>
          </svg>
        </div>

        <p className="system-footnote reveal">
          Environmental first — hard physical units. Social &amp; governance components follow.
        </p>
      </div>
    </section>
  );
}
