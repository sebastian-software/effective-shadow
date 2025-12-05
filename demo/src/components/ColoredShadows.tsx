import { getBoxShadow, getDropShadow } from "@effective/shadow"

// Blue-500 for CTA
const CTA_COLOR = { bg: "#3b82f6", rgb: "59, 130, 246" }

export function ColoredShadows() {
  // Use level 5 (Overlay) with color
  const boxShadowValue = getBoxShadow(5, { color: CTA_COLOR.rgb })
  const dropShadowValue = getDropShadow(5, { color: CTA_COLOR.rgb })

  return (
    <div className="comparison comparison-narrow">
      <div className="glow-column">
        <h3>Box Shadow</h3>
        <p className="comparison-desc">
          <code>
            getBoxShadow(5, {"{"} color: "{CTA_COLOR.rgb}" {"}"})
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
            getDropShadow(5, {"{"} color: "{CTA_COLOR.rgb}" {"}"})
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
