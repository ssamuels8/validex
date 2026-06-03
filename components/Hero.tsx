import HeroSceneLoader from './HeroSceneLoader';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="grain-overlay" aria-hidden="true" />

      {/* 3D scene fills the background */}
      <div className="hero-scene-wrap" aria-hidden="true">
        <HeroSceneLoader />
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow-top mono">
          Sustainability Measurement Infrastructure
        </span>
        <h1 className="hero-headline display">
          <span className="hero-line">
            <span className="word-outer"><span className="word-inner">The</span></span>{' '}
            <span className="word-outer"><span className="word-inner">market</span></span>{' '}
            <span className="word-outer"><span className="word-inner">has</span></span>{' '}
            <span className="word-outer"><span className="word-inner">$35</span></span>
          </span>
          <span className="hero-line">
            <span className="word-outer"><span className="word-inner">trillion</span></span>{' '}
            <span className="word-outer"><span className="word-inner">in</span></span>{' '}
            <span className="word-outer"><span className="word-inner">answers.</span></span>
          </span>
          <span className="hero-line">
            <span className="word-outer"><span className="word-inner">None</span></span>{' '}
            <span className="word-outer"><span className="word-inner">of</span></span>{' '}
            <span className="word-outer"><span className="word-inner">it</span></span>{' '}
            <span className="word-outer"><span className="word-inner">is</span></span>{' '}
            <span className="word-outer"><span className="word-inner"><em>verified.</em></span></span>
          </span>
        </h1>
        <p className="hero-sub">
          Validex is building the measurement system that should have existed from the start.
        </p>
      </div>

      <div className="hero-bottom">
        <div className="scroll-indicator" aria-hidden="true">
          <span className="scroll-label mono">Scroll</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
