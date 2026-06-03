'use client';

import Image from 'next/image';
// import { SplineScene } from '@/components/ui/splite'; // (for 3D swap)

const WORDS = ["Proof,", "Not", "Promise."];

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-text">
        <span className="hero-pill">Independent Sustainability Measurement</span>

        <h1 className="hero-headline">
          {WORDS.map((word, i) => (
            <span key={i} className="line-mask">
              <span className="line-mask-inner">{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub">
          Validex turns sustainability claims into a verifiable score.
          Anchored to ESRS. Built for the sceptic.
        </p>

        <div className="hero-cta-wrap">
          <a href="mailto:hello@validex.com" className="hero-cta" id="hero-cta-btn">
            Get In Touch ↗
          </a>
        </div>
      </div>

      {/* ── HERO OBJECT ─────────────────────────────────────────────
          Currently: next/image with mix-blend-mode multiply.
          Light-grey image background dissolves into var(--paper) bone.

          === SWAP TO LIVE 3D: uncomment the SplineScene block below
              and comment out the Image block. Paste your scene URL. ===

          <div className="hero-image-wrap" id="hero-image-wrap">
            <div className="hero-image-tilt" id="hero-image-tilt">
              <SplineScene
                scene="PASTE_SPLINE_SCENE_URL_HERE"
                className="w-full h-full"
              />
            </div>
          </div>

          =========================================================== */}
      <div className="hero-image-wrap" id="hero-image-wrap">
        <div className="hero-image-tilt" id="hero-image-tilt">
          <Image
            src="/hero-object.jpg"
            alt="Validex — verified sustainability score instrument"
            width={820}
            height={680}
            priority
          />
        </div>
      </div>

      <p className="hero-scroll">Scroll ↓</p>
    </section>
  );
}
