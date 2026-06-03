import AccessForm from './AccessForm';

export default function Access() {
  return (
    <section className="access" id="access">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="access-glow" aria-hidden="true" />
      <div className="access-inner">
        <div className="access-text">
          <span className="section-label">§ 08 — Early Access</span>
          <h2 className="access-headline display">
            The score exists.<br />
            Your position on it<br />
            is still <em>open.</em>
          </h2>
          <p className="access-body">
            Validex is onboarding a limited number of corporate and institutional
            partners. If you are building toward CSRD compliance or allocating capital
            into sustainability-linked assets, this is the conversation to have.
          </p>
        </div>
        <div className="access-form-col">
          <AccessForm />
        </div>
      </div>
    </section>
  );
}
