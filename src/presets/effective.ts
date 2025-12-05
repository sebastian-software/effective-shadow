/**
 * Effective Shadow Preset
 *
 * Our default shadow configuration using 4 layers with
 * Bézier-curved transitions for natural depth.
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
 * Effective Shadow preset - the default.
 *
 * Uses 4 layers with smooth Bézier transitions.
 * Optimized for natural-looking depth on cards, buttons, and dialogs.
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
    finalAlpha: 0.2,
    reverseAlpha: false
  },
  elevations: [
    // Level 0: No shadow
    { finalOffsetY: 0, finalBlur: 0, finalAlpha: 0 },
    // Level 1: Subtle - gentle lift
    { finalOffsetY: 1, finalBlur: 2 },
    // Level 2: Low - cards at rest
    { finalOffsetY: 3, finalBlur: 5 },
    // Level 3: Medium - hovered elements
    { finalOffsetY: 7, finalBlur: 12 },
    // Level 4: High - dropdowns, popovers
    { finalOffsetY: 14, finalBlur: 22 },
    // Level 5: Highest - modals, dialogs
    { finalOffsetY: 24, finalBlur: 38 }
  ]
}
