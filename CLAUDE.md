# Build my developer portfolio website

You are helping me, Lucas Giuclea Balan (Computer Science student at Universitat Jaume I), build my personal developer portfolio from scratch. This site goes on my resume, so code quality, structure and documentation matter as much as how it looks. I also want to learn from it, so follow the **Dev Rules** below strictly.

---

## 1. Dev Rules (most important — follow these the whole time)

1. **Ask before you assume.** If you are unsure about anything (how to build something, which library to use, where a section goes, wording, colors, file structure, naming), stop and ask me. Use multiple-choice questions when you can, with your recommended option first and a short reason. Never install a dependency I haven't approved.
2. **Work in phases.** Follow the phases in section 8. At the start of each phase, tell me what you will do and ask any questions. At the end of each phase, stop and wait for my OK before starting the next one.
3. **Explain every step.** After each step, explain in plain language:
   - **What** you did (files created or changed)
   - **How** you did it (the key code or commands, and what they do)
   - **Why** you did it this way, and what alternatives you rejected
   - **How I can change it** later (which file or value to edit)
4. **Comment all the code.** Every file starts with a header comment saying what it is for. Every component, function, prop, config option, Tailwind design token and non-obvious line gets a comment. Write the comments for a student who wants to change everything later, not for an expert. Ask me at the start whether comments should be in English or Spanish.
5. **Small, clean commits.** Use git from the start. Make one commit per logical step, with Conventional Commit messages (`feat:`, `fix:`, `docs:`…). Never commit secrets.
6. **Quality bar.** TypeScript strict mode, no `any`. Accessible HTML (semantic tags, alt text, keyboard navigation, visible focus, good color contrast, `prefers-reduced-motion` respected). Target a Lighthouse score of 95+ in every category. `astro check` must pass with no errors.

---

## 2. Tech stack

**Already decided:**
- **Framework:** Astro (latest stable), with **TypeScript** (strict)
- **Styling:** Tailwind CSS (latest stable, set up the officially recommended way for Astro)
- **Content:** Astro Content Collections + MDX for projects, experience/education and blog posts (typed with Zod schemas)
- **i18n:** Astro's built-in i18n routing (EN/ES)
- **Icons:** `astro-icon` (or a similar zero-JS icon solution; propose one and ask me)
- **Interactivity:** plain TypeScript in Astro `<script>` tags plus Astro View Transitions. No React or other UI framework unless you explain why one is truly needed and I agree.
- **Backend:** **Astro Actions** (server functions with Zod validation), deployed on **Vercel** using the `@astrojs/vercel` adapter. Pages are pre-rendered (static) by default; only the actions run on the server.
- **Email:** Resend, to send contact form messages to my inbox
- **Analytics:** Vercel Web Analytics (cookie-free, privacy-friendly)

**Ask me before adding anything else.** For example: an OG image library, a syntax highlighting theme for the blog, a test framework, or a formatter/linter setup (suggest Prettier + ESLint with the Astro and Tailwind plugins).

---

## 3. Layout and structure: copy https://porfolio.dev/ exactly

Fetch https://porfolio.dev/ and study it. My site must be **organized the same way**: same section order, same navigation behavior, same kind of components inside each section. Its structure is:

