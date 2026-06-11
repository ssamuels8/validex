'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" id="hero">

      {/* Warm radial glow */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* Text block — vertically centered, far left, z2 */}
      <div className="hero-text">
        <span className="hero-eyebrow">
          Independent Sustainability Measurement
        </span>

        {/* Headline — solid warm near-black, line-mask reveal (GSAP in SiteScripts) */}
        <h1 className="hero-headline" id="hero-headline">
          <span className="line-mask">
            <span className="line-mask-inner hero-headline-arial">They&nbsp;Promise,</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner hero-headline-arial">We&nbsp;Measure.</span>
          </span>
        </h1>

        <p className="hero-sub">
          The independent measurement layer for sustainability.
          Anchored to ESRS. Built for the sceptic.
        </p>

        {/* Instrument row — ledger-like proof device; the single green tick is the one accent mark */}
        <div className="hero-instrument" id="hero-instrument">
          <span className="hero-instrument-rule" aria-hidden="true" />
          <span className="hero-instrument-tick" aria-hidden="true" />
          <span>ESRS-Aligned</span>
          <span className="hero-instrument-sep" aria-hidden="true">·</span>
          <span>A–E Verified Score</span>
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
