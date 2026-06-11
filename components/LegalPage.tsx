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
      <div className="legal-inner">
        <a href="/" className="legal-back">← Back to Validex</a>
        <span className="legal-eyebrow">{eyebrow}</span>
        <h1 className="legal-title">{title}</h1>
        <div className="legal-body">{children}</div>
      </div>
    </main>
  );
}
