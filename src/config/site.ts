// Personal details used across the site. Edit them here and every page updates.

// Shape of one social link.
interface SocialLink {
  label: string; // Text shown on the button
  href: string; // Profile address
  icon: string; // Iconify icon name
}

export const site = {
  // Full name, used in the footer, metadata and copyright line.
  name: "Lucas Giuclea Balan",
  // Public contact address.
  email: "lucgiubal@gmail.com",
  // Social profiles, in display order.
  socials: [
    { label: "GitHub", href: "https://github.com/lgiucleab", icon: "simple-icons:github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/lucas-giuclea-balan-962a44339/",
      icon: "simple-icons:linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/lucassgi_/",
      icon: "simple-icons:instagram",
    },
    { label: "X", href: "https://x.com/MickeyJuniorDev", icon: "simple-icons:x" },
  ] satisfies SocialLink[],
};
