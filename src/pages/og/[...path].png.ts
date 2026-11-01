// Generates one preview image per language for the home page, and one per blog post.
// Examples: /og/en/home.png and /og/es/blog/my-post.png
import type { APIRoute, GetStaticPaths } from "astro";

import { locales } from "@/i18n/config";
import { useTranslations } from "@/i18n";
import { getPostSlug, getPublishedPosts } from "@/lib/content";
import { renderOgImage } from "@/lib/og-image";

export const getStaticPaths = (async () => {
  const paths = await Promise.all(
    locales.map(async (locale) => {
      const t = useTranslations(locale);
      const posts = await getPublishedPosts(locale);
      return [
        {
          params: { path: `${locale}/home` },
          props: { title: "Lucas Giuclea Balan", subtitle: t("footer.role") },
        },
        ...posts.map((post) => ({
          params: { path: `${locale}/blog/${getPostSlug(post)}` },
          props: { title: post.data.title, subtitle: post.data.description },
        })),
      ];
    }),
  );
  return paths.flat();
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle } = props as { title: string; subtitle: string };
  const png = await renderOgImage(title, subtitle);
  return new Response(Uint8Array.from(png), { headers: { "Content-Type": "image/png" } });
};
