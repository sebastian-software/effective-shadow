import { boxShadow, buildShadow, toBoxShadow, toDropShadow } from "../src"
import { tailwindOriginal } from "../src/presets/tailwind-original"
import { joshComeauShadows } from "../src/presets/josh-comeau"

// Initialize Lucide icons
declare const lucide: { createIcons: () => void }

// =============================================================================
// Elevation Grid (skip level 0 = "none")
// =============================================================================

function renderElevationGrid() {
  const grid = document.getElementById("elevation-grid")!

  // Start from 1 to skip "none"
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
  useFilter: boolean
  outputTab: "css" | "js"
}

function renderPlayground() {
  const controls = document.getElementById("playground-controls")!
  const card = document.getElementById("playground-card")!
  const output = document.getElementById("css-output")!
  const copyBtn = document.getElementById("copy-btn")!
  const typeToggle = document.getElementById(
    "shadow-type-toggle"
  ) as HTMLInputElement
  const toggleOptions = document.querySelectorAll(".toggle-option")
  const outputTabs = document.querySelectorAll(".output-tab")

  const state: PlaygroundState = {
    layers: 4,
    offsetX: 0,
    offsetY: 10,
    blur: 20,
    alpha: 0.2,
    useFilter: false,
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
    { key: "offsetY", label: "Offset Y", min: 0, max: 30, step: 1, unit: "px" },
    { key: "blur", label: "Blur", min: 0, max: 50, step: 1, unit: "px" },
    { key: "alpha", label: "Opacity", min: 0, max: 0.5, step: 0.01 }
  ] as const

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

    if (state.useFilter) {
      card.style.boxShadow = "none"
      card.style.filter = dropShadowCSS
    } else {
      card.style.filter = "none"
      card.style.boxShadow = boxShadowCSS
    }

    if (state.outputTab === "css") {
      if (state.useFilter) {
        output.textContent = `filter: ${dropShadowCSS};`
      } else {
        output.textContent = `box-shadow: ${boxShadowCSS};`
      }
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
      const fn = state.useFilter ? "toDropShadow" : "toBoxShadow"
      output.textContent = `import { buildShadow, ${fn} } from "@effective/shadow"

const shadow = buildShadow(${config})
const css = ${fn}(shadow)`
    }
  }

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

    input.addEventListener("input", () => {
      const newValue = parseFloat(input.value)
      const stateKey = config.key as keyof PlaygroundState
      ;(state[stateKey] as number) = newValue
      const display = config.unit ? `${newValue}${config.unit}` : newValue
      valueSpan.textContent = String(display)
      updateShadow()
    })

    controls.appendChild(control)
  })

  typeToggle.addEventListener("change", () => {
    state.useFilter = typeToggle.checked
    toggleOptions.forEach((opt) => {
      const type = opt.getAttribute("data-type")
      opt.classList.toggle(
        "active",
        type === (state.useFilter ? "filter" : "box")
      )
    })
    updateShadow()
  })

  outputTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabType = tab.getAttribute("data-tab") as "css" | "js"
      state.outputTab = tabType
      outputTabs.forEach((t) => t.classList.toggle("active", t === tab))
      updateShadow()
    })
  })

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
})
