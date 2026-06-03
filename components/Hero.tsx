'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
// import { SplineScene } from '@/components/ui/splite'; // (for 3D swap)

const LINES = ['Measure', 'What Others', 'Only', 'Promise.'];

export default function Hero() {
  return (
    <section className="hero" id="hero">

      {/* Warm radial glow */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* Text — top-left; comes first in DOM so mobile stacks it above the object */}
      <div className="hero-text">
        <span className="hero-pill">
          Independent Sustainability Measurement
        </span>
        <h1 className="hero-headline display" id="hero-headline">
          {LINES.map((line, i) => (
            <span key={i} className="line-mask" data-line={i}>
              <span className="line-mask-inner">{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub">
          The independent measurement layer for sustainability.
          Anchored to ESRS. Built for the sceptic.
        </p>
      </div>

      {/* Object — centered, large, bleeds off edges */}
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

      {/* Scroll cue — bottom center */}
      <div className="hero-scroll-cue-wrap" id="hero-scroll-cue">
        <div className="hero-scroll-cue" aria-label="Scroll down">
          <ArrowDown size={16} strokeWidth={1.5} />
        </div>
      </div>

    </section>
  );
}
