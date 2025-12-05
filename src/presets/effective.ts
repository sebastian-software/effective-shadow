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
    // Level 1: Subtle
    { finalOffsetY: 1, finalBlur: 2 },
    // Level 2: Low
    { finalOffsetY: 3, finalBlur: 4 },
    // Level 3: Medium
    { finalOffsetY: 6, finalBlur: 10 },
    // Level 4: High
    { finalOffsetY: 10, finalBlur: 16 },
    // Level 5: Highest
    { finalOffsetY: 14, finalBlur: 24 }
  ]
}
