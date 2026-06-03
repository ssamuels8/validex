'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';

const GRADIENT = 'linear-gradient(90deg, #15130E, #2E5E3E, #15130E)';
const WRAP_CLS = 'justify-start items-start py-0 text-left';

// fontFamily + fontSize live in .hero-headline-arial CSS (needs !important for fontFamily).
// fontWeight / letterSpacing / lineHeight stay inline (no !important conflict).
const HEADLINE_STYLE: React.CSSProperties = {
  fontWeight: 700,
  letterSpacing: '-0.05em',
  lineHeight: 0.82,
};

export default function Hero() {
  return (
    <section className="hero" id="hero">

      {/* Warm radial glow */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* Text block — vertically centered, far left, z2 */}
      <div className="hero-text">
        <span className="hero-pill">
          Independent Sustainability Measurement
        </span>

        {/* Headline wrapper — GSAP fades+rises this whole block */}
        <div className="hero-headline" id="hero-headline">
          <AnimatedShinyText
            gradientColors={GRADIENT}
            gradientAnimationDuration={4}
            hoverEffect={false}
            textClassName="text-left hero-headline-arial"
            textStyle={HEADLINE_STYLE}
            className={WRAP_CLS}
          >
            They Promise,
          </AnimatedShinyText>
          <AnimatedShinyText
            gradientColors={GRADIENT}
            gradientAnimationDuration={4}
            hoverEffect={false}
            textClassName="text-left hero-headline-arial"
            textStyle={HEADLINE_STYLE}
            className={WRAP_CLS}
          >
            We Measure.
          </AnimatedShinyText>
        </div>

        <p className="hero-sub">
          The independent measurement layer for sustainability.
          Anchored to ESRS. Built for the sceptic.
        </p>
      </div>

      {/* Object — right-anchored, oversized, ambient-animated backdrop */}
      <div className="hero-image-wrap" id="hero-image-wrap">
        <div className="hero-object-shadow" aria-hidden="true" />
        <div className="hero-image-tilt" id="hero-image-tilt">
          <Image
            src="/hero-object.png"
            alt="Validex — verified sustainability measurement instrument"
            width={4693}
            height={2640}
            priority
          />
        </div>
      </div>

      {/* Scroll cue — bottom center */}
      <div className="hero-scroll-cue-wrap" id="hero-scroll-cue">
        <div className="hero-scroll-cue" aria-label="Scroll down">
          <ArrowDown size={16} strokeWidth={1.5} />
        </div>
      </div>

    </section>
  );
}
