import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  body: React.ReactNode;
}

const STUDIES: CaseStudy[] = [
  {
    slug: 'dws',
    title: 'DWS and the Elastic ESG Label',
    category: 'Asset Management · Germany/US · 2021',
    body: (
      <>
        <p>
          In 2021, DWS — Deutsche Bank&apos;s asset management arm — marketed over
          <strong> €900 billion</strong> in assets as ESG-integrated. The claim was
          prominent in investor materials, annual reports, and product disclosures.
          It was also, according to the SEC and BaFin, substantially overstated.
        </p>
        <p>
          DWS&apos;s own former head of sustainability, Desiree Fixler, became a
          whistleblower. She alleged that the firm&apos;s ESG integration claims were
          misleading — that the internal processes required to substantiate those
          claims either did not exist or were applied far less rigorously than
          disclosed. The SEC launched an investigation. BaFin raided the offices.
        </p>
        <p>
          DWS agreed to pay a <strong>$19 million penalty</strong> to the SEC in
          2023. The settlement found that DWS had inadequate policies to support its
          ESG claims, and that its public statements were materially misleading.
        </p>
        <p>
          The structural problem this case reveals: <strong>the definition of
          &ldquo;ESG-integrated&rdquo; was set by the seller</strong>. There was no
          external standard, no independent verification, and no mechanism for
          investors to distinguish genuine integration from marketing copy. DWS is
          not an outlier. It was the first to be caught.
        </p>
        <p>
          <strong>The Validex component this exposes:</strong> CERTIFICATION —
          third-party audit verification of the processes behind ESG claims, not
          just the claims themselves.
        </p>
      </>
    ),
  },
  {
    slug: 'sfdr',
    title: 'SFDR Article 9: The Downgrade Wave',
    category: 'Regulation · EU · 2022–2023',
    body: (
      <>
        <p>
          The EU&apos;s Sustainable Finance Disclosure Regulation (SFDR) introduced
          a tiered classification system for investment funds: Article 6 (no
          sustainability claims), Article 8 (promoting environmental or social
          characteristics), and Article 9 (sustainable investment as the objective).
          Article 9 carried the highest presumption of sustainability.
        </p>
        <p>
          Billions of euros flowed into Article 9 funds on the strength of that
          classification. Then, in late 2022, regulators clarified what
          &ldquo;sustainable investment&rdquo; actually required. The answer was
          specific. What followed was a <strong>mass reclassification event</strong>:
          over 350 funds downgraded from Article 9 to Article 8 in a single quarter.
        </p>
        <p>
          The capital had flowed in on a label. The label had never been verified.
          Fund managers had self-classified according to their own interpretations,
          and investors had no independent way to assess whether those
          interpretations were accurate.
        </p>
        <p>
          The SFDR downgrade wave was not a regulatory overreach. It was a
          correction revealing how far the market&apos;s self-reporting had diverged
          from any defensible standard of what &ldquo;sustainable&rdquo; means.
        </p>
        <p>
          <strong>The Validex component this exposes:</strong> The absence of
          independent measurement infrastructure — not just disclosure frameworks —
          as the precondition for credible sustainability classification.
        </p>
      </>
    ),
  },
  {
    slug: 'aggregate-confusion',
    title: 'Aggregate Confusion: ESG Ratings Divergence',
    category: 'Academic Research · 2022',
    body: (
      <>
        <p>
          In 2022, researchers at MIT Sloan published &ldquo;Aggregate
          Confusion,&rdquo; a systematic study of ESG ratings divergence across
          major rating agencies. The finding was striking: <strong>pairwise
          correlation between major ESG raters averages 0.54</strong>. For
          comparison, credit ratings from Moody&apos;s and S&P correlate at 0.99.
        </p>
        <p>
          The same company could receive an ESG rating of &ldquo;leader&rdquo; from
          one agency and &ldquo;laggard&rdquo; from another — simultaneously, for
          the same reporting period, using the same underlying data. This is not a
          rounding error. It is a structural indeterminacy in what the ratings
          actually measure.
        </p>
        <p>
          The researchers identified three primary sources of divergence: scope
          (what categories are included), measurement (how each category is
          quantified), and weights (how categories are aggregated into a final
          score). Each agency makes different choices on all three dimensions, and
          none of those choices are standardised or independently verified.
        </p>
        <p>
          The practical consequence: investors using ESG ratings to allocate capital
          are not looking at a signal. They are looking at noise, structured to
          resemble a signal. The appearance of rigour substitutes for rigour itself.
        </p>
        <p>
          <strong>What Validex addresses:</strong> Anchoring every component of the
          score to legally codified standards (ESRS) and independent verification —
          eliminating the definitional arbitrage that produces divergence.
        </p>
      </>
    ),
  },
  {
    slug: 'msci-mirage',
    title: "MSCI's ESG Mirage",
    category: 'Ratings · Bloomberg Investigation · 2021',
    body: (
      <>
        <p>
          In 2021, Bloomberg published an investigation into MSCI&apos;s ESG rating
          methodology. The finding was precise and damaging: <strong>MSCI upgrades
          companies based on reduced risk to the company, not reduced harm to the
          world</strong>.
        </p>
        <p>
          In one documented case, MSCI upgraded a company&apos;s ESG rating after it
          lobbied successfully against stronger environmental regulation. The company
          faced less regulatory risk — so its ESG score improved. The actual
          environmental impact was unchanged or worse.
        </p>
        <p>
          This is not an incidental flaw. It reflects a deliberate design choice:
          MSCI&apos;s methodology measures ESG factors that are material to the
          company&apos;s financial performance. Factors that harm the world but do
          not affect the company&apos;s bottom line are systematically
          underweighted or excluded.
        </p>
        <p>
          The product is marketed as measuring sustainability leadership. What it
          actually measures is sustainability-related financial risk. These are
          related but distinct variables — and confusing them produces capital
          allocation decisions that are systematically misaligned with actual
          environmental and social outcomes.
        </p>
        <p>
          <strong>The Validex distinction:</strong> Our methodology measures
          company performance against ESRS standards — what the company does, not
          what financial risk it faces. Impact is the variable. Risk is a
          downstream consequence, not the primary input.
        </p>
      </>
    ),
  },
  {
    slug: 'verra',
    title: 'Verra Rainforest Offsets: Phantom Credits',
    category: 'Carbon Markets · Guardian/Zeit Investigation · 2023',
    body: (
      <>
        <p>
          In January 2023, a joint investigation by The Guardian, Die Zeit, and
          SourceMaterial examined Verra&apos;s REDD+ (Reducing Emissions from
          Deforestation and Forest Degradation) carbon credit programme. The
          conclusion: <strong>more than 90% of Verra&apos;s rainforest offset
          credits were &ldquo;phantom credits&rdquo;</strong> — they did not
          represent real avoided emissions.
        </p>
        <p>
          The methodology error was fundamental. REDD+ credits are issued based on
          a counterfactual: how much deforestation would have occurred without the
          project? The investigation found that the baselines used to calculate this
          counterfactual were systematically overstated, producing large volumes of
          credits for emissions that were never real.
        </p>
        <p>
          Companies including Disney, Gucci, and Salesforce had purchased these
          credits to meet net-zero pledges. In accounting terms, their carbon
          neutrality claims were based on subtracting emissions that had never
          actually been avoided. The offset existed as a number on a certificate.
          The forest did not behave differently because of it.
        </p>
        <p>
          Verra disputed the findings. The credits continued to be issued. The
          market continued to function. This is possible because the offset market
          has no independent verification infrastructure capable of adjudicating
          the counterfactual at the required granularity.
        </p>
        <p>
          <strong>The Validex principle this illustrates:</strong> Self-reported
          outcomes, even when certified by a third party under a proprietary
          methodology, are not the same as independently verified outcomes. The
          certification must be anchored to a verifiable external standard.
        </p>
      </>
    ),
  },
  {
    slug: 'volkswagen',
    title: 'Volkswagen and the DJSI: Leadership Exposed',
    category: 'Automotive · EU · 2015',
    body: (
      <>
        <p>
          In September 2015, Volkswagen was ranked <strong>first among global
          automakers</strong> in the Dow Jones Sustainability Index — the world&apos;s
          most prominent corporate sustainability benchmark. The ranking was based
          on self-reported data, third-party audited for the act of reporting, not
          for the accuracy of the underlying numbers.
        </p>
        <p>
          Weeks later, the EPA issued a notice of violation. Volkswagen had
          installed defeat device software in 11 million vehicles worldwide —
          software designed to detect emissions testing conditions and reduce
          emissions only during tests. Under normal driving conditions, the
          vehicles emitted nitrogen oxides at up to 40 times the legal limit.
        </p>
        <p>
          The DJSI rating had rewarded the sustainability disclosures. The
          disclosures were based on test-condition data. The test-condition data
          was deliberately falsified. At no point in the rating process was there
          a mechanism to verify the actual Scope 1 emissions of vehicles in use.
        </p>
        <p>
          Volkswagen agreed to pay over <strong>$30 billion</strong> in penalties,
          settlements, and remediation costs. The CEO resigned. The DJSI removed
          Volkswagen from its index — after the fact, in response to news reports,
          not as a result of its own monitoring.
        </p>
        <p>
          <strong>The Validex component this exposes:</strong> EMISSIONS — Scope 1
          independent verification. The system cannot rely on self-reported figures.
          Every number must be traced to primary data or independently verified
          source. Audit of the reporting process is not the same as audit of the
          outcome.
        </p>
      </>
    ),
  },
];

export function generateStaticParams() {
  return STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = STUDIES.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} — Validex Case Studies`,
    description: study.category,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <main className="cs-page">
      <div className="cs-inner">
        <a href="/" className="cs-back condensed">← Case Studies</a>

        <span className="cs-category condensed">{study.category}</span>
        <h1 className="cs-title display">{study.title}</h1>

        <div className="cs-body">{study.body}</div>

        <div className="cs-cta">
          <a href="mailto:hello@validex.com" className="cs-cta-link condensed">
            hello@validex.com ↗
          </a>
          <p
            className="cta-note"
            style={{ marginTop: '1.5rem', fontSize: '0.8rem' }}
          >
            No forms. No demos. A conversation.
          </p>
        </div>
      </div>
    </main>
  );
}
