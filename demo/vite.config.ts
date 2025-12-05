import { resolve } from "path"
import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [viteSingleFile()],
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
