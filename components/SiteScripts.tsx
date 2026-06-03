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

      // ── Case studies horizontal scroll ───────────────────────
      if (window.innerWidth >= 768 && !prefersReduced) {
        const csSection = document.getElementById('case-studies');
        const csTrack = document.getElementById('cs-track');
        const csFill = document.getElementById('cs-progress-fill');
        if (csSection && csTrack) {
          ScrollTrigger.create({
            trigger: csSection,
            start: 'top top',
            end: () => `+=${csTrack.scrollWidth - window.innerWidth}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: gsap.to(csTrack, {
              x: () => -(csTrack.scrollWidth - window.innerWidth),
              ease: 'none',
            }),
            onUpdate(self: { progress: number }) {
              if (csFill) csFill.style.transform = `scaleX(${self.progress})`;
            },
          });
        }
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
            if (line) line.style.stroke = 'var(--accent)';
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

      // ── Magnetic buttons ──────────────────────────────────────
      document.querySelectorAll<HTMLElement>('#hero-cta-btn, #cta-main-btn').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
          gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
      });

      // ── Hero parallax ────────────────────────────────────────
      const imgWrap = document.getElementById('hero-image-wrap');
      if (imgWrap && !prefersReduced) {
        ScrollTrigger.create({
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate(self: { progress: number }) {
            gsap.set(imgWrap, { y: -120 * self.progress });
          },
        });
      }

      // ── Hero mouse tilt ───────────────────────────────────────
      const heroSection = document.getElementById('hero');
      const tiltEl = document.getElementById('hero-image-tilt');
      if (heroSection && tiltEl && !prefersReduced) {
        heroSection.addEventListener('mousemove', (e: Event) => {
          const me = e as MouseEvent;
          const r = heroSection.getBoundingClientRect();
          const dx = (me.clientX - r.width / 2) / (r.width / 2);
          const dy = (me.clientY - r.height / 2) / (r.height / 2);
          gsap.to(tiltEl, {
            rotateX: dy * -5,
            rotateY: dx * 5,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 800,
          });
        });
        heroSection.addEventListener('mouseleave', () => {
          gsap.to(tiltEl, { rotateX: 0, rotateY: 0, duration: 0.6 });
        });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function revealHero(gsap: any) {
      if (prefersReduced) {
        document.querySelectorAll<HTMLElement>('.hero-headline .line-mask-inner').forEach((w) => {
          w.style.transform = 'none';
        });
        const pill = document.querySelector<HTMLElement>('.hero-pill');
        const sub = document.querySelector<HTMLElement>('.hero-sub');
        const cta = document.querySelector<HTMLElement>('.hero-cta-wrap');
        if (pill) pill.style.opacity = '1';
        if (sub) sub.style.opacity = '1';
        if (cta) cta.style.opacity = '1';
        return;
      }
      const words = document.querySelectorAll<HTMLElement>('.hero-headline .line-mask-inner');
      words.forEach((w, i) => {
        gsap.to(w, { y: 0, duration: 1.0, delay: 0.05 + i * 0.12, ease: 'power4.out' });
      });
      const pill = document.querySelector<HTMLElement>('.hero-pill');
      const sub = document.querySelector<HTMLElement>('.hero-sub');
      const cta = document.querySelector<HTMLElement>('.hero-cta-wrap');
      if (pill) gsap.to(pill, { opacity: 1, duration: 0.6, delay: 0.5 });
      if (sub) gsap.to(sub, { opacity: 1, duration: 0.8, delay: 0.75, ease: 'power2.out' });
      if (cta) gsap.to(cta, { opacity: 1, duration: 0.8, delay: 0.95, ease: 'power2.out' });
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
