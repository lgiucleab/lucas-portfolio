# Lucas Giuclea Balan — Portfolio

Personal developer portfolio, built with Astro. This is the base README; the full version comes in Phase 12.

## Tech stack

- [Astro](https://astro.build) with strict TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com) for hosting and server functions

## Run locally

You need Node.js 24 or newer.

```bash
npm install
npm run dev
```

The site then runs at <http://localhost:4321>.

## Commands

| Command                   | What it does                                 |
| ------------------------- | -------------------------------------------- |
| `npm run dev`             | Starts the local development server          |
| `npm run build`           | Type checks, then builds the production site |
| `npm run preview`         | Serves the built site locally                |
| `npm run check`           | Type checks with `astro check`               |
| `npm run lint`            | Finds code problems with ESLint              |
| `npm run format`          | Formats all files with Prettier              |
| `npm run format:check`    | Reports unformatted files without changing   |
| `npm test`                | Runs the browser smoke tests                 |
| `npm run icons`           | Regenerates the favicons                     |
| `npm run github:fallback` | Saves GitHub data for use if the API fails   |

## Tests

The smoke tests in `tests/` open the site in a real browser. They check every language, theme and screen size, plus the main features, and never send an email. The first time, install the test browser:

```bash
npx playwright install chromium
```

Then run them:

```bash
npm test
```

GitHub Actions runs the formatting check, lint, build and these tests on every push.

## Add your photos

Drop `avatar.jpg` (hero) and `about.jpg` (About section) into `src/assets/photos/`. The `.png`, `.webp` and `.avif` formats also work. The site resizes them and replaces the "LG" placeholders automatically.

## Add your CV

Add `cv-en.pdf` and `cv-es.pdf` to `public/cv/`. The "Download CV" button appears by itself for each language that has a file. These files are public, so leave out your phone number and address.

## Add a project

Each file in `src/content/projects/` is one project card, so no code changes are needed.

1. Create `src/content/projects/en/my-project.md`:

   ```md
   ---
   title: My Project
   repo: my-project
   private: false
   tags: ["TypeScript", "Astro"]
   image: ../../../assets/projects/my-project.png
   preview: https://my-project.vercel.app
   order: 3
   ---

   Short description. Wrap _key words_ in underscores to highlight them.
   ```

2. Create `src/content/projects/es/my-project.md` with the same file name and the text in Spanish.

| Field     | Required | Meaning                                                |
| --------- | -------- | ------------------------------------------------------ |
| `title`   | Yes      | Name on the card                                       |
| `repo`    | Yes      | Exact GitHub repository name                           |
| `tags`    | No       | Technologies on the card. Defaults to GitHub's data    |
| `private` | No       | `true` shows a "Private" tag and hides the Code button |
| `image`   | No       | Card image, added to `src/assets/projects/`            |
| `preview` | No       | Preview address. Defaults to the repository's homepage |
| `order`   | No       | Position on the page, where lower numbers come first   |

If you leave the description empty, the card shows the GitHub description, which is not translated. To remove a project from the site, delete both files. A private repository also has to be allowed in the `GITHUB_TOKEN` settings on GitHub.

## Write a blog post

Each post is two MDX files, one per language, with the same file name. The file name becomes the address, so `my-post.mdx` is published at `/en/blog/my-post/` and `/es/blog/my-post/`.

```mdx
---
title: My post
description: One sentence for the post list, search results and RSS.
date: 2026-11-01
tags: ["Astro", "TypeScript"]
cover: ../../../assets/blog/my-post.png
project: openskyatc
draft: true
---

Write the post here in Markdown.
```

Only `title`, `description` and `date` are required. `project` is a file name from `src/content/projects/`. With `draft: true` the post shows in `npm run dev` but is not published, so remove the line in both languages when it is ready. The reading time is calculated automatically.

## GitHub data

Stars, last update dates and the "More on GitHub" list are fetched from the GitHub API during each build. If the API fails, the build uses `src/data/github-fallback.json` and logs a warning. After adding a featured project, refresh that file:

```bash
npm run github:fallback
```

The workflow in `.github/workflows/daily-rebuild.yml` starts a new deployment every day to keep the data fresh.

## Contact form

The form sends through the `contact` Astro Action in `src/actions/index.ts`, the only code that runs on a server. Resend delivers the email, Upstash Redis limits each visitor to 5 messages per hour, and a hidden honeypot field catches bots. The validation rules are in `src/lib/contact-schema.ts` and are shared by the browser and the server.

Without `RESEND_API_KEY` and `CONTACT_TO_EMAIL` the form shows its error message. Without the Upstash variables it still sends, but with no rate limit.

## SEO and icons

`src/components/seo/SEO.astro` holds the search and social tags. Preview images are drawn at build time from `src/lib/og-image.ts`, one per language for the home page and one per blog post. To change the favicon, edit the values in `scripts/generate-favicons.mjs` and run:

```bash
npm run icons
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values. Each variable is explained in that file. Never commit `.env`.
