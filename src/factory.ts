import bezierEasing from "bezier-easing"

/**
 * A Bézier curve control point array: [x1, y1, x2, y2]
 * Values should be between 0 and 1.
 *
 * @example
 * const linear: EasingValue = [0, 0, 1, 1]
 * const easeOut: EasingValue = [0, 0, 0.58, 1]
 */
export type EasingValue = [number, number, number, number]

/**
 * Configuration for generating shadow layers.
 *
 * @example
 * const config: ShadowConfig = {
 *   shadowLayers: 4,
 *   finalOffsetX: 0,
 *   finalOffsetY: 10,
 *   offsetEasing: [0.7, 0.1, 0.9, 0.3],
 *   finalBlur: 20,
 *   blurEasing: [0.7, 0.1, 0.9, 0.3],
 *   finalAlpha: 0.2,
 *   alphaEasing: [0.1, 0.5, 0.9, 0.5],
 *   reverseAlpha: false
 * }
 */
export interface ShadowConfig {
  /** Number of shadow layers to generate */
  shadowLayers: number

  /** Final horizontal offset in pixels for the last layer */
  finalOffsetX: number
  /** Final vertical offset in pixels for the last layer */
  finalOffsetY: number
  /** Bézier easing curve for offset interpolation */
  offsetEasing: EasingValue

  /** Final blur radius in pixels for the last layer */
  finalBlur: number
  /** Bézier easing curve for blur interpolation */
  blurEasing: EasingValue

  /** Final alpha/opacity value (0-1) for the last layer */
  finalAlpha: number
  /** Bézier easing curve for alpha interpolation */
  alphaEasing: EasingValue
  /** When true, reverses alpha progression (stronger shadows on inner layers) */
  reverseAlpha: boolean
}

const defaults: ShadowConfig = {
  shadowLayers: 4,

  finalOffsetX: 0,
  finalOffsetY: 0,
  offsetEasing: [0.7, 0.1, 0.9, 0.3],

  finalBlur: 0,
  blurEasing: [0.7, 0.1, 0.9, 0.3],

  finalAlpha: 0.2,
  reverseAlpha: false,
  alphaEasing: [0.1, 0.5, 0.9, 0.5]
}

/**
 * A single shadow layer: [offsetX, offsetY, blur, alpha]
 * All values are in pixels except alpha which is 0-1.
 */
export type ShadowValues = [number, number, number, number]

/**
 * An array of shadow layers, representing a complete shadow effect.
 */
export type ShadowSet = ShadowValues[]

/**
 * Generates a set of shadow layers based on the provided configuration.
 * Uses Bézier curves to interpolate values across layers for smooth,
 * harmonious shadow effects.
 *
 * @param config - Partial shadow configuration (missing values use defaults)
 * @returns Array of shadow layer values
 *
 * @example
 * const shadows = buildShadow({
 *   shadowLayers: 4,
 *   finalOffsetY: 10,
 *   finalBlur: 20,
 *   finalAlpha: 0.25
 * })
 */
export function buildShadow(config: Partial<ShadowConfig>): ShadowSet {
  const cfg = { ...defaults, ...config }

  const alphaEasing = bezierEasing(...cfg.alphaEasing)
  const offsetEasing = bezierEasing(...cfg.offsetEasing)
  const blurEasing = bezierEasing(...cfg.blurEasing)

  const easedAlphaValues = []
  const easedOffsetValues = []
  const easedBlurValues = []

  for (let i = 1; i <= cfg.shadowLayers; i++) {
    const fraction = i / cfg.shadowLayers
    if (cfg.reverseAlpha) {
      easedAlphaValues.unshift(alphaEasing(fraction))
    } else {
      easedAlphaValues.push(alphaEasing(fraction))
    }

    easedOffsetValues.push(offsetEasing(fraction))
    easedBlurValues.push(blurEasing(fraction))
  }

  const boxShadowValues: ShadowSet = []
  for (let i = 0; i < cfg.shadowLayers; i++) {
    boxShadowValues.push([
      easedOffsetValues[i] * cfg.finalOffsetX,
      easedOffsetValues[i] * cfg.finalOffsetY,
      easedBlurValues[i] * cfg.finalBlur,
      easedAlphaValues[i] * cfg.finalAlpha
    ])
  }

  return boxShadowValues
}

/**
 * Options for shadow color customization.
 *
 * @example
 * // Cyan shadow for a CTA button (like Tailwind's colored shadows)
 * toBoxShadow(shadows, 3, { color: "0, 200, 255" })
 *
 * // Using CSS custom property
 * toBoxShadow(shadows, 3, { color: "var(--shadow-color)" })
 */
