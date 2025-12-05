/**
 * Effective Shadow - Tailwind CSS Plugin
 *
 * Usage in tailwind.config.js:
 *   import effectiveShadow from "@effective/shadow/tailwind"
 *
 *   export default {
 *     plugins: [effectiveShadow]
 *   }
 *
 * Then use: shadow-effective-1, shadow-effective-2, etc.
 */

import plugin from "tailwindcss/plugin"
import { generateFromPreset } from "./generate"
import { effectivePreset } from "./presets"

const shadows = generateFromPreset(effectivePreset)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const effectiveShadowPlugin: any = plugin(function ({ addUtilities }) {
  const shadowUtilities: Record<string, Record<string, string>> = {}

  // Box shadow utilities
  shadows.forEach(({ level, boxShadow }) => {
    shadowUtilities[`.shadow-effective-${level}`] = {
      "box-shadow": boxShadow
    }
  })

  // Drop shadow utilities
  shadows.forEach(({ level, dropShadow }) => {
    shadowUtilities[`.drop-shadow-effective-${level}`] = {
      filter: dropShadow === "none" ? "none" : dropShadow
    }
  })

  addUtilities(shadowUtilities)
})

export default effectiveShadowPlugin
