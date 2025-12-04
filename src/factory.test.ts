import { describe, it, expect } from "vitest"
import {
  buildShadow,
  toBoxShadow,
  toDropShadow,
  type ShadowConfig,
  type ShadowSet
} from "./factory"

describe("buildShadow", () => {
  it("returns correct number of shadow layers", () => {
    const result = buildShadow({ shadowLayers: 3 })
    expect(result).toHaveLength(3)
  })

  it("returns default 4 layers when no config provided", () => {
    const result = buildShadow({})
    expect(result).toHaveLength(4)
  })

  it("respects finalOffsetY", () => {
    const result = buildShadow({ shadowLayers: 1, finalOffsetY: 10 })
    expect(result[0][1]).toBeCloseTo(10, 1)
  })

  it("respects finalOffsetX", () => {
    const result = buildShadow({ shadowLayers: 1, finalOffsetX: 5 })
    expect(result[0][0]).toBeCloseTo(5, 1)
  })

  it("respects finalBlur", () => {
    const result = buildShadow({ shadowLayers: 1, finalBlur: 20 })
    expect(result[0][2]).toBeCloseTo(20, 1)
  })

  it("respects finalAlpha", () => {
    const result = buildShadow({ shadowLayers: 1, finalAlpha: 0.5 })
    expect(result[0][3]).toBeCloseTo(0.5, 1)
  })

  it("produces increasing values across layers", () => {
    const result = buildShadow({
      shadowLayers: 4,
      finalOffsetY: 10,
      finalBlur: 20
    })

    for (let i = 1; i < result.length; i++) {
      expect(result[i][1]).toBeGreaterThanOrEqual(result[i - 1][1])
      expect(result[i][2]).toBeGreaterThanOrEqual(result[i - 1][2])
    }
  })

  it("reverses alpha when reverseAlpha is true", () => {
    const normal = buildShadow({
      shadowLayers: 3,
      finalAlpha: 0.3,
      reverseAlpha: false
    })

    const reversed = buildShadow({
      shadowLayers: 3,
      finalAlpha: 0.3,
      reverseAlpha: true
    })

    expect(normal[0][3]).toBeLessThan(normal[2][3])
    expect(reversed[0][3]).toBeGreaterThan(reversed[2][3])
  })
})

describe("toBoxShadow", () => {
  it("converts ShadowSet to box-shadow string", () => {
    const shadowSet: ShadowSet = [[1, 2, 3, 0.1]]
    const result = toBoxShadow(shadowSet)

    expect(result).toContain("px")
    expect(result).toContain("rgba(0, 0, 0,")
  })

  it("joins multiple shadows with comma", () => {
    const shadowSet: ShadowSet = [
      [1, 2, 3, 0.1],
      [4, 5, 6, 0.2]
    ]
    const result = toBoxShadow(shadowSet)

    // Each shadow contains "rgba(0, 0, 0," so we count occurrences
    expect(result.match(/rgba\(/g)?.length).toBe(2)
    expect(result).toContain("),")
  })

  it("respects precision parameter", () => {
    const shadowSet: ShadowSet = [[1.123456, 2, 3, 0.1]]

    const lowPrecision = toBoxShadow(shadowSet, 1)
    const highPrecision = toBoxShadow(shadowSet, 5)

    expect(lowPrecision).toContain("1.1px")
    expect(highPrecision).toContain("1.12346px")
  })
})

describe("toDropShadow", () => {
  it("converts ShadowSet to drop-shadow string", () => {
    const shadowSet: ShadowSet = [[1, 2, 3, 0.1]]
    const result = toDropShadow(shadowSet)

    expect(result).toContain("drop-shadow(")
    expect(result).toContain("px")
    expect(result).toContain("rgba(0, 0, 0,")
  })

  it("joins multiple shadows with space", () => {
    const shadowSet: ShadowSet = [
      [1, 2, 3, 0.1],
      [4, 5, 6, 0.2]
    ]
    const result = toDropShadow(shadowSet)

    expect(result.split("drop-shadow(").length - 1).toBe(2)
  })

  it("applies blur modifier (0.5x)", () => {
    const shadowSet: ShadowSet = [[0, 0, 10, 0.1]]
    const result = toDropShadow(shadowSet)

    expect(result).toContain("5.000px")
  })

  it("applies alpha modifier (1.1x)", () => {
    const shadowSet: ShadowSet = [[0, 0, 0, 0.1]]
    const result = toDropShadow(shadowSet)

    expect(result).toContain("0.110")
  })
})

describe("integration", () => {
  it("produces valid CSS from full pipeline", () => {
    const config: Partial<ShadowConfig> = {
      shadowLayers: 3,
      finalOffsetY: 10,
      finalBlur: 15,
      finalAlpha: 0.25
    }

    const shadowSet = buildShadow(config)
    const boxShadow = toBoxShadow(shadowSet)
    const dropShadow = toDropShadow(shadowSet)

    expect(boxShadow).toMatch(
      /^[\d.]+px [\d.]+px [\d.]+px rgba\(0, 0, 0, [\d.]+\)/
    )
    expect(dropShadow).toMatch(
      /^drop-shadow\([\d.]+px [\d.]+px [\d.]+px rgba\(0, 0, 0, [\d.]+\)\)/
    )
  })
})
