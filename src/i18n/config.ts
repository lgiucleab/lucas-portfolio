// Lists the site's languages. Keep this in sync with "i18n" in astro.config.mjs.

// Every supported language. "as const" lets TypeScript treat them as exact values.
export const locales = ["en", "es"] as const;

// A value that can only be "en" or "es".
export type Locale = (typeof locales)[number];

// Language used when no better choice is known, such as for x-default links.
export const defaultLocale: Locale = "en";

// Names shown to visitors. Each name is written in its own language on purpose.
export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
};
