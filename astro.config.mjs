// Main Astro configuration: site URL, build behaviour and integrations.
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  // Public address of the site, used later for canonical URLs, the sitemap and RSS.
  // TODO: Lucas — replace with the real address after deploying to Vercel (Phase 11).
  site: "https://lucas-giuclea-balan.vercel.app",

  // "static" pre-renders every page to HTML at build time, so pages stay fast.
  // Server code is opt-in: only the contact form's Astro Action will run on demand.
  output: "static",

  // Packages the build for Vercel, including that server code.
  adapter: vercel(),

  // astro-icon inlines SVG icons at build time, so they add no JavaScript to the browser.
  integrations: [icon()],

  // Tailwind 4 runs as a Vite plugin, the officially recommended setup for Astro.
  vite: {
    plugins: [tailwindcss()],
  },
});
