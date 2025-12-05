import { boxShadow, buildShadow, toBoxShadow } from "../src"
import { tailwindOriginal } from "../src/presets/tailwind-original"
import { joshComeauShadows } from "../src/presets/josh-comeau"

// =============================================================================
// Elevation Grid
// =============================================================================

function renderElevationGrid() {
  const grid = document.getElementById("elevation-grid")!

  boxShadow.forEach((shadow, level) => {
    const card = document.createElement("div")
    card.className = "elevation-card"
    card.style.boxShadow = shadow
    card.innerHTML = `
      <div class="elevation-level">${level}</div>
      <div class="elevation-label">${level === 0 ? "None" : `Level ${level}`}</div>
    `
    grid.appendChild(card)
  })
}

// =============================================================================
// Comparison
// =============================================================================

function renderComparison() {
  const container = document.getElementById("comparison")!

  const columns = [
    {
      title: "Effective Shadow",
      shadows: boxShadow.slice(0, 5).map((s, i) => ({
        name: i === 0 ? "none" : `Level ${i}`,
        value: s
      }))
    },
    {
      title: "Tailwind CSS",
      shadows: tailwindOriginal.levels.slice(0, 5).map((l) => ({
        name: l.name,
        value: l.boxShadow
      }))
    },
    {
      title: "Josh Comeau",
      shadows: joshComeauShadows.levels.map((l) => ({
        name: l.name,
        value: l.boxShadow
      }))
    }
  ]

  columns.forEach((col) => {
    const column = document.createElement("div")
    column.className = "comparison-column"
    column.innerHTML = `<h3>${col.title}</h3>`

    col.shadows.forEach(({ name, value }) => {
      const card = document.createElement("div")
      card.className = "comparison-card"
      card.style.boxShadow = value
      card.innerHTML = `<span>${name}</span>`
      column.appendChild(card)
    })

    container.appendChild(column)
  })
}

// =============================================================================
// Playground
// =============================================================================

interface PlaygroundState {
  layers: number
  offsetY: number
  blur: number
  alpha: number
}

function renderPlayground() {
  const controls = document.getElementById("playground-controls")!
  const card = document.getElementById("playground-card")!
  const output = document.getElementById("css-output")!
  const copyBtn = document.getElementById("copy-btn")!

  const state: PlaygroundState = {
    layers: 4,
    offsetY: 10,
    blur: 20,
    alpha: 0.2
  }

  const controlConfigs = [
    { key: "layers", label: "Layers", min: 1, max: 8, step: 1 },
    { key: "offsetY", label: "Offset Y", min: 0, max: 30, step: 1, unit: "px" },
    { key: "blur", label: "Blur", min: 0, max: 50, step: 1, unit: "px" },
    { key: "alpha", label: "Opacity", min: 0, max: 0.5, step: 0.01 }
  ] as const

  function updateShadow() {
    const shadowSet = buildShadow({
      shadowLayers: state.layers,
      finalOffsetY: state.offsetY,
      finalBlur: state.blur,
      finalAlpha: state.alpha
    })

    const css = toBoxShadow(shadowSet, 2)
    card.style.boxShadow = css
    output.textContent = `box-shadow: ${css};`
  }

  controlConfigs.forEach((config) => {
    const control = document.createElement("div")
    control.className = "control"

    const value = state[config.key]
    const displayValue = config.unit ? `${value}${config.unit}` : value

    control.innerHTML = `
      <label>
        <span>${config.label}</span>
        <span class="value">${displayValue}</span>
      </label>
      <input 
        type="range" 
        min="${config.min}" 
        max="${config.max}" 
        step="${config.step}" 
        value="${value}"
        data-key="${config.key}"
      />
    `

    const input = control.querySelector("input")!
    const valueSpan = control.querySelector(".value")!

    input.addEventListener("input", () => {
      const newValue = parseFloat(input.value)
      state[config.key as keyof PlaygroundState] = newValue
      const display = config.unit ? `${newValue}${config.unit}` : newValue
      valueSpan.textContent = String(display)
      updateShadow()
    })

    controls.appendChild(control)
  })

  // Copy button
  copyBtn.addEventListener("click", async () => {
    const css = output.textContent || ""
    await navigator.clipboard.writeText(css)
    copyBtn.textContent = "Copied!"
    copyBtn.classList.add("copied")
    setTimeout(() => {
      copyBtn.textContent = "Copy CSS"
      copyBtn.classList.remove("copied")
    }, 2000)
  })

  // Initial render
  updateShadow()
}

// =============================================================================
// Init
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderElevationGrid()
  renderComparison()
  renderPlayground()
})
