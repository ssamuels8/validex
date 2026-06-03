'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
// import { SplineScene } from '@/components/ui/splite'; // (for 3D swap)

const LINES = ['Proof,', 'Not', 'Promise.'];

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/*
        Rounded framed panel — 10px inset from viewport edges.
        Panel background: warm gradient + moss glow + global film grain.

        === DARK PANEL VARIANT: add class "hero-panel--dark" to .hero-panel ===
        (changes background to var(--ink), object glows green)
      */}
      <div className="hero-panel">

        {/* Panel atmosphere: extra warm glow low-center */}
        <div className="hero-atmosphere" aria-hidden="true" />

        {/* Object — bottom-anchored, rises up behind the headline */}
        <div className="hero-image-wrap" id="hero-image-wrap">
          <div className="hero-object-shadow" aria-hidden="true" />
          <div className="hero-image-tilt" id="hero-image-tilt">
            {/* === SWAP TO LIVE 3D: uncomment SplineScene, remove Image block ===
            <SplineScene
              scene="PASTE_SPLINE_SCENE_URL_HERE"
              className="w-full h-full"
            />
            ================================================================= */}
            <Image
              src="/hero-object.png"
              alt="Validex — verified sustainability measurement instrument"
              width={1600}
              height={1200}
              priority
            />
          </div>
        </div>

        {/* Text layer — upper center */}
        <div className="hero-text">
          <span className="hero-pill">
            Independent Sustainability Measurement
          </span>
          <h1 className="hero-headline">
            {LINES.map((line, i) => (
              <span key={i} className="line-mask">
                <span className="line-mask-inner">{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-sub">
            Turning sustainability claims into a verifiable score.
            Anchored to ESRS.
          </p>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue-wrap" id="hero-scroll-cue">
          <div className="hero-scroll-cue" aria-label="Scroll down">
            <ArrowDown size={16} strokeWidth={1.5} />
          </div>
        </div>

      </div>
    </section>
  );
}
