export default function CtaSection() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-inner">
        <span className="cta-eyebrow">Get In Touch</span>
        <h1 className="cta-headline">
          <span className="line-mask"><span className="line-mask-inner">Start</span></span>
          <span className="line-mask"><span className="line-mask-inner">Measuring.</span></span>
        </h1>
        <p className="cta-sub">
          We are onboarding a small number of partners.
          No forms. Just a conversation.
        </p>
        <a href="#contact" className="cta-btn" id="cta-main-btn">
          Get In Touch ↗
        </a>
      </div>
    </section>
  );
}
