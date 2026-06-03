const NAV_LINKS = [
  { label: 'Who We Are',    href: '#who-we-are'   },
  { label: 'Case Studies',  href: '#case-studies' },
  { label: 'The System',    href: '#system'       },
  { label: 'The Score',     href: '#score'        },
  { label: 'Contact',       href: '#contact'      },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-wordmark condensed">
            Validex<span>.</span>
          </div>
          <p className="footer-tagline">
            The independent measurement layer for sustainability. Anchored to
            ESRS. Built for the sceptic.
          </p>
        </div>
        <div>
          <div className="footer-col-heading condensed">Navigate</div>
          <nav className="footer-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="footer-link">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <div className="footer-col-heading condensed">Contact</div>
          <div className="footer-contact-item">
            <a href="mailto:hello@validex.com" className="footer-link">
              hello@validex.com
            </a>
          </div>
          <div className="footer-contact-item" style={{ marginTop: '0.6rem' }}>
            The Hague, Netherlands
          </div>
          <div
            className="footer-contact-item"
            style={{ marginTop: '0.4rem', opacity: 0.5 }}
          >
            Pre-launch · Est. 2025
          </div>
        </div>
      </div>
      <div className="footer-bar">
        <span className="footer-copy condensed">
          © {year} Validex — All rights reserved.
        </span>
        <span className="footer-aligned condensed">
          ESRS · CSRD · EU TAXONOMY ALIGNED
        </span>
      </div>
    </footer>
  );
}
