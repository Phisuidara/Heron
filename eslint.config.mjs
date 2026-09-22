import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";

export default tseslint.config(
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    files: ["**/*.astro"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
);
