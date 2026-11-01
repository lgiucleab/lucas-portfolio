// Project-wide type declarations for values TypeScript cannot detect on its own.

declare global {
  interface ImportMetaEnv {
    // Optional GitHub token. It is only read at build time and never reaches the browser.
    readonly GITHUB_TOKEN?: string;
  }

  interface Window {
    // Re-applies the saved theme. Defined by ThemeScript.astro, used by ThemeSwitcher.astro.
    applyTheme: () => void;
  }
}

// The export makes this file a module, which "declare global" requires.
export {};
