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
import { boxShadow, dropShadow } from "./index"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const effectiveShadowPlugin: any = plugin(function ({ addUtilities }) {
  const shadowUtilities: Record<string, Record<string, string>> = {}

  // Box shadow utilities
  boxShadow.forEach((shadow, index) => {
    shadowUtilities[`.shadow-effective-${index}`] = {
      "box-shadow": shadow
    }
  })

  // Drop shadow utilities
  dropShadow.forEach((shadow, index) => {
    shadowUtilities[`.drop-shadow-effective-${index}`] = {
      filter: shadow || "none"
    }
  })

  addUtilities(shadowUtilities)
})

export default effectiveShadowPlugin
