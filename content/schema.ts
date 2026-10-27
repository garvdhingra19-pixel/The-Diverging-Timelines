import { z } from "zod";

/**
 * Zod schema for hotspot annotations displayed on the interactive scene.
 */
export const HotspotSchema = z.object({
  id: z.string().min(1, "Hotspot ID is required"),
  title: z.string().min(1, "Hotspot title is required"),
  x: z.number().min(0).max(100, "X coordinate must be between 0 and 100 percentage"),
  y: z.number().min(0).max(100, "Y coordinate must be between 0 and 100 percentage"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["flood", "heat", "ecology", "infrastructure", "adaptation", "cryosphere", "agriculture", "water"]),
  impactCarryOn: z.string().min(1, "Carry-on impact description is required"),
  impactProtect: z.string().min(1, "Protect impact description is required"),
});

/**
 * Zod schema for quantitative metrics with baseline and scenario milestone values.
 */
export const StatMetricSchema = z.object({
  id: z.string().min(1, "Stat ID is required"),
  label: z.string().min(1, "Stat label is required"),
  unit: z.string().min(1, "Unit is required"),
  baseline: z.number(),
  carryOn2050: z.number(),
  carryOn2100: z.number(),
  protect2050: z.number(),
  protect2100: z.number(),
  direction: z.enum(["up", "down"]),
  context: z.string().min(1, "Contextual explanation is required"),
});

/**
 * Zod schema for scenario narrative specifications.
 */
export const ScenarioDetailsSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  keyPoints: z.array(z.string().min(1)).min(1, "At least one key point is required"),
  projectedTempRise2100: z.number(),
});

/**
 * Zod schema for citation/scientific source reference.
 */
export const SourceReferenceSchema = z.object({
  title: z.string().min(1, "Source title is required"),
  institution: z.string().min(1, "Institution is required"),
  url: z.string().url("Valid URL or DOI required"),
  year: z.number().int().min(1900).max(2100),
});

/**
 * Master Zod schema validating a complete landscape dataset.
 * Any missing required field will cause build-time validation to fail immediately.
 */
export const LandscapeContentSchema = z.object({
  id: z.enum([
    "mumbai",
    "gangotri",
    "karnal",
    "marathwada",
    "arctic",
    "amazon",
    "great-barrier-reef",
  ]),
  name: z.string().min(1, "Landscape name is required"),
  region: z.string().min(1, "Region is required"),
  summary: z.string().min(1, "Summary is required"),
  baselineYear: z.literal(2025),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  hotspots: z.array(HotspotSchema).min(2, "At least 2 interactive hotspots required"),
  stats: z.array(StatMetricSchema).min(3, "At least 3 statistics cards required"),
  scenarios: z.object({
    carryOn: ScenarioDetailsSchema,
    protect: ScenarioDetailsSchema,
  }),
  sources: z.array(SourceReferenceSchema).min(1, "At least one citation source required"),
});

export type Hotspot = z.infer<typeof HotspotSchema>;
export type StatMetric = z.infer<typeof StatMetricSchema>;
export type ScenarioDetails = z.infer<typeof ScenarioDetailsSchema>;
export type SourceReference = z.infer<typeof SourceReferenceSchema>;
export type LandscapeContent = z.infer<typeof LandscapeContentSchema>;
