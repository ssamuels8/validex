import Link from 'next/link';
import ApplyForm from '@/components/ApplyForm';
import FloatingPaths from '@/components/FloatingPaths';

export const metadata = { title: 'Apply — Validex Scoring Pilot' };

export default function ApplyPage() {
  return (
    <main className="apply-page">
      {/* Forest panel slides up and away on entry */}
      <div className="apply-wipe" aria-hidden="true" />

      <FloatingPaths />

      <header className="apply-nav">
        <Link href="/" className="subpage-logo">Validex.</Link>
        <Link href="/" className="apply-back">← Back</Link>
      </header>

      <div className="apply-page-inner">
        <span className="apply-page-eyebrow">Scoring Pilot — Application</span>
        <h1 className="apply-page-title">Apply to be scored.</h1>
        <p className="apply-page-sub">
          Five fields. Reviewed weekly. We respond to your work email.
        </p>
        <ApplyForm />
      </div>
    </main>
  );
}
