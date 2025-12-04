/**
 * @effective/shadow - Generate harmonious CSS shadows using Bézier curves
 * @packageDocumentation
 */

import { buildShadow, toBoxShadow, toDropShadow } from "./factory"

// Re-export factory functions and types for convenience
export { buildShadow, toBoxShadow, toDropShadow } from "./factory"
export type {
  EasingValue,
  ShadowConfig,
  ShadowValues,
  ShadowSet
} from "./factory"

/**
 * Predefined box-shadow values at various elevation levels.
 * Index 0 is "none", indices 1-5 represent increasing elevation.
 *
 * @example
 * // Use in CSS-in-JS
 * const style = { boxShadow: boxShadow[2] }
 *
 * // Use in Tailwind arbitrary values
 * <div className={`shadow-[${boxShadow[3]}]`}>
 */
export const boxShadow = [
  "none",

  toBoxShadow(
    buildShadow({
      finalOffsetY: 1,
      finalBlur: 2
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 3,
      finalBlur: 4
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 6,
      finalBlur: 10
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 10,
      finalBlur: 16
    })
  ),

  toBoxShadow(
    buildShadow({
      finalOffsetY: 14,
      finalBlur: 24
    })
  )
]

/**
 * Predefined drop-shadow filter values at various elevation levels.
 * Index 0 is empty string, indices 1-5 represent increasing elevation.
 * Use with CSS `filter` property.
 *
 * @example
 * // Use in CSS-in-JS
 * const style = { filter: dropShadow[2] }
 *
 * // Useful for non-rectangular elements like icons or text
 * <svg style={{ filter: dropShadow[1] }}>
 */
export const dropShadow = [
  "",

  toDropShadow(
    buildShadow({
      finalOffsetY: 1,
      finalBlur: 2
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 3,
      finalBlur: 4
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 6,
      finalBlur: 10
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 10,
      finalBlur: 16
    })
  ),

  toDropShadow(
    buildShadow({
      finalOffsetY: 14,
      finalBlur: 24
    })
  )
]