1. **Sticky header / navbar:** anchor links to *Experience*, *Projects*, *About me* and *Contact*. The active section is highlighted while scrolling. Includes a **theme switcher with Light / Dark / System**.
2. **Hero:** round avatar photo + an **"Available for work" badge** (links to my LinkedIn) → big H1 greeting ("Hey, I'm Lucas") → short intro paragraph with key words highlighted (who I am, what I study, where I'm based, what I build) → buttons: **Contact me**, **LinkedIn**, **GitHub**.
3. **Experience:** a vertical timeline. Each entry shows the title (H3), place (H4), date range, description and an optional "Learn more" link.
4. **Projects:** cards with an image, title, tech-stack tags (with icons), a description, and **Code** / **Preview** buttons.
5. **About me:** text with bold key words + a second photo of me.
6. **Footer:** copyright with the current year, a "Contact" link, and my social links.

It also uses Astro View Transitions and smooth-scroll anchor links. Do the same.

**New sections and features** (not on porfolio.dev; see section 6): **propose where each one goes and ask me before building it.** My starting suggestion:
Hero → Experience & Education → Projects → **Skills** → About me → **Contact (with form)** → Footer, with the **Blog** as its own page linked from the navbar.
Also ask me whether *Education* should be merged into the Experience timeline or be its own section. I'm a student, so education is important.

---

## 4. Visual design: follow this Behance concept

Visual style reference: https://www.behance.net/gallery/199132655/Portfolio-Full-stack-Developer

Copy the **look** from this design (colors, typography, spacing, card style, buttons, backgrounds, effects, mood) and apply it to the **structure** from section 3.

- Try to fetch the Behance page. Behance often blocks automated access. If you can't see it, **stop and ask me for screenshots**. I'll put them in `design-reference/` at the project root. Do not guess the design.
- From the reference, extract a **design system** and show it to me before building any section: color palette (light **and** dark variants, since the theme switcher needs both), font families and sizes, spacing scale, border radius, shadows, and button/card/tag styles. Put it all in Tailwind theme tokens and CSS variables so I can restyle the whole site by changing one place.
- If the reference only shows one theme (light or dark), propose a matching version of the other one and ask me to approve it.
- Use the fonts it uses, or the closest free alternatives (self-hosted, e.g. via Fontsource), and tell me which ones you picked.
- Animations should be subtle: CSS transitions, scroll reveals, hover effects, and View Transitions. Respect `prefers-reduced-motion`.

---

## 5. Language support: EN / ES

- URL-based routing: `/en/...` and `/es/...`. Ask me which language is the default, and whether the default language should have a prefix in the URL.
- A language switcher in the navbar that keeps you on the same page/section when switching.
- All UI text (nav, buttons, labels, form messages, errors) lives in translation dictionaries in `src/i18n/` with a typed `t()` helper, so a missing translation shows up as a TypeScript error.
- Content (projects, experience, education, blog posts, about text) has one version per language in the content collections.
- Correct `<html lang>`, `hreflang` alternate links, and translated meta tags on every page.
- Detect the browser language on the first visit only if I approve it (ask me).

---

## 6. Features

### 6.1 Skills / tech stack section
Logos and names grouped into categories (e.g. Languages, Frontend, Backend, Tools, Learning). Data lives in a single typed file I can edit. Ask me for my skills; don't invent them.

### 6.2 Live GitHub data
- Pull my public repositories from the **GitHub REST API at build time** (not in the visitor's browser): name, description, languages, stars, topics, homepage URL, last update.
- I choose which repos are shown as **featured projects** in a config file (repo name + optional custom image, translated description and tags). Repo data fills in the rest automatically.
- Optional "More on GitHub" area with recent repos or a contribution summary. Ask me what to show.
- Use an optional `GITHUB_TOKEN` environment variable to avoid rate limits. If the API fails, the build must not crash: fall back to cached or local data.
- Keep the data fresh: propose a scheduled rebuild (e.g. a GitHub Actions cron calling a Vercel Deploy Hook once a day) and ask me.
- **Ask me for my GitHub username** at the start.

### 6.3 Blog / project write-ups
- `/[lang]/blog` list page and `/[lang]/blog/[slug]` post pages, written in MDX.
- Each post: title, date, description, tags, reading time, optional link to the related project, and a cover image.
- Code blocks with syntax highlighting (Astro's built-in Shiki) and a copy button. Use a theme that matches light and dark mode.
- RSS feed for each language.
- Create **one example post** (clearly marked as a placeholder) so I can see the format. I'll write the real ones.

### 6.4 Downloadable CV (EN/ES)
A "Download CV" button in the hero (and/or About section; ask me) that serves the PDF for the current language from `public/cv/`. I will provide the PDF files.

### 6.5 Contact section with a form
- Fields: name, email, message. Validate both in the browser and on the server with a shared Zod schema in an **Astro Action**.
- Send the message to my email with **Resend**. All keys go in environment variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, etc.), and you create a `.env.example` file listing them.
- Anti-spam: a honeypot field plus basic rate limiting. Explain the options for rate limiting on Vercel and ask me which to use.
- Clear loading, success and error states, all translated.
- Also show my email (with a copy button) and my social links.

### 6.6 SEO + social previews
- A reusable `<SEO>` component: title, description, canonical URL, Open Graph and Twitter tags, `hreflang`.
- **Auto-generated Open Graph images** for the home page and each blog post, in my design style. Propose a library and ask me.
- `@astrojs/sitemap`, `robots.txt`, favicon set, web manifest, and JSON-LD `Person` structured data.

### 6.7 Analytics
Vercel Web Analytics (cookie-free). Ask me whether to add Vercel Speed Insights too.

---

## 7. Where my data comes from

- **Education:** from my resume. You can't see my other chats, so **ask me to paste my resume or add it to the project** (e.g. `docs/resume.pdf` or `docs/resume.md`), then read it and fill in the Education (and Experience, if any) entries in both languages. Show me the result to check.
- **Projects:** from my GitHub (section 6.2).
- **Everything else** (photos, intro text, about-me text, location, social links, email, skills, availability status, domain name…): **ask me**. Never invent personal information. Where data is missing, use clearly marked placeholders like `TODO: Lucas — add …` and list all TODOs at the end of each phase.

---

## 8. Build phases (stop and wait for my OK after each one)

0. **Discovery.** Read this whole prompt, fetch both reference sites, and ask me every question you need (GitHub username, default language, comment language, resume, design screenshots if needed, section placement, the open questions above). Then show me the **planned folder structure** and a short **plan**.
1. **Project setup.** Scaffold Astro + TypeScript strict + Tailwind + Vercel adapter, set up git, Prettier/ESLint (if approved), path aliases, `.env.example` and the base README.
2. **Design system.** Tailwind tokens, CSS variables, fonts, light/dark/system theme switcher (with no flash of the wrong theme on page load). Build a temporary `/styleguide` page that shows all the tokens and base components so I can approve them.
3. **Layout + i18n.** Base layout, sticky navbar with active-section highlighting, language switcher, footer, translation system, View Transitions.
4. **Content collections.** Zod schemas for experience, education, projects and blog. Fill them in from my resume, in EN and ES.
5. **Sections.** Hero → Experience/Education → Projects → Skills → About, one at a time, matching the porfolio.dev structure and the Behance look.
6. **GitHub integration.** Build-time fetching, featured-project config, fallback data, scheduled rebuild.
7. **Blog.** List page, post pages, MDX, syntax highlighting, RSS, example post.
8. **Contact.** Form, Astro Action, Resend, anti-spam, all states.
9. **CV, SEO, OG images, analytics.**
10. **Quality checks.** `astro check`, linting, an accessibility pass, Lighthouse, responsive testing (mobile/tablet/desktop) and both themes in both languages. Suggest a small Playwright smoke test and a GitHub Actions CI workflow, and ask me.
11. **Deploy.** Walk me step by step through deploying to Vercel, setting the environment variables, and connecting a custom domain if I have one.
12. **README.** A portfolio-quality README: screenshots, features, tech stack, architecture overview, how to run locally, how to edit content, and the environment variables. This README is part of my portfolio too.

---

## 9. Start now

Begin with **Phase 0**: confirm you understood this prompt, summarize it in a few bullet points, then ask me your questions. Don't write any code until I've answered.
