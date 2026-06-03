'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
// import { SplineScene } from '@/components/ui/splite'; // (for 3D swap)

const LINES = ['Proof,', 'Not', 'Promise.'];

export default function Hero() {
  return (
    <section className="hero" id="hero">

      {/* Warm radial glow — atmosphere behind everything */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* Object — transparent PNG, bottom-anchored, rises on load */}
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
            width={4693}
            height={2640}
            priority
          />
        </div>
      </div>

      {/* Text — upper center, above the object */}
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

    </section>
  );
}
