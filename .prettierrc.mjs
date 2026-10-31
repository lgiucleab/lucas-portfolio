// Prettier configuration: formats code automatically so the style stays consistent.

/** @type {import("prettier").Config} */
export default {
  // Order matters: the Tailwind plugin must come last to work alongside the Astro one.
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],

  // Longest line Prettier allows before wrapping the code.
  printWidth: 100,

  // Tells Prettier to read .astro files with the Astro parser.
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],

  // Lets the Tailwind plugin find custom classes from the design tokens when sorting.
  tailwindStylesheet: "./src/styles/global.css",
};
