'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { AnimatedShinyText } from './ui/animated-shiny-text';

const GRADIENT = 'linear-gradient(90deg, #15130E, #2E5E3E, #15130E)';
const TEXT_CLS =
  'display font-extrabold tracking-[-0.03em] leading-[0.9] text-[clamp(2.6rem,8.5vw,9.5rem)] text-left';
const WRAP_CLS = 'justify-start items-start py-0 text-left';

export default function Hero() {
  return (
    <section className="hero" id="hero">

      {/* Warm radial glow */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* Text block — vertically centered left, z2; first in DOM so mobile stacks above object */}
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
            textClassName={TEXT_CLS}
            className={WRAP_CLS}
          >
            They Promise,
          </AnimatedShinyText>
          <AnimatedShinyText
            gradientColors={GRADIENT}
            gradientAnimationDuration={4}
            hoverEffect={false}
            textClassName={TEXT_CLS}
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

      {/* Object — right-anchored, large, bleeds off right edge */}
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
