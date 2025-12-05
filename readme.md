# Effective Shadow

<p align="center">
  <img src="images/default-shadows.png" alt="Shadow elevation examples" width="522"/>
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

// 5 elevation levels: shadow-1 (subtle) to shadow-5 (dramatic)
<div className="shadow-3">Elevated card</div>

// For icons and transparent images, use drop-shadow
<img className="drop-shadow-2" src="icon.svg" />
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
<div className="shadow-effective-3">Card with natural shadow</div>
```

**[→ More integration options in our demo](https://sebastian-software.github.io/effective-shadow/#quick-start)**

---

## The Five Elevation Levels

Pre-configured shadow intensities for common UI patterns:

| Level | Use Case          | Example                   |
| ----- | ----------------- | ------------------------- |
| **1** | Subtle lift       | Hover states, list items  |
| **2** | Low elevation     | Cards, sections           |
| **3** | Medium elevation  | Dropdowns, popovers       |
| **4** | High elevation    | Modals, dialogs           |
| **5** | Highest elevation | Toasts, critical overlays |

**[→ Preview all levels interactively](https://sebastian-software.github.io/effective-shadow/#elevation)**

---

## Box Shadow vs Drop Shadow

We provide both shadow types because they serve different purposes:

|                 | `box-shadow`               | `drop-shadow`                      |
| --------------- | -------------------------- | ---------------------------------- |
| **Shape**       | Always rectangular         | Follows element contours           |
| **Best for**    | Cards, buttons, containers | Icons, SVGs, PNG with transparency |
| **Performance** | Slightly faster            | GPU-accelerated                    |

The library automatically adjusts the math so both types look visually identical at the same level.

**[→ See the difference with our circle vs star demo](https://sebastian-software.github.io/effective-shadow/#box-vs-drop)**

---

## Custom Shadows

Need something beyond the presets? Use the JavaScript API:

```typescript
import { buildShadow, toBoxShadow } from "@effective/shadow"

const shadow = buildShadow({
  shadowLayers: 4,
  finalOffsetY: 12,
  finalBlur: 24,
  finalAlpha: 0.25
})

element.style.boxShadow = toBoxShadow(shadow)
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

|                   | Tailwind Default     | Effective Shadow           |
| ----------------- | -------------------- | -------------------------- |
| **Layers**        | 1–2                  | 4 (configurable)           |
| **Distribution**  | Linear steps         | Bézier curves              |
| **Visual result** | Good for prototyping | Polished, production-ready |

**[→ Side-by-side visual comparison](https://sebastian-software.github.io/effective-shadow/#comparison)**

---

## Inspired By

- [Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/) — Josh Comeau's foundational article
- [Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/) — Interactive tool by Josh Comeau
- [Smooth Shadow Generator](https://shadows.brumm.af/) — Philipp Brumm's easing-based tool
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
