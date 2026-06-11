import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Imprint — Validex' };

export default function ImprintPage() {
  return (
    <LegalPage eyebrow="§ Legal — Imprint" title="Imprint">
      <p>
        Validex — independent sustainability measurement infrastructure.
        Registered in The Hague, the Netherlands. Responsible for content:
        the Validex founding team.
      </p>
      <p>
        Contact for legal and press enquiries is available through the scoring
        pilot application channel. Company registration details (KvK, VAT)
        will be listed here before public launch.
      </p>
    </LegalPage>
  );
}
