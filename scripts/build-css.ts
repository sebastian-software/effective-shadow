/**
 * Build script to generate CSS files from presets.
 *
 * Run with: npx tsx scripts/build-css.ts
 */

import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { generateCSS } from "../src/generate"
import { effectivePreset } from "../src/presets"

const DIST_DIR = join(import.meta.dirname, "..", "dist")

// Ensure dist directory exists
mkdirSync(DIST_DIR, { recursive: true })

// Generate default shadows.css (using effective preset)
console.log("Generating shadows.css...")
const shadowsCSS = generateCSS(effectivePreset)
writeFileSync(join(DIST_DIR, "shadows.css"), shadowsCSS)

// Generate shadows.module.css (same content, CSS modules compatible)
console.log("Generating shadows.module.css...")
writeFileSync(join(DIST_DIR, "shadows.module.css"), shadowsCSS)

// Generate named preset file
console.log("Generating shadows-effective.css...")
writeFileSync(join(DIST_DIR, "shadows-effective.css"), shadowsCSS)

// Generate CSS variables version
console.log("Generating shadows-vars.css...")
const varsCSS = generateCSS(effectivePreset, { format: "css-variable" })
writeFileSync(join(DIST_DIR, "shadows-vars.css"), varsCSS)

console.log("Done!")
