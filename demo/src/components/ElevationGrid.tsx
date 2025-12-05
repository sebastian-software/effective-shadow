import { boxShadow } from "@effective/shadow"
import { LEVEL_DESCRIPTIONS } from "../data/shadows"

export function ElevationGrid() {
  // Skip level 0 (none)
  const levels = boxShadow.slice(1)

  return (
    <div className="elevation-grid">
      {levels.map((shadow, index) => {
        const level = index + 1
        return (
          <div
            key={level}
            className="elevation-card"
            style={{ boxShadow: shadow }}
          >
            <div className="elevation-level">{level}</div>
            <div className="elevation-label">{LEVEL_DESCRIPTIONS[level]}</div>
          </div>
        )
      })}
    </div>
  )
}
