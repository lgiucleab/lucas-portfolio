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

| Command                | What it does                                 |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Starts the local development server          |
| `npm run build`        | Type checks, then builds the production site |
| `npm run preview`      | Serves the built site locally                |
| `npm run check`        | Type checks with `astro check`               |
| `npm run lint`         | Finds code problems with ESLint              |
| `npm run format`       | Formats all files with Prettier              |
| `npm run format:check` | Reports unformatted files without changing   |

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
| `tags`    | Yes      | Technologies shown on the card                         |
| `private` | No       | `true` shows a "Private" tag and hides the Code button |
| `image`   | No       | Card image, added to `src/assets/projects/`            |
| `preview` | No       | Live demo address for the Preview button               |
| `order`   | No       | Position on the page, where lower numbers come first   |

To remove a project from the site, delete both files. A private repository also has to be allowed in the `GITHUB_TOKEN` settings on GitHub.

## Environment variables

Copy `.env.example` to `.env` and fill in the values. Each variable is explained in that file. Never commit `.env`.
