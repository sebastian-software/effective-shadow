import {
  boxShadow,
  buildShadow,
  toBoxShadow,
  toDropShadow,
  effectivePreset
} from "@effective/shadow"

// Declare external libraries
declare const hljs: { highlightAll: () => void }

// =============================================================================
// Tailwind CSS v4 shadow values (for comparison only, not part of public API)
// Source: https://tailwindcss.com/docs/box-shadow
// =============================================================================

const TAILWIND_SHADOWS = [
  { name: "none", value: "none" },
  { name: "2xs", value: "0 1px rgb(0 0 0 / 0.05)" },
  { name: "xs", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  {
    name: "sm",
    value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
  },
  {
    name: "md",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  {
    name: "lg",
    value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  },
  {
    name: "xl",
    value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  { name: "2xl", value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }
]

// =============================================================================
// Preset configurations for the playground
// =============================================================================

const PRESET_CONFIGS = effectivePreset.elevations.map((elev) => ({
  layers: elev.shadowLayers ?? effectivePreset.base.shadowLayers ?? 4,
  offsetX: elev.finalOffsetX ?? effectivePreset.base.finalOffsetX ?? 0,
  offsetY: elev.finalOffsetY ?? 0,
  blur: elev.finalBlur ?? 0,
  alpha: elev.finalAlpha ?? effectivePreset.base.finalAlpha ?? 0.12
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
      <div class="elevation-level">${LEVEL_NAMES[level]}</div>
      <div class="elevation-label">Level ${level}</div>
    `
    grid.appendChild(card)
  }
}

// =============================================================================
// Shadow Demo (box-shadow vs filter problem) - using Level 4 for visibility
// =============================================================================

function renderShadowDemo() {
  const container = document.getElementById("shadow-demo")!
  const shadowValue = boxShadow[4]

  container.innerHTML = `
    <div class="shadow-demo-panel">
      <div class="label">Circle with box-shadow</div>
      <div class="demo-icon-wrapper">
        <div class="demo-shape demo-circle" style="box-shadow: ${shadowValue};"></div>
      </div>
      <div class="verdict good">✓ box-shadow follows border-radius</div>
    </div>
    <div class="shadow-demo-panel">
      <div class="label">SVG icon with box-shadow</div>
      <div class="demo-icon-wrapper">
        <div class="demo-icon" style="box-shadow: ${shadowValue};">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
      </div>
      <div class="verdict bad">❌ Shadow shows rectangular box</div>
    </div>
  `
}

// =============================================================================
// Comparison (skip "none" entries, show all levels)
// =============================================================================

const LEVEL_NAMES = ["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl"]

function renderComparison() {
  const container = document.getElementById("comparison")!

  const columns = [
    {
      title: "Effective Shadow",
      description: "3-8 layers, Bézier-curved",
      shadows: boxShadow.slice(1).map((s, i) => ({
        name: LEVEL_NAMES[i + 1],
        value: s
      }))
    },
    {
      title: "Tailwind CSS v4",
      description: "1-2 layers, linear",
      shadows: TAILWIND_SHADOWS.slice(1).map((s) => ({
        name: s.name,
        value: s.value
      }))
    }
  ]

  columns.forEach((col) => {
    const column = document.createElement("div")
    column.className = "comparison-column"
    column.innerHTML = `<h3>${col.title}</h3><p class="comparison-desc">${col.description}</p>`

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

  // Start with Level 4 (md) preset
  const level4 = PRESET_CONFIGS[4]
  const state: PlaygroundState = {
    layers: level4.layers,
    offsetX: level4.offsetX,
    offsetY: level4.offsetY,
    blur: level4.blur,
    alpha: level4.alpha,
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
    const iconEl = copyBtn.querySelector(".icon")
    if (iconEl) {
      iconEl.classList.remove("icon-copy")
      iconEl.classList.add("icon-check")
    }
    copyBtn.classList.add("copied")
    setTimeout(() => {
      if (iconEl) {
        iconEl.classList.remove("icon-check")
        iconEl.classList.add("icon-copy")
      }
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
  renderShadowDemo()
  renderComparison()
  renderPlayground()
  hljs.highlightAll()
})
