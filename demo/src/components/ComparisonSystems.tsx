import { boxShadow } from "@effective/shadow"
import {
  TAILWIND_SHADOWS,
  MATERIAL_SHADOWS,
  RADIX_SHADOWS,
  LEVEL_NAMES
} from "../data/shadows"

interface ShadowItem {
  name: string
  boxShadow: string
}

interface ComparisonColumnProps {
  title: string
  description: string
  shadows: ShadowItem[]
}

function ComparisonColumn({
  title,
  description,
  shadows
}: ComparisonColumnProps) {
  return (
    <div className="comparison-column">
      <h3>{title}</h3>
      <p className="comparison-desc">{description}</p>
      {shadows.map((item) => (
        <div
          key={item.name}
          className="comparison-card"
          style={{ boxShadow: item.boxShadow }}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export function ComparisonSystems() {
  const columns: ComparisonColumnProps[] = [
    {
      title: "Effective",
      description: "3-7 layers, Bézier",
      shadows: boxShadow.slice(1).map((s, i) => ({
        name: LEVEL_NAMES[i + 1],
        boxShadow: s
      }))
    },
    {
      title: "Tailwind v4",
      description: "1-2 layers",
      shadows: TAILWIND_SHADOWS.slice(1).map((s) => ({
        name: s.name,
        boxShadow: s.value
      }))
    },
    {
      title: "Material 3",
      description: "3 layers",
      shadows: MATERIAL_SHADOWS.slice(1).map((s) => ({
        name: s.name,
        boxShadow: s.value
      }))
    },
    {
      title: "Radix",
      description: "1-2 layers",
      shadows: RADIX_SHADOWS.slice(1).map((s) => ({
        name: s.name,
        boxShadow: s.value
      }))
    }
  ]

  return (
    <div className="comparison">
      {columns.map((col) => (
        <ComparisonColumn key={col.title} {...col} />
      ))}
    </div>
  )
}
