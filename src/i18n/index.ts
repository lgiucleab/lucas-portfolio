// Translation and language-URL helpers used by every page and component.
import { getRelativeLocaleUrl } from "astro:i18n";

import { locales, type Locale } from "./config";
import { en, type TranslationKey } from "./en";
import { es } from "./es";

// Connects each language to its dictionary.
const dictionaries: Record<Locale, Record<TranslationKey, string>> = { en, es };

// Returns a t() function for one language. Example: t("nav.blog") gives "Blog".
export function useTranslations(locale: Locale) {
  return (key: TranslationKey): string => dictionaries[locale][key];
}

// Builds a URL inside a language. Example: localizedPath("es", "blog") gives "/es/blog/".
// The optional hash points at a section: localizedPath("en", "", "projects") gives "/en/#projects".
export function localizedPath(locale: Locale, path = "", hash?: string): string {
  const url = getRelativeLocaleUrl(locale, path);
  return hash ? `${url}#${hash}` : url;
}

// Removes the language from a pathname, so "/en/blog/" becomes "blog".
export function pathWithoutLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  const hasLocale = locales.some((locale) => locale === parts[0]);
  return (hasLocale ? parts.slice(1) : parts).join("/");
}

// Generates one static page per language for routes inside src/pages/[lang]/.
export function getLocaleStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
