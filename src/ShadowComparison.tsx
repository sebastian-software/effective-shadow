import { boxShadow } from "."
import { tailwindOriginal } from "./presets/tailwind-original"
import { joshComeauShadows } from "./presets/josh-comeau"

import "./ShadowComparison.css"

/**
 * Side-by-side comparison of different shadow systems.
 */
export function ShadowComparison() {
  return (
    <div className="comparison">
      <h1>Shadow Comparison</h1>
      <p className="subtitle">
        Comparing shadow approaches: our multi-layer Bézier curves vs.
        established systems.
      </p>

      <div className="grid">
        {/* Effective Shadow */}
        <section className="column">
          <h2>Effective Shadow</h2>
          <p className="description">4 layers with Bézier-curved transitions</p>
          {boxShadow.map((shadow, index) => (
            <div key={index} className="card" style={{ boxShadow: shadow }}>
              <span className="label">Level {index}</span>
            </div>
          ))}
        </section>

        {/* Tailwind Original */}
        <section className="column">
          <h2>Tailwind CSS</h2>
          <p className="description">Original Tailwind v3 shadows</p>
          {tailwindOriginal.levels.map(({ name, boxShadow }) => (
            <div key={name} className="card" style={{ boxShadow }}>
              <span className="label">{name}</span>
            </div>
          ))}
        </section>

        {/* Josh Comeau */}
        <section className="column">
          <h2>Josh Comeau</h2>
          <p className="description">Layered shadows from his CSS article</p>
          {joshComeauShadows.levels.map(({ name, boxShadow }) => (
            <div key={name} className="card" style={{ boxShadow }}>
              <span className="label">{name}</span>
            </div>
          ))}
        </section>
      </div>

      <footer className="credits">
        <p>
          <strong>Sources:</strong>
        </p>
        <ul>
          <li>
            <a
              href="https://tailwindcss.com/docs/box-shadow"
              target="_blank"
              rel="noopener"
            >
              Tailwind CSS Documentation
            </a>
          </li>
          <li>
            <a
              href="https://www.joshwcomeau.com/css/designing-shadows/"
              target="_blank"
              rel="noopener"
            >
              Josh W. Comeau: Designing Beautiful Shadows in CSS
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}
