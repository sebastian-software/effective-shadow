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

const defaultShadows = generateFromPreset(effectivePreset)

/**
 * Pre-generated box-shadow CSS strings using the Effective preset.
 * Index corresponds to elevation level (0 = none, 5 = highest).
 *
 * @example
 * import { boxShadow } from "@effective/shadow"
 * element.style.boxShadow = boxShadow[2]
 */
export const boxShadow: string[] = defaultShadows.map((s) => s.boxShadow)

/**
 * Pre-generated drop-shadow CSS strings using the Effective preset.
 * Index corresponds to elevation level (0 = none, 5 = highest).
 * Use with the CSS `filter` property.
 *
 * @example
 * import { dropShadow } from "@effective/shadow"
 * element.style.filter = dropShadow[2]
 */
export const dropShadow: string[] = defaultShadows.map((s) =>
  s.dropShadow === "none" ? "" : s.dropShadow
)
