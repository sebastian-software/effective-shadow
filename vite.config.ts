import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  base: "/effective-shadow/",
  build: {
    outDir: "demo-dist"
  }
})
