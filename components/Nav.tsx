'use client';

import { useEffect, useRef, useState } from 'react';

const CTA_VARIANTS = ['REQUEST ACCESS', 'EXEC ACCESS', 'INIT ACCESS', 'REQUEST ACCESS'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [ctaText, setCtaText] = useState('REQUEST ACCESS');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleMouseEnter() {
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setCtaText(CTA_VARIANTS[i % CTA_VARIANTS.length]);
      if (i >= CTA_VARIANTS.length - 1) {
        clearInterval(timerRef.current!);
        setCtaText('REQUEST ACCESS');
      }
    }, 100);
  }

  function handleMouseLeave() {
    if (timerRef.current) clearInterval(timerRef.current);
    setCtaText('REQUEST ACCESS');
  }

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} id="site-nav">
      <a href="#hero" className="nav-logo mono">
        Validex<span className="nav-dot">.</span>
      </a>
      <a
        href="#access"
        className="nav-cta mono"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {ctaText}
      </a>
    </nav>
  );
}
