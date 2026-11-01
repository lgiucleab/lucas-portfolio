// ESLint configuration: finds likely bugs and bad patterns. Prettier handles formatting.
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  // Generated folders are never linted.
  { ignores: ["dist/", ".astro/", ".vercel/", "node_modules/", "test-results/"] },

  // Recommended TypeScript rules.
  ...tseslint.configs.recommended,

  // Recommended rules for .astro files.
  ...astro.configs.recommended,

  // Project rule: "any" turns off type checking, so it is an error rather than a warning.
  { rules: { "@typescript-eslint/no-explicit-any": "error" } },
];
