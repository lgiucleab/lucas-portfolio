// Smoke tests: quick browser checks that the main features still work after a change.
// They never send the contact form, so no email is sent.
import { expect, test, type Page } from "@playwright/test";

const languages = ["en", "es"] as const;
const themes = ["light", "dark"] as const;
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

// Fails if the page is wider than the screen, which would cause sideways scrolling.
async function expectNoSidewaysScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

// Every language, theme and screen size must load cleanly and fit the screen.
for (const language of languages) {
  for (const theme of themes) {
    for (const viewport of viewports) {
      test(`${language} ${theme} ${viewport.name} layout`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize(viewport);
        await page.addInitScript((value) => localStorage.setItem("theme", value), theme);

        for (const path of [`/${language}/`, `/${language}/blog/`]) {
          await page.goto(path);
          await expect(page.locator("html")).toHaveAttribute("lang", language);
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          await expect(page.locator("main h1")).toBeVisible();
          await expectNoSidewaysScroll(page);
        }

        expect(errors).toEqual([]);
      });
    }
  }
}

test.describe("first visit language", () => {
  test.use({ locale: "es-ES" });

  test("sends a Spanish browser to /es/", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/es\/$/);
  });
});

test("theme choice survives a reload", async ({ page }) => {
  await page.goto("/en/");
  await page.locator("label", { has: page.locator('input[value="light"]') }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("language switcher keeps the current section", async ({ page }) => {
  await page.goto("/en/");
  // Late fonts move the sections, so the page must settle before the jump to Projects.
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#projects").evaluate((section) => {
    section.scrollIntoView({ behavior: "instant" });
  });
  await expect(page.locator('[data-section-link="projects"]')).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(page.locator('a[data-language-link="es"]')).toHaveAttribute("href", /#projects$/);
  await page.locator('a[data-language-link="es"]').click();
  await expect(page).toHaveURL(/\/es\/#projects$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("phone menu opens, and Escape closes it", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en/");
  const blogLink = page.getByRole("link", { name: "Blog" });
  await expect(blogLink).toBeHidden();
  await page.locator("[data-menu-toggle]").click();
  await expect(blogLink).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(blogLink).toBeHidden();
});

test("first Tab reaches the skip link", async ({ page }) => {
  await page.goto("/en/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});

test("blog post has a copy button on code blocks", async ({ page }) => {
  await page.goto("/en/blog/example-post/");
  await expect(page.getByRole("button", { name: "Copy" }).first()).toBeVisible();
});

test("contact form shows errors in the browser without sending", async ({ page }) => {
  const sentRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/_actions/")) sentRequests.push(request.url());
  });

  await page.goto("/en/#contact");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.locator('[data-field-error="name"]')).toHaveText("This field is required.");
  await expect(page.locator("#contact-name")).toBeFocused();

  await page.locator("#contact-email").fill("not-an-email");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator('[data-field-error="email"]')).toHaveText(
    "Enter a valid email address.",
  );

  expect(sentRequests).toEqual([]);
});
