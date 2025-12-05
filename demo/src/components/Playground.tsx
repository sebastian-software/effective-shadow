import { useState, useEffect, useCallback, useRef } from "react"
import {
  buildShadow,
  toBoxShadow,
  toDropShadow,
  effectivePreset
} from "@effective/shadow"

// Declare external highlight.js
declare const hljs: { highlightAll: () => void }

interface PlaygroundState {
  layers: number
  offsetX: number
  offsetY: number
  blur: number
  alpha: number
  color: string
}

type OutputTab = "css" | "js"

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
  return (
    <div className="control control-color">
      <label>
        <span>Color</span>
        <span className="color-preview" style={{ background: value }} />
      </label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
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
  const [outputTab, setOutputTab] = useState<OutputTab>("css")
  const [preset, setPreset] = useState("4")
  const [isCopied, setIsCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

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

  const cssOutput = `/* box-shadow */
box-shadow: ${boxShadowCSS};

/* drop-shadow (for non-rectangular shapes) */
filter: ${dropShadowCSS};`

  const colorArg = hasColor ? `, { color: "${colorRgb}" }` : ""
  const jsOutput = `import { buildShadow, toBoxShadow, toDropShadow } from "@effective/shadow"

const shadow = buildShadow(${JSON.stringify(
    {
      shadowLayers: state.layers,
      finalOffsetX: state.offsetX,
      finalOffsetY: state.offsetY,
      finalBlur: state.blur,
      finalAlpha: state.alpha
    },
    null,
    2
  )})

// For rectangular elements
const boxShadow = toBoxShadow(shadow${colorArg})

// For non-rectangular shapes (icons, PNGs)
const filter = toDropShadow(shadow${colorArg})`

  const output = outputTab === "css" ? cssOutput : jsOutput

  // Re-highlight code when output changes
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted")
      hljs.highlightAll()
    }
  }, [output])

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

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(output)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [output])

  return (
    <div className="playground">
      <div className="playground-previews">
        <div className="preview-panel">
          <div className="preview-label">box-shadow</div>
          <div className="playground-preview">
            <div
              className="playground-card"
              style={{ boxShadow: boxShadowCSS }}
            >
              <span className="icon icon-square icon-lg preview-icon" />
            </div>
          </div>
        </div>
        <div className="preview-panel">
          <div className="preview-label">drop-shadow</div>
          <div className="playground-preview">
            <div className="playground-card" style={{ filter: dropShadowCSS }}>
              <span className="icon icon-star icon-lg preview-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="playground-sidebar">
        <div className="preset-selector">
          <label>
            <span className="icon icon-palette icon-sm" />
            <span>Preset</span>
          </label>
          <select
            value={preset}
            onChange={(e) => handlePresetChange(e.target.value)}
          >
            <option value="custom">Custom</option>
            {LEVEL_NAMES.slice(1).map((name, i) => (
              <option key={i + 1} value={i + 1}>
                Level {i + 1} – {name}
              </option>
            ))}
          </select>
        </div>

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
      </div>

      <div className="playground-output">
        <div className="output-tabs">
          <button
            className={`output-tab ${outputTab === "css" ? "active" : ""}`}
            onClick={() => setOutputTab("css")}
          >
            CSS
          </button>
          <button
            className={`output-tab ${outputTab === "js" ? "active" : ""}`}
            onClick={() => setOutputTab("js")}
          >
            JavaScript
          </button>
        </div>
        <pre className="output-code">
          <code ref={codeRef}>{output}</code>
        </pre>
        <button
          className={`copy-btn ${isCopied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          <span
            className={`icon ${isCopied ? "icon-check" : "icon-copy"} icon-sm`}
          />
          Copy
        </button>
      </div>
    </div>
  )
}
