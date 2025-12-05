import {
  boxShadow,
  dropShadow,
  buildShadow,
  toBoxShadow,
  toDropShadow,
  effectivePreset
} from "@effective/shadow"

// Declare external libraries
declare const hljs: { highlightAll: () => void }

// =============================================================================
// Shadow values from various design systems (for comparison)
// =============================================================================

// Tailwind CSS v4
// Source: https://tailwindcss.com/docs/box-shadow
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

// Material Design 3 (key shadow + ambient shadow combined)
// Source: https://m3.material.io/styles/elevation
// Values approximated from dp to px, combining key (26% opacity) and ambient (8% opacity) shadows
const MATERIAL_SHADOWS = [
  { name: "0", value: "none" },
  {
    name: "1",
    value:
      "0 1px 1px 0 rgb(0 0 0 / 0.14), 0 2px 1px -1px rgb(0 0 0 / 0.12), 0 1px 3px 0 rgb(0 0 0 / 0.2)"
  },
  {
    name: "2",
    value:
      "0 2px 2px 0 rgb(0 0 0 / 0.14), 0 3px 1px -2px rgb(0 0 0 / 0.12), 0 1px 5px 0 rgb(0 0 0 / 0.2)"
  },
  {
    name: "3",
    value:
      "0 3px 4px 0 rgb(0 0 0 / 0.14), 0 3px 3px -2px rgb(0 0 0 / 0.12), 0 1px 8px 0 rgb(0 0 0 / 0.2)"
  },
  {
    name: "4",
    value:
      "0 4px 5px 0 rgb(0 0 0 / 0.14), 0 1px 10px 0 rgb(0 0 0 / 0.12), 0 2px 4px -1px rgb(0 0 0 / 0.2)"
  },
  {
    name: "6",
    value:
      "0 6px 10px 0 rgb(0 0 0 / 0.14), 0 1px 18px 0 rgb(0 0 0 / 0.12), 0 3px 5px -1px rgb(0 0 0 / 0.2)"
  },
  {
    name: "8",
    value:
      "0 8px 10px 1px rgb(0 0 0 / 0.14), 0 3px 14px 2px rgb(0 0 0 / 0.12), 0 5px 5px -3px rgb(0 0 0 / 0.2)"
  },
  {
    name: "12",
    value:
      "0 12px 17px 2px rgb(0 0 0 / 0.14), 0 5px 22px 4px rgb(0 0 0 / 0.12), 0 7px 8px -4px rgb(0 0 0 / 0.2)"
  }
]

// Radix UI Themes
// Source: https://github.com/radix-ui/themes (shadow.css)
const RADIX_SHADOWS = [
  { name: "0", value: "none" },
  {
    name: "1",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
  },
  {
    name: "2",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.1)"
  },
  {
    name: "3",
    value: "0 2px 4px -1px rgb(0 0 0 / 0.06), 0 4px 5px -2px rgb(0 0 0 / 0.1)"
  },
  {
    name: "4",
    value: "0 3px 7px -2px rgb(0 0 0 / 0.08), 0 6px 12px -4px rgb(0 0 0 / 0.14)"
  },
  {
    name: "5",
    value:
      "0 8px 20px -6px rgb(0 0 0 / 0.1), 0 12px 28px -8px rgb(0 0 0 / 0.18)"
  },
  {
    name: "6",
    value:
      "0 12px 32px -8px rgb(0 0 0 / 0.12), 0 20px 48px -16px rgb(0 0 0 / 0.22)"
  },
  { name: "-", value: "none" } // Radix only has 6 levels, padding for alignment
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

const LEVEL_DESCRIPTIONS = [
  "None",
  "Subtle",
  "Low",
  "Raised",
  "Floating",
  "Overlay",
  "Modal",
  "Peak"
]

