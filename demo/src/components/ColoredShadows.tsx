import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

// Blue-500 for CTA
const CTA_COLOR = { bg: "#3b82f6", rgb: "59, 130, 246" }

// Custom glow shadow with higher alpha for colored CTAs
const glowShadow = buildShadow({
  shadowLayers: 5,
  finalOffsetY: 8,
  finalBlur: 24,
  finalAlpha: 0.5 // Much higher than default for visible colored glow
})

export function ColoredShadows() {
  const boxShadowValue = toBoxShadow(glowShadow, 2, { color: CTA_COLOR.rgb })
  const dropShadowValue = toDropShadow(glowShadow, 2, { color: CTA_COLOR.rgb })

  return (
    <div className="comparison comparison-narrow">
      <div className="glow-column">
        <h3>Box Shadow</h3>
        <p className="comparison-desc">
          <code>
            toBoxShadow(shadow, 2, {"{"} color {"}"});
          </code>
        </p>
        <button
          className="glow-btn"
          style={
            {
              "--btn-color": CTA_COLOR.bg,
              "--btn-shadow": boxShadowValue
            } as React.CSSProperties
          }
        >
          Get Started
        </button>
      </div>

      <div className="glow-column">
        <h3>Drop Shadow</h3>
        <p className="comparison-desc">
          <code>
            toDropShadow(shadow, 2, {"{"} color {"}"});
          </code>
        </p>
        <button
          className="glow-btn glow-btn-filter"
          style={
            {
              "--btn-color": CTA_COLOR.bg,
              "--btn-filter": dropShadowValue
            } as React.CSSProperties
          }
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
