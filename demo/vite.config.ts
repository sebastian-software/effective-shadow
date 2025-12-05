import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [react(), viteSingleFile()],
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
