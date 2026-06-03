'use client';

export default function Nav() {
  return (
    <nav className="site-nav" id="site-nav">
      <a href="/" className="nav-logo">
        Validex<span className="nav-dot">.</span>
      </a>
      <a
        href="mailto:hello@validex.com"
        className="nav-pill-cta"
        id="nav-pill-cta"
      >
        Get In Touch ↗
      </a>
    </nav>
  );
}
