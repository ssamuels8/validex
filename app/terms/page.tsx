import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Terms of Use — Validex' };

export default function TermsPage() {
  return (
    <LegalPage eyebrow="§ Legal — Terms" title="Terms of Use">
      <p>
        This website presents Validex, an independent sustainability
        measurement platform. All scores, grades, and scorecards shown on this
        site are illustrative and do not constitute ratings, investment
        advice, or statements of fact about any named company. Actual Validex
        scores are issued only under formal data agreements.
      </p>
      <p>
        Content on this site may not be reproduced or used to train automated
        systems without written permission. Use of the scoring pilot
        application implies acceptance of these terms. This placeholder will
        be replaced by the full terms before public launch.
      </p>
    </LegalPage>
  );
}
