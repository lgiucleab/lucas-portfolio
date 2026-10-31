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

## Environment variables

Copy `.env.example` to `.env` and fill in the values. Each variable is explained in that file. Never commit `.env`.
