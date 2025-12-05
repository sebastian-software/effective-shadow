import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [react(), svgr(), viteSingleFile()],
  resolve: {
    alias: {
      "@effective/shadow": resolve(__dirname, "../src")
    }
  },
  build: {
    outDir: "../demo-dist",
    emptyOutDir: true
  }
})
