"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { ScenarioType } from "@/lib/climate-math";

export type LandscapeId =
  | "mumbai"
  | "gangotri"
  | "karnal"
  | "marathwada"
  | "arctic"
  | "amazon"
  | "great-barrier-reef";

export interface ClimateState {
  place: LandscapeId;
  year: number;
  scenario: ScenarioType;
}

const VALID_PLACES: LandscapeId[] = [
  "mumbai",
  "gangotri",
  "karnal",
  "marathwada",
  "arctic",
  "amazon",
  "great-barrier-reef",
];

export function useClimateState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  // Parse current state from URL search parameters with fallback defaults
  const state: ClimateState = useMemo(() => {
    const rawPlace = searchParams.get("place")?.toLowerCase();
    const place: LandscapeId = VALID_PLACES.includes(rawPlace as LandscapeId)
      ? (rawPlace as LandscapeId)
      : "mumbai";

    const rawYear = Number(searchParams.get("year"));
    const year = !isNaN(rawYear) && rawYear >= 2025 && rawYear <= 2100
      ? Math.round(rawYear)
      : 2025;

    const rawScenario = searchParams.get("scenario")?.toLowerCase();
    const scenario: ScenarioType =
      rawScenario === "protect" || rawScenario === "protect-it"
        ? "protect"
        : "carry-on";

    return { place, year, scenario };
  }, [searchParams]);

  // Push new state to URL
  const updateState = useCallback(
    (newPartialState: Partial<ClimateState>, replace: boolean = true) => {
      const merged: ClimateState = {
        place: newPartialState.place ?? state.place,
        year: newPartialState.year ?? state.year,
        scenario: newPartialState.scenario ?? state.scenario,
      };

      const params = new URLSearchParams();
      params.set("place", merged.place);
      params.set("year", merged.year.toString());
      params.set("scenario", merged.scenario === "protect" ? "protect" : "carry-on");

      const queryString = params.toString();
      const newUrl = `${pathname}?${queryString}`;

      startTransition(() => {
        if (replace) {
          router.replace(newUrl, { scroll: false });
        } else {
          router.push(newUrl, { scroll: false });
        }
      });
    },
    [state, pathname, router]
  );

  const setPlace = useCallback(
    (place: LandscapeId) => updateState({ place }),
    [updateState]
  );

  const setYear = useCallback(
    (year: number) => updateState({ year }),
    [updateState]
  );

  const setScenario = useCallback(
    (scenario: ScenarioType) => updateState({ scenario }),
    [updateState]
  );

  return {
    state,
    setPlace,
    setYear,
    setScenario,
    updateState,
  };
}
