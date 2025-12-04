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
 * Converts a shadow set to a CSS `box-shadow` string.
 *
 * @param shadowSet - Array of shadow layer values
 * @param precision - Decimal precision for values (default: 3)
 * @returns CSS box-shadow value string
 *
 * @example
 * const css = toBoxShadow(buildShadow({ finalOffsetY: 10, finalBlur: 20 }))
 * // "0.000px 2.891px 5.782px rgba(0, 0, 0, 0.052), ..."
 */
export function toBoxShadow(shadowSet: ShadowSet, precision = 3): string {
  return shadowSet
    .map(
      ([leftOffset, topOffset, blur, alpha]) =>
        `${leftOffset.toFixed(precision)}px ${topOffset.toFixed(
          precision
        )}px ${blur.toFixed(precision)}px rgba(0, 0, 0, ${alpha.toFixed(
          precision
        )})`
    )
    .join(",")
}

/**
 * Converts a shadow set to a CSS `filter: drop-shadow()` string.
 *
 * Applies modifiers to blur (0.5x) and alpha (1.1x) to visually match
 * box-shadow appearance, since drop-shadow uses Gaussian blur while
 * box-shadow uses box blur.
 *
 * @param shadowSet - Array of shadow layer values
 * @param precision - Decimal precision for values (default: 3)
 * @returns CSS filter drop-shadow value string
 *
 * @example
 * const css = toDropShadow(buildShadow({ finalOffsetY: 10, finalBlur: 20 }))
 * // "drop-shadow(0.000px 2.891px 2.891px rgba(0, 0, 0, 0.057)) ..."
 */
export function toDropShadow(shadowSet: ShadowSet, precision = 3): string {
  // Note: Uses a modifier on the `blur` and `opacity` values to make the
  // drop shadow look more like a box shadow. These differ in their actual
  // rendering as the drop-shadow is based on gaussian blur and the box-shadow
  // is based on a box blur. See https://stackoverflow.com/a/60890557/20838
  return shadowSet
    .map(
      ([leftOffset, topOffset, blur, alpha]) =>
        `drop-shadow(${leftOffset.toFixed(precision)}px ${topOffset.toFixed(
          precision
        )}px ${(blur * 0.5).toFixed(precision)}px rgba(0, 0, 0, ${(
          alpha * 1.1
        ).toFixed(precision)}))`
    )
    .join(" ")
}
