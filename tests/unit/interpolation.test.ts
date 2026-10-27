import { describe, it, expect } from "vitest";
import { calculateMetricValue, calculateWarmingAnomaly } from "../../lib/climate-math";

describe("Climate Metric Interpolation", () => {
  const metric = {
    baseline: 0,
    carryOn2050: 25,
    carryOn2100: 100,
    protect2050: 10,
    protect2100: 20,
  };

  it("returns baseline for year 2025", () => {
    expect(calculateMetricValue(metric, 2025, "carry-on")).toBe(0);
    expect(calculateMetricValue(metric, 2025, "protect")).toBe(0);
  });

  it("returns 2050 target correctly", () => {
    expect(calculateMetricValue(metric, 2050, "carry-on")).toBe(25);
    expect(calculateMetricValue(metric, 2050, "protect")).toBe(10);
  });

  it("returns 2100 target correctly", () => {
    expect(calculateMetricValue(metric, 2100, "carry-on")).toBe(100);
    expect(calculateMetricValue(metric, 2100, "protect")).toBe(20);
  });

  it("interpolates intermediate years smoothly", () => {
    const valCarry2075 = calculateMetricValue(metric, 2075, "carry-on");
    expect(valCarry2075).toBeGreaterThan(25);
    expect(valCarry2075).toBeLessThan(100);
  });

  it("calculates warming anomaly within realistic physical bounds", () => {
    const anomaly2025 = calculateWarmingAnomaly(4.5, 1.5, 2025, "carry-on");
    expect(anomaly2025).toBe(1.2);

    const anomaly2100Carry = calculateWarmingAnomaly(4.5, 1.5, 2100, "carry-on");
    expect(anomaly2100Carry).toBe(4.5);

    const anomaly2100Protect = calculateWarmingAnomaly(4.5, 1.5, 2100, "protect");
    expect(anomaly2100Protect).toBe(1.5);
  });
});
