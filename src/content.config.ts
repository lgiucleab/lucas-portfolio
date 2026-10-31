// Defines the site's content collections. Each schema lists the fields a content file
// must have, so a missing or wrongly typed field stops the build with a clear error.
//
// Files live in src/content/<collection>/<language>/<name>.md
// A translated pair uses the same file name in en/ and es/. The text below the
// "---" block of each file is its description.
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

// Finds every Markdown or MDX file inside one collection folder.
function contentFiles(collection: string) {
  return glob({ pattern: "**/*.{md,mdx}", base: `./src/content/${collection}` });
}

// Fields shared by the two kinds of timeline entry.
const timelineFields = {
  // Role or degree name.
  title: z.string(),
  // Company or school name.
  place: z.string(),
  // City, shown next to the place.
  location: z.string().optional(),
  // First month, written as YYYY-MM-DD.
  startDate: z.coerce.date(),
  // Last month. Leave it out for something still in progress ("Present").
  endDate: z.coerce.date().optional(),
  // Optional address for the "Learn more" link.
  link: z.url().optional(),
};

// Jobs and similar work. It stays empty until there is a first entry.
const experience = defineCollection({
  loader: contentFiles("experience"),
  schema: z.object(timelineFields),
});

// Schools and degrees. Shown in the same timeline as experience.
const education = defineCollection({
  loader: contentFiles("education"),
  schema: z.object(timelineFields),
});

// Featured projects. Having a file here is what makes a repository featured.
// Phase 6 fills in stars, languages and dates from GitHub.
const projects = defineCollection({
  loader: contentFiles("projects"),
  schema: ({ image }) =>
    z.object({
      // Name shown on the card.
      title: z.string(),
      // Exact GitHub repository name, such as "OpenSkyATC".
      repo: z.string(),
      // Private repositories show a "Private" tag and no Code button.
      private: z.boolean().default(false),
      // Technologies shown as tags.
      tags: z.array(z.string()),
      // Card image, relative to this file. Optional until a screenshot exists.
      image: image().optional(),
      // Live demo address for the Preview button. It overrides the repository's homepage.
      preview: z.url().optional(),
      // Position on the page: lower numbers come first.
      order: z.number().default(100),
    }),
});

// Blog posts. The first post arrives in Phase 7.
const blog = defineCollection({
  loader: contentFiles("blog"),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Summary for the post list and search results.
      description: z.string(),
      // Publication date, written as YYYY-MM-DD.
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      // Cover image, relative to this file.
      cover: image().optional(),
      // File name of a related entry in the projects collection.
      project: z.string().optional(),
      // Draft posts are left out of the published site.
      draft: z.boolean().default(false),
    }),
});

// Personal text with no fixed fields: the hero intro and the About section.
const profile = defineCollection({
  loader: contentFiles("profile"),
  schema: z.object({}),
});

// Astro only loads the collections listed here.
export const collections = { experience, education, projects, blog, profile };
