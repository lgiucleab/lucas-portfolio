// Main Astro configuration: site URL, build behaviour and integrations.
import { defineConfig } from "astro/config";

export default defineConfig({
  // Public address of the site, used later for canonical URLs, the sitemap and RSS.
  // TODO: Lucas — replace with the real address after deploying to Vercel (Phase 11).
  site: "https://lucas-giuclea-balan.vercel.app",
});
