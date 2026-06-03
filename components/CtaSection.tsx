export default function CtaSection() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-inner">
        <span className="section-label" style={{ color: 'var(--green)' }}>
          Get In Touch
        </span>
        <h2 className="cta-headline">
          Start<br />Measuring.
        </h2>
        <p className="cta-sub">
          We are onboarding a small number of partners.<br />
          No forms. Just a conversation.
        </p>
        <a href="mailto:hello@validex.com" className="hero-btn">
          hello@validex.com ↗
        </a>
      </div>
    </section>
  );
}
