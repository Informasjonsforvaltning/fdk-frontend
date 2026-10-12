import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import baseConfig from "../../eslint.config.mjs";
import nx from "@nx/eslint-plugin";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

// Flat config rejects registering the same plugin twice. The root config already
// registers several of the plugins that `next` brings in through FlatCompat.
const dedupePlugins = (configs) => {
  const seen = new Map();

  return configs.map((config) => {
    if (!config.plugins) {
      return config;
    }

    const plugins = {};
    let replaced = false;

    for (const [name, plugin] of Object.entries(config.plugins)) {
      const existing = seen.get(name);

      if (existing && existing !== plugin) {
        plugins[name] = existing;
        replaced = true;
        continue;
      }

      seen.set(name, plugin);
      plugins[name] = plugin;
    }

    if (!replaced) {
      return config;
    }

    return { ...config, plugins };
  });
};

export default dedupePlugins([
  ...baseConfig,
  ...nx.configs["flat/react-typescript"],
  ...compat.extends("next", "next/core-web-vitals"),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@next/next/no-html-link-for-pages": ["error", "apps/docs/pages"],
    },
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
  ...compat
    .config({
      env: {
        jest: true,
      },
    })
    .map((config) => ({
      ...config,
      files: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.spec.js", "**/*.spec.jsx"],
      rules: {
        ...config.rules,
      },
    })),
  {
    ignores: [".next/**/*", "next-env.d.ts"],
  },
]);
