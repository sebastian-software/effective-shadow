# Effective Shadow

<p align="center">
  <img src="images/default-shadows.png" alt="Shadow elevation examples" style="border:1px solid #555"/>
</p>

<p align="center">
  <strong>Beautiful, harmonious shadows for modern web interfaces.</strong><br/>
  Multi-layered CSS shadows with natural depth — framework-agnostic, zero dependencies.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@effective/shadow"><img src="https://img.shields.io/npm/v/@effective/shadow?style=flat-square&color=blue" alt="npm version"/></a>
  <a href="https://www.npmjs.com/package/@effective/shadow"><img src="https://img.shields.io/npm/dm/@effective/shadow?style=flat-square" alt="npm downloads"/></a>
  <a href="https://github.com/sebastian-software/effective-shadow/actions"><img src="https://img.shields.io/github/actions/workflow/status/sebastian-software/effective-shadow/ci.yml?style=flat-square" alt="CI status"/></a>
  <a href="https://github.com/sebastian-software/effective-shadow/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@effective/shadow?style=flat-square" alt="license"/></a>
</p>

<p align="center">
  <a href="https://sebastian-software.github.io/effective-shadow/"><strong>🎨 Interactive Demo →</strong></a>
</p>

---

## ✨ Key Feature: Identical Shadows Everywhere

**Effective Shadow generates visually identical shadows for both `box-shadow` and `filter: drop-shadow()`** — something no other library does correctly.

Why does this matter? The two CSS shadow methods render differently:

