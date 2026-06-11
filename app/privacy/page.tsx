import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Privacy Policy — Validex' };

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="§ Legal — Privacy" title="Privacy Policy">
      <p>
        Validex processes only the information you submit through the scoring
        pilot application: company name, sector, region, work email, and any
        claim description you provide. We use it solely to review your
        application and respond. We do not sell, share, or enrich this data,
        and we do not run third-party advertising or tracking on this site.
      </p>
      <p>
        You can request access to, correction of, or deletion of your data at
        any time by contacting us through the application channel. Data is
        retained only for the duration of the pilot review process. This
        placeholder policy will be replaced by the full GDPR-compliant policy
        before public launch.
      </p>
    </LegalPage>
  );
}
