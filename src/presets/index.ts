/**
 * Shadow Presets
 *
 * Collection of shadow styles for comparison and use.
 */

// Our generated preset (uses factory)
export { effectivePreset, type ShadowPreset } from "./effective"

// Original third-party shadow values (hardcoded for accuracy)
export { tailwindOriginal } from "./tailwind-original"
export { joshComeauShadows } from "./josh-comeau"

import { effectivePreset } from "./effective"
import { tailwindOriginal } from "./tailwind-original"
import { joshComeauShadows } from "./josh-comeau"

/**
 * All presets for easy access.
 */
export const presets = {
  effective: effectivePreset,
  tailwind: tailwindOriginal,
  joshComeau: joshComeauShadows
} as const

export type PresetName = keyof typeof presets
