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

      // ── Problem stat counter ─────────────────────────────────
      const statEl = document.querySelector<HTMLElement>('.problem-stat');
      if (statEl && !prefersReduced) {
        let fired = false;
        ScrollTrigger.create({
          trigger: statEl,
          start: 'top 78%',
          onEnter: () => {
            if (fired) return;
            fired = true;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: 85,
              duration: 1.2,
              ease: 'power2.out',
              onUpdate() { statEl.textContent = Math.round(obj.val) + '%'; },
              onComplete() { statEl.textContent = '85%'; },
            });
          },
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

      // ── Hero scroll parallax: object drifts, headline lines at different rates ──
      const imgWrap = document.getElementById('hero-image-wrap');
      const heroText = document.querySelector<HTMLElement>('.hero-text');
      const lineMasks = document.querySelectorAll<HTMLElement>('.hero-headline .line-mask');
      if (!prefersReduced) {
        ScrollTrigger.create({
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate(self: { progress: number }) {
            const p = self.progress;
            if (imgWrap) gsap.set(imgWrap, { y: -120 * p, opacity: 1 - p * 0.7 });
            if (heroText) gsap.set(heroText, { y: -55 * p });
            // Per-line parallax — "Proof," fastest, "Promise." slowest = layered depth
            const lineRates = [-40, -25, -10];
            lineMasks.forEach((mask, i) => {
              gsap.set(mask, { y: lineRates[i] * p });
            });
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
            rotateX: dy * -4,
            rotateY: dx * 4,
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
      const pill      = document.querySelector<HTMLElement>('.hero-pill');
      const words     = document.querySelectorAll<HTMLElement>('.hero-headline .line-mask-inner');
      const imgWrap   = document.getElementById('hero-image-wrap');
      const heroSub   = document.querySelector<HTMLElement>('.hero-sub');
      const scrollCue = document.getElementById('hero-scroll-cue');
      const headline  = document.getElementById('hero-headline');

      if (prefersReduced) {
        words.forEach((w) => { w.style.transform = 'none'; });
        if (pill) pill.style.opacity = '1';
        // On desktop, vertically center the object via GSAP yPercent since CSS transform is removed
        if (imgWrap) {
          const isMobile = window.innerWidth <= 900;
          gsap.set(imgWrap, { opacity: 1, ...(isMobile ? {} : { yPercent: -50 }) });
        }
        if (heroSub) heroSub.style.opacity = '1';
        if (scrollCue) scrollCue.style.opacity = '1';
        if (headline) headline.classList.add('revealed');
        return;
      }

      // Desktop: set yPercent -50 so GSAP controls vertical centering instead of CSS
      const isMobile = window.innerWidth <= 900;
      if (imgWrap && !isMobile) {
        gsap.set(imgWrap, { yPercent: -50 });
      }

      // t=0.0 — eyebrow pill
      if (pill) gsap.fromTo(pill,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.0, ease: 'power3.out' }
      );

      // t=0.15 — headline: each line mask-revealed (translateY 110%→0), stagger 0.12s
      words.forEach((w, i) => {
        gsap.to(w, { y: 0, duration: 1.0, delay: 0.15 + i * 0.12, ease: 'power4.out' });
      });
      // Mark headline revealed after all lines finish (last line: 0.15+0.24+1.0 ≈ 1.4s)
      setTimeout(() => headline?.classList.add('revealed'), 1450);

      // t=0.40 — object enters from right/below
      if (imgWrap) gsap.fromTo(imgWrap,
        { y: 70, scale: 0.95, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1,
          duration: 1.5, delay: 0.40,
          ease: 'power3.out',
          clearProps: 'scale',
        }
      );

      // t=1.0 — sub-line + scroll cue
      if (heroSub) gsap.fromTo(heroSub,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: 'power2.out' }
      );
      if (scrollCue) gsap.fromTo(scrollCue,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.1, ease: 'power2.out' }
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
