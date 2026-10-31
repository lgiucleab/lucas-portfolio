// English interface text. This file defines every translation key the site has.
// Add a key here and TypeScript will report an error until es.ts has it too.

export const en = {
  // Page metadata.
  "meta.title": "Lucas Giuclea Balan | Computer Science student",
  "meta.description":
    "Portfolio of Lucas Giuclea Balan, Computer Science student at Universitat Jaume I in the Comunidad Valenciana, Spain.",
  "meta.blogTitle": "Blog | Lucas Giuclea Balan",
  "meta.blogDescription": "Articles and project write-ups by Lucas Giuclea Balan.",

  // Navigation.
  "nav.label": "Main navigation",
  "nav.home": "Lucas Giuclea Balan, home page",
  "nav.experience": "Experience",
  "nav.projects": "Projects",
  "nav.skills": "Skills",
  "nav.about": "About me",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "nav.skipToContent": "Skip to content",

  // Theme switcher.
  "theme.legend": "Choose a theme",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.system": "System",

  // Language switcher.
  "language.label": "Choose a language",

  // Footer.
  "footer.role": "Computer Science student",
  "footer.rights": "All rights reserved.",
  "footer.social": "Social links",
  "footer.email": "Email",

  // Temporary text, replaced in Phases 5 and 7.
  "placeholder.section": "This section is built in Phase 5.",
  "placeholder.blog": "Articles are coming soon.",
} as const;

// The list of valid keys, used to type-check every t() call.
export type TranslationKey = keyof typeof en;
