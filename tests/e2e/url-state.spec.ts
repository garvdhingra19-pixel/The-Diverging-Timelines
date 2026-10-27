import { describe, it, expect } from "vitest";

describe("URL Query State Logic & Formatting", () => {
  it("formats deep-link query string correctly matching specifications", () => {
    const place = "mumbai";
    const year = 2075;
    const scenario = "protect";

    const params = new URLSearchParams();
    params.set("place", place);
    params.set("year", year.toString());
    params.set("scenario", scenario);

    expect(params.toString()).toBe("place=mumbai&year=2075&scenario=protect");
  });

  it("handles fallback defaults when parameters are omitted", () => {
    const params = new URLSearchParams("");
    const place = params.get("place") || "mumbai";
    const year = Number(params.get("year")) || 2025;
    const scenario = params.get("scenario") || "carry-on";

    expect(place).toBe("mumbai");
    expect(year).toBe(2025);
    expect(scenario).toBe("carry-on");
  });
});
