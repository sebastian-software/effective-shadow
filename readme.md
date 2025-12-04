# Effective Shadow

<p align="center">
  <img src="images/default-shadows.png" alt="Shadow elevation examples" width="522"/>
</p>

<p align="center">
  <strong>Beautiful, harmonious shadows for modern web interfaces.</strong><br/>
  Generate multi-layered CSS shadows using Bézier curves — framework-agnostic, zero dependencies.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@effective/shadow"><img src="https://img.shields.io/npm/v/@effective/shadow?style=flat-square&color=blue" alt="npm version"/></a>
  <a href="https://www.npmjs.com/package/@effective/shadow"><img src="https://img.shields.io/npm/dm/@effective/shadow?style=flat-square" alt="npm downloads"/></a>
  <a href="https://github.com/sebastian-software/effective-shadow/actions"><img src="https://img.shields.io/github/actions/workflow/status/sebastian-software/effective-shadow/ci.yml?style=flat-square" alt="CI status"/></a>
  <a href="https://github.com/sebastian-software/effective-shadow/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@effective/shadow?style=flat-square" alt="license"/></a>
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square" alt="TypeScript"/>
</p>

<p align="center">
  <a href="https://sebastian-software.github.io/effective-shadow/">📖 Live Demo</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#why-layered-shadows">Why Layered Shadows?</a>
</p>

---

## Why Effective Shadow?

Single-layer shadows look flat and artificial. Real-world shadows are complex — they're softer near the object and more diffuse further away. **Effective Shadow** generates multiple shadow layers with mathematically smooth transitions, creating depth that feels natural.

✨ **Ready-to-use presets** — 5 elevation levels, zero configuration  
🎨 **Fully customizable** — control layers, blur, offset, opacity with Bézier easing  
🔄 **Two output formats** — `box-shadow` and `drop-shadow` with automatic visual matching  
📦 **Tiny footprint** — ~1KB gzipped, single dependency  
🛠️ **Framework-agnostic** — works with React, Vue, Svelte, vanilla CSS-in-JS, or plain CSS

---

## Installation

```bash
npm install @effective/shadow
```

```bash
pnpm add @effective/shadow
```

```bash
yarn add @effective/shadow
```

---

## Usage

### Quick Start: Predefined Shadows

For most use cases, the built-in elevation presets are all you need:

```typescript
import { boxShadow, dropShadow } from "@effective/shadow"

// Apply to your elements (index = elevation level 0-5)
element.style.boxShadow = boxShadow[2]
element.style.filter = dropShadow[2]
```

**With React:**

```tsx
import { boxShadow } from "@effective/shadow"

function Card({ elevation = 2 }) {
  return <div style={{ boxShadow: boxShadow[elevation] }}>...</div>
}
```

**With Tailwind (arbitrary values):**

```tsx
import { boxShadow } from "@effective/shadow"
;<div className={`shadow-[${boxShadow[2]}]`}>...</div>
```

### Custom Shadows

Need more control? Generate your own shadow configurations:

```typescript
import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow({
  shadowLayers: 4, // Number of stacked shadow layers
  finalOffsetY: 12, // Vertical offset of the deepest layer
  finalBlur: 24, // Blur radius of the deepest layer
  finalAlpha: 0.25 // Opacity of the deepest layer
})

// Convert to CSS
const css = toBoxShadow(shadow)
const filterCss = toDropShadow(shadow)
```

---

## Box Shadow vs Drop Shadow

This library supports both CSS shadow techniques. They look nearly identical but work differently under the hood:

| Feature         | `box-shadow`               | `filter: drop-shadow()`         |
| --------------- | -------------------------- | ------------------------------- |
| **Shape**       | Always rectangular         | Follows element shape           |
| **Use case**    | Cards, buttons, containers | Icons, SVGs, transparent images |
| **Algorithm**   | Box blur                   | Gaussian blur                   |
| **Performance** | Faster                     | Slightly slower                 |

### Why the math differs

The same blur value looks different between the two:

- **Box blur** averages pixels equally within the radius
- **Gaussian blur** weights center pixels more heavily → appears ~2× softer

To make both outputs visually match, `toDropShadow()` automatically adjusts:

- Blur reduced to **50%** (compensates for softer Gaussian)
- Opacity increased by **10%** (compensates for spread)

**Result:** You can switch between `boxShadow[2]` and `dropShadow[2]` and get the same visual appearance.

---

## Why Layered Shadows?

A single shadow layer can only approximate real lighting. Multiple layers with decreasing intensity create more realistic depth:

```
Layer 1: ░░░░░░░░░░  (subtle, close)
Layer 2: ░░░░░░░░    (medium)
Layer 3: ░░░░░░      (stronger)
Layer 4: ░░░░        (deepest, most diffuse)
━━━━━━━━━━━━━━━━━━━━━━━━
Combined: Natural, soft shadow with depth
```

Effective Shadow uses **Bézier curves** to interpolate between layers, ensuring smooth, harmonious transitions that would be tedious to craft by hand.

---

## API Reference

### Predefined Shadows

```typescript
import { boxShadow, dropShadow } from "@effective/shadow"

boxShadow[0] // "none"
boxShadow[1] // Subtle elevation
boxShadow[2] // Low elevation
boxShadow[3] // Medium elevation
boxShadow[4] // High elevation
boxShadow[5] // Highest elevation

dropShadow[0 - 5] // Same levels, for filter property
```

### Custom Generation

```typescript
import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

// Generate shadow layers
const shadow = buildShadow({
  shadowLayers: 4, // Number of layers (default: 4)
  finalOffsetX: 0, // Horizontal offset in px (default: 0)
  finalOffsetY: 10, // Vertical offset in px (default: 0)
  finalBlur: 20, // Blur radius in px (default: 0)
  finalAlpha: 0.2, // Opacity 0-1 (default: 0.2)
  offsetEasing: [0.7, 0.1, 0.9, 0.3], // Bézier curve for offset
  blurEasing: [0.7, 0.1, 0.9, 0.3], // Bézier curve for blur
  alphaEasing: [0.1, 0.5, 0.9, 0.5], // Bézier curve for opacity
  reverseAlpha: false // Reverse opacity order (default: false)
})

// Convert to CSS strings
toBoxShadow(shadow) // → "0px 2.9px 5.8px rgba(0,0,0,0.05), ..."
toDropShadow(shadow) // → "drop-shadow(0px 2.9px 2.9px rgba(0,0,0,0.06)) ..."
```

### Types

```typescript
type EasingValue = [number, number, number, number] // Bézier control points
type ShadowValues = [number, number, number, number] // [offsetX, offsetY, blur, alpha]
type ShadowSet = ShadowValues[] // Array of shadow layers
```

---

## Demo

Explore all shadow levels and configurations in our interactive demo:

**[📖 Storybook Demo →](https://sebastian-software.github.io/effective-shadow/)**

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) first.

```bash
# Clone and install
git clone https://github.com/sebastian-software/effective-shadow.git
cd effective-shadow
pnpm install

# Development
pnpm dev          # Start Storybook
pnpm test         # Run tests
pnpm build        # Build library
```

---

## License

[Apache License 2.0](LICENSE) — Free for personal and commercial use.

---

<p align="center">
  <a href="https://www.sebastian-software.de">
    <img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/0d4ec9d6/sebastiansoftware-en.svg" alt="Sebastian Software GmbH" width="400"/>
  </a>
</p>

<p align="center">
  Built with ❤️ by <a href="https://www.sebastian-software.de">Sebastian Software</a><br/>
  Copyright 2024–2025
</p>
