/**
 * @effective/shadow
 *
 * Generate beautiful, multi-layered CSS shadows using Bézier curves.
 *
 * @packageDocumentation
 */

// =============================================================================
// Core Factory API
// =============================================================================

export {
  buildShadow,
  toBoxShadow,
  toDropShadow,
  dropShadowModifiers,
  type EasingValue,
  type ShadowConfig,
  type ShadowValues,
  type ShadowSet,
  type ShadowColorOptions
} from "./factory"

// =============================================================================
// Presets
// =============================================================================

export {
  effectivePreset,
  shadowLevelNames,
  type ShadowPreset,
  type ShadowLevelName
} from "./presets"

// =============================================================================
// CSS Generation
// =============================================================================

export {
  generateCSS,
  generateCSSModule,
  generateFromPreset,
  type GenerateCSSOptions,
  type GeneratedShadow
} from "./generate"

// =============================================================================
// Convenience: Pre-generated shadow strings (using Effective preset)
// =============================================================================

import { generateFromPreset } from "./generate"
import { effectivePreset } from "./presets"
import { buildShadow, toBoxShadow, toDropShadow } from "./factory"
import type { ShadowColorOptions } from "./factory"

const defaultShadows = generateFromPreset(effectivePreset)

/**
 * Pre-generated box-shadow CSS strings using the Effective preset.
 * Index corresponds to elevation level (0 = none, 7 = highest).
 *
 * @example
 * import { boxShadow } from "@effective/shadow"
 * element.style.boxShadow = boxShadow[2]
 */
export const boxShadow: string[] = defaultShadows.map((s) => s.boxShadow)

/**
 * Pre-generated drop-shadow CSS strings using the Effective preset.
 * Index corresponds to elevation level (0 = none, 7 = highest).
 * Use with the CSS `filter` property.
 *
 * @example
 * import { dropShadow } from "@effective/shadow"
 * element.style.filter = dropShadow[2]
 */
export const dropShadow: string[] = defaultShadows.map((s) =>
  s.dropShadow === "none" ? "" : s.dropShadow
)

// =============================================================================
// Colored Elevation Helpers
// =============================================================================

/**
 * Get a box-shadow CSS string for a specific elevation level with optional color.
 *
 * @param level - Elevation level (0-7)
 * @param options - Optional color configuration
 * @returns CSS box-shadow value
 *
 * @example
 * import { getBoxShadow } from "@effective/shadow"
 *
 * // Default black shadow
 * element.style.boxShadow = getBoxShadow(3)
 *
 * // Colored shadow (e.g., for CTAs)
 * element.style.boxShadow = getBoxShadow(4, { color: "59, 130, 246" }) // blue-500
 */
export function getBoxShadow(
  level: number,
  options?: ShadowColorOptions
): string {
  if (level <= 0 || level >= effectivePreset.elevations.length) {
    return "none"
  }

  // If no color specified, return pre-generated shadow
  if (!options?.color) {
    return boxShadow[level]
  }

  // Build shadow with color
  const elev = effectivePreset.elevations[level]
  const base = effectivePreset.base
  const shadow = buildShadow({
    shadowLayers: elev.shadowLayers ?? base.shadowLayers ?? 4,
    finalOffsetX: elev.finalOffsetX ?? base.finalOffsetX ?? 0,
    finalOffsetY: elev.finalOffsetY ?? 0,
    finalBlur: elev.finalBlur ?? 0,
    finalAlpha: elev.finalAlpha ?? base.finalAlpha ?? 0.12
  })

  return toBoxShadow(shadow, 2, options)
}

/**
 * Get a drop-shadow CSS string for a specific elevation level with optional color.
 *
 * @param level - Elevation level (0-7)
 * @param options - Optional color configuration
 * @returns CSS filter value with drop-shadow()
 *
 * @example
 * import { getDropShadow } from "@effective/shadow"
 *
 * // Default black shadow
 * element.style.filter = getDropShadow(3)
 *
 * // Colored shadow (e.g., for icons)
 * element.style.filter = getDropShadow(2, { color: "34, 197, 94" }) // green-500
 */
export function getDropShadow(
  level: number,
  options?: ShadowColorOptions
): string {
  if (level <= 0 || level >= effectivePreset.elevations.length) {
    return ""
  }

  // If no color specified, return pre-generated shadow
  if (!options?.color) {
    return dropShadow[level]
  }

  // Build shadow with color
  const elev = effectivePreset.elevations[level]
  const base = effectivePreset.base
  const shadow = buildShadow({
    shadowLayers: elev.shadowLayers ?? base.shadowLayers ?? 4,
    finalOffsetX: elev.finalOffsetX ?? base.finalOffsetX ?? 0,
    finalOffsetY: elev.finalOffsetY ?? 0,
    finalBlur: elev.finalBlur ?? 0,
    finalAlpha: elev.finalAlpha ?? base.finalAlpha ?? 0.12
  })

  return toDropShadow(shadow, 2, options)
}
