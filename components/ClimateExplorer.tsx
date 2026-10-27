"use client";

import React from "react";
import { useClimateState } from "@/hooks/use-climate-state";
import { LANDSCAPES } from "@/content";
import Header from "./Header";
import PlaceSelector from "./PlaceSelector";
import ScenarioToggle from "./ScenarioToggle";
import YearSlider from "./YearSlider";
import Scene from "./Scene";
import StatCard from "./StatCard";
import dynamic from "next/dynamic";
import { AlertOctagon, CheckCircle2, SlidersHorizontal } from "lucide-react";

const IntroHero = dynamic(() => import("./IntroHero"), {
  loading: () => <div className="min-h-[140px]" />,
});

const ActionSection = dynamic(() => import("./ActionSection"), {
  loading: () => <div className="min-h-[200px]" />,
});

export const ClimateExplorer: React.FC = () => {
  const { state, setPlace, setYear, setScenario } = useClimateState();

  const activeLandscape = LANDSCAPES[state.place] || LANDSCAPES["mumbai"];
  const isProtect = state.scenario === "protect";
  const scenarioDetails = isProtect
    ? activeLandscape.scenarios.protect
    : activeLandscape.scenarios.carryOn;

  const titles: Record<string, string> = {
    mumbai: "Mumbai (Coast) — Sea Level Rise & Coastal Flooding | TerraScope (2025–2100)",
    gangotri: "Gangotri (Mountains) — Glacier Retreat & Lean River Flow | TerraScope (2025–2100)",
    karnal: "Karnal (Plains) — Heat Stress & Groundwater Depletion | TerraScope (2025–2100)",
    marathwada: "Marathwada (Plateau) — Drought, Soil Loss & Watershed Resilience | TerraScope (2025–2100)",
  };
  const baseTitle =
    titles[state.place] ||
    `${activeLandscape.name} (${activeLandscape.region}) | TerraScope (2025–2100)`;
  const dynamicTitle = `${baseTitle} [${state.year} · ${isProtect ? "Protect It" : "Carry On"}]`;

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = dynamicTitle;
    }
  }, [dynamicTitle]);

  return (
    <div className="flex flex-col min-h-screen">
      <title>{dynamicTitle}</title>
      <Header state={state} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-10">
        {/* Intro Screen: Explaining the Four Landscapes Project */}
        <IntroHero onSelectLandscape={setPlace} />

        {/* Simulation Section Anchor */}
        <div id="simulation-view" className="pt-4 space-y-8 scroll-mt-24">
          {/* Landscape Switcher */}
          <section aria-label="Select Landscape">
            <PlaceSelector
              currentPlace={state.place}
              landscapes={LANDSCAPES}
              onChange={setPlace}
            />
          </section>

          {/* Dual Control Command Bar: Scenario Toggle & Year Slider */}
          <section
            aria-label="Simulation Controls"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span>Emissions Trajectory</span>
              </div>
              <ScenarioToggle
                currentScenario={state.scenario}
                onChange={setScenario}
              />
            </div>

            <div className="lg:col-span-7">
              <YearSlider
                year={state.year}
                scenario={state.scenario}
                onChange={setYear}
              />
            </div>
          </section>

          {/* Visual Simulation Scene with Layered Overlays & Hotspots */}
          <section aria-label="Interactive Scene View">
            <Scene
              landscape={activeLandscape}
              year={state.year}
              scenario={state.scenario}
            />
          </section>

          {/* Dynamic Quantitative Stat Cards */}
          <section aria-label="Quantitative Climate Indicators" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Projected Indicators ({activeLandscape.name} · Year {state.year})
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Model: {isProtect ? "SSP1-1.9 Paris Agreement (+1.5°C Goal)" : "SSP5-8.5 Baseline (Unabated High Emissions)"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeLandscape.stats.map((metric) => (
                <StatCard
                  key={metric.id}
                  metric={metric}
                  year={state.year}
                  scenario={state.scenario}
                />
              ))}
            </div>
          </section>

          {/* Scenario Narrative Breakdown */}
          <section
            aria-label="Scenario Narrative"
            className={`p-6 sm:p-8 rounded-3xl glass-panel-elevated border transition-all duration-300 ${
              isProtect
                ? "border-emerald-500/30 bg-emerald-950/10"
                : "border-rose-500/30 bg-rose-950/10"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs uppercase font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      isProtect
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {isProtect ? "Regenerative Pathway" : "High Emissions Pathway"}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Projected End-Century Anomaly: +{scenarioDetails.projectedTempRise2100}°C
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {scenarioDetails.tagline}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {scenarioDetails.description}
                </p>
              </div>

              <div className="md:w-80 shrink-0 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  {isProtect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <AlertOctagon className="w-4 h-4 text-rose-400" aria-hidden="true" />
                  )}
                  <span>Critical Dynamics</span>
                </h4>
                <ul className="space-y-2">
                  {scenarioDetails.keyPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          isProtect ? "bg-emerald-400" : "bg-rose-400"
                        }`}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Closing Section: What Can Be Done (Ending in Agency Rather than Fear) */}
        <ActionSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 mt-12 text-center text-xs text-slate-400 space-y-2">
        <p>
          The Four Landscapes Project · Mountains (Gangotri) · Plains (Karnal) · Plateau (Marathwada) · Coast (Mumbai)
        </p>
        <p className="font-mono text-[11px]">
          Static Export Build · Downscaled NASA NEX-GDDP-CMIP6 & IPCC AR6 Models · WCAG 2.2 AA Accessible
        </p>
      </footer>
    </div>
  );
};

export default ClimateExplorer;
