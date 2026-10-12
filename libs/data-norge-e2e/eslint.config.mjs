import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import baseConfig from "../../eslint.config.mjs";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  ...baseConfig,
  ...compat.extends("plugin:playwright/recommended"),
  { languageOptions: { globals: { ...globals.browser } } },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {},
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    // Override or add rules here
    rules: {},
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {},
  },
  {
    files: ["src/**/*.{ts,js,tsx,jsx}"],
    rules: {
      "playwright/expect-expect": "off",
    },
  },
  {
    ignores: ["playwright.config.ts"],
  },
];
