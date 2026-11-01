// RSS feed for one language, published at /en/rss.xml and /es/rss.xml
import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths } from "astro";

import type { Locale } from "@/i18n/config";
import { getLocaleStaticPaths, localizedPath, useTranslations } from "@/i18n";
import { getPostSlug, getPublishedPosts } from "@/lib/content";

export const getStaticPaths = (() => getLocaleStaticPaths()) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, site }) => {
  // getStaticPaths only creates feeds for valid languages, so this cast is safe.
  const locale = params.lang as Locale;
  const t = useTranslations(locale);
  const posts = await getPublishedPosts(locale);

  return rss({
    title: t("meta.blogTitle"),
    description: t("meta.blogDescription"),
    // "site" comes from astro.config.mjs.
    site: site ?? "",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: localizedPath(locale, `blog/${getPostSlug(post)}`),
    })),
  });
};
