// Helpers that read content collections for one language.
import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from "astro:content";

import type { Locale } from "@/i18n/config";

// Returns the entries of a collection in one language. Files live in <collection>/<language>/.
export async function getLocalizedEntries<C extends CollectionKey>(collection: C, locale: Locale) {
  return getCollection(collection, (entry) => entry.id.startsWith(`${locale}/`));
}

// Average adult reading speed, used for the reading time.
const WORDS_PER_MINUTE = 200;

// Returns the blog posts in one language, newest first.
// Drafts appear in "npm run dev", so they can be previewed, but never in the published site.
export async function getPublishedPosts(locale: Locale) {
  const posts = await getLocalizedEntries("blog", locale);
  return posts
    .filter((post) => import.meta.env.DEV || !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// Removes the language from a post id, so "en/my-post" becomes "my-post".
export function getPostSlug(post: CollectionEntry<"blog">): string {
  return post.id.split("/").slice(1).join("/");
}

// Estimates the minutes needed to read a post, with a minimum of 1.
export function getReadingMinutes(post: CollectionEntry<"blog">): number {
  const words = post.body?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

// Returns one piece of personal text, such as the hero intro or the About text.
export async function getProfileEntry(name: "hero" | "about", locale: Locale) {
  const entry = await getEntry("profile", `${locale}/${name}`);
  // A missing file should stop the build, not publish an empty section.
  if (!entry) throw new Error(`Missing file: src/content/profile/${locale}/${name}.md`);
  return entry;
}
