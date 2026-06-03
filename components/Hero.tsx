import HeroSceneLoader from './HeroSceneLoader';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        {/* Left — headline stack */}
        <div>
          <span className="hero-eyebrow condensed">
            Sustainability Measurement
          </span>
          <h1 className="hero-headline display">
            Proof,<br />
            Not<br />
            Promise.
          </h1>
          <p className="hero-sub">
            Validex is the independent measurement infrastructure that turns
            sustainability claims into a verifiable score.
          </p>
          <a href="mailto:hello@validex.com" className="hero-cta condensed">
            Contact us ↗
          </a>
        </div>

        {/* Right — Blender 3D object, drag to spin */}
        <div className="hero-image-wrap" style={{ cursor: 'grab' }}>
          <HeroSceneLoader />
        </div>
      </div>
    </section>
  );
}
