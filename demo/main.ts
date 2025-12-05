import { boxShadow, buildShadow, toBoxShadow, toDropShadow } from "../src"
import { effectivePreset } from "../src/presets/effective"
import { tailwindOriginal } from "../src/presets/tailwind-original"
import { joshComeauShadows } from "../src/presets/josh-comeau"

// Declare external libraries
declare const lucide: { createIcons: () => void }
declare const hljs: { highlightAll: () => void }

// =============================================================================
// Preset configurations for the playground
// =============================================================================

const PRESET_CONFIGS = effectivePreset.elevations.map((elev) => ({
  layers: effectivePreset.base.shadowLayers ?? 4,
  offsetX: effectivePreset.base.finalOffsetX ?? 0,
  offsetY: elev.finalOffsetY ?? 0,
  blur: elev.finalBlur ?? 0,
  alpha: elev.finalAlpha ?? effectivePreset.base.finalAlpha ?? 0.2
}))

// =============================================================================
// Elevation Grid (skip level 0 = "none")
// =============================================================================

function renderElevationGrid() {
  const grid = document.getElementById("elevation-grid")!

  for (let level = 1; level < boxShadow.length; level++) {
    const shadow = boxShadow[level]
    const card = document.createElement("div")
    card.className = "elevation-card"
    card.style.boxShadow = shadow
    card.innerHTML = `
      <div class="elevation-level">${level}</div>
      <div class="elevation-label">Level ${level}</div>
    `
    grid.appendChild(card)
  }
}

// =============================================================================
// Comparison (skip "none" entries)
// =============================================================================

function renderComparison() {
  const container = document.getElementById("comparison")!

  const columns = [
    {
      title: "Effective Shadow",
      shadows: boxShadow.slice(1, 6).map((s, i) => ({
        name: `Level ${i + 1}`,
        value: s
      }))
    },
    {
      title: "Tailwind CSS",
      shadows: tailwindOriginal.levels.slice(1, 6).map((l) => ({
        name: l.name,
        value: l.boxShadow
      }))
    },
    {
      title: "Josh Comeau",
      shadows: joshComeauShadows.levels.slice(1).map((l) => ({
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
  offsetX: number
  offsetY: number
  blur: number
  alpha: number
  outputTab: "css" | "js"
}

function renderPlayground() {
  const controls = document.getElementById("playground-controls")!
  const previewBox = document.getElementById("preview-box")!
  const previewFilter = document.getElementById("preview-filter")!
  const output = document.getElementById("css-output")!
  const copyBtn = document.getElementById("copy-btn")!
  const presetSelect = document.getElementById(
    "preset-select"
  ) as HTMLSelectElement
  const outputTabs = document.querySelectorAll(".output-tab")

  // Start with Level 3 preset
  const level3 = PRESET_CONFIGS[3]
  const state: PlaygroundState = {
    layers: level3.layers,
    offsetX: level3.offsetX,
    offsetY: level3.offsetY,
    blur: level3.blur,
    alpha: level3.alpha,
    outputTab: "css"
  }

  const controlConfigs = [
    { key: "layers", label: "Layers", min: 1, max: 8, step: 1 },
    {
      key: "offsetX",
      label: "Offset X",
      min: -20,
      max: 20,
      step: 1,
      unit: "px"
    },
    { key: "offsetY", label: "Offset Y", min: 0, max: 40, step: 1, unit: "px" },
    { key: "blur", label: "Blur", min: 0, max: 60, step: 1, unit: "px" },
    { key: "alpha", label: "Opacity", min: 0, max: 0.5, step: 0.01 }
  ] as const

  const sliderInputs: Map<string, HTMLInputElement> = new Map()
  const valueSpans: Map<string, HTMLElement> = new Map()

  function updateShadow() {
    const shadowSet = buildShadow({
      shadowLayers: state.layers,
      finalOffsetX: state.offsetX,
      finalOffsetY: state.offsetY,
      finalBlur: state.blur,
      finalAlpha: state.alpha
    })

    const boxShadowCSS = toBoxShadow(shadowSet, 2)
    const dropShadowCSS = toDropShadow(shadowSet, 2)

    // Apply to both previews
    previewBox.style.boxShadow = boxShadowCSS
    previewFilter.style.filter = dropShadowCSS

    // Update output
    if (state.outputTab === "css") {
      output.textContent = `/* box-shadow */
box-shadow: ${boxShadowCSS};

/* filter (for non-rectangular shapes) */
filter: ${dropShadowCSS};`
    } else {
      const config = JSON.stringify(
        {
          shadowLayers: state.layers,
          finalOffsetX: state.offsetX,
          finalOffsetY: state.offsetY,
          finalBlur: state.blur,
          finalAlpha: state.alpha
        },
        null,
        2
      )
      output.textContent = `import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow(${config})

// For rectangular elements
const boxShadow = toBoxShadow(shadow)

// For non-rectangular shapes (icons, PNGs)
const filter = toDropShadow(shadow)`
    }

    // Re-highlight
    output.removeAttribute("data-highlighted")
    hljs.highlightAll()
  }

  function updateSliders() {
    controlConfigs.forEach((config) => {
      const input = sliderInputs.get(config.key)
      const valueSpan = valueSpans.get(config.key)
      if (input && valueSpan) {
        const value = state[config.key as keyof PlaygroundState] as number
        input.value = String(value)
        const display = config.unit ? `${value}${config.unit}` : value
        valueSpan.textContent = String(display)
      }
    })
  }

  // Render controls
  controlConfigs.forEach((config) => {
    const control = document.createElement("div")
    control.className = "control"

    const value = state[config.key as keyof PlaygroundState] as number
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

    sliderInputs.set(config.key, input)
    valueSpans.set(config.key, valueSpan as HTMLElement)

    input.addEventListener("input", () => {
      const newValue = parseFloat(input.value)
      const stateKey = config.key as keyof PlaygroundState
      ;(state[stateKey] as number) = newValue
      const display = config.unit ? `${newValue}${config.unit}` : newValue
      valueSpan.textContent = String(display)

      // Set preset to "Custom" when manually adjusting
      presetSelect.value = "custom"

      updateShadow()
    })

    controls.appendChild(control)
  })

  // Preset selector
  presetSelect.addEventListener("change", () => {
    const value = presetSelect.value
    if (value === "custom") return

    const level = parseInt(value, 10)
    const preset = PRESET_CONFIGS[level]
    if (preset) {
      state.layers = preset.layers
      state.offsetX = preset.offsetX
      state.offsetY = preset.offsetY
      state.blur = preset.blur
      state.alpha = preset.alpha
      updateSliders()
      updateShadow()
    }
  })

  // Output tabs (CSS vs JS)
  outputTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabType = tab.getAttribute("data-tab") as "css" | "js"
      state.outputTab = tabType
      outputTabs.forEach((t) => t.classList.toggle("active", t === tab))
      updateShadow()
    })
  })

  // Copy button
  copyBtn.addEventListener("click", async () => {
    const text = output.textContent || ""
    await navigator.clipboard.writeText(text)
    const icon = copyBtn.querySelector("i")
    if (icon) {
      icon.setAttribute("data-lucide", "check")
    }
    copyBtn.classList.add("copied")
    lucide.createIcons()
    setTimeout(() => {
      if (icon) {
        icon.setAttribute("data-lucide", "copy")
      }
      copyBtn.classList.remove("copied")
      lucide.createIcons()
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
  lucide.createIcons()
  hljs.highlightAll()
})
