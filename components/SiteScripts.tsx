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
              duration: 0.6,
              ease: 'expo.out',
              stagger: 0.04,
            });
          },
        });
      } else {
        mWords.forEach((w) => { w.style.opacity = '1'; w.style.transform = 'none'; });
      }

      // ── Market Failure: count-up + scan-reveal + word-by-word scrub ──
      const counterEl = document.getElementById('problem-counter');
      const scanEl = document.getElementById('problem-scan');
      const pqWords = document.querySelectorAll<HTMLElement>('.pq-word');
      if (prefersReduced) {
        if (counterEl) counterEl.textContent = '85';
        pqWords.forEach((w) => { w.style.opacity = '1'; });
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
                onComplete() {
                  counterEl.textContent = '85';
                  // Scan rule sweeps the digits once — the reading completes
                  const wrap = counterEl.parentElement;
                  if (scanEl && wrap) {
                    gsap.fromTo(scanEl,
                      { y: 0, opacity: 1 },
                      { y: wrap.offsetHeight, opacity: 0, duration: 0.7, ease: 'power2.inOut' }
                    );
                  }
                },
              });
            },
          });
        }
        // Kinetic text: each word lifts 0.15 → 1, tied to the scrollbar (~60vh)
        if (pqWords.length) {
          gsap.to(pqWords, {
            opacity: 1,
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: {
              trigger: '.problem-pull',
              start: 'top 80%',
              end: '+=60%',
              scrub: true,
            },
          });
        }
      }

      // ── Supply chain rail: line draws, cards settle in, pulse travels ──
      const chainRail = document.getElementById('chain-rail');
      const chainLine = document.getElementById('chain-line-path');
      const chainPulse = document.getElementById('chain-pulse');
      const chainCards = Array.from(document.querySelectorAll<HTMLElement>('.chain-card'));
      if (chainRail && !prefersReduced) {
        // Alternating -2°/+2° settle, origin at the base of each card
        chainCards.forEach((c, i) => {
          gsap.set(c, { rotation: i % 2 === 0 ? -2 : 2, transformOrigin: '50% 100%' });
          const idxEl = c.querySelector<HTMLElement>('.chain-card-idx');
          if (idxEl) idxEl.textContent = '00'; // counts up to its real index on reveal
        });
        ScrollTrigger.create({
          trigger: chainRail,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (chainLine) gsap.fromTo(chainLine,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }
            );
            gsap.to(chainCards, {
              opacity: 1, y: 0, rotation: 0,
              duration: 0.6, ease: 'expo.out', stagger: 0.07, delay: 0.15,
              onComplete() {
                // Hand the cards to CSS so :hover lift works (inline transform cleared)
                chainCards.forEach((c) => c.classList.add('chain-in'));
                gsap.set(chainCards, { clearProps: 'transform,opacity' });
              },
            });
            // Index numbers count 00 → 0N
            chainCards.forEach((c, i) => {
              const idxEl = c.querySelector<HTMLElement>('.chain-card-idx');
              if (!idxEl) return;
              const obj = { v: 0 };
              gsap.to(obj, {
                v: i + 1, duration: 0.6, delay: 0.2 + i * 0.07, ease: 'power2.out',
                onUpdate() { idxEl.textContent = String(Math.round(obj.v)).padStart(2, '0'); },
              });
            });
            // THE PULSE — one forest light flowing the pipeline, ~6s loop
            if (chainPulse && window.innerWidth > 900) {
              const ptl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' }, delay: 1.2 });
              ptl.fromTo(chainPulse, { x: 0 }, { x: () => chainRail.clientWidth, duration: 6 }, 0)
                 .fromTo(chainPulse, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0)
                 .to(chainPulse, { autoAlpha: 0, duration: 0.45 }, 5.55);
              const onChainResize = () => ptl.invalidate();
              window.addEventListener('resize', onChainResize);
              cleanups.push(() => { window.removeEventListener('resize', onChainResize); ptl.kill(); });
            }
          },
        });
      } else {
        if (chainLine) chainLine.style.strokeDashoffset = '0';
        chainCards.forEach((c) => {
          c.classList.add('chain-in');
          const idxEl = c.querySelector<HTMLElement>('.chain-card-idx');
          if (idxEl) idxEl.textContent = idxEl.dataset.n ?? idxEl.textContent;
        });
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

      // ── Taxonomy diagram: entrance once, hover/lock. Static at idle. ──
      const taxoSvg = document.getElementById('taxo-svg');
      if (taxoSvg) {
        const taxoSpokes = Array.from(document.querySelectorAll<SVGLineElement>('.taxo-spoke'));
        const taxoNodes = Array.from(document.querySelectorAll<SVGGElement>('.taxo-node'));
        const taxoInners = Array.from(document.querySelectorAll<SVGGElement>('.taxo-node-inner'));
        const taxoNames = Array.from(document.querySelectorAll<SVGTextElement>('.taxo-name'));
        const taxoCenter = document.getElementById('taxo-center');
        const taxoDetail = document.getElementById('taxo-detail');
        const finePointer = window.matchMedia('(pointer: fine)').matches;
        let taxoLocked = -1;

        if (!prefersReduced) {
          gsap.set(taxoInners, { scale: 0.6, autoAlpha: 0, transformOrigin: '0px 0px' });
          gsap.set(taxoNames, { autoAlpha: 0 });
          if (taxoCenter) gsap.set(taxoCenter, { scale: 0, svgOrigin: '450 450' });
          ScrollTrigger.create({
            trigger: taxoSvg,
            start: 'top 75%',
            once: true,
            onEnter: () => {
              gsap.fromTo(taxoSpokes,
                { strokeDashoffset: 1 },
                { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.06 }
              );
              gsap.to(taxoInners, {
                scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.06, delay: 0.4,
              });
              gsap.to(taxoNames, {
                autoAlpha: 1, duration: 0.5, ease: 'expo.out', stagger: 0.05, delay: 0.9,
              });
              if (taxoCenter) gsap.to(taxoCenter, {
                scale: 1, duration: 0.6, ease: 'expo.out', delay: 1.5,
              });
            },
          });
        }

        const taxoActivate = (i: number, on: boolean) => {
          taxoNodes.forEach((n, j) => {
            n.classList.toggle('active', on && j === i);
            n.classList.toggle('dim', on && j !== i);
          });
          taxoSpokes.forEach((sp, j) => {
            sp.classList.toggle('active', on && j === i);
            sp.classList.toggle('dim', on && j !== i);
          });
        };
        const taxoShowDetail = (i: number) => {
          if (!taxoDetail) return;
          const n = taxoNodes[i];
          taxoDetail.textContent =
            `E.g. ${n.dataset.name} — measured in ${n.dataset.unit}, scored against ESRS.`;
          taxoDetail.classList.add('show');
        };
        taxoNodes.forEach((n, i) => {
          if (finePointer) {
            n.addEventListener('mouseenter', () => { if (taxoLocked < 0) taxoActivate(i, true); });
            n.addEventListener('mouseleave', () => { if (taxoLocked < 0) taxoActivate(i, false); });
          }
          n.addEventListener('click', () => {
            if (taxoLocked === i) {
              taxoLocked = -1;
              taxoActivate(i, false);
              taxoDetail?.classList.remove('show');
            } else {
              if (taxoLocked >= 0) taxoActivate(taxoLocked, false);
              taxoLocked = i;
              taxoActivate(i, true);
              taxoShowDetail(i);
            }
          });
        });
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

      // ── Footer wordmark: stroke fills to solid cream as it enters ──
      const wmFill = document.getElementById('footer-wordmark-fill');
      if (wmFill && !prefersReduced) {
        gsap.fromTo(wmFill,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.site-footer',
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      } else if (wmFill) {
        wmFill.style.opacity = '1';
      }

      // ── Magnetic buttons (nav pill + apply submit) ──────────────
      document.querySelectorAll<HTMLElement>('#apply-cta').forEach((btn) => {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function revealHero(gsap: any) {
      // THE SIGNATURE: rule draws → letters rise from the baseline → asterisk
      // turns in → the stroke letters flicker → the seal stamps the line →
      // intro, tags, cue. Same vocabulary: expo.out, 0.9/0.6, 70ms cascade.
      const rule    = document.getElementById('hero-baseline-rule');
      const letters = document.querySelectorAll<HTMLElement>('.hw-inner');
      const astSvg  = document.getElementById('hw-ast-svg');
      const strokes = document.querySelectorAll<HTMLElement>('.hw-stroke');
      const seal    = document.getElementById('hero-seal');
      const tags    = document.getElementById('hero-baseline-tags');
      const intro   = document.getElementById('hero-intro');
      const cue     = document.getElementById('hero-scroll-cue');
      const wordmark = document.getElementById('hero-wordmark');
      const zone    = document.getElementById('hero-wordmark-zone');
      const hero    = document.getElementById('hero');

      if (prefersReduced) {
        if (rule) rule.style.transform = 'none';
        letters.forEach((l) => { l.style.transform = 'none'; });
        if (seal) { seal.style.opacity = '1'; seal.style.transform = 'none'; }
        [tags, intro, cue].forEach((el) => { if (el) el.style.opacity = '1'; });
        return;
      }

      const EASE = 'expo.out';                 // = cubic-bezier(0.16, 1, 0.3, 1)
      const tl = gsap.timeline();

      // Baseline rule draws in
      if (rule) tl.to(rule, { scaleX: 1, duration: 0.9, ease: EASE }, 0);

      // Letters rise from the baseline mask, 70ms cascade
      // (y + yPercent both declared: the CSS translateY(110%) initial state
      // parses back from the matrix as px and would survive a yPercent tween.)
      if (letters.length) {
        gsap.set(letters, { y: 0, yPercent: 110 });
        tl.to(letters, { y: 0, yPercent: 0, duration: 0.9, ease: EASE, stagger: 0.07 }, 0.25);
      }

      // Asterisk turns in as it lands
      if (astSvg) tl.fromTo(astSvg,
        { rotation: 90, scale: 0.6, transformOrigin: '50% 50%' },
        { rotation: 0, scale: 1, duration: 0.6, ease: EASE },
        0.85
      );

      // "EX" stroke fill flickers once
      if (strokes.length) {
        tl.set(strokes, { color: '#15130E' }, 1.4)
          .set(strokes, { color: 'transparent' }, 1.47)
          .set(strokes, { color: '#15130E' }, 1.53)
          .set(strokes, { color: 'transparent' }, 1.6);
      }

      // The seal stamps onto the rule
      if (seal) tl.fromTo(seal,
        { opacity: 0, scale: 1.4, rotation: 2 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: EASE },
        1.7
      );

      // Intro, tags, cue
      const meta = [tags, intro, cue].filter(Boolean);
      if (meta.length) tl.fromTo(meta,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.07 },
        1.95
      );

      // Idle: slow asterisk rotation + a ±5px wordmark drift on mouse
      tl.call(() => {
        if (astSvg) gsap.to(astSvg, {
          rotation: '+=360', duration: 90, repeat: -1, ease: 'none',
          transformOrigin: '50% 50%',
        });
      }, [], 2.6);

      const finePtr = window.matchMedia('(pointer: fine)').matches;
      if (hero && wordmark && finePtr) {
        const xTo = gsap.quickTo(wordmark, 'x', { duration: 0.6, ease: 'power2.out' });
        const yTo = gsap.quickTo(wordmark, 'y', { duration: 0.6, ease: 'power2.out' });
        const onMove = (e: MouseEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 10);
          yTo((e.clientY / window.innerHeight - 0.5) * 10);
        };
        hero.addEventListener('mousemove', onMove);
        cleanups.push(() => hero.removeEventListener('mousemove', onMove));
      }

      // Scroll-out: the wordmark zone leaves at 0.9x — a gentle shear
      if (zone) {
        ST.create({
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate(self: { progress: number }) {
            gsap.set(zone, { y: self.progress * window.innerHeight * 0.1 });
          },
        });
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
