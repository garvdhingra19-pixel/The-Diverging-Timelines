import type { StatMetric } from "@/content/schema";

export type ScenarioType = "carry-on" | "protect";

/**
 * Calculates the interpolated metric value for a given year and scenario.
 * Supports piecewise linear or smooth curve interpolation between 2025, 2050, and 2100.
 */
export function calculateMetricValue(
  metric: Pick<StatMetric, "baseline" | "carryOn2050" | "carryOn2100" | "protect2050" | "protect2100">,
  year: number,
  scenario: ScenarioType
): number {
  const targetYear = Math.max(2025, Math.min(2100, year));

  const val2050 = scenario === "carry-on" ? metric.carryOn2050 : metric.protect2050;
  const val2100 = scenario === "carry-on" ? metric.carryOn2100 : metric.protect2100;

  if (targetYear <= 2025) {
    return metric.baseline;
  }

  if (targetYear <= 2050) {
    const fraction = (targetYear - 2025) / (2050 - 2025);
    const interpolated = metric.baseline + (val2050 - metric.baseline) * fraction;
    return Number(interpolated.toFixed(1));
  }

  const fraction = (targetYear - 2050) / (2100 - 2050);
  const interpolated = val2050 + (val2100 - val2050) * fraction;
  return Number(interpolated.toFixed(1));
}

/**
 * Calculates projected global/local warming anomaly for display
 */
export function calculateWarmingAnomaly(
  maxCarryOn: number,
  maxProtect: number,
  year: number,
  scenario: ScenarioType
): number {
  const baseAnomaly = 1.2; // 2025 current baseline anomaly
  const targetMax = scenario === "carry-on" ? maxCarryOn : maxProtect;
  const fraction = (Math.max(2025, Math.min(2100, year)) - 2025) / 75;
  const anomaly = baseAnomaly + (targetMax - baseAnomaly) * fraction;
  return Number(anomaly.toFixed(1));
}
