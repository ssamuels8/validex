'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

const SOLID_LETTERS = ['V', 'A', 'L', 'I', 'D'];
const STROKE_LETTERS = ['E', 'X'];

/* Six-spoke asterisk seal-mark — the only colour in the wordmark */
function AsteriskMark() {
  return (
    <svg id="hw-ast-svg" viewBox="0 0 40 40" aria-hidden="true">
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <rect
          key={deg}
          x="18.2"
          y="2"
          width="3.6"
          height="36"
          rx="1.8"
          fill="currentColor"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero" data-field="#F4EFE6">

      {/* Warm radial glow */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* THE WORDMARK — monumental, cropped at both edges */}
      <div className="hero-wordmark-zone" id="hero-wordmark-zone">
        <h1 className="hero-wordmark" id="hero-wordmark" aria-label="Validex">
          {SOLID_LETTERS.map((l) => (
            <span className="hw-letter" key={l} aria-hidden="true">
              <span className="hw-inner">{l}</span>
            </span>
          ))}
          {STROKE_LETTERS.map((l) => (
            <span className="hw-letter" key={l} aria-hidden="true">
              <span className="hw-inner hw-stroke">{l}</span>
            </span>
          ))}
          <span className="hw-letter hw-ast" aria-hidden="true">
            <span className="hw-inner"><AsteriskMark /></span>
          </span>
        </h1>

        {/* Baseline rule — full bleed, tagged, with the seal stamped on the line */}
        <div className="hero-baseline">
          <span className="hero-baseline-rule" id="hero-baseline-rule" aria-hidden="true" />
          <div className="hero-baseline-tags" id="hero-baseline-tags">
            <span className="hero-tag">Independent Sustainability Measurement</span>
            <span className="hero-tag">EST. 2026 · The Hague</span>
          </div>
          <svg className="hero-seal-line" id="hero-seal" viewBox="0 0 64 64" aria-hidden="true">
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
      </div>

      {/* Intro block — bottom left */}
      <div className="hero-intro" id="hero-intro">
        <p className="hero-intro-lead">They promise. We measure.</p>
        <p className="hero-intro-body">
          The independent measurement layer for sustainability.
          Anchored to ESRS. Built for the sceptic.
        </p>
      </div>

      {/* Scroll cue — bottom right */}
      <div className="hero-scroll-cue-wrap" id="hero-scroll-cue">
        <div className="hero-scroll-cue" aria-label="Scroll down">
          <ArrowDown size={16} strokeWidth={1.5} />
        </div>
      </div>

    </section>
  );
}
