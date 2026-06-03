'use client';

import HeroSceneLoader from './HeroSceneLoader';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <span className="hero-pill">Sustainability Measurement Infrastructure</span>

      <h1 className="hero-headline">Proof, Not Promise.</h1>

      <p className="hero-sub">
        Validex is the independent measurement infrastructure that turns
        sustainability claims into a verifiable score. Anchored to ESRS.
        Built for the sceptic.
      </p>

      <a href="mailto:hello@validex.com" className="hero-btn">
        Get in touch ↗
      </a>

      {/* 3D object — drag to spin */}
      <div className="hero-image-block">
        <div className="hero-3d-wrap">
          <HeroSceneLoader />
        </div>
      </div>

      <p className="hero-scroll">↓ Scroll</p>
    </section>
  );
}
