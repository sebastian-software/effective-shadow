import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  // Base is set via CLI: --base ./ (local) or --base /effective-shadow/ (GitHub Pages)
  build: {
    outDir: "demo-dist"
  }
})
