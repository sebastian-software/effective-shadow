import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/demo-dist/**",
      "**/demo-tailwind-dist/**"
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.stories.ts", "src/**/*.test.ts"]
    }
  }
})
