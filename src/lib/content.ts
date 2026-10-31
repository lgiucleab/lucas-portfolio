// Helpers that read content collections for one language.
import { getCollection, getEntry, type CollectionKey } from "astro:content";

import type { Locale } from "@/i18n/config";

// Returns the entries of a collection in one language. Files live in <collection>/<language>/.
export async function getLocalizedEntries<C extends CollectionKey>(collection: C, locale: Locale) {
  return getCollection(collection, (entry) => entry.id.startsWith(`${locale}/`));
}

// Returns one piece of personal text, such as the hero intro or the About text.
export async function getProfileEntry(name: "hero" | "about", locale: Locale) {
  const entry = await getEntry("profile", `${locale}/${name}`);
  // A missing file should stop the build, not publish an empty section.
  if (!entry) throw new Error(`Missing file: src/content/profile/${locale}/${name}.md`);
  return entry;
}
