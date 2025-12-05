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
 * Tailwind-inspired shadow level names.
 * Maps our numeric levels to semantic names.
 */
export const shadowLevelNames = {
  0: "none",
  1: "2xs", // Tailwind: shadow-2xs
  2: "xs", // Tailwind: shadow-xs
  3: "sm", // Tailwind: shadow-sm
  4: "md", // Tailwind: shadow-md (default)
  5: "lg", // Tailwind: shadow-lg
  6: "xl", // Tailwind: shadow-xl
  7: "2xl" // Tailwind: shadow-2xl
} as const

export type ShadowLevelName =
  (typeof shadowLevelNames)[keyof typeof shadowLevelNames]

/**
 * Effective Shadow preset - the default.
 *
 * Uses 4-8 layers with smooth Bézier transitions, scaling layer count
 * with elevation for optimal shadow quality.
 *
 * Levels now match Tailwind CSS naming (none, 2xs, xs, sm, md, lg, xl, 2xl)
 * while providing multi-layered depth that Tailwind's defaults lack.
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
    finalAlpha: 0.12, // Matches Tailwind's typical 10-12% opacity
    reverseAlpha: false
  },
  elevations: [
    // Level 0 (none): No shadow
    { finalOffsetY: 0, finalBlur: 0, finalAlpha: 0 },

    // Level 1 (2xs): Barely visible - subtle hover feedback
    // Tailwind shadow-2xs: 0 1px rgb(0 0 0 / 0.05)
    { finalOffsetY: 1, finalBlur: 1, shadowLayers: 3, finalAlpha: 0.08 },

    // Level 2 (xs): Minimal - list items, subtle cards
    // Tailwind shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05)
    { finalOffsetY: 1, finalBlur: 2, shadowLayers: 3, finalAlpha: 0.08 },

    // Level 3 (sm): Low - cards at rest
    // Tailwind shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
    { finalOffsetY: 3, finalBlur: 5, shadowLayers: 4, finalAlpha: 0.12 },

    // Level 4 (md): Medium - hovered cards, buttons
    // Tailwind shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
    { finalOffsetY: 6, finalBlur: 10, shadowLayers: 4, finalAlpha: 0.12 },

    // Level 5 (lg): High - dropdowns, popovers
    // Tailwind shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
    { finalOffsetY: 12, finalBlur: 18, shadowLayers: 5, finalAlpha: 0.12 },

    // Level 6 (xl): Higher - modals, dialogs
    // Tailwind shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
    { finalOffsetY: 20, finalBlur: 30, shadowLayers: 6, finalAlpha: 0.12 },

    // Level 7 (2xl): Highest - critical overlays, full-screen modals
    // Tailwind shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
    { finalOffsetY: 32, finalBlur: 48, shadowLayers: 8, finalAlpha: 0.25 }
  ]
}
