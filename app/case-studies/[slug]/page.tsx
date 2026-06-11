import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  standfirst: string;
  body: React.ReactNode;
  pullQuote: string;
  callout: React.ReactNode;
}

const STUDIES: CaseStudy[] = [
  {
    slug: 'volkswagen',
    title: 'Volkswagen and the DJSI: The Score That Saw Nothing',
    category: 'Automotive · Emissions · EU · 2015',
    standfirst:
      'In September 2015, Volkswagen topped the Dow Jones Sustainability Index. Weeks later, the EPA confirmed that 11 million of its vehicles contained software designed to cheat emissions tests.',
    body: (
      <>
        <p>
          In September 2015, Volkswagen was ranked <strong>first among global
          automakers</strong> in the Dow Jones Sustainability Index — the world&apos;s
          most prominent corporate sustainability benchmark. The ranking was based
          on self-reported data, third-party audited for the act of reporting,
          not for the accuracy of the underlying numbers.
        </p>
        <p>
          Weeks later, the EPA issued a notice of violation. Volkswagen had
          installed <strong>defeat device software</strong> in 11 million vehicles
          worldwide — software designed to detect standardised emissions testing
          conditions and activate emissions controls only during tests. Under
          normal driving conditions, the vehicles emitted nitrogen oxides at
          up to 40 times the legal limit.
        </p>
        <p>
          The DJSI rating had rewarded the sustainability disclosures. The
          disclosures were based on test-condition data. The test-condition
          data was deliberately falsified. At no point in the rating process
          was there a mechanism to verify the actual Scope 1 emissions of
          vehicles in ordinary use — the only metric that matters for
          atmospheric impact.
        </p>
        <p>
          Volkswagen ultimately agreed to pay over <strong>$30 billion</strong> in
          penalties, settlements, and remediation costs across multiple
          jurisdictions. The CEO resigned. The group&apos;s market capitalisation
          fell by approximately a third in the weeks following disclosure. The
          DJSI removed Volkswagen from its index — after the fact, in response
          to news reports, not as a result of any monitoring by the index
          provider itself.
        </p>
        <p>
          The structural failure here is precise: the entire rating apparatus
          was designed around disclosed inputs, not verified outputs. An
          emissions score that cannot detect 11 million vehicles emitting at
          40× the legal limit is not measuring emissions. It is measuring the
          willingness to file paperwork.
        </p>
      </>
    ),
    pullQuote:
      'An emissions score that cannot detect 11 million vehicles emitting at 40× the legal limit is not measuring emissions. It is measuring the willingness to file paperwork.',
    callout: (
      <>
        <span className="cs-callout-tag">What Validex Measures Instead</span>
        <p>
          <strong>E1 — Emissions (Scope 1 Independent Verification).</strong>{' '}
          Real-world output data traced to primary sources, not test-condition
          disclosures. Audit of the reporting process is not the same as audit
          of the outcome.
        </p>
      </>
    ),
  },
  {
    slug: 'dws',
    title: 'DWS and the Elastic ESG Label',
    category: 'Asset Management · Disclosure · Germany/US · 2021',
    standfirst:
      'DWS marketed €900 billion in assets as ESG-integrated. Its own sustainability chief became a whistleblower. A Frankfurt raid and a $19 million SEC penalty followed.',
    body: (
      <>
        <p>
          In 2021, DWS — Deutsche Bank&apos;s asset management arm — marketed
          over <strong>€900 billion</strong> in assets as ESG-integrated. The
          claim was prominent in investor materials, annual reports, and product
          disclosures. It was also, according to the SEC and BaFin,
          substantially overstated.
        </p>
        <p>
          DWS&apos;s own former head of sustainability, Desiree Fixler, became
          a whistleblower. She alleged that the firm&apos;s ESG integration
          claims were misleading — that the internal processes required to
          substantiate those claims either did not exist or were applied far
          less rigorously than disclosed. The SEC launched an investigation.
          In May 2022, <strong>BaFin raided DWS&apos;s Frankfurt offices</strong>,
          a highly unusual step for a regulated asset manager.
        </p>
        <p>
          The DWS CEO, Asoka Wöhrmann, resigned in June 2022 amid the
          investigations. DWS agreed to pay a <strong>$19 million penalty</strong>{' '}
          to the SEC in September 2023. The settlement found that DWS had
          inadequate policies to support its ESG claims, and that its public
          statements were materially misleading to investors.
        </p>
        <p>
          The structural problem this case reveals is definitional: the
          concept of &ldquo;ESG-integrated&rdquo; was defined by the seller.
          There was no external standard, no independent verification, and no
          mechanism for investors to distinguish genuine integration from
          marketing copy. DWS is not an outlier. It was the first of its
          scale to be caught, not the first to do it.
        </p>
        <p>
          The ESG label in asset management functions as a marketing claim,
          not a technical standard. Its content is determined by whoever is
          selling the product. Without a measurement system that operates
          independently of the issuer, this will remain structurally true
          regardless of the volume of disclosure requirements imposed.
        </p>
      </>
    ),
    pullQuote:
      'The concept of "ESG-integrated" was defined by the seller. There was no external standard, no independent verification.',
    callout: (
      <>
        <span className="cs-callout-tag">What Validex Measures Instead</span>
        <p>
          <strong>E5 — Certification (Third-Party Audit Verification).</strong>{' '}
          Verification of the processes behind ESG claims, not just the
          claims themselves. A rating of "ESG-integrated" must be backed by
          independently audited evidence of what integration actually means.
        </p>
      </>
    ),
  },
  {
    slug: 'boohoo',
    title: 'Boohoo and the Supply Chain Nobody Checked',
    category: 'Fast Fashion · Supply Chain · UK · 2020',
    standfirst:
      'Boohoo scored highly on every major ESG platform for supply chain governance. Its Leicester suppliers were paying workers £3.50 per hour. Neither fact was inconsistent within the rating system.',
    body: (
      <>
        <p>
          In July 2020, the <em>Sunday Times</em> published an investigation
          into conditions in the Leicester garment factories supplying
          fast-fashion retailer Boohoo. Workers were being paid as little as
          <strong> £3.50 per hour</strong> — well below the UK national
          minimum wage of £8.72. The factories were also alleged to be
          operating in breach of Covid-19 safety regulations.
        </p>
        <p>
          Boohoo&apos;s share price fell by more than <strong>40%</strong> in
          the days following the report. Major institutional investors
          reviewed their positions. The Leicester factories were, at the time
          of the exposure, nowhere in Boohoo&apos;s disclosed supply chain.
          They were sub-contractors to sub-contractors — the kind of upstream
          relationship that exists in most complex supply chains and that
          virtually no ESG rating system was designed to reach.
        </p>
        <p>
          The rating systems had been evaluating Boohoo&apos;s published
          supply chain policies, its stated governance commitments, and its
          disclosed direct relationships. None of these pointed to Leicester.
          The gap between the disclosed supply chain and the actual supply
          chain was, for rating purposes, invisible — because ratings are
          built on disclosed data, and the exploitation happened precisely
          where disclosure stopped.
        </p>
        <p>
          Boohoo subsequently commissioned an independent review, led by
          Alison Levitt QC, which found that the company had been aware of
          concerns about its Leicester supply chain and had not acted
          adequately. The review recommended wholesale changes to supply chain
          governance. In the two years following the report, Boohoo&apos;s
          share price declined by more than 80% from its pre-exposure peak.
        </p>
        <p>
          The mechanism of failure is the same in every supply chain
          controversy: the rating measured what was disclosed; the harm
          occurred upstream of disclosure. Without independent traceability
          to primary production, a supply chain score cannot distinguish a
          well-governed supply chain from a well-documented one.
        </p>
      </>
    ),
    pullQuote:
      'The gap between the disclosed supply chain and the actual supply chain was invisible — because ratings are built on disclosed data, and the exploitation happened precisely where disclosure stopped.',
    callout: (
      <>
        <span className="cs-callout-tag">What Validex Measures Instead</span>
        <p>
          <strong>E2 — Supply Chain (Upstream Verification).</strong>{' '}
          Supply chain scoring must extend to primary production and
          sub-contracted relationships, not stop at the direct supplier tier.
          Traceability to origin is the minimum viable standard.
        </p>
      </>
    ),
  },
  {
    slug: 'sfdr',
    title: 'SFDR Article 9: The Downgrade Wave',
    category: 'Regulation · Disclosure · EU · 2022–2023',
    standfirst:
      'Hundreds of billions of euros flowed into Article 9 "darkest green" funds. When regulators clarified what the classification required, over 350 funds were quietly downgraded in a single quarter.',
    body: (
      <>
        <p>
          The EU&apos;s Sustainable Finance Disclosure Regulation (SFDR)
          introduced a tiered classification system for investment funds:
          Article 6 (no sustainability claims), Article 8 (promoting
          environmental or social characteristics), and Article 9 (sustainable
          investment as the core objective). Article 9 carried the highest
          presumption of sustainability and attracted significant capital on
          that basis.
        </p>
        <p>
          The problem was that fund managers had self-classified according to
          their own interpretations of what Article 9 required. In the absence
          of precise regulatory guidance, interpretations varied enormously.
          <strong> Hundreds of billions of euros</strong> had flowed into
          Article 9 products on the strength of a classification whose
          substantive meaning was, in practice, undefined.
        </p>
        <p>
          In late 2022, European regulators published clarifying guidance on
          what Article 9 classification actually required: specifically, that
          all investments — not merely a majority — must qualify as
          &ldquo;sustainable investments&rdquo; under SFDR&apos;s own
          definition. The answer was tighter than most fund managers had
          assumed. What followed was a <strong>mass reclassification
          event</strong>: over 350 funds downgraded from Article 9 to
          Article 8 in a single quarter in late 2022 and early 2023,
          representing an estimated €175 billion or more in assets.
        </p>
        <p>
          The SFDR downgrade wave was not a regulatory overreach. It was a
          correction. The correction revealed how far the market&apos;s
          self-reporting had diverged from any defensible standard of what
          &ldquo;sustainable&rdquo; means in a legal context. The capital
          had flowed in on a label. The label had never been independently
          verified. When the label was clarified, billions of euros of
          &ldquo;sustainable investment&rdquo; turned out not to be.
        </p>
        <p>
          Labelling systems without independent verification mechanisms
          will always face this outcome eventually. The question is only
          how much capital flows in on the label before the correction
          arrives — and how orderly the correction is when it does.
        </p>
      </>
    ),
    pullQuote:
      'Over 350 funds downgraded in a single quarter. The capital had flowed in on a label. The label had never been verified.',
    callout: (
      <>
        <span className="cs-callout-tag">What Validex Measures Instead</span>
        <p>
          <strong>E5 — Certification (Classification Verification).</strong>{' '}
          Independent verification of whether investment products actually
          meet the standards they claim. Self-classification against regulatory
          labels is not the same as independent audit of compliance with
          those labels.
        </p>
      </>
    ),
  },
  {
    slug: 'verra',
    title: 'Verra Rainforest Offsets: Phantom Credits',
    category: 'Carbon Markets · Certification · Global · 2023',
    standfirst:
      'A 2023 investigation by The Guardian, Die Zeit, and SourceMaterial found that more than 90% of Verra\'s REDD+ rainforest carbon credits represented no real avoided emissions. Companies had used them to declare net-zero compliance.',
    body: (
      <>
        <p>
          In January 2023, a joint investigation by The Guardian, Die Zeit,
          and SourceMaterial examined Verra&apos;s REDD+ programme — the
          world&apos;s leading voluntary carbon crediting scheme for avoided
          deforestation. The conclusion was stark: <strong>more than 90% of
          Verra&apos;s rainforest offset credits</strong> did not represent
          real avoided emissions and were effectively worthless as a climate
          intervention.
        </p>
        <p>
          The methodology error was fundamental. REDD+ credits are issued
          based on a counterfactual: how much deforestation would have
          occurred in a given area without the project? The investigation,
          drawing on academic research including work by Grayson Badgley
          and colleagues, found that the baselines used to calculate this
          counterfactual were <strong>systematically overstated</strong> —
          producing large volumes of credits for emissions that were never
          real because the deforestation they claimed to have prevented
          would not have occurred anyway.
        </p>
        <p>
          Companies including Disney, Gucci, and Salesforce had purchased
          these credits to offset their reported emissions and meet
          net-zero pledges. In accounting terms, their carbon neutrality
          claims rested on subtracting emissions that had never been
          avoided. The offset existed as a number on a certificate. The
          forest did not behave differently because of it.
        </p>
        <p>
          Verra disputed the findings and continued to issue credits. The
          voluntary carbon market continued to function. This is possible
          because the offset market has no independent verification
          infrastructure capable of adjudicating the counterfactual at
          the required granularity. Verra&apos;s own methodology is
          proprietary. Its auditors — approved validators — have a
          commercial relationship with project developers. The system
          is structurally incapable of the independent verification
          it claims to provide.
        </p>
        <p>
          The broader implication is that billions of dollars of
          corporate &ldquo;climate action&rdquo; has been spent on
          accounting constructs rather than physical interventions.
          The market will survive this. The atmosphere will not
          distinguish between a genuine and a phantom reduction.
        </p>
      </>
    ),
    pullQuote:
      'The offset existed as a number on a certificate. The forest did not behave differently because of it.',
    callout: (
      <>
        <span className="cs-callout-tag">What Validex Measures Instead</span>
        <p>
          <strong>E1 — Emissions (Scope 3 Offset Verification).</strong>{' '}
          Self-reported outcomes, even when certified under a proprietary
          methodology, are not independently verified outcomes. Certification
          must be anchored to a verifiable external standard with no
          commercial relationship between auditor and project developer.
        </p>
      </>
    ),
  },
  {
    slug: 'msci',
    title: "MSCI's ESG Mirage: Risk Is Not Impact",
    category: 'Ratings Methodology · Bloomberg Investigation · 2021',
    standfirst:
      'Bloomberg\'s 2021 investigation found that MSCI upgrades companies based on reduced risk to the company, not reduced harm to the world. The MIT Sloan "Aggregate Confusion" study found that major raters correlate at 0.5 — against credit ratings\' 0.99.',
    body: (
      <>
        <p>
          In 2021, Bloomberg published a detailed investigation into MSCI&apos;s
          ESG rating methodology. The central finding was precise and damaging:
          <strong> MSCI upgrades companies based on reduced risk to the company,
          not reduced harm to the world</strong>. In one documented case, MSCI
          upgraded a company&apos;s ESG score after it successfully lobbied
          against stronger environmental regulation — because the company now
          faced less regulatory risk. The actual environmental impact was
          unchanged or worse.
        </p>
        <p>
          This is not an incidental flaw. It reflects a deliberate design
          choice: MSCI&apos;s methodology measures ESG factors that are
          material to the company&apos;s financial performance. Factors that
          harm the world but do not affect the company&apos;s bottom line
          are systematically underweighted or excluded. The product is
          marketed as measuring sustainability leadership. What it actually
          measures is sustainability-related financial risk.
        </p>
        <p>
          The divergence problem extends across the entire ratings sector.
          In 2022, researchers at MIT Sloan published &ldquo;Aggregate
          Confusion,&rdquo; a systematic study of ESG ratings divergence.
          Their finding: <strong>pairwise correlation between major ESG
          raters averages approximately 0.54</strong>. For comparison,
          credit ratings from Moody&apos;s and S&P correlate at 0.99.
          The same company can receive a rating of &ldquo;leader&rdquo;
          from one agency and &ldquo;laggard&rdquo; from another —
          simultaneously, for the same reporting period.
        </p>
        <p>
          The researchers identified three sources of divergence: scope
          (which categories are included), measurement (how each category
          is quantified), and weights (how categories are aggregated into
          a final score). Each agency makes different choices on all three
          dimensions. None of those choices are standardised or
          independently verified. The result is that the same underlying
          company performance can produce entirely different ratings
          depending on which methodological black box is applied.
        </p>
        <p>
          Investors using ESG ratings to allocate capital are not
          looking at a signal about company impact. They are looking at
          noise structured to resemble a signal. The appearance of
          rigour — a numerical score, a letter grade — substitutes for
          rigour itself.
        </p>
      </>
    ),
    pullQuote:
      'Pairwise correlation between major ESG raters: 0.54. Between Moody\'s and S&P credit ratings: 0.99. The appearance of rigour substitutes for rigour itself.',
    callout: (
      <>
        <span className="cs-callout-tag">What Validex Measures Instead</span>
        <p>
          <strong>All components — Methodology Standardisation.</strong>{' '}
          Every Validex component is anchored to ESRS — legally codified
          EU standards, not proprietary methodological choices. Scope,
          measurement, and weights are fixed by reference to law, not
          by commercial discretion. This eliminates the definitional
          arbitrage that produces a 0.54 correlation.
        </p>
      </>
    ),
  },
  {
    slug: 'defence',
    title: 'BAE Systems and the Rewriting of the Exclusion List',
    category: 'Defence · ESG Reweighting · Global · 2022',
    standfirst:
      'For years, defence contractors were widely excluded from ESG portfolios as "sin stocks." After Russia\'s invasion of Ukraine in 2022, the same companies were quietly reclassified — without any change in what they make.',
    body: (
      <>
        <p>
          For most of the ESG era, major defence contractors — companies
          manufacturing weapons systems, ammunition, and military platforms —
          were routinely excluded from ESG-labelled investment products.
          The rationale was straightforward: they produced instruments of
          lethal harm and were, therefore, socially irresponsible by
          definition. BAE Systems, Rheinmetall, Leonardo, and their peers
          were classified alongside tobacco and gambling as &ldquo;sin
          stocks&rdquo; in many ESG frameworks.
        </p>
        <p>
          In February 2022, Russia invaded Ukraine. Within months, the
          same ESG fund managers who had excluded defence companies began
          <strong> revising their frameworks</strong>. The argument
          shifted: defence was now &ldquo;protective&rdquo; rather than
          harmful; contributing to democratic security rather than
          endangering it. Several large European asset managers explicitly
          removed or reduced defence exclusions from their ESG criteria.
          Some reclassified European defence companies as aligned with the
          EU&apos;s social taxonomy objectives.
        </p>
        <p>
          The physical output of these companies — weapons systems — had
          not changed. Their customers, their supply chains, and their
          products were identical before and after the reclassification.
          What had changed was the geopolitical context in which those
          products were assessed. The ESG ratings moved in response
          to a political reappraisal, not an empirical measurement of
          any outcome the companies actually produced.
        </p>
        <p>
          This is the most transparent demonstration of what ESG ratings
          are: <strong>normative judgements dressed as measurements.</strong>{' '}
          When the norm changes, the rating changes, even when the
          underlying company behaviour does not. A measurement system
          worthy of the name would be stable against shifts in
          geopolitical consensus. The Validex framework assesses
          what companies do, against codified standards, independently
          of what the market currently believes about the value of what
          they do.
        </p>
        <p>
          Whether defence companies should be included in sustainable
          investment products is a legitimate political question. It
          is not a question that an objective scoring system can answer.
          What an objective scoring system can do is separate the
          measurement from the judgement — so that investors can apply
          their own values to verified facts, rather than having
          unverified normative choices presented to them as data.
        </p>
      </>
    ),
    pullQuote:
      'The physical output of these companies had not changed. What had changed was the geopolitical context. The ratings moved in response to a political reappraisal, not a measurement.',
    callout: (
      <>
        <span className="cs-callout-tag">What Validex Measures Instead</span>
        <p>
          <strong>G1 — Governance and S-component alignment.</strong>{' '}
          Validex separates measurement from normative judgement. We assess
          what companies do against codified standards. Whether that output
          is deemed &ldquo;sustainable&rdquo; by any given investor is a
          decision for the investor to make with verified data — not a
          decision embedded invisibly in a rating methodology.
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
    title: `${study.title} — Validex`,
    description: study.standfirst,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = STUDIES.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();

  const study = STUDIES[idx];
  const prev = idx > 0 ? STUDIES[idx - 1] : null;
  const next = idx < STUDIES.length - 1 ? STUDIES[idx + 1] : null;

  return (
    <main className="cs-page">
      <div className="cs-page-inner">
        <a href="/#case-studies" className="cs-back">← All cases</a>

        <span className="cs-category">{study.category}</span>
        <h1 className="cs-title">{study.title}</h1>
        <p className="cs-standfirst">{study.standfirst}</p>

        <div className="cs-body">
          {study.body}
        </div>

        <blockquote className="cs-pull-quote">
          {study.pullQuote}
        </blockquote>

        <div className="cs-callout">
          {study.callout}
        </div>

        {(prev || next) && (
          <nav className="cs-nav">
            {prev ? (
              <a href={`/case-studies/${prev.slug}`} className="cs-nav-link">
                <span className="cs-nav-label">← Previous</span>
                <span className="cs-nav-title">{prev.title.split(':')[0]}</span>
              </a>
            ) : <span />}
            {next ? (
              <a href={`/case-studies/${next.slug}`} className="cs-nav-link">
                <span className="cs-nav-label">Next →</span>
                <span className="cs-nav-title">{next.title.split(':')[0]}</span>
              </a>
            ) : <span />}
          </nav>
        )}

        <div className="cs-cta">
          <a href="/#apply" className="cs-cta-link">
            Get In Touch ↗
          </a>
          <p className="cta-note">No forms. No demos. A conversation.</p>
        </div>
      </div>
    </main>
  );
}

