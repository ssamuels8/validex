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
    const cleanups: Array<() => void> = [];

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

      // ── Colour-field morph: body bg crossfades between section fields ──
      const fieldSections = document.querySelectorAll<HTMLElement>('[data-field]');
      if (fieldSections.length && !prefersReduced) {
        document.body.classList.add('field-mode');
        fieldSections.forEach((sec) => {
          ScrollTrigger.create({
            trigger: sec,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle(self: { isActive: boolean }) {
              if (self.isActive) {
                gsap.to(document.body, {
                  backgroundColor: sec.dataset.field,
                  duration: 0.6,
                  ease: 'power1.inOut',   // ≈ --ease-ui
                  overwrite: 'auto',
                });
              }
            },
          });
        });
      }

      // ── Velocity marquee: speed + skew react to scroll velocity ──
      // Skew goes on the wrapper column — the track's own CSS keyframe animation
      // owns its transform, so an inline GSAP skew there would be overridden.
      const mqTrack = document.querySelector<HTMLElement>('.framework-slider-col [style*="infiniteSlide"]');
      const mqCol = document.querySelector<HTMLElement>('.framework-slider-col');
      if (mqTrack && mqCol && !prefersReduced) {
        let mqVel = 0;
        const skewTo = gsap.quickTo(mqCol, 'skewX', { duration: 0.4, ease: 'power2.out' });
        if (lenis) lenis.on('scroll', (e: { velocity: number }) => { mqVel = e.velocity; });
        const mqTick = () => {
          skewTo(Math.max(-6, Math.min(6, mqVel * 0.45)));
          const anims = mqTrack.getAnimations ? mqTrack.getAnimations() : [];
          if (anims[0]) anims[0].playbackRate = 1 + Math.min(Math.abs(mqVel) / 12, 2.5);
          mqVel *= 0.9; // settle back on idle
        };
        gsap.ticker.add(mqTick);
        cleanups.push(() => gsap.ticker.remove(mqTick));
      }

      // ── General .reveal scroll-trigger ──────────────────────
      if (!prefersReduced) {
        document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'expo.out',
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
              ease: 'expo.out',
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
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
              );
            },
          });
        }
      }

      // ── Supply chain rail: line draws through, cards rise in sequence ──
      const chainRail = document.getElementById('chain-rail');
      const chainLine = document.getElementById('chain-line-path');
      const chainCards = document.querySelectorAll<HTMLElement>('.chain-card');
      if (chainRail && !prefersReduced) {
        ScrollTrigger.create({
          trigger: chainRail,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (chainLine) gsap.fromTo(chainLine,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }
            );
            if (chainCards.length) gsap.to(chainCards, {
              opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.07, delay: 0.15,
            });
          },
        });
      } else {
        if (chainLine) chainLine.style.strokeDashoffset = '0';
        chainCards.forEach((c) => { c.style.opacity = '1'; c.style.transform = 'none'; });
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
                duration: 0.6,
                delay: (i % 2) * 0.07,
                ease: 'expo.out',
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
      if (scoreCols && prefersReduced) {
        scoreCols.querySelectorAll<HTMLElement>('.score-fade-up').forEach((el) => {
          el.style.opacity = '1'; el.style.transform = 'none';
        });
        const wrapEl = document.getElementById('scorecard-wrapper');
        if (wrapEl) { wrapEl.style.opacity = '1'; wrapEl.style.transform = 'none'; }
      } else if (scoreCols) {
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
                opacity: 1, y: 0, duration: 0.6,
                ease: 'expo.out', stagger: 0.07,
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
                opacity: 1, y: 0, duration: 0.9,
                ease: 'expo.out', delay: 0.14,
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
                y: 0, duration: 0.9,
                ease: 'expo.out', delay: 0.21,
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
            // Bar fills — scaleX, not width (compositor-only)
            scorecardWrapper.querySelectorAll<HTMLElement>('.sc-bar-fill').forEach((bar, i) => {
              setTimeout(() => {
                bar.style.transform = `scaleX(${Number(bar.dataset.width ?? 0) / 100})`;
              }, 700 + i * 80);
            });
            // Grade letter scale-in
            scorecardWrapper.querySelectorAll<HTMLElement>('.grade-letter').forEach((letter, i) => {
              if (prefersReduced) {
                letter.style.opacity = '1';
                return;
              }
              setTimeout(() => {
                gsap.fromTo(letter,
                  { scale: 0.4, opacity: 0 },
                  { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' },
                );
              }, 1100 + i * 180);
            });
            if (!prefersReduced) setTimeout(() => scorecardWrapper.classList.add('breathing'), 2400);
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

      // ── Magnetic buttons (nav pill + apply submit) ──────────────
      document.querySelectorAll<HTMLElement>('#nav-pill-cta, #apply-submit').forEach((btn) => {
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

    }

    // ── Hero: anchor the measurement annotations to the live type ──
    // Positions the dimension SVG, label, registration ticks, and seal
    // against the bounding boxes of the two headline lines. Re-run on resize.
    function measureHeroAnnotations() {
      const wrap   = document.getElementById('hero-headline-wrap');
      const l1     = document.getElementById('hl-line-1');
      const l2     = document.getElementById('hl-line-2');
      const svg    = document.getElementById('hero-dim-svg');
      const label  = document.getElementById('hero-dim-label');
      const tick1  = document.getElementById('reg-tick-1');
      const tick2  = document.getElementById('reg-tick-2');
      const seal   = document.getElementById('hero-seal');
      if (!wrap || !l1 || !l2 || !svg || !label || !seal) return;

      const wrapR = wrap.getBoundingClientRect();
      const r1 = l1.getBoundingClientRect();
      const r2 = l2.getBoundingClientRect();
      // Use untransformed boxes: during the masked rise the lines are translated
      // down, which would skew anchors — measure from the mask (parent) instead.
      const m1 = (l1.parentElement as HTMLElement).getBoundingClientRect();
      const m2 = (l2.parentElement as HTMLElement).getBoundingClientRect();
      const w2 = r2.width; // glyph width is unaffected by translateY

      // Dimension line under "We Measure." — full width of the line
      const W = Math.max(80, Math.round(w2));
      const dimTop = m2.bottom - wrapR.top + 6;
      svg.setAttribute('width', String(W));
      svg.style.left = `${m2.left - wrapR.left}px`;
      svg.style.top = `${dimTop}px`;
      const set = (id: string, d: string) => document.getElementById(id)?.setAttribute('d', d);
      set('dim-line',    `M 10 18 H ${W - 10}`);
      set('dim-tick-l',  'M 1 8 V 28');
      set('dim-tick-r',  `M ${W - 1} 8 V 28`);
      set('dim-arrow-l', 'M 18 12 L 10 18 L 18 24');
      set('dim-arrow-r', `M ${W - 18} 12 L ${W - 10} 18 L ${W - 18} 24`);

      // Label — beside the line if there is room, otherwise below it
      const labelW = 170;
      const roomRight = window.innerWidth - (m2.left + W) > labelW + 40;
      if (roomRight) {
        label.style.left = `${m2.left - wrapR.left + W + 16}px`;
        label.style.top = `${dimTop + 12}px`;
      } else {
        label.style.left = `${m2.left - wrapR.left + 10}px`;
        label.style.top = `${dimTop + 30}px`;
      }

      // Registration ticks — cap-height of line 1, baseline of line 2
      if (tick1) {
        tick1.style.left = `${m1.left - wrapR.left + r1.width + 14}px`;
        tick1.style.top = `${m1.top - wrapR.top + 2}px`;
      }
      if (tick2) {
        tick2.style.left = `${m2.left - wrapR.left - 20}px`;
        tick2.style.top = `${m2.bottom - wrapR.top - 14}px`;
      }

      // Seal — next to the final period, baseline-aligned
      const sealSize = window.innerWidth <= 640 ? 44 : 64;
      seal.style.left = `${m2.left - wrapR.left + w2 + 16}px`;
      seal.style.top = `${m2.bottom - wrapR.top - sealSize - 2}px`;
    }

    // Typed label — "CLAIM — UNVERIFIED" flips to "MEASURED · 2026"
    const TYPE_A = 'CLAIM — UNVERIFIED';
    const TYPE_B = 'MEASURED · 2026';
    const timers: number[] = [];
    function typeText(el: HTMLElement, text: string, msPerChar: number, done?: () => void) {
      let i = 0;
      el.textContent = '';
      const t = window.setInterval(() => {
        i += 1;
        el.textContent = text.slice(0, i);
        if (i >= text.length) { window.clearInterval(t); done?.(); }
      }, msPerChar);
      timers.push(t);
    }
    function eraseText(el: HTMLElement, msPerChar: number, done?: () => void) {
      const t = window.setInterval(() => {
        const cur = el.textContent ?? '';
        el.textContent = cur.slice(0, -1);
        if (!el.textContent) { window.clearInterval(t); done?.(); }
      }, msPerChar);
      timers.push(t);
    }
    function runLabelCycle(el: HTMLElement) {
      typeText(el, TYPE_A, 34, () => {
        const hold = window.setTimeout(() => {
          eraseText(el, 14, () => typeText(el, TYPE_B, 34));
        }, 900);
        timers.push(hold as unknown as number);
      });
    }
    cleanups.push(() => timers.forEach((t) => { window.clearInterval(t); window.clearTimeout(t); }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function revealHero(gsap: any) {
      // THE ONE SIGNATURE: the type gets measured, then graded.
      // Vocabulary = motion tokens: expo.out (--ease-reveal), 0.9s/0.6s, 70ms cascade.
      const eyebrow       = document.querySelector<HTMLElement>('.hero-eyebrow');
      const headlineLines = document.querySelectorAll<HTMLElement>('#hero-headline .line-mask-inner');
      const gridlines     = document.querySelectorAll<HTMLElement>('.hero-gridline');
      const annotation    = document.getElementById('hero-annotation');
      const dimPaths      = document.querySelectorAll<SVGPathElement>('.hero-dim-path');
      const regTicks      = document.querySelectorAll<HTMLElement>('.hero-reg-tick');
      const label         = document.getElementById('hero-dim-label');
      const seal          = document.getElementById('hero-seal');
      const heroSub       = document.querySelector<HTMLElement>('.hero-sub');
      const instrument    = document.getElementById('hero-instrument');
      const scrollCue     = document.getElementById('hero-scroll-cue');
      const hero          = document.getElementById('hero');

      // Anchor annotations to the type now and on every resize
      measureHeroAnnotations();
      const ro = new ResizeObserver(() => measureHeroAnnotations());
      const headline = document.getElementById('hero-headline');
      if (headline) ro.observe(headline);
      window.addEventListener('resize', measureHeroAnnotations);
      cleanups.push(() => { ro.disconnect(); window.removeEventListener('resize', measureHeroAnnotations); });

      if (prefersReduced) {
        // Full static final state — no animation. CSS reduce-block covers the
        // class-level states; JS finishes the JS-positioned layers.
        if (eyebrow) eyebrow.style.opacity = '1';
        headlineLines.forEach((l) => { l.style.transform = 'none'; });
        if (annotation) annotation.style.opacity = '1';
        if (label) label.textContent = TYPE_B;
        if (heroSub) heroSub.style.opacity = '1';
        if (instrument) instrument.style.opacity = '1';
        if (scrollCue) scrollCue.style.opacity = '1';
        return;
      }

      const EASE = 'expo.out';                 // = cubic-bezier(0.16, 1, 0.3, 1)
      const tl = gsap.timeline();

      // 1 · t=0.0 — baseline grid draws in, like engineering paper
      if (gridlines.length) tl.to(gridlines,
        { scaleX: 1, duration: 0.9, ease: EASE, stagger: 0.08 },
        0
      );

      // 2 · t=0.3 — headline masked rise, line by line.
      // (y + yPercent both declared: the CSS translateY(102%) initial state parses
      // back from the matrix as a px `y`, which would survive a yPercent-only tween.)
      if (headlineLines.length) {
        gsap.set(headlineLines, { y: 0, yPercent: 102 });
        tl.to(headlineLines,
          { y: 0, yPercent: 0, duration: 0.9, ease: EASE, stagger: 0.07 },
          0.3
        );
      }

      // 3 · t=0.9 — THE MEASUREMENT: dimension line + ticks draw, label types on
      if (annotation) tl.set(annotation, { opacity: 1 }, 0.9);
      if (dimPaths.length) tl.fromTo(dimPaths,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.06 },
        0.9
      );
      if (regTicks.length) tl.to(regTicks,
        { opacity: 1, duration: 0.4, ease: EASE, stagger: 0.07 },
        1.1
      );
      if (label) tl.call(() => runLabelCycle(label), [], 1.05);

      // 4 · t=1.6 — THE GRADE: the seal stamps in beside the final period
      if (seal) tl.fromTo(seal,
        { opacity: 0, scale: 1.4, rotation: 2 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: EASE },
        1.6
      );

      // 5 · t=1.9 — eyebrow, sub-line, instrument row, scroll cue, staggered
      const meta = [eyebrow, heroSub, instrument, scrollCue].filter(Boolean);
      if (meta.length) tl.fromTo(meta,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.07 },
        1.9
      );

      // Idle: label re-types every ~8s; annotation layer drifts ≤4px with the mouse
      const idleLoop = window.setInterval(() => {
        if (label && document.visibilityState === 'visible') runLabelCycle(label);
      }, 8000);
      timers.push(idleLoop);

      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (hero && annotation && !isTouch) {
        const onMove = (e: MouseEvent) => {
          const dx = (e.clientX / window.innerWidth - 0.5) * 2;
          const dy = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(annotation, { x: dx * 4, y: dy * 4, duration: 0.8, ease: 'power2.out' });
        };
        hero.addEventListener('mousemove', onMove);
        cleanups.push(() => hero.removeEventListener('mousemove', onMove));
      }
    }

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (ST) ST.getAll().forEach((t: any) => t.kill());
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
