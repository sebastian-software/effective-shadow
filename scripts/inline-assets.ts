/**
 * Post-build script to inline CSS and JS into HTML for file:// compatibility
 */
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  unlinkSync,
  rmdirSync
} from "fs"
import { join } from "path"

const distDir = join(import.meta.dirname, "..", "demo-dist")
const assetsDir = join(distDir, "assets")
const htmlPath = join(distDir, "index.html")

let html = readFileSync(htmlPath, "utf-8")

// Find and inline CSS files
const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith(".css"))
for (const cssFile of cssFiles) {
  const cssPath = join(assetsDir, cssFile)
  const cssContent = readFileSync(cssPath, "utf-8")

  // Replace link tag with inline style
  const linkRegex = new RegExp(
    `<link[^>]*href=["']\\./assets/${cssFile}["'][^>]*>`,
    "g"
  )
  html = html.replace(linkRegex, `<style>${cssContent}</style>`)

  unlinkSync(cssPath)
}

// Find and inline JS files
const jsFiles = readdirSync(assetsDir).filter((f) => f.endsWith(".js"))
for (const jsFile of jsFiles) {
  const jsPath = join(assetsDir, jsFile)
  const jsContent = readFileSync(jsPath, "utf-8")

  // Replace script tag with inline script (remove type="module" for file:// compat)
  const scriptRegex = new RegExp(
    `<script[^>]*src=["']\\./assets/${jsFile}["'][^>]*></script>`,
    "g"
  )
  html = html.replace(scriptRegex, `<script>${jsContent}</script>`)

  unlinkSync(jsPath)
}

// Remove empty assets directory
try {
  rmdirSync(assetsDir)
} catch {
  // Directory might not be empty or already removed
}

// Write updated HTML
writeFileSync(htmlPath, html)

console.log("✓ Inlined all assets into index.html")