function renderElevationGrid() {
  const grid = document.getElementById("elevation-grid")!

  for (let level = 1; level < boxShadow.length; level++) {
    const shadow = boxShadow[level]
    const card = document.createElement("div")
    card.className = "elevation-card"
    card.style.boxShadow = shadow
    card.innerHTML = `
      <div class="elevation-level">${level}</div>
      <div class="elevation-label">${LEVEL_DESCRIPTIONS[level]}</div>
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

// Numeric levels (0-7)
const LEVEL_NAMES = ["0", "1", "2", "3", "4", "5", "6", "7"]

interface ComparisonColumn {
  title: string
  description: string
  shadows: Array<{
    name: string
    boxShadow?: string
    filter?: string
  }>
}

function renderComparisonColumn(container: HTMLElement, col: ComparisonColumn) {
  const column = document.createElement("div")
  column.className = "comparison-column"
  column.innerHTML = `<h3>${col.title}</h3><p class="comparison-desc">${col.description}</p>`

  col.shadows.forEach(({ name, boxShadow: bs, filter }) => {
    const card = document.createElement("div")
    card.className = "comparison-card"
    if (bs) {
      card.style.boxShadow = bs
    }
    if (filter) {
      card.style.filter = filter
    }
    card.innerHTML = `<span>${name}</span>`
    column.appendChild(card)
  })

  container.appendChild(column)
}

function renderComparisonSystems() {
  const container = document.getElementById("comparison-systems")!

  const columns: ComparisonColumn[] = [
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

  columns.forEach((col) => renderComparisonColumn(container, col))
}

function renderComparisonBoxDrop() {
  const container = document.getElementById("comparison-box-drop")!

  const columns: ComparisonColumn[] = [
    {
      title: "Effective Box Shadow",
      description: "For rectangular elements",
      shadows: boxShadow.slice(1).map((s, i) => ({
        name: `Level ${LEVEL_NAMES[i + 1]}`,
        boxShadow: s
      }))
    },
    {
      title: "Effective Drop Shadow",
      description: "For transparent/irregular shapes",
      shadows: dropShadow.slice(1).map((s, i) => ({
        name: `Level ${LEVEL_NAMES[i + 1]}`,
        filter: s
      }))
    }
  ]

  columns.forEach((col) => renderComparisonColumn(container, col))
}

// =============================================================================
// Colored Glow CTA
// =============================================================================

const CTA_COLOR = { bg: "#2563eb", rgb: "37, 99, 235" } // Blue-600

function renderColoredGlow() {
  const container = document.getElementById("colored-glow")!

  // Prominent glow shadow
  const glowShadow = buildShadow({
    shadowLayers: 5,
    finalOffsetY: 12,
    finalBlur: 32,
    finalAlpha: 0.6
  })

  // Box Shadow
  const boxColumn = document.createElement("div")
  boxColumn.className = "glow-column"
  boxColumn.innerHTML = `<h3>Box Shadow</h3><p class="comparison-desc">box-shadow with color</p>`

  const boxBtn = document.createElement("button")
  boxBtn.className = "glow-btn"
  boxBtn.style.backgroundColor = CTA_COLOR.bg
  boxBtn.style.boxShadow = toBoxShadow(glowShadow, 2, { color: CTA_COLOR.rgb })
  boxBtn.textContent = "Get Started"
  boxColumn.appendChild(boxBtn)
  container.appendChild(boxColumn)

  // Drop Shadow
  const dropColumn = document.createElement("div")
  dropColumn.className = "glow-column"
  dropColumn.innerHTML = `<h3>Drop Shadow</h3><p class="comparison-desc">drop-shadow with color</p>`

  const dropBtn = document.createElement("button")
  dropBtn.className = "glow-btn"
  dropBtn.style.backgroundColor = CTA_COLOR.bg
  dropBtn.style.filter = toDropShadow(glowShadow, 2, { color: CTA_COLOR.rgb })
  dropBtn.textContent = "Get Started"
  dropColumn.appendChild(dropBtn)
  container.appendChild(dropColumn)
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
  color: string // hex color, empty = black
  outputTab: "css" | "js"
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return "0, 0, 0"
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
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
    color: "#000000",
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

    const colorOption =
      state.color === "#000000" ? {} : { color: hexToRgb(state.color) }
    const boxShadowCSS = toBoxShadow(shadowSet, 2, colorOption)
    const dropShadowCSS = toDropShadow(shadowSet, 2, colorOption)

    // Apply to both previews
    previewBox.style.boxShadow = boxShadowCSS
    previewFilter.style.filter = dropShadowCSS

    // Update output
    const hasColor = state.color !== "#000000"
    const colorRgb = hexToRgb(state.color)

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
      const colorArg = hasColor ? `, { color: "${colorRgb}" }` : ""
      output.textContent = `import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow(${config})

// For rectangular elements
const boxShadow = toBoxShadow(shadow${colorArg})

// For non-rectangular shapes (icons, PNGs)
const filter = toDropShadow(shadow${colorArg})`
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

  // Color picker
  const colorControl = document.createElement("div")
  colorControl.className = "control control-color"
  colorControl.innerHTML = `
    <label>
      <span>Color</span>
      <span class="color-preview" style="background: ${state.color}"></span>
    </label>
    <input type="color" value="${state.color}" />
  `
  const colorInput = colorControl.querySelector(
    'input[type="color"]'
  ) as HTMLInputElement
  const colorPreview = colorControl.querySelector(
    ".color-preview"
  ) as HTMLElement

  colorInput.addEventListener("input", () => {
    state.color = colorInput.value
    colorPreview.style.background = colorInput.value
    presetSelect.value = "custom"
    updateShadow()
  })

  controls.appendChild(colorControl)

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
  renderComparisonSystems()
  renderComparisonBoxDrop()
  renderColoredGlow()
  renderPlayground()
  hljs.highlightAll()
})
