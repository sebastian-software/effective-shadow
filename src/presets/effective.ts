/**
 * Effective Shadow Preset
 *
 * Our default shadow configuration using multiple layers with
 * Bézier-curved transitions for natural depth.
 *
 * Layer count scales with elevation:
 * - Low elevations (1-3): 4 layers for smooth, subtle shadows
 * - High elevations (4-7): 6-8 layers for dramatic, realistic depth
 *
 * This approach follows Josh Comeau's recommendation of using more layers
 * for high-elevation shadows to create smoother gradients.
 *
 * References:
 * - https://www.joshwcomeau.com/css/designing-shadows/
 * - https://css-tricks.com/getting-deep-into-shadows/
 */

import type { ShadowConfig } from "../factory"

/**
 * Shadow preset configuration.
 * Each entry defines the final values for one elevation level.
 */
export interface ShadowPreset {
  /** Human-readable name */
  name: string
  /** Description of the preset style */
  description: string
  /** Base configuration shared by all elevations */
  base: Partial<ShadowConfig>
  /** Elevation-specific overrides (index = elevation level) */
  elevations: Array<Partial<ShadowConfig>>
}

/**
 * Maps numeric elevation levels to Tailwind-compatible class names.
 * Primarily for the Tailwind plugin; internally we use numeric levels.
 */
export const shadowLevelNames = {
  0: "none",
  1: "2xs",
  2: "xs",
  3: "sm",
  4: "md",
  5: "lg",
  6: "xl",
  7: "2xl"
} as const

export type ShadowLevelName =
  (typeof shadowLevelNames)[keyof typeof shadowLevelNames]

/**
 * Effective Shadow preset - the default.
 *
 * Design principles:
 * 1. **Numeric levels (0-7)**: Clear, unambiguous, like Material Design
 * 2. **Harmonic progression**: Each level roughly 1.5-2× the previous
 * 3. **Consistent intensity**: Alpha decreases as layers increase to maintain balance
 * 4. **Smooth gradients**: More layers at higher elevations for softer shadows
 *
 * Progression formula (approximate):
 * - Offset Y: 0 → 1 → 2 → 3 → 5 → 8 → 14 → 24 (exponential growth)
 * - Blur: ~1.5× offset for natural shadow spread
 * - Alpha: Decreases with layer count to maintain consistent perceived intensity
 */
export const effectivePreset: ShadowPreset = {
  name: "Effective",
  description:
    "Multi-layered shadows with Bézier-curved transitions for natural depth",
  base: {
    shadowLayers: 4,
    finalOffsetX: 0,
    offsetEasing: [0.7, 0.1, 0.9, 0.3],
    blurEasing: [0.7, 0.1, 0.9, 0.3],
    alphaEasing: [0.1, 0.5, 0.9, 0.5],
    finalAlpha: 0.1,
    reverseAlpha: false
  },
  elevations: [
    // Level 0: No shadow
    { finalOffsetY: 0, finalBlur: 0, finalAlpha: 0 },

    // Level 1: Subtle - hover feedback, subtle borders
    { finalOffsetY: 1, finalBlur: 2, shadowLayers: 3, finalAlpha: 0.07 },

    // Level 2: Low - cards at rest, list items
    { finalOffsetY: 2, finalBlur: 4, shadowLayers: 3, finalAlpha: 0.08 },

    // Level 3: Raised - hovered cards, active elements
    { finalOffsetY: 3, finalBlur: 6, shadowLayers: 4, finalAlpha: 0.09 },

    // Level 4: Floating - dropdowns, tooltips
    { finalOffsetY: 5, finalBlur: 10, shadowLayers: 4, finalAlpha: 0.09 },

    // Level 5: Overlay - popovers, menus
    { finalOffsetY: 8, finalBlur: 16, shadowLayers: 5, finalAlpha: 0.09 },

    // Level 6: Modal - dialogs, sidebars
    { finalOffsetY: 14, finalBlur: 28, shadowLayers: 6, finalAlpha: 0.09 },

    // Level 7: Peak - critical overlays, full-screen modals
    { finalOffsetY: 24, finalBlur: 48, shadowLayers: 7, finalAlpha: 0.1 }
  ]
}
