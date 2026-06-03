'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.05 : 50;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} id="site-nav">
      <a href="/" className="nav-logo">Validex.</a>
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
