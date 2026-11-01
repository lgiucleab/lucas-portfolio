// Main Astro configuration: site URL, build behaviour and integrations.
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  // Public address of the site, used later for canonical URLs, the sitemap and RSS.
  // TODO: Lucas — replace with the real address after deploying to Vercel (Phase 11).
  site: "https://lucas-giuclea-balan.vercel.app",

  // Secrets read while the site runs, not at build time. "server" and "secret" mean they
  // can only be imported by server code, so they cannot reach the browser by accident.
  // Each one is optional, so the site still builds before the accounts exist.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
        default: "onboarding@resend.dev",
      }),
      UPSTASH_REDIS_REST_URL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      UPSTASH_REDIS_REST_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },

  // Built-in i18n routing. If you add a language, also add it to src/i18n/config.ts.
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      // Both languages get a prefix: /en/... and /es/...
      prefixDefaultLocale: true,
      // Keeps src/pages/index.astro at "/", which chooses the visitor's language.
      redirectToDefaultLocale: false,
    },
  },

  // "static" pre-renders every page to HTML at build time, so pages stay fast.
  // Server code is opt-in: only the contact form's Astro Action will run on demand.
  output: "static",

  // Packages the build for Vercel, including that server code.
  adapter: vercel(),

  // astro-icon inlines SVG icons at build time, so they add no JavaScript to the browser.
  // MDX lets blog posts use Markdown plus components.
  integrations: [mdx(), icon()],

  // Syntax highlighting for code blocks, done at build time by Shiki.
  markdown: {
    shikiConfig: {
      // One theme per site theme. These "default" versions have readable comments in both.
      themes: { light: "github-light-default", dark: "github-dark-default" },
      // Outputs both as CSS variables, and global.css picks one using data-theme.
      defaultColor: false,
    },
  },

  // Tailwind 4 runs as a Vite plugin, the officially recommended setup for Astro.
  vite: {
    plugins: [tailwindcss()],
  },
});
