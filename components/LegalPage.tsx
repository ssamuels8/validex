import type { ReactNode } from 'react';

export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="legal-page">
      <header className="subpage-nav">
        <a href="/" className="subpage-logo">Validex.</a>
        <a href="/" className="legal-back subpage-back">← Back</a>
      </header>
      <div className="legal-inner">
        <span className="legal-eyebrow">{eyebrow}</span>
        <h1 className="legal-title">{title}</h1>
        <div className="legal-body">{children}</div>
      </div>
    </main>
  );
}
