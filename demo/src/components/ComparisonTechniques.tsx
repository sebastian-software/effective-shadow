import { boxShadow, dropShadow } from "@effective/shadow"
import { LEVEL_NAMES } from "../data/shadows"

interface ShadowItem {
  name: string
  boxShadow?: string
  filter?: string
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
          style={{
            boxShadow: item.boxShadow,
            filter: item.filter,
            // Safari: stabilizes drop-shadow during scroll
            willChange: item.filter ? "filter" : undefined
          }}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export function ComparisonTechniques() {
  const columns: ComparisonColumnProps[] = [
    {
      title: "Box Shadow",
      description: "For rectangular elements",
      shadows: boxShadow.slice(1).map((s, i) => ({
        name: `Level ${LEVEL_NAMES[i + 1]}`,
        boxShadow: s
      }))
    },
    {
      title: "Drop Shadow",
      description: "For transparent/irregular shapes",
      shadows: dropShadow.slice(1).map((s, i) => ({
        name: `Level ${LEVEL_NAMES[i + 1]}`,
        filter: s
      }))
    }
  ]

  return (
    <div className="comparison comparison-narrow">
      {columns.map((col) => (
        <ComparisonColumn key={col.title} {...col} />
      ))}
    </div>
  )
}
