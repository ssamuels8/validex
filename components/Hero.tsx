import Image from 'next/image';

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

        {/* Right — floating image */}
        <div className="hero-image-wrap">
          <Image
            src="/hero-object.jpg"
            alt="Validex — sustainability measurement"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  );
}
