---
name: validex-design-system-master
description: Validex design system — canonical source of truth for palette, typography, motion, and component patterns. Load this before any UI work in this project.
metadata:
  type: project
---

# Validex Design System — Master

## Identity
**Product:** Validex — independent sustainability measurement infrastructure  
**Tone:** Editorial, rigorous, warm minimal. Credible, not breathless.  
**Reference:** vigil.wtf, empiremetaverse.com, auremin.com — award-tier editorial

---

## Palette

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#F2EEE4` | Primary bg (warm bone) |
| `--paper-deep` | `#E7E1D3` | Alt light surface |
| `--ink` | `#15130E` | Dark bg + primary text |
| `--ink-soft` | `#232019` | Dark card surfaces |
| `--moss` | `#2E5E3E` | Accent — use sparingly (1× per section max) |
| `--moss-bright` | `#4A8A5E` | Hover/active only |
| `--on-dark` | `rgba(242,238,228,0.62)` | Body text on dark |
| `--on-light` | `rgba(21,19,14,0.60)` | Body text on light |
| `--line-dark` | `rgba(242,238,228,0.12)` | Borders on dark |
| `--line-light` | `rgba(21,19,14,0.10)` | Borders on light |

**Why:** Warm tonal family — bone ↔ warm black ↔ forest green. Never use raw black/white.

---

## Typography

- **Display + Body:** DM Sans (`var(--font-main)`) — weight 500 at large scale (never 700)
- **Labels + Eyebrows:** DM Mono (`var(--font-mono)`) — 0.7–0.72rem, tracking 0.14–0.16em, uppercase
- **Feature settings:** `font-feature-settings: "ss01","cv01"` on all display type
- **Scale:** `--h1: clamp(4rem,11vw,12rem)` / `--h2: clamp(2.5rem,6vw,5.5rem)` / `--stat: clamp(7rem,18vw,19rem)`

**Why:** DM Mono on labels is the key art-direction move. It signals precision and rigour — matching the brand.

---

## Section Structure

Light → Dark → Light → Dark → Light → Dark → Light

Every section boundary: 1px hairline (`var(--line-light)` on light, `var(--line-dark)` on dark).  
Dark sections use `radial-gradient(ellipse at 50% 35%, var(--ink-soft) 0%, var(--ink) 65%)` for depth.

---

## Motion Rules

- Smooth scroll: Lenis `lerp: 0.1`  
- Reveals: GSAP ScrollTrigger, trigger `top 85%`, `power3.out`, 0.9s  
- Headlines: line-mask (`.line-mask` overflow:hidden + `.line-mask-inner` translateY 102%→0), `power4.out`, stagger 0.12s  
- Stat counter: GSAP obj tween 0→85, 1.2s, `power2.out`  
- ALL GSAP logic lives in `components/SiteScripts.tsx` only — never in component files  
- `prefers-reduced-motion`: skip all animations, set opacity:1 / transform:none  

---

## Component Patterns

### Eyebrow (always mono)
```tsx
<span className="who-eyebrow reveal">§ 01 — Who We Are</span>
```

### Headline (always line-mask for entrances)
```tsx
<h1 className="hero-headline">
  <span className="line-mask"><span className="line-mask-inner">Proof,</span></span>
</h1>
```

### CTA Pill
- bg `var(--ink)`, color `var(--paper)`, border-radius 999px
- Font: mono, 0.7rem, tracking 0.14em, uppercase
- hover: bg `var(--moss)`
- Magnetic: GSAP mousemove ±8px, elastic snap-back

### Case Study Cards (`.cs-card`)
- Surface `var(--ink-soft)`, border `1px var(--line-dark)`, radius 4px
- Hover: border → `var(--moss)`, translateY(-4px), 0.3s

### Case Study Detail
- Dark radial bg, max-width 720px
- Elements: `.cs-back`, `.cs-category` (mono), `.cs-title`, `.cs-standfirst`, `.cs-body`, `.cs-pull-quote` (border-left `var(--moss)`), `.cs-callout` (surface `var(--ink-soft)`), `.cs-nav`, `.cs-cta`

---

## Hero
- `next/image` src `/hero-object.jpg`, `mix-blend-mode: multiply` (dissolves bg into bone)
- Three-layer motion: CSS float animation (7s, -18px) / GSAP mouse tilt ±4° / scroll parallax y:-120

---

## Anti-Patterns

- `font-weight: 700` on display headlines → use `500`  
- `overflow: hidden` on `.cta-headline` → breaks descenders  
- Raw `#000` / `#fff` → use tokens  
- Inline `style={{ fontFamily }}` → use CSS classes  
- New GSAP code in component files → SiteScripts.tsx only  
- Serif fonts anywhere → DM Sans/Mono only  
- Emoji as icons → use SVG or text symbols (→ ↗ ←)  
- Extra 100vh spacers → no dead space, content-sized sections  

---

## File Map

```
app/globals.css          ← ALL styles (no component CSS files)
app/layout.tsx           ← DM Sans + DM Mono font imports
app/page.tsx             ← Section composition
app/case-studies/[slug]/ ← 7 static slugs: volkswagen dws boohoo sfdr verra msci defence
components/SiteScripts.tsx ← ALL GSAP + Lenis logic
public/hero-object.jpg   ← Hero image (replace with hero-reference.jpg when available)
design-system/MASTER.md  ← This file
design-system/pages/     ← Page-specific overrides
```
