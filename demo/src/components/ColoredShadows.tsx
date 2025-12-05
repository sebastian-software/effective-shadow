import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const CTA_COLOR = { bg: "#2563eb", rgb: "37, 99, 235" } // Blue-600

// Prominent glow shadow
const glowShadow = buildShadow({
  shadowLayers: 5,
  finalOffsetY: 12,
  finalBlur: 32,
  finalAlpha: 0.6
})

export function ColoredShadows() {
  const boxShadowValue = toBoxShadow(glowShadow, 2, { color: CTA_COLOR.rgb })
  const dropShadowValue = toDropShadow(glowShadow, 2, { color: CTA_COLOR.rgb })

  return (
    <div className="comparison comparison-narrow">
      <div className="glow-column">
        <h3>Box Shadow</h3>
        <p className="comparison-desc">box-shadow with color</p>
        <button
          className="glow-btn"
          style={{
            backgroundColor: CTA_COLOR.bg,
            boxShadow: boxShadowValue
          }}
        >
          Get Started
        </button>
      </div>

      <div className="glow-column">
        <h3>Drop Shadow</h3>
        <p className="comparison-desc">drop-shadow with color</p>
        <button
          className="glow-btn"
          style={{
            backgroundColor: CTA_COLOR.bg,
            filter: dropShadowValue
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
