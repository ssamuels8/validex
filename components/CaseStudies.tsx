'use client';

import { useEffect, useRef, useState } from 'react';

interface Case {
  slug: string;
  company: string;
  stat: string;
  body: string;
  tag: string;
  component: string;
}

const CASES: Case[] = [
  {
    slug: 'volkswagen',
    company: 'Volkswagen',
    stat: 'AA Rating',
    body: 'While 11 million vehicles were actively falsifying emissions tests. The score said safe. The reality did not.',
    tag: 'Emissions Component',
    component: 'EMISSIONS — Scope 1 independent verification',
  },
  {
    slug: 'dws',
    company: 'DWS',
    stat: '€900bn',
    body: 'Marketed as ESG-integrated while their own sustainability chief became a whistleblower. $19M SEC penalty.',
    tag: 'Certification Component',
    component: 'CERTIFICATION — Third-party audit verification',
  },
  {
    slug: 'sfdr',
    company: 'Boohoo',
    stat: '−50% in 48hrs',
    body: 'Scored well on every ESG platform. Its Leicester supplier paid workers £3.50/hour. The supply chain was invisible.',
    tag: 'Supply Chain Component',
    component: 'SUPPLY CHAIN — Upstream verification',
  },
  {
    slug: 'sfdr',
    company: 'SFDR Funds',
    stat: '350 downgrades',
    body: 'Reclassified in a single quarter when regulators clarified what "sustainable" actually meant. Billions had already flowed in.',
    tag: 'Disclosure Component',
    component: 'CERTIFICATION — Classification verification',
  },
  {
    slug: 'verra',
    company: 'Verra',
    stat: '90% phantom',
    body: 'REDD+ credits representing no real avoided emissions. Companies met net-zero pledges with accounting constructs.',
    tag: 'Verification Component',
    component: 'EMISSIONS — Scope 3 offset verification',
  },
  {
    slug: 'msci-mirage',
    company: 'MSCI',
    stat: '0.54 correlation',
    body: 'Pairwise correlation between major ESG raters. The same company, rated wildly differently. No agreed standard exists.',
    tag: 'Measurement Component',
    component: 'All components — methodology standardisation',
  },
];

export default function CaseStudies() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CASES.forEach((_, i) => {
      const el = triggerRefs.current[i];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(false);
            setTimeout(() => {
              setActiveIdx(i);
              setVisible(true);
            }, 220);
          }
        },
        { threshold: 0.5 },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const c = CASES[activeIdx];

  return (
    <section className="case-studies-section" id="case-studies">
      {/* Sticky display panel — sits above the triggers */}
      <div className="case-sticky">
        <div className={`case-display ${visible ? 'visible' : 'hidden'}`}>
          <p className="case-number">{String(activeIdx + 1).padStart(2, '0')} / 06</p>
          <h2 className="case-company">{c.company}</h2>
          <p className="case-stat">{c.stat}</p>
          <p className="case-body">{c.body}</p>
          <p className="case-tag">→ {c.component}</p>
          <a
            href={`/case-studies/${c.slug}`}
            className="case-link"
          >
            Read case study →
          </a>
        </div>
      </div>

      {/* Scroll triggers — one per case, each 100vh */}
      <div className="case-triggers">
        {CASES.map((_, i) => (
          <div
            key={i}
            className="case-trigger"
            ref={(el) => { triggerRefs.current[i] = el; }}
          />
        ))}
      </div>
    </section>
  );
}
