'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} id="site-nav">
      <a href="/" className="nav-logo">
        Validex<span className="nav-dot">.</span>
      </a>
      <a href="mailto:hello@validex.com" className="nav-cta">
        Contact →
      </a>
    </nav>
  );
}
