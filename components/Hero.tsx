'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';

// Shader is WebGL-only — load client-side, never SSR (avoids "window is not defined").
const CelestialSphere = dynamic(
  () => import('./ui/celestial-sphere-shader'),
  { ssr: false }
);

// Light shiny gradient so the headline reads over the dark shader: off-white → moss → off-white.
const GRADIENT = 'linear-gradient(90deg, #F2EEE4, #4A8A5E, #F2EEE4)';
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
    <section className="hero hero--dark" id="hero">

      {/* Shader sphere — background, behind everything (z0) */}
      <div className="hero-shader" aria-hidden="true">
        <CelestialSphere
          color1="#234A33"
          color2="#E7E1D3"
          cloudDensity={3.2}
          glowIntensity={0.85}
          rotationSpeed={0.06}
        />
      </div>

      {/* Warm-black scrim — sits between shader (z0) and text (z10) for legibility */}
      <div className="hero-scrim" aria-hidden="true" />

      {/* Text block — vertically centered, far left, z10 */}
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

      {/* Scroll cue — bottom center */}
      <div className="hero-scroll-cue-wrap" id="hero-scroll-cue">
        <div className="hero-scroll-cue" aria-label="Scroll down">
          <ArrowDown size={16} strokeWidth={1.5} />
        </div>
      </div>

    </section>
  );
}
