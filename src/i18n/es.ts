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

  // Hero section. The greeting is split so its two parts sit on separate lines.
  "hero.greetingStart": "Hola,",
  "hero.greetingEnd": "soy Lucas",
  "hero.badge": "Disponible para algunos proyectos",
  "hero.contact": "Contáctame",
  "hero.downloadCv": "Descargar CV",

  // Experience and education timeline.
  "timeline.title": "Experiencia y formación",
  "timeline.work": "Trabajo",
  "timeline.education": "Formación",
  "timeline.present": "Actualidad",
  "timeline.learnMore": "Saber más",

  // Projects section.
  "projects.title": "Proyectos",
  "projects.code": "Código",
  "projects.preview": "Ver demo",
  "projects.private": "Privado",
  "projects.stars": "Estrellas en GitHub",
  "projects.updated": "Actualizado",
  "projects.moreTitle": "Más en GitHub",
  "projects.viewAll": "Ver todo en GitHub",

  // Skills section.
  "skills.title": "Habilidades",
  "skills.languages": "Lenguajes",
  "skills.frontend": "Frontend",
  "skills.ai": "IA",
  "skills.tools": "Herramientas",
  "skills.aBit": "un poco",

  // About section.
  "about.title": "Sobre mí",

  // Photo descriptions for screen readers.
  "photo.avatar": "Retrato de Lucas",
  "photo.about": "Lucas Giuclea Balan",

  // Blog.
  "blog.empty": "Los artículos llegarán pronto.",
  "blog.readMore": "Leer más",
  "blog.minutes": "min de lectura",
  "blog.back": "Volver al blog",
  "blog.relatedProject": "Proyecto relacionado",
  "blog.rss": "Feed RSS",
  "blog.copy": "Copiar",
  "blog.copied": "Copiado",

  // Contact section.
  "contact.intro": "¿Tienes un proyecto o una pregunta? Escríbeme y te responderé.",
  "contact.copyEmail": "Copiar correo",
  "contact.copied": "Copiado",
  "contact.name": "Nombre",
  "contact.email": "Correo electrónico",
  "contact.message": "Mensaje",
  "contact.send": "Enviar mensaje",
  "contact.sending": "Enviando...",
  "contact.success": "¡Gracias! Tu mensaje se ha enviado.",
  "contact.errorRequired": "Este campo es obligatorio.",
  "contact.errorInvalidEmail": "Introduce un correo electrónico válido.",
  "contact.errorTooShort": "Escribe al menos 10 caracteres.",
  "contact.errorTooLong": "Este texto es demasiado largo.",
  "contact.errorRateLimit": "Has enviado varios mensajes. Inténtalo de nuevo más tarde.",
  "contact.errorFailure": "No se ha podido enviar tu mensaje. Escríbeme directamente por correo.",
  "contact.noScript": "El formulario necesita JavaScript. También puedes escribirme por correo.",
  "contact.honeypot": "Deja este campo vacío",
};