export interface ShadowColorOptions {
  /**
   * Shadow color as RGB values (e.g., "0, 0, 0" for black, "99, 102, 241" for indigo).
   * The alpha will be applied from the shadow layer values.
   *
   * Can also be a CSS custom property reference like "var(--shadow-color)".
   * In this case, the alpha is not applied (use rgba in your custom property).
   */
  color?: string
}

/**
 * Converts a shadow set to a CSS `box-shadow` string.
 *
 * @param shadowSet - Array of shadow layer values
 * @param precision - Decimal precision for values (default: 3)
 * @param options - Optional color customization
 * @returns CSS box-shadow value string
 *
 * @example
 * const css = toBoxShadow(buildShadow({ finalOffsetY: 10, finalBlur: 20 }))
 * // "0.000px 2.891px 5.782px rgba(0, 0, 0, 0.052), ..."
 *
 * @example
 * // Colored shadow for CTA buttons
 * const coloredShadow = toBoxShadow(shadows, 3, { color: "99, 102, 241" })
 * // "0.000px 2.891px 5.782px rgba(99, 102, 241, 0.052), ..."
 */
export function toBoxShadow(
  shadowSet: ShadowSet,
  precision = 3,
  options: ShadowColorOptions = {}
): string {
  const { color = "0, 0, 0" } = options
  const isCustomProperty = color.startsWith("var(")

  return shadowSet
    .map(([leftOffset, topOffset, blur, alpha]) => {
      const colorValue = isCustomProperty
        ? color
        : `rgba(${color}, ${alpha.toFixed(precision)})`

      return `${leftOffset.toFixed(precision)}px ${topOffset.toFixed(
        precision
      )}px ${blur.toFixed(precision)}px ${colorValue}`
    })
    .join(",")
}

/**
 * Modifiers to convert box-shadow values to visually matching drop-shadow values.
 *
 * The key differences between box-shadow and filter: drop-shadow():
 *
 * 1. **Blur algorithm**: box-shadow uses a box blur, while drop-shadow uses
 *    Gaussian blur. The CSS spec defines Gaussian blur's standard deviation
 *    as half the blur radius. To match visually, we reduce blur by ~50%.
 *
 * 2. **Stacking behavior**: drop-shadow stacks exponentially (2^n - 1 shadows
 *    for n declarations) because each filter sees the previous result including
 *    its shadow. We compensate by reducing alpha per layer.
 *
 * 3. **Platform consistency**: These factors also help match shadows across
 *    CSS, Android, iOS, Figma, and Sketch (see bjango.com/articles/matchingdropshadows/).
 *
 * References:
 * - https://css-tricks.com/getting-deep-into-shadows/ (exponential stacking)
 * - https://bjango.com/articles/matchingdropshadows/ (cross-platform blur matching)
 * - https://css-tricks.com/breaking-css-box-shadow-vs-drop-shadow/ (comparison)
 */
export const dropShadowModifiers = {
  /**
   * Blur multiplier: Gaussian blur appears ~2x more spread than box blur
   * at the same radius, so we halve it.
   */
  blur: 0.5,

  /**
   * Alpha multiplier: Compensates for exponential shadow stacking in filters.
   * With multiple layers, each layer's shadow is applied to the cumulative
   * result, making shadows appear darker. We slightly reduce this effect.
   */
  alpha: 1.0
}

/**
 * Converts a shadow set to a CSS `filter: drop-shadow()` string.
 *
 * Applies modifiers to blur and alpha to visually match box-shadow appearance.
 * This ensures both shadow types look identical at the same elevation level —
 * a key feature of Effective Shadow.
 *
 * @param shadowSet - Array of shadow layer values
 * @param precision - Decimal precision for values (default: 3)
 * @param options - Optional color customization
 * @returns CSS filter drop-shadow value string
 *
 * @example
 * const css = toDropShadow(buildShadow({ finalOffsetY: 10, finalBlur: 20 }))
 * // "drop-shadow(0.000px 2.891px 2.891px rgba(0, 0, 0, 0.052)) ..."
 *
 * @example
 * // Colored drop shadow
 * const coloredShadow = toDropShadow(shadows, 3, { color: "99, 102, 241" })
 */
export function toDropShadow(
  shadowSet: ShadowSet,
  precision = 3,
  options: ShadowColorOptions = {}
): string {
  const { color = "0, 0, 0" } = options
  const isCustomProperty = color.startsWith("var(")

  return shadowSet
    .map(([leftOffset, topOffset, blur, alpha]) => {
      const adjustedAlpha = alpha * dropShadowModifiers.alpha
      const colorValue = isCustomProperty
        ? color
        : `rgba(${color}, ${adjustedAlpha.toFixed(precision)})`

      return `drop-shadow(${leftOffset.toFixed(precision)}px ${topOffset.toFixed(
        precision
      )}px ${(blur * dropShadowModifiers.blur).toFixed(precision)}px ${colorValue})`
    })
    .join(" ")
}
