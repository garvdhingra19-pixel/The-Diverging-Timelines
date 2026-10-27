import { describe, it, expect } from "vitest";
import { LandscapeContentSchema } from "../../content/schema";
import mumbaiData from "../../content/landscapes/mumbai.json";
import gangotriData from "../../content/landscapes/gangotri.json";
import karnalData from "../../content/landscapes/karnal.json";
import marathwadaData from "../../content/landscapes/marathwada.json";

describe("The Four Landscapes Zod Schema Validation", () => {
  it("validates Mumbai reference landscape (Coastline)", () => {
    const result = LandscapeContentSchema.safeParse(mumbaiData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.hotspots.some((h) => h.id.includes("commuters"))).toBe(true);
      expect(result.data.hotspots.some((h) => h.id.includes("shops"))).toBe(true);
      expect(result.data.hotspots.some((h) => h.id.includes("homes"))).toBe(true);
      const shopHotspot = result.data.hotspots.find((h) => h.id.includes("shops"));
      expect(shopHotspot?.impactCarryOn.toLowerCase()).toContain("water here reaches this shopfront's door");
    }
  });

  it("validates Gangotri glacier landscape (Mountains)", () => {
    const result = LandscapeContentSchema.safeParse(gangotriData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.stats.some((s) => s.id === "gangotri-retreat-rate")).toBe(true);
      expect(result.data.stats.some((s) => s.id === "gangotri-dry-season-flow")).toBe(true);
      expect(result.data.hotspots.some((h) => h.id.includes("snout"))).toBe(true);
      expect(result.data.hotspots.some((h) => h.id.includes("pilgrim"))).toBe(true);
    }
  });

  it("validates Karnal agricultural belt dataset (Plains)", () => {
    const result = LandscapeContentSchema.safeParse(karnalData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.stats.some((s) => s.id === "karnal-wheat-yield")).toBe(true);
      expect(result.data.stats.some((s) => s.id === "karnal-tubewell-cost")).toBe(true);
      expect(result.data.stats.some((s) => s.id === "karnal-water-table")).toBe(true);
    }
  });

  it("validates Marathwada plateau dataset (Plateau) with recovery pairing", () => {
    const result = LandscapeContentSchema.safeParse(marathwadaData);
    expect(result.success).toBe(true);
    if (result.success) {
      // Hotspots for tankers/wells, grazing land, and stone terraces
      expect(result.data.hotspots.some((h) => h.id.includes("well"))).toBe(true);
      expect(result.data.hotspots.some((h) => h.id.includes("terraces"))).toBe(true);
      expect(result.data.hotspots.some((h) => h.id.includes("grazing"))).toBe(true);
      
      // Editorial rule check: protect scenario highlights watershed and terraces recovery
      const terraceHotspot = result.data.hotspots.find((h) => h.id.includes("terraces"));
      expect(terraceHotspot?.impactProtect.toLowerCase()).toContain("contour trenches and stone bunding");
    }
  });

  it("fails validation when a required field is missing", () => {
    const invalidData = { ...gangotriData } as Record<string, unknown>;
    delete invalidData.summary;
    const result = LandscapeContentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("summary"))).toBe(true);
    }
  });

  it("fails validation when hotspots array has fewer than required items", () => {
    const invalidData = { ...marathwadaData, hotspots: [] };
    const result = LandscapeContentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
