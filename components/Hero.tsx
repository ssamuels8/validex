'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" id="hero">

      {/* Warm radial glow */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* Baseline grid — engineering-paper rules, drawn in on load */}
      <div className="hero-grid" aria-hidden="true">
        <span className="hero-gridline" />
        <span className="hero-gridline" />
        <span className="hero-gridline" />
        <span className="hero-gridline" />
      </div>

      {/* Text block — vertically centered, far left, z2 */}
      <div className="hero-text">
        <span className="hero-eyebrow">
          Independent Sustainability Measurement
        </span>

        {/* Headline + measurement annotations share one anchor box */}
        <div className="hero-headline-wrap" id="hero-headline-wrap">
          <h1 className="hero-headline" id="hero-headline">
            <span className="line-mask">
              <span className="line-mask-inner hero-headline-arial" id="hl-line-1">They&nbsp;Promise,</span>
            </span>
            <span className="line-mask">
              <span className="line-mask-inner hero-headline-arial" id="hl-line-2">We&nbsp;Measure.</span>
            </span>
          </h1>

          {/* Annotation layer — dimension line, ticks, typed label.
              Positioned against the live type bbox in SiteScripts. */}
          <div className="hero-annotation" id="hero-annotation" aria-hidden="true">
            <svg className="hero-dim-svg" id="hero-dim-svg" height="36">
              <path className="hero-dim-path hero-dim-forest" id="dim-tick-l" pathLength={1} />
              <path className="hero-dim-path" id="dim-tick-r" pathLength={1} />
              <path className="hero-dim-path" id="dim-line" pathLength={1} />
              <path className="hero-dim-path" id="dim-arrow-l" pathLength={1} />
              <path className="hero-dim-path" id="dim-arrow-r" pathLength={1} />
            </svg>
            <span className="hero-dim-label" id="hero-dim-label">MEASURED · 2026</span>
            <span className="hero-reg-tick" id="reg-tick-1" />
            <span className="hero-reg-tick" id="reg-tick-2" />
          </div>

          {/* Grade seal — ink-stamped next to the final period */}
          <svg className="hero-seal" id="hero-seal" viewBox="0 0 64 64" aria-hidden="true">
            <defs>
              <path
                id="hero-seal-arc"
                d="M 32,32 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0"
                fill="none"
              />
            </defs>
            <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <text className="hero-seal-text">
              <textPath href="#hero-seal-arc">VALIDEX VERIFIED · EST 2026 · ESRS ·</textPath>
            </text>
            <text x="32" y="33" className="hero-seal-grade">A</text>
          </svg>
        </div>

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
