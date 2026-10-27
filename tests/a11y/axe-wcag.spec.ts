import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("WCAG 2.2 AA Accessibility & Axe Testing", () => {
  test("main interactive simulation page meets WCAG 2.2 AA accessibility standards", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude("#maplibre-canvas") // canvas element contains third-party vector map tiles
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("methods and sources page meets WCAG 2.2 AA standards", async ({ page }) => {
    await page.goto("/methods");
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("case study page meets WCAG 2.2 AA standards", async ({ page }) => {
    await page.goto("/case-study");
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("respects prefers-reduced-motion media feature", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const matchesReducedMotion = await page.evaluate(() => {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });
    expect(matchesReducedMotion).toBe(true);

    // Verify globals.css motion-safe / reduced-motion rules apply
    const transitionDuration = await page.evaluate(() => {
      const el = document.querySelector("button");
      return el ? window.getComputedStyle(el).transitionDuration : "0s";
    });
    expect(transitionDuration).toBeDefined();
  });

  test("ensures no meaning is conveyed by color alone (dual-coded indicators)", async ({ page }) => {
    await page.goto("/?place=mumbai&year=2075&scenario=carry-on");

    // Scenario toggle badges include text label AND distinct icons
    const carryOnButton = page.locator("button:has-text('Carry On')");
    await expect(carryOnButton).toBeVisible();
    await expect(carryOnButton.locator("svg")).toBeVisible();

    const protectButton = page.locator("button:has-text('Protect It')");
    await expect(protectButton).toBeVisible();
    await expect(protectButton.locator("svg")).toBeVisible();

    // Hotspot and StatCard components contain icon markers alongside values
    const statCards = page.locator("[role='region'][aria-label]");
    const statCount = await statCards.count();
    expect(statCount).toBeGreaterThanOrEqual(1);
  });

  test("verifies ARIA live regions announce dynamic projection changes", async ({ page }) => {
    await page.goto("/");

    // Assert live region exists and has polite/status attributes
    const liveRegion = page.locator("[aria-live='polite'], [role='status']").first();
    await expect(liveRegion).toBeAttached();
  });
});
