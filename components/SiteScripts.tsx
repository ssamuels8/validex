'use client';

import { useEffect } from 'react';

export default function SiteScripts() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis: InstanceType<typeof import('lenis').default> | null = null;
    let ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger'] | null = null;
    let rafId: number;

    async function init() {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger');
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default;

      gsap.registerPlugin(ST);
      ScrollTrigger = ST;

      // ── Lenis smooth scroll ─────────────────────────────────
      if (!prefersReduced) {
        lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        lenis.on('scroll', ST.update);
        ST.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            if (arguments.length && value !== undefined) {
              lenis!.scrollTo(value, { immediate: true });
            }
            return lenis!.scroll;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
        });
        function raf(time: number) {
          lenis!.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      }

      // ── Preloader ───────────────────────────────────────────
      const preloader = document.getElementById('preloader');
      const fill = document.getElementById('preloader-progress-fill');
      if (preloader && fill) {
        gsap.to(fill, {
          width: '100%',
          duration: 1.4,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to(preloader, {
              yPercent: -100,
              duration: 0.9,
              ease: 'power3.inOut',
              delay: 0.15,
              onComplete: () => {
                preloader.style.display = 'none';
                revealHero(gsap);
              },
            });
          },
        });
      } else {
        revealHero(gsap);
      }

      // ── Evidence pinned carousel ────────────────────────────
      const stickyOuter = document.getElementById('evidence-sticky-outer');
      const panels      = document.getElementById('evidence-panels');
      const dots        = document.querySelectorAll('.evidence-dot');
      if (stickyOuter && panels && !prefersReduced) {
        const panelCount = 3;
        stickyOuter.style.height = `${panelCount * 100}vh`;

        ST.create({
          trigger: stickyOuter,
          start: 'top top',
          end: `+=${panelCount * 100}%`,
          scrub: 1.4,
          pin: '#evidence-sticky',
          onUpdate(self) {
            const progress = self.progress;
            const rawIdx   = progress * (panelCount - 1);
            const idx      = Math.round(rawIdx);
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            gsap.set(panels, {
              x: `-${(progress * (panelCount - 1) / (panelCount - 1)) * (100 / panelCount) * (panelCount - 1)}%`,
            });
            // Simpler: directly drive translateX from progress
            const pct = progress * (100 * (panelCount - 1)) / panelCount;
            gsap.set(panels, { xPercent: -pct * (panelCount / (panelCount - 1)) * ((panelCount - 1) / panelCount) });
          },
        });

        // Correct panel drive
        ST.create({
          trigger: stickyOuter,
          start: 'top top',
          end: `+=${panelCount * 100}%`,
          scrub: 1.4,
          onUpdate(self) {
            const pct = self.progress * (panelCount - 1) * (100 / panelCount);
            panels.style.transform = `translateX(-${pct}%)`;
            const idx = Math.round(self.progress * (panelCount - 1));
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
          },
        });
      }

      // ── System component rows stagger ───────────────────────
      const rows = document.querySelectorAll('.component-row');
      rows.forEach((row, i) => {
        ST.create({
          trigger: row,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(row, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: i * 0.07,
              ease: 'power3.out',
              onComplete: () => row.classList.add('row-visible'),
            });
          },
        });
      });

      // ── Accordion ───────────────────────────────────────────
      document.querySelectorAll('.component-row-header').forEach((header) => {
        header.addEventListener('click', () => {
          const row    = header.closest('.component-row');
          const isOpen = row?.classList.contains('open');
          document.querySelectorAll('.component-row').forEach((r) => {
            r.classList.remove('open');
            r.querySelector('.component-toggle')?.setAttribute('aria-label', 'expand');
          });
          if (!isOpen && row) {
            row.classList.add('open');
            row.querySelector('.component-toggle')?.setAttribute('aria-label', 'collapse');
          }
        });
      });

      // ── 85% stat scramble ───────────────────────────────────
      const digits  = document.getElementById('stat-counter');
      const pctEl   = document.querySelector('.stat-pct') as HTMLElement | null;
      const attrEl  = document.querySelector('.stat-attr') as HTMLElement | null;
      if (digits && pctEl) {
        if (pctEl) { pctEl.style.opacity = '0'; pctEl.style.transform = 'translateX(-8px)'; }
        if (attrEl) attrEl.style.opacity = '0';
        let fired = false;

        ST.create({
          trigger: document.querySelector('.problem-stat') as Element,
          start: 'top 70%',
          onEnter: () => {
            if (fired) return;
            fired = true;
            const start = performance.now();

            const s1 = setInterval(() => {
              if (performance.now() - start >= 800) { clearInterval(s1); startS2(start); return; }
              digits.textContent = String(Math.floor(Math.random() * 90 + 10));
            }, 40);
          },
        });

        function startS2(start: number) {
          const s2 = setInterval(() => {
            if (performance.now() - start >= 1800) { clearInterval(s2); lockTo85(); return; }
            if (digits) digits.textContent = String(Math.floor(Math.random() * 21 + 75));
          }, 120);
        }

        function lockTo85() {
          if (!digits || !pctEl) return;
          digits.textContent = '85';
          gsap.fromTo(digits, { scale: 1 }, { scale: 1.04, duration: 0.08, yoyo: true, repeat: 1 });
          setTimeout(() => {
            gsap.to(pctEl, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
          }, 200);
          if (attrEl) {
            setTimeout(() => gsap.to(attrEl, { opacity: 1, duration: 0.3 }), 550);
          }
        }
      }

      // ── Scorecard border draw + reveals ─────────────────────
      const scorecardWrapper = document.getElementById('scorecard-wrapper');
      const scorecardSvg     = document.getElementById('scorecard-svg');
      const borderRect       = document.getElementById('border-rect');
      if (scorecardWrapper && scorecardSvg && borderRect) {
        let scoreFired = false;
        ST.create({
          trigger: scorecardWrapper,
          start: 'top 75%',
          onEnter: () => {
            if (scoreFired) return;
            scoreFired = true;
            animateScorecard();
          },
        });
      }

      function animateScorecard() {
        const wrapper = document.getElementById('scorecard-wrapper');
        const svg     = document.getElementById('scorecard-svg') as SVGElement | null;
        const rect    = document.getElementById('border-rect') as SVGRectElement | null;
        if (!wrapper || !svg || !rect) return;
        const w = svg.clientWidth;
        const h = svg.clientHeight;
        const perimeter = 2 * (w + h);
        if (!perimeter) return;
        rect.setAttribute('stroke-dasharray', String(perimeter));
        rect.setAttribute('stroke-dashoffset', String(perimeter));
        rect.getBoundingClientRect();
        rect.style.transition = 'stroke-dashoffset 0.7s ease';
        rect.setAttribute('stroke-dashoffset', '0');

        wrapper.querySelectorAll<HTMLElement>('.sc-reveal').forEach((el) => {
          const delay = parseInt(el.dataset.delay ?? '0', 10);
          setTimeout(() => el.classList.add('sc-visible'), delay);
        });
        wrapper.querySelectorAll<HTMLElement>('.sc-bar-fill').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = (bar.dataset.width ?? '0') + '%'; }, 700 + i * 80);
        });
        setTimeout(() => wrapper.classList.add('breathing'), 2200);

        wrapper.querySelectorAll<HTMLElement>('.grade-letter').forEach((letter, i) => {
          setTimeout(() => {
            letter.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)';
            letter.style.transform = 'scale(1.15)';
            requestAnimationFrame(() => requestAnimationFrame(() => { letter.style.transform = 'scale(1)'; }));
          }, 1300 + i * 150);
        });
      }

      // ── Grade tooltips ──────────────────────────────────────
      document.querySelectorAll<HTMLElement>('.grade-box').forEach((box) => {
        const letter = box.querySelector<HTMLElement>('.grade-letter');
        const tip    = box.dataset.tip;
        if (!letter || !tip) return;
        box.addEventListener('mouseenter', () => {
          letter.style.transition = 'transform 200ms ease';
          letter.style.transform  = 'scale(1.08)';
          let tooltip = box.querySelector<HTMLElement>('.grade-tooltip');
          if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className   = 'grade-tooltip mono';
            tooltip.textContent = tip;
            box.style.position  = 'relative';
            box.appendChild(tooltip);
          }
          requestAnimationFrame(() => tooltip!.classList.add('tip-visible'));
        });
        box.addEventListener('mouseleave', () => {
          letter.style.transform = 'scale(1)';
          const t = box.querySelector<HTMLElement>('.grade-tooltip');
          if (t) { t.classList.remove('tip-visible'); setTimeout(() => t.remove(), 150); }
        });
      });

      // ── Score component row hover ───────────────────────────
      document.querySelectorAll<HTMLElement>('.sc-component-row').forEach((row) => {
        const grade = row.querySelector<HTMLElement>('.sc-comp-grade');
        const bar   = row.querySelector<HTMLElement>('.sc-bar-fill');
        row.addEventListener('mouseenter', () => {
          if (grade) { grade.style.transition = 'transform 200ms ease'; grade.style.transform = 'scale(1.15)'; }
          if (bar)   bar.style.filter = 'brightness(1.3)';
        });
        row.addEventListener('mouseleave', () => {
          if (grade) grade.style.transform = 'scale(1)';
          if (bar)   bar.style.filter = '';
        });
      });

      // ── Momentum grid stagger ───────────────────────────────
      const momentumItems = document.querySelectorAll('.momentum-item');
      momentumItems.forEach((item, i) => {
        gsap.set(item, { opacity: 0, y: 32 });
        ST.create({
          trigger: item,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(item, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out' });
          },
        });
      });

      // ── Team + Access generic reveals ───────────────────────
      document.querySelectorAll<HTMLElement>('.team-left, .team-right, .access-text, .access-form-col').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 28 });
        ST.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
        });
      });

    }

    function revealHero(gsap: typeof import('gsap').default) {
      if (prefersReduced) return;
      const words = document.querySelectorAll<HTMLElement>('.word-inner');
      words.forEach((w, i) => {
        gsap.to(w, {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.3 + i * 0.08,
          ease: 'power3.out',
        });
      });
      const sub    = document.querySelector<HTMLElement>('.hero-sub');
      const bottom = document.querySelector<HTMLElement>('.hero-bottom');
      if (sub) gsap.to(sub, { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power2.out' });
      if (bottom) gsap.to(bottom, { opacity: 1, duration: 0.9, delay: 1.3, ease: 'power2.out' });
    }

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
