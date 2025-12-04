// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import globals from "globals"

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    }
  }
}, {
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ]
  }
}, {
  ignores: ["dist/", "node_modules/", "storybook-static/"]
}, storybook.configs["flat/recommended"]);

