'use client';

import { useEffect } from 'react';

export default function SiteScripts() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ST: any = null;

    async function init() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { default: Lenis } = await import('lenis');

      gsap.registerPlugin(ScrollTrigger);
      ST = ScrollTrigger;

      // ── Lenis smooth scroll ──────────────────────────────────
      if (!prefersReduced) {
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value?: number) {
            if (value !== undefined && lenis) lenis.scrollTo(value, { immediate: true });
            return lenis ? lenis.scroll : window.scrollY;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
        });
        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
        gsap.ticker.lagSmoothing(0);
      }

      // ── Preloader ────────────────────────────────────────────
      const preloader = document.getElementById('preloader');
      const counter = document.getElementById('preloader-count');

      if (!preloader || !counter || sessionStorage.getItem('vldx-loaded')) {
        preloader?.style.setProperty('display', 'none');
        revealHero(gsap);
      } else {
        let count = 0;
        const tick = setInterval(() => {
          count++;
          counter.textContent = String(count);
          if (count >= 100) {
            clearInterval(tick);
            sessionStorage.setItem('vldx-loaded', '1');
            gsap.to(preloader, {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut',
              delay: 0.15,
              onComplete() {
                preloader.style.display = 'none';
                revealHero(gsap);
              },
            });
          }
        }, 16);
      }

      // ── General .reveal scroll-trigger ──────────────────────
      if (!prefersReduced) {
        document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
              });
            },
          });
        });
      } else {
        document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }

      // ── Manifesto word-by-word ───────────────────────────────
      const mWords = document.querySelectorAll<HTMLElement>('.manifesto-word');
      if (mWords.length && !prefersReduced) {
        ScrollTrigger.create({
          trigger: '.manifesto',
          start: 'top 78%',
          onEnter: () => {
            gsap.to(mWords, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.04,
            });
          },
        });
      } else {
        mWords.forEach((w) => { w.style.opacity = '1'; w.style.transform = 'none'; });
      }

      // ── Market Failure: stat count-up + pull-quote reveal ───
      const counterEl = document.getElementById('problem-counter');
      const pullEl = document.querySelector<HTMLElement>('.problem-pull');
      if (prefersReduced) {
        if (counterEl) counterEl.textContent = '85';
        if (pullEl) { pullEl.style.opacity = '1'; pullEl.style.transform = 'none'; }
      } else {
        if (counterEl) {
          let fired = false;
          ScrollTrigger.create({
            trigger: '#problem',
            start: 'top 75%',
            onEnter: () => {
              if (fired) return;
              fired = true;
              const obj = { val: 0 };
              gsap.to(obj, {
                val: 85,
                duration: 1.4,
                ease: 'power2.out',
                onUpdate() { counterEl.textContent = String(Math.round(obj.val)); },
                onComplete() { counterEl.textContent = '85'; },
              });
            },
          });
        }
        if (pullEl) {
          ScrollTrigger.create({
            trigger: pullEl,
            start: 'top 78%',
            onEnter: () => {
              gsap.fromTo(pullEl,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
              );
            },
          });
        }
      }

      // ── Case study cards stagger reveal ────────────────────────
      if (!prefersReduced) {
        const cards = document.querySelectorAll<HTMLElement>('.cs-card');
        cards.forEach((card, i) => {
          gsap.set(card, { opacity: 0, y: 32 });
          ScrollTrigger.create({
            trigger: card,
            start: 'top 88%',
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: (i % 2) * 0.1,
                ease: 'power3.out',
              });
            },
          });
        });
      } else {
        document.querySelectorAll<HTMLElement>('.cs-card').forEach((c) => {
          c.style.opacity = '1';
          c.style.transform = 'none';
        });
      }

      // ── System diagram: lines draw + nodes fade ───────────────
      const diagLines = document.querySelectorAll<SVGElement>('.diagram-line');
      const diagNodes = document.querySelectorAll<SVGGElement>('.diagram-node:not(:last-child)');
      if (diagLines.length && !prefersReduced) {
        let diagFired = false;
        ScrollTrigger.create({
          trigger: '.system-diagram',
          start: 'top 75%',
          onEnter: () => {
            if (diagFired) return;
            diagFired = true;
            diagLines.forEach((line, i) => {
              setTimeout(() => line.classList.add('drawn'), i * 60);
            });
            diagNodes.forEach((node, i) => {
              setTimeout(() => node.classList.add('visible'), 200 + i * 80);
            });
          },
        });
        diagNodes.forEach((node, i) => {
          const line = diagLines[i];
          node.addEventListener('mouseenter', () => {
            if (line) line.style.stroke = 'var(--moss)';
          });
          node.addEventListener('mouseleave', () => {
            if (line) line.style.stroke = '';
          });
        });
      } else {
        diagLines.forEach((l) => l.classList.add('drawn'));
        diagNodes.forEach((n) => n.classList.add('visible'));
      }

      // ── Score section 2-col reveal ───────────────────────────
      const scoreCols = document.querySelector<HTMLElement>('.score-cols');
      if (scoreCols) {
        const leftEls = scoreCols.querySelectorAll<HTMLElement>('.score-fade-up');
        const scorecardWrapEl = document.getElementById('scorecard-wrapper');
        const depthPanel = scoreCols.querySelector<HTMLElement>('.score-depth-panel');

        if (leftEls.length) {
          ScrollTrigger.create({
            trigger: scoreCols,
            start: 'top 75%',
            once: true,
            onEnter: () => {
              gsap.to(leftEls, {
                opacity: 1, y: 0, duration: 0.8,
                ease: 'power3.out', stagger: 0.12,
              });
            },
          });
        }
        if (scorecardWrapEl) {
          gsap.set(scorecardWrapEl, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: scoreCols,
            start: 'top 75%',
            once: true,
            onEnter: () => {
              gsap.to(scorecardWrapEl, {
                opacity: 1, y: 0, duration: 1,
                ease: 'power3.out', delay: 0.2,
              });
            },
          });
        }
        if (depthPanel) {
          gsap.set(depthPanel, { y: -24 });
          ScrollTrigger.create({
            trigger: scoreCols,
            start: 'top 75%',
            once: true,
            onEnter: () => {
              gsap.to(depthPanel, {
                y: 0, duration: 1.2,
                ease: 'power3.out', delay: 0.3,
              });
            },
          });
        }
      }

      // ── Scorecard animations ─────────────────────────────────
      const scorecardWrapper = document.getElementById('scorecard-wrapper');
      if (scorecardWrapper) {
        let scoreFired = false;
        ScrollTrigger.create({
          trigger: scorecardWrapper,
          start: 'top 75%',
          onEnter: () => {
            if (scoreFired) return;
            scoreFired = true;
            // Border draw
            const svg = document.getElementById('scorecard-svg') as SVGElement | null;
            const rect = document.getElementById('border-rect') as SVGRectElement | null;
            if (svg && rect) {
              const p = 2 * (svg.clientWidth + svg.clientHeight);
              rect.setAttribute('stroke-dasharray', String(p));
              rect.setAttribute('stroke-dashoffset', String(p));
              rect.getBoundingClientRect();
              rect.style.transition = 'stroke-dashoffset 0.7s ease';
              rect.setAttribute('stroke-dashoffset', '0');
            }
            // Row reveals
            scorecardWrapper.querySelectorAll<HTMLElement>('.sc-reveal').forEach((el) => {
              const delay = parseInt(el.dataset.delay ?? '0', 10);
              setTimeout(() => el.classList.add('sc-visible'), delay);
            });
            // Bar fills
            scorecardWrapper.querySelectorAll<HTMLElement>('.sc-bar-fill').forEach((bar, i) => {
              setTimeout(() => { bar.style.width = (bar.dataset.width ?? '0') + '%'; }, 700 + i * 80);
            });
            // Grade letter scale-in
            scorecardWrapper.querySelectorAll<HTMLElement>('.grade-letter').forEach((letter, i) => {
              setTimeout(() => {
                gsap.fromTo(letter,
                  { scale: 0.4, opacity: 0 },
                  { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' },
                );
              }, 1100 + i * 180);
            });
            setTimeout(() => scorecardWrapper.classList.add('breathing'), 2400);
          },
        });
        // Grade tooltips
        scorecardWrapper.querySelectorAll<HTMLElement>('.grade-box').forEach((box) => {
          const tip = box.dataset.tip;
          if (!tip) return;
          box.addEventListener('mouseenter', () => {
            let tooltip = box.querySelector<HTMLElement>('.grade-tooltip');
            if (!tooltip) {
              tooltip = document.createElement('div');
              tooltip.className = 'grade-tooltip';
              tooltip.textContent = tip;
              box.appendChild(tooltip);
            }
            requestAnimationFrame(() => tooltip!.classList.add('tip-visible'));
          });
          box.addEventListener('mouseleave', () => {
            const t = box.querySelector<HTMLElement>('.grade-tooltip');
            if (t) { t.classList.remove('tip-visible'); setTimeout(() => t.remove(), 150); }
          });
        });
        // Component row hover
        scorecardWrapper.querySelectorAll<HTMLElement>('.sc-component-row').forEach((row) => {
          const grade = row.querySelector<HTMLElement>('.sc-comp-grade');
          const bar = row.querySelector<HTMLElement>('.sc-bar-fill');
          row.addEventListener('mouseenter', () => {
            if (grade) gsap.to(grade, { scale: 1.15, duration: 0.15 });
            if (bar) bar.style.filter = 'brightness(1.3)';
          });
          row.addEventListener('mouseleave', () => {
            if (grade) gsap.to(grade, { scale: 1, duration: 0.15 });
            if (bar) bar.style.filter = '';
          });
        });
      }

      // ── CTA headline line-mask ────────────────────────────────
      const ctaLines = document.querySelectorAll<HTMLElement>('.cta-headline .line-mask-inner');
      if (ctaLines.length && !prefersReduced) {
        ScrollTrigger.create({
          trigger: '.cta-headline',
          start: 'top 80%',
          onEnter: () => {
            gsap.to(ctaLines, {
              y: 0,
              duration: 1.0,
              ease: 'power4.out',
              stagger: 0.12,
            });
          },
        });
      } else {
        ctaLines.forEach((l) => { l.style.transform = 'none'; });
      }

      // ── Magnetic buttons (nav pill + CTA section) ───────────────
      document.querySelectorAll<HTMLElement>('#nav-pill-cta, #cta-main-btn').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
          gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
      });

      // ── Hero scroll parallax: object drifts up + fades ──────
      const imgWrap = document.getElementById('hero-image-wrap');
      if (!prefersReduced) {
        ScrollTrigger.create({
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate(self: { progress: number }) {
            const p = self.progress;
            if (imgWrap) gsap.set(imgWrap, { y: -120 * p, opacity: 1 - p * 0.7 });
          },
        });
      }

      // ── Hero mouse tilt (disabled on touch devices) ──────────
      const heroSection = document.getElementById('hero');
      const tiltEl = document.getElementById('hero-image-tilt');
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      if (heroSection && tiltEl && !prefersReduced && !isTouchDevice) {
        heroSection.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent;
          const r = heroSection.getBoundingClientRect();
          const dx = (me.clientX - r.width / 2) / (r.width / 2);
          const dy = (me.clientY - r.height / 2) / (r.height / 2);
          gsap.to(tiltEl, {
            rotateX: dy * -3,
            rotateY: dx * 3,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 900,
          });
        });
        heroSection.addEventListener('mouseleave', () => {
          gsap.to(tiltEl, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power2.out' });
        });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function revealHero(gsap: any) {
      // The ONE orchestrated signature: a calm, staggered load reveal.
      // Vocabulary = motion tokens: expo.out (--ease-reveal), 0.9s big / 0.6s secondary, 70ms cascade.
      const eyebrow       = document.querySelector<HTMLElement>('.hero-eyebrow');
      const headlineLines = document.querySelectorAll<HTMLElement>('#hero-headline .line-mask-inner');
      const imgWrap       = document.getElementById('hero-image-wrap');
      const heroSub       = document.querySelector<HTMLElement>('.hero-sub');
      const instrument    = document.getElementById('hero-instrument');
      const scrollCue     = document.getElementById('hero-scroll-cue');

      if (prefersReduced) {
        if (eyebrow) eyebrow.style.opacity = '1';
        headlineLines.forEach((l) => { l.style.transform = 'none'; });
        if (imgWrap) gsap.set(imgWrap, { opacity: 1 });
        if (heroSub) heroSub.style.opacity = '1';
        if (instrument) instrument.style.opacity = '1';
        if (scrollCue) scrollCue.style.opacity = '1';
        return;
      }

      const EASE = 'expo.out';                 // = cubic-bezier(0.16, 1, 0.3, 1)
      const tl = gsap.timeline();

      // Object — quiet, slow rise underneath, begins immediately (the brand backdrop, not the lead)
      if (imgWrap) tl.fromTo(imgWrap,
        { y: 60, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out', clearProps: 'scale' },
        0
      );

      // Eyebrow
      if (eyebrow) tl.fromTo(eyebrow,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE },
        0.1
      );

      // Headline — masked lines rise out of nothing, 70ms stagger (the centrepiece).
      // Normalise GSAP's transform cache first: the CSS `translateY(102%)` initial state
      // reads back from the computed matrix as a px `y` (~126px), which survives a
      // yPercent tween and keeps the line clipped. Declaring y:0 + yPercent:102 in a set
      // overrides that, so animating both to 0 actually lands the line in its mask.
      if (headlineLines.length) {
        gsap.set(headlineLines, { y: 0, yPercent: 102 });
        tl.to(headlineLines,
          { y: 0, yPercent: 0, duration: 0.9, ease: EASE, stagger: 0.07 },
          0.2
        );
      }

      // Sub-line
      if (heroSub) tl.fromTo(heroSub,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE },
        0.65
      );

      // Instrument row
      if (instrument) tl.fromTo(instrument,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE },
        0.78
      );

      // Scroll cue
      if (scrollCue) tl.fromTo(scrollCue,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: EASE },
        0.9
      );
    }

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (ST) ST.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return null;
}