- `box-shadow` uses box blur
- `drop-shadow()` uses Gaussian blur and stacks shadows [exponentially](https://css-tricks.com/getting-deep-into-shadows/)

We apply mathematically calibrated modifiers so a shadow at level 3 looks the same whether applied to a rectangular card (`box-shadow`) or a transparent icon (`drop-shadow`). This gives you **consistent depth across your entire UI**.

---

## What's the Problem?

Most CSS shadows look flat and artificial — they use a single layer with uniform blur. Real shadows are different: they're sharper near the object and softer further away.

**Effective Shadow** generates multiple shadow layers with smooth Bézier-curved transitions, creating depth that looks natural and polished.

**[→ See the visual comparison in our demo](https://sebastian-software.github.io/effective-shadow/#comparison)**

---

## Quick Start

### Using CSS Classes

```bash
npm install @effective/shadow
```

```tsx
import "@effective/shadow/shadows.css"

// 8 elevation levels matching Tailwind naming: shadow-0 to shadow-7
// (none, 2xs, xs, sm, md, lg, xl, 2xl)
<div className="shadow-4">Elevated card</div>

// For icons, SVGs, and transparent images, use drop-shadow
<img className="drop-shadow-4" src="icon.svg" />
```

### Using Tailwind

```js
// tailwind.config.js
import effectiveShadow from "@effective/shadow/tailwind"

export default {
  plugins: [effectiveShadow]
}
```

```tsx
<div className="shadow-effective-4">Card with natural shadow</div>
```

**[→ More integration options in our demo](https://sebastian-software.github.io/effective-shadow/#quick-start)**

---

## The Eight Elevation Levels

Pre-configured shadow intensities with **harmonic progression** — each level roughly 1.5-2× the previous:

| Level | Name        | Use Case                  | Offset | Blur |
| ----- | ----------- | ------------------------- | ------ | ---- |
| **0** | None        | No shadow                 | 0      | 0    |
| **1** | Subtle lift | Hover feedback, borders   | 1px    | 2px  |
| **2** | Low         | Cards at rest, list items | 2px    | 4px  |
| **3** | Raised      | Hovered cards, active     | 3px    | 6px  |
| **4** | Floating    | Dropdowns, tooltips       | 5px    | 10px |
| **5** | Overlay     | Popovers, menus           | 8px    | 16px |
| **6** | Modal       | Dialogs, sidebars         | 14px   | 28px |
| **7** | Peak        | Critical overlays         | 24px   | 48px |

Higher levels use more shadow layers (3-7) for smoother, more realistic depth gradients. Alpha values are calibrated to maintain consistent perceived intensity across all levels.

**[→ Preview all levels interactively](https://sebastian-software.github.io/effective-shadow/#elevation)**

---

## Box Shadow vs Drop Shadow

We provide both shadow types because they serve different purposes:

|                       | `box-shadow`               | `drop-shadow`                         |
| --------------------- | -------------------------- | ------------------------------------- |
| **Shape**             | Always rectangular         | Follows element contours              |
| **Best for**          | Cards, buttons, containers | Icons, SVGs, PNG with transparency    |
| **Text shadows**      | Not applicable             | Great alternative to `text-shadow`    |
| **Combined elements** | Shadow around bounding box | Shadow around visible pixels only     |
| **Performance**       | Slightly faster            | GPU-accelerated (may use more memory) |
| **Inset support**     | Yes                        | No                                    |
| **Spread radius**     | Yes                        | No                                    |

### Drop Shadow for Text & Combined Elements

A unique advantage of `drop-shadow` is that it can shadow **text directly** and works beautifully with **combined elements**. If you have an icon followed by text, `drop-shadow` creates a unified shadow around both — unlike `box-shadow` which would only shadow the container box.

```css
/* Shadow around actual text glyphs, not the container */
.text-with-depth {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}
```

The library automatically adjusts the math so both types look visually identical at the same level.

**[→ See the difference with our circle vs star demo](https://sebastian-software.github.io/effective-shadow/#box-vs-drop)**

---

## Colored Shadows

Like [Tailwind's shadow colors](https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color), you can create eye-catching CTAs with colored shadows:

```typescript
import { buildShadow, toBoxShadow } from "@effective/shadow"

const shadow = buildShadow({
  shadowLayers: 4,
  finalOffsetY: 12,
  finalBlur: 24,
  finalAlpha: 0.5
})

// Indigo shadow for a CTA button
const ctaShadow = toBoxShadow(shadow, 3, { color: "99, 102, 241" })
// → "0px 3px 6px rgba(99, 102, 241, 0.13), ..."
```

```tsx
<button className="bg-indigo-500" style={{ boxShadow: ctaShadow }}>
  Subscribe
</button>
```

---

## Custom Shadows

Need something beyond the presets? Use the JavaScript API:

```typescript
import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow({
  shadowLayers: 6, // More layers = smoother gradient
  finalOffsetY: 16,
  finalBlur: 32,
  finalAlpha: 0.3
})

element.style.boxShadow = toBoxShadow(shadow)
// or for transparent elements:
element.style.filter = toDropShadow(shadow)
```

**[→ Experiment with the interactive playground](https://sebastian-software.github.io/effective-shadow/#playground)**

---

## Why Layered Shadows?

Single shadows look "stamped on". Multiple layers with decreasing intensity mimic how light actually works:

```
Layer 1: ░░░░░░░░░░  (subtle, close to element)
Layer 2: ░░░░░░░░    (medium)
Layer 3: ░░░░░░      (stronger)
Layer 4: ░░░░        (deepest, most diffuse)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Combined: Natural shadow with realistic depth
```

Effective Shadow uses **Bézier curves** to distribute layers smoothly — no manual tweaking required.

**[→ Learn more about the math](https://sebastian-software.github.io/effective-shadow/#why-bezier)**

---

## Comparison with Tailwind

|                          | Tailwind Default     | Effective Shadow            |
| ------------------------ | -------------------- | --------------------------- |
| **Layers**               | 1–2                  | 3–8 (scales with elevation) |
| **Distribution**         | Linear steps         | Bézier curves               |
| **Naming**               | 2xs to 2xl           | Same (plus numeric aliases) |
| **Visual result**        | Good for prototyping | Polished, production-ready  |
| **drop-shadow matching** | Not aligned          | Mathematically calibrated   |

**[→ Side-by-side visual comparison](https://sebastian-software.github.io/effective-shadow/#comparison)**

---

## Technical Details: Box Shadow vs Drop Shadow Alignment

Creating identical shadows between `box-shadow` and `filter: drop-shadow()` is challenging because:

1. **Different blur algorithms**: `box-shadow` uses a box blur, while `drop-shadow` uses Gaussian blur. The CSS spec defines Gaussian blur's standard deviation as half the blur radius.

2. **Exponential stacking**: `drop-shadow` shadows stack exponentially (2^n - 1 for n declarations) because each filter sees the previous result including its shadow.

3. **Cross-platform differences**: Blur rendering varies between browsers, Android, iOS, Figma, and Sketch.

We apply carefully calibrated modifiers (available as `dropShadowModifiers` for advanced use) to compensate for these differences, achieving visual parity across shadow types.

---

## Inspired By

- [Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/) — Josh Comeau's foundational article
- [Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/) — Interactive tool by Josh Comeau
- [Layered Shadows](https://tobiasahlin.com/blog/layered-smooth-box-shadows/) — Post by Tobias Ahlin Bjerrome
- [Smooth Shadow](https://shadows.brumm.af/) — Generator by Philipp Brumm (concept inspiration)
- [Getting Deep Into Shadows](https://css-tricks.com/getting-deep-into-shadows/) — Comprehensive CSS-Tricks article on shadow techniques
- [Breaking down CSS Box Shadow vs. Drop Shadow](https://css-tricks.com/breaking-css-box-shadow-vs-drop-shadow/) — CSS-Tricks comparison of shadow methods
- [Matching Drop Shadows Across CSS, Android, iOS, Figma, and Sketch](https://bjango.com/articles/matchingdropshadows/) — Bjango's cross-platform shadow research
- [Material Design 3 Elevation](https://m3.material.io/styles/elevation/overview) — Google's elevation principles

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/sebastian-software/effective-shadow.git
cd effective-shadow
pnpm install
pnpm dev      # Start demo
pnpm test     # Run tests
pnpm build    # Build library
```

---

## License

[Apache License 2.0](LICENSE) — Free for personal and commercial use.

---

<p align="center">
  Built with ❤️ by <a href="https://www.sebastian-software.de">Sebastian Software</a>
</p>
