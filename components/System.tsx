const COMPONENTS = [
  { id: 'E1', name: 'Emissions' },
  { id: 'E2', name: 'Supply Chain' },
  { id: 'E3', name: 'Lifecycle' },
  { id: 'E4', name: 'Circularity' },
  { id: 'E5', name: 'Certification' },
  { id: 'S1–4', name: 'Social & Labour' },
  { id: 'G1', name: 'Governance' },
];

export default function System() {
  return (
    <section className="system-section" id="system">
      <div className="system-inner">
        <span className="section-label">The System</span>
        <h2 className="system-headline">
          A $35 Trillion Market<br />With No Unit of Account.
        </h2>
        <p className="system-sub">
          Validex decomposes sustainability into seven independently
          scoreable components, assessed against ESRS standards,
          and converts the result into a single verifiable grade.
        </p>
        <div className="system-grid">
          {COMPONENTS.map((c) => (
            <div className="system-item" key={c.id}>
              <div className="system-item-id">{c.id}</div>
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
