const COMPONENTS = [
  { id: 'E1', name: 'Emissions' },
  { id: 'E2', name: 'Supply Chain' },
  { id: 'E3', name: 'Lifecycle' },
  { id: 'E4', name: 'Circularity' },
  { id: 'E5', name: 'Certification' },
  { id: 'S1', name: 'Labour' },
  { id: 'S2', name: 'Communities' },
  { id: 'S3', name: 'Consumers' },
  { id: 'S4', name: 'Conduct' },
  { id: 'G1', name: 'Governance' },
];

const CX = 300;
const CY = 300;
const R = 180;
const NODE_R = 28;
const CENTER_R = 44;

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
    <section className="system-section" id="system">
      <div className="system-inner">
        <span className="system-eyebrow reveal">The System</span>
        <h2 className="system-headline reveal">Ten components. One verifiable grade.</h2>
        <p className="system-sub reveal">
          Validex decomposes sustainability into ten independently scoreable
          components, assessed against ESRS standards, and converts the result
          into a single verifiable grade.
        </p>

        <div className="system-diagram reveal">
          <svg viewBox="0 0 600 600" aria-label="Validex scoring system diagram">
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

            {/* Component nodes */}
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
                  y={node.y - 8}
                >
                  {node.id}
                </text>
                <text
                  className="diagram-label"
                  x={node.x}
                  y={node.y + 8}
                >
                  {node.name}
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
      </div>
    </section>
  );
}
