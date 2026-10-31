// Project-wide type declarations for values TypeScript cannot detect on its own.

declare global {
  interface Window {
    // Re-applies the saved theme. Defined by ThemeScript.astro, used by ThemeSwitcher.astro.
    applyTheme: () => void;
  }
}

// The export makes this file a module, which "declare global" requires.
export {};
