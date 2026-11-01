// Playwright settings for the browser tests in tests/. Run them with "npm test".
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // Runs tests side by side, to finish faster.
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:4321",
    ...devices["Desktop Chrome"],
  },
  // Starts the site for the tests, or reuses one that is already running.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:4321/en/",
    reuseExistingServer: true,
  },
});
