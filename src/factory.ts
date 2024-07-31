import bezierEasing from "bezier-easing"

export type EasingValue = [number, number, number, number]

export interface ShadowConfig {
  shadowLayers: number

  finalOffsetX: number
  finalOffsetY: number
  offsetEasing: EasingValue

  finalBlur: number
  blurEasing: EasingValue

  finalAlpha: number
  alphaEasing: EasingValue
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

export type ShadowValues = [number, number, number, number]
export type ShadowSet = ShadowValues[]

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
