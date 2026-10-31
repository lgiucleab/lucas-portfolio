// The Skills section's data. Edit this list and the section updates by itself.
import type { TranslationKey } from "@/i18n/en";

// One skill.
interface Skill {
  name: string; // Text on the tag
  icon: string; // Iconify icon name
  note?: TranslationKey; // Optional translated remark, shown in brackets after the name
}

// One group of skills.
interface SkillGroup {
  title: TranslationKey; // Group heading, translated in src/i18n/
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "skills.languages",
    skills: [
      { name: "Python", icon: "simple-icons:python" },
      { name: "JavaScript", icon: "simple-icons:javascript" },
      { name: "HTML", icon: "simple-icons:html5" },
      { name: "CSS", icon: "simple-icons:css" },
      { name: "React", icon: "simple-icons:react" },
      { name: "Tailwind", icon: "simple-icons:tailwindcss" },
      { name: "C", icon: "simple-icons:c" },
      { name: "Swift", icon: "simple-icons:swift", note: "skills.aBit" },
    ],
  },
  {
    title: "skills.ai",
    skills: [{ name: "Claude", icon: "simple-icons:claude" }],
  },
  {
    title: "skills.tools",
    skills: [
      { name: "IDEs", icon: "lucide:code-xml" },
      { name: "Microsoft Office", icon: "simple-icons:microsoftoffice" },
      { name: "Claude Code", icon: "simple-icons:claude" },
      { name: "Figma", icon: "simple-icons:figma" },
      { name: "Git", icon: "simple-icons:git" },
      { name: "Vercel", icon: "simple-icons:vercel" },
    ],
  },
];
