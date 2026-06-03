'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CASES = [
  {
    slug: 'volkswagen',
    company: 'Volkswagen',
    category: 'EMISSIONS',
    claim: 'Rated AA.',
    reality: '11 million cars cheating.',
  },
  {
    slug: 'dws',
    company: 'DWS',
    category: 'DISCLOSURE',
    claim: '€900bn ESG AUM.',
    reality: 'Raided for greenwashing.',
  },
  {
    slug: 'boohoo',
    company: 'Boohoo',
    category: 'SUPPLY CHAIN',
    claim: 'Top-rated supply chain.',
    reality: '£3.50/hour wages.',
  },
  {
    slug: 'sfdr',
    company: 'SFDR Article 9',
    category: 'REGULATION',
    claim: 'Darkest-green funds.',
    reality: '350+ downgraded.',
  },
  {
    slug: 'verra',
    company: 'Verra',
    category: 'CARBON MARKETS',
    claim: 'Certified offsets.',
    reality: '~90% phantom.',
  },
  {
    slug: 'msci',
    company: 'MSCI',
    category: 'RATINGS',
    claim: 'ESG rating leader.',
    reality: '0.5 rater correlation.',
  },
  {
    slug: 'defence',
    company: 'BAE Systems',
    category: 'DEFENCE',
    claim: 'Excluded as a sin stock.',
    reality: 'ESG-approved post-2022.',
  },
];

export default function CaseStudies() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section className="cs-carousel-section" id="case-studies">
      {/* Header */}
      <div className="cs-carousel-header">
        <div className="cs-carousel-header-left">
          <span className="cs-carousel-eyebrow reveal">§ 02 — When The Score Lied</span>
          <h2 className="cs-carousel-heading reveal">
            Seven times the label said one thing.
            <br />The truth said another.
          </h2>
        </div>
        <div className="cs-carousel-arrows">
          <button
            className="cs-arrow-btn"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous case"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            className="cs-arrow-btn"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next case"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div className="cs-embla" ref={emblaRef}>
        <div className="cs-embla-container">
          {CASES.map((c, i) => (
            <div className="cs-embla-slide" key={c.slug}>
              <a
                href={`/case-studies/${c.slug}`}
                className="cs-carousel-card"
              >
                {/* Card glow — moss radial top-right on hover */}
                <div className="cs-card-glow" aria-hidden="true" />

                <div className="cs-card-top-row">
                  <span className="cs-card-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="cs-card-category">{c.category}</span>
                </div>

                <div className="cs-card-body">
                  <div className="cs-card-company">{c.company}</div>
                  <p className="cs-card-claim">&ldquo;{c.claim}&rdquo;</p>
                  <p className="cs-card-reality">{c.reality}</p>
                </div>

                <div className="cs-card-footer">
                  <span className="cs-card-readmore">
                    Read more
                    <span className="cs-card-arrow"> →</span>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="cs-dots" role="tablist" aria-label="Case studies">
        {CASES.map((_, i) => (
          <button
            key={i}
            className={`cs-dot${i === selectedIndex ? ' cs-dot-active' : ''}`}
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`Case ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
