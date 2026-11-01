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

  // Hero section. The greeting is split so its two parts sit on separate lines.
  "hero.greetingStart": "Hey,",
  "hero.greetingEnd": "I'm Lucas",
  "hero.badge": "Available for side projects",
  "hero.contact": "Contact me",

  // Experience and education timeline.
  "timeline.title": "Experience & Education",
  "timeline.work": "Work",
  "timeline.education": "Education",
  "timeline.present": "Present",
  "timeline.learnMore": "Learn more",

  // Projects section.
  "projects.title": "Projects",
  "projects.code": "Code",
  "projects.preview": "Preview",
  "projects.private": "Private",
  "projects.stars": "GitHub stars",
  "projects.updated": "Updated",
  "projects.moreTitle": "More on GitHub",
  "projects.viewAll": "View all on GitHub",

  // Skills section.
  "skills.title": "Skills",
  "skills.languages": "Languages",
  "skills.frontend": "Frontend",
  "skills.ai": "AI",
  "skills.tools": "Tools",
  "skills.aBit": "a bit",

  // About section.
  "about.title": "About me",

  // Photo descriptions for screen readers.
  "photo.avatar": "Portrait of Lucas",
  "photo.about": "Lucas Giuclea Balan",

  // Temporary text, replaced in Phases 7 and 8.
  "placeholder.contact": "The contact form arrives in Phase 8.",
  "placeholder.blog": "Articles are coming soon.",
} as const;

// The list of valid keys, used to type-check every t() call.
export type TranslationKey = keyof typeof en;
