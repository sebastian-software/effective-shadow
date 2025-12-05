import { useState, useCallback } from "react"
import {
  buildShadow,
  toBoxShadow,
  toDropShadow,
  effectivePreset
} from "@effective/shadow"
import { HexColorPicker } from "react-colorful"
import { CodeBlock } from "./CodeBlock"

interface PlaygroundState {
  layers: number
  offsetX: number
  offsetY: number
  blur: number
  alpha: number
  color: string
}

type OutputTab = "box" | "drop" | "js"

const PRESET_CONFIGS = effectivePreset.elevations.map((elev) => ({
  layers: elev.shadowLayers ?? effectivePreset.base.shadowLayers ?? 4,
  offsetX: elev.finalOffsetX ?? effectivePreset.base.finalOffsetX ?? 0,
  offsetY: elev.finalOffsetY ?? 0,
  blur: elev.finalBlur ?? 0,
  alpha: elev.finalAlpha ?? effectivePreset.base.finalAlpha ?? 0.12
}))

const LEVEL_NAMES = [
  "None",
  "Subtle",
  "Low",
  "Raised",
  "Floating",
  "Overlay",
  "Modal",
  "Peak"
]

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    return "0, 0, 0"
  }
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

interface SliderControlProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  onChange: (value: number) => void
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange
}: SliderControlProps) {
  const displayValue = unit ? `${value}${unit}` : value

  return (
    <div className="control">
      <label>
        <span>{label}</span>
        <span className="value">{displayValue}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}

interface ColorControlProps {
  value: string
  onChange: (value: string) => void
}

function ColorControl({ value, onChange }: ColorControlProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="control control-color">
      <label>
        <span>Color</span>
      </label>
      <button
        className="color-swatch"
        style={{ background: value }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pick color"
      />
      {isOpen && (
        <div className="color-popover">
          <div
            className="color-popover-backdrop"
            onClick={() => setIsOpen(false)}
          />
          <HexColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
  )
}

export function Playground() {
  const level4 = PRESET_CONFIGS[4]
  const [state, setState] = useState<PlaygroundState>({
    layers: level4.layers,
    offsetX: level4.offsetX,
    offsetY: level4.offsetY,
    blur: level4.blur,
    alpha: level4.alpha,
    color: "#000000"
  })
  const [outputTab, setOutputTab] = useState<OutputTab>("box")
  const [preset, setPreset] = useState("4")

  // Generate shadow values
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

  // Generate output code
  const hasColor = state.color !== "#000000"
  const colorRgb = hexToRgb(state.color)

  const boxOutput = `box-shadow: ${boxShadowCSS};`

  const dropOutput = `filter: ${dropShadowCSS};`

  const colorArg = hasColor ? `, { color: "${colorRgb}" }` : ""
  const jsOutput = `import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow({
  shadowLayers: ${state.layers},
  finalOffsetX: ${state.offsetX},
  finalOffsetY: ${state.offsetY},
  finalBlur: ${state.blur},
  finalAlpha: ${state.alpha}
})

const boxShadow = toBoxShadow(shadow${colorArg})
const dropShadow = toDropShadow(shadow${colorArg})`

  const getOutput = () => {
    switch (outputTab) {
      case "box":
        return boxOutput
      case "drop":
        return dropOutput
      case "js":
        return jsOutput
    }
  }

  const getLanguage = () => {
    return outputTab === "js" ? "tsx" : "css"
  }

  const updateState = useCallback(
    (key: keyof PlaygroundState, value: number | string) => {
      setState((prev) => ({ ...prev, [key]: value }))
      setPreset("custom")
    },
    []
  )

  const handlePresetChange = useCallback((value: string) => {
    setPreset(value)
    if (value === "custom") {
      return
    }

    const level = parseInt(value, 10)
    const config = PRESET_CONFIGS[level]
    if (config) {
      setState((prev) => ({
        ...prev,
        layers: config.layers,
        offsetX: config.offsetX,
        offsetY: config.offsetY,
        blur: config.blur,
        alpha: config.alpha
      }))
    }
  }, [])

  return (
    <div className="playground">
      {/* 1. Preset buttons at top */}
      <div className="playground-presets">
        {LEVEL_NAMES.slice(1).map((name, i) => (
          <button
            key={i + 1}
            className={`preset-btn ${preset === String(i + 1) ? "active" : ""}`}
            onClick={() => handlePresetChange(String(i + 1))}
          >
            <span className="preset-level">{i + 1}</span>
            <span className="preset-name">{name}</span>
          </button>
        ))}
      </div>

      {/* 2. Sliders */}
      <div className="playground-controls">
        <SliderControl
          label="Layers"
          value={state.layers}
          min={1}
          max={8}
          step={1}
          onChange={(v) => updateState("layers", v)}
        />
        <SliderControl
          label="Offset X"
          value={state.offsetX}
          min={-20}
          max={20}
          step={1}
          unit="px"
          onChange={(v) => updateState("offsetX", v)}
        />
        <SliderControl
          label="Offset Y"
          value={state.offsetY}
          min={0}
          max={40}
          step={1}
          unit="px"
          onChange={(v) => updateState("offsetY", v)}
        />
        <SliderControl
          label="Blur"
          value={state.blur}
          min={0}
          max={60}
          step={1}
          unit="px"
          onChange={(v) => updateState("blur", v)}
        />
        <SliderControl
          label="Opacity"
          value={state.alpha}
          min={0}
          max={0.5}
          step={0.01}
          onChange={(v) => updateState("alpha", v)}
        />
        <ColorControl
          value={state.color}
          onChange={(v) => updateState("color", v)}
        />
      </div>

      {/* 3. Preview */}
      <div className="playground-previews">
        <div className="preview-panel">
          <div className="preview-label">box-shadow</div>
          <div className="playground-preview">
            <div
              className="playground-card"
              style={{ boxShadow: boxShadowCSS }}
            />
          </div>
        </div>
        <div className="preview-panel">
          <div className="preview-label">drop-shadow</div>
          <div className="playground-preview">
            <div
              className="playground-card"
              style={{ filter: dropShadowCSS }}
            />
          </div>
        </div>
      </div>

      {/* 4. Code output at bottom */}
      <div className="playground-output">
        <div className="output-tabs">
          <button
            className={`output-tab ${outputTab === "box" ? "active" : ""}`}
            onClick={() => setOutputTab("box")}
          >
            Box Shadow
          </button>
          <button
            className={`output-tab ${outputTab === "drop" ? "active" : ""}`}
            onClick={() => setOutputTab("drop")}
          >
            Drop Shadow
          </button>
          <button
            className={`output-tab ${outputTab === "js" ? "active" : ""}`}
            onClick={() => setOutputTab("js")}
          >
            JavaScript
          </button>
        </div>
        <CodeBlock code={getOutput()} language={getLanguage()} />
      </div>
    </div>
  )
}
