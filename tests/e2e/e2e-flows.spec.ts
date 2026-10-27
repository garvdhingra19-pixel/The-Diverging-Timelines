import { test, expect } from "@playwright/test";

test.describe("TerraScope Core User Flows & Scenario Simulation", () => {
  test("loads home page with default Mumbai landscape and SEO metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("TerraScope");
    await expect(page).toHaveTitle(/(Mumbai|The Four Landscapes)/i);

    // Check presence of core sections
    await expect(page.locator("text=National Climate Transect · 2025–2100")).toBeVisible();
    await expect(page.locator("text=Emissions Trajectory")).toBeVisible();
    await expect(page.locator("text=Simulation Year")).toBeVisible();
  });

  test("switches between all four landscapes and updates dynamic page title", async ({ page }) => {
    await page.goto("/");

    // 1. Switch to Gangotri
    await page.locator("section[aria-label='Select Landscape'] button:has-text('Gangotri')").click();
    await expect(page.locator("text=Gaumukh Glacier Retreat")).toBeVisible();
    expect(page.url()).toContain("place=gangotri");
    await expect(page).toHaveTitle(/(Gangotri|The Four Landscapes)/i);

    // 2. Switch to Karnal
    await page.locator("section[aria-label='Select Landscape'] button:has-text('Karnal')").click();
    await expect(page.getByText("Wheat Harvest Yield", { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/place=karnal/);
    await expect(page).toHaveTitle(/(Karnal|The Four Landscapes)/i);

    // 3. Switch to Marathwada
    await page.locator("section[aria-label='Select Landscape'] button:has-text('Marathwada')").click();
    await expect(page.getByText("Water Tanker Demand", { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/place=marathwada/);
    await expect(page).toHaveTitle(/(Marathwada|The Four Landscapes)/i);

    // 4. Switch back to Mumbai
    await page.locator("section[aria-label='Select Landscape'] button:has-text('Mumbai')").click();
    await expect(page.getByText("Sea Level Rise (AR6)", { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/place=mumbai/);
    await expect(page).toHaveTitle(/(Mumbai|The Four Landscapes)/i);
  });

  test("toggles scenario between Carry On and Protect It", async ({ page }) => {
    await page.goto("/?place=mumbai&year=2075&scenario=carry-on");

    // Assert Carry On state
    const carryOnRadio = page.getByRole("radio", { name: /Carry On/i });
    await expect(carryOnRadio).toBeVisible();
    await expect(page).toHaveURL(/scenario=carry-on/);

    // Toggle to Protect It
    const protectRadio = page.getByRole("radio", { name: /Protect It/i });
    await protectRadio.click();
    await expect(page).toHaveURL(/scenario=protect/);
    await expect(protectRadio).toBeVisible();
  });

  test("deep-links directly to specific place, year, and scenario state", async ({ page }) => {
    await page.goto("/?place=karnal&year=2080&scenario=protect");

    await expect(page.locator("h1")).toContainText("TerraScope");
    expect(page.url()).toContain("place=karnal");
    expect(page.url()).toContain("year=2080");
    expect(page.url()).toContain("scenario=protect");

    // Check year slider input reflects 2080
    const slider = page.locator("input[type='range']");
    await expect(slider).toHaveValue("2080");
  });

  test("navigates to Methods & Sources page and returns", async ({ page }) => {
    await page.goto("/");
    await page.locator("nav[aria-label='Site Navigation'] a[href='/methods']").click();

    await expect(page).toHaveURL(/\/methods/);
    await expect(page.locator("h1")).toContainText("Methods, Sources & Data Provenance");
    await expect(page.locator("text=Primary Scientific Papers & Datasets")).toBeVisible();
    await expect(page.locator("h3:has-text('NASA Earth Exchange')")).toBeVisible();

    // Click back to simulation
    await page.click("text=Back to Simulation");
    await expect(page).toHaveURL(/\//);
  });

  test("navigates to Portfolio Case Study page and renders all sections", async ({ page }) => {
    await page.goto("/case-study");

    await expect(page.locator("h1")).toContainText("The Four Landscapes: Building Climate Agency");
    await expect(page.locator("text=The Problem: Why Traditional Climate Storytelling Fails")).toBeVisible();
    await expect(page.locator("text=Data Engineering: From Multi-GB NetCDF to Micro-JSON")).toBeVisible();
    await expect(page.locator("text=Design Decisions: Behavioral Psychology & Trauma-Informed UX")).toBeVisible();
    await expect(page.locator("text=Frontend Architecture: Performance, Privacy & Accessibility")).toBeVisible();
  });

  test("respects mobile viewport without horizontal scrolling", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/?place=mumbai&year=2050&scenario=protect");

    // Ensure page renders cleanly on 375px mobile screen
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allowing minor subpixel roundoff
  });
});
