const INDEX_LINKS = [
  { label: 'Who we are', href: '/#who-we-are' },
  { label: 'The failure', href: '/#problem' },
  { label: 'How it’s built', href: '/#supply-chain' },
  { label: 'The system', href: '/#system' },
  { label: 'The score', href: '/#score' },
  { label: 'Case studies', href: '/#case-studies' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Imprint', href: '/imprint' },
];

export default function Footer() {
  return (
    <footer className="site-footer" data-field="#15130E">
      {/* The finale — outlined wordmark; fills to solid cream as it enters */}
      <div className="footer-wordmark-wrap" aria-hidden="true">
        <span className="footer-wordmark">Validex.</span>
        <span className="footer-wordmark footer-wordmark-fill" id="footer-wordmark-fill">Validex.</span>
      </div>

      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <a href="/" className="footer-logo">Validex.</a>
          <p className="footer-blurb">
            The independent measurement layer for sustainability.
          </p>
        </div>

        <nav className="footer-col" aria-label="Index">
          <span className="footer-col-label">Index</span>
          <ul className="footer-list">
            {INDEX_LINKS.map((l) => (
              <li key={l.href}><a className="footer-link" href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <span className="footer-col-label">Legal</span>
          <ul className="footer-list">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}><a className="footer-link" href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <span className="footer-col-label">Contact</span>
          <ul className="footer-list">
            <li><span className="footer-line">The Hague, NL</span></li>
            <li><a className="footer-link" href="/apply">Apply for the pilot →</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-meta">
        <span className="footer-copy">© 2026 Validex · The Hague · All rights reserved</span>
        <span className="footer-copy">ESRS · EU TAXONOMY ALIGNED</span>
      </div>
    </footer>
  );
}
