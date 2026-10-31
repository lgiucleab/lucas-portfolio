// Spanish interface text. The Record type makes a missing or misspelled key a TypeScript error.
import type { TranslationKey } from "./en";

export const es: Record<TranslationKey, string> = {
  // Page metadata.
  "meta.title": "Lucas Giuclea Balan | Estudiante de Ingeniería Informática",
  "meta.description":
    "Portfolio de Lucas Giuclea Balan, estudiante de Ingeniería Informática en la Universitat Jaume I, en la Comunidad Valenciana, España.",
  "meta.blogTitle": "Blog | Lucas Giuclea Balan",
  "meta.blogDescription": "Artículos y proyectos explicados por Lucas Giuclea Balan.",

  // Navigation.
  "nav.label": "Navegación principal",
  "nav.home": "Lucas Giuclea Balan, página de inicio",
  "nav.experience": "Experiencia",
  "nav.projects": "Proyectos",
  "nav.skills": "Habilidades",
  "nav.about": "Sobre mí",
  "nav.blog": "Blog",
  "nav.contact": "Contacto",
  "nav.openMenu": "Abrir menú",
  "nav.closeMenu": "Cerrar menú",
  "nav.skipToContent": "Saltar al contenido",

  // Theme switcher.
  "theme.legend": "Elige un tema",
  "theme.light": "Claro",
  "theme.dark": "Oscuro",
  "theme.system": "Sistema",

  // Language switcher.
  "language.label": "Elige un idioma",

  // Footer.
  "footer.role": "Estudiante de Ingeniería Informática",
  "footer.rights": "Todos los derechos reservados.",
  "footer.social": "Redes sociales",
  "footer.email": "Correo",

  // Temporary text, replaced in Phases 5 and 7.
  "placeholder.section": "Esta sección se construye en la Fase 5.",
  "placeholder.blog": "Los artículos llegarán pronto.",
};
