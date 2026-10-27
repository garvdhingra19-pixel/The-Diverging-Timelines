"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import type { LandscapeContent } from "@/content/schema";
import { ScenarioType, calculateMetricValue } from "@/lib/climate-math";
import Hotspot from "./Hotspot";
import dynamic from "next/dynamic";
import { MapPin, Thermometer, Map, Eye, AlertCircle, Sparkles, ShieldCheck } from "lucide-react";

const MapLibreMap = dynamic(() => import("./MapLibreMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-400">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono">Loading MapLibre Map...</span>
      </div>
    </div>
  ),
});

interface SceneProps {
  landscape: LandscapeContent;
  year: number;
  scenario: ScenarioType;
}

export const Scene: React.FC<SceneProps> = ({ landscape, year, scenario }) => {
  const [viewMode, setViewMode] = useState<"scene" | "map">("scene");
  const isProtect = scenario === "protect";

  // Progress ratio 0 (2025) to 1 (2100)
  const progress = (year - 2025) / 75;
  const degradationFactor = !isProtect ? progress : Math.max(0, 0.2 - progress * 0.2);
  const restorationFactor = isProtect ? progress : 0;

  // Primary metric calculation for screen reader dynamic announcement
  const primaryStat = landscape.stats[0];
  const primaryStatValue = primaryStat
    ? calculateMetricValue(primaryStat, year, scenario)
    : 0;

  // Dynamic screen reader announcement for ARIA live region (WCAG 2.2 AA)
  const liveAnnouncement = useMemo(() => {
    const scenarioName = isProtect
      ? "Protect It (1.5°C Paris aligned pathway)"
      : "Carry On (SSP5-8.5 unabated emissions pathway)";
    return `Simulation updated for ${landscape.name}, Year ${year}, under ${scenarioName}. ${
      primaryStat
        ? `${primaryStat.label} is projected at ${primaryStatValue} ${primaryStat.unit}.`
        : ""
    } ${
      isProtect
        ? landscape.scenarios.protect.tagline
        : landscape.scenarios.carryOn.tagline
    }. Notice: Visual overlays are data-based projections, not predictions.`;
  }, [landscape, year, isProtect, primaryStat, primaryStatValue]);

  // Image source path mapping
  const photoPath = useMemo(() => {
    const photoMap: Record<string, string> = {
      mumbai: "/img/mumbai.webp",
      gangotri: "/img/gangotri.webp",
      karnal: "/img/karnal.webp",
      marathwada: "/img/marathwada.webp",
    };
    return photoMap[landscape.id];
  }, [landscape.id]);

  return (
    <div className="relative w-full aspect-[16/9] min-h-[380px] md:min-h-[500px] rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-950 select-none">
      {/* 
        ARIA Live Region: Announces dynamically updated text descriptions
        to screen readers whenever scenario or year changes
      */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* View Mode: MapLibre GL Open Tiles vs Atmospheric Scene */}
      {viewMode === "map" ? (
        <MapLibreMap landscape={landscape} year={year} scenario={scenario} />
      ) : (
        <div className="absolute inset-0">
          {/* Real Optimized Hero Photograph (<150KB WebP) with Layered Future State Overlays */}
          {photoPath ? (
            <div className="relative w-full h-full">
              <Image
                src={photoPath}
                alt={`${landscape.name} documentary landscape photograph`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center"
              />

              {/* 
                Layered Future State Visual Overlays (2025–2100)
                Custom tailored per landscape type
              */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{ opacity: isProtect ? 0.45 : 0.85 }}
              >
                {/* Mumbai: Inundation Tidal Flood Line */}
                {landscape.id === "mumbai" && (
                  <div
                    className="absolute bottom-0 inset-x-0 transition-all duration-700"
                    style={{
                      height: `${Math.min(75, 12 + degradationFactor * 48 - restorationFactor * 8)}%`,
                      background: !isProtect
                        ? "linear-gradient(to top, rgba(12, 74, 110, 0.85) 0%, rgba(2, 132, 199, 0.55) 45%, rgba(244, 63, 94, 0.25) 85%, transparent 100%)"
                        : "linear-gradient(to top, rgba(4, 47, 46, 0.75) 0%, rgba(13, 148, 136, 0.4) 50%, transparent 100%)",
                    }}
                  >
                    <div className="w-full h-3 bg-white/30 animate-pulse backdrop-blur-[2px]" />
                    <div className="absolute top-2 left-6 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                      <span className={`w-2 h-2 rounded-full ${!isProtect ? "bg-rose-400 animate-ping" : "bg-emerald-400"}`} />
                      <span className="text-white">
                        +{Math.round(4 + degradationFactor * 84)} cm Flood Inundation Line ({year})
                      </span>
                    </div>
                  </div>
                )}

                {/* Gangotri: Glacial Snout Recession & Moraine Thaw Line */}
                {landscape.id === "gangotri" && (
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{
                        background: !isProtect
                          ? "radial-gradient(ellipse at 60% 40%, rgba(180, 83, 9, 0.35) 0%, rgba(69, 26, 3, 0.2) 60%, transparent 100%)"
                          : "radial-gradient(ellipse at 60% 40%, rgba(56, 189, 248, 0.25) 0%, transparent 80%)",
                        opacity: 0.3 + degradationFactor * 0.7,
                      }}
                    />
                    <div className="absolute bottom-6 left-6 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg text-white">
                      <span className={`w-2 h-2 rounded-full ${!isProtect ? "bg-rose-400 animate-ping" : "bg-cyan-400"}`} />
                      <span>
                        Gaumukh Glacier Retreat: {Math.round(21 + degradationFactor * 27)} m/yr ({year})
                      </span>
                    </div>
                  </div>
                )}

                {/* Karnal: Heat Shimmer & Sinking Groundwater Buffer */}
                {landscape.id === "karnal" && (
                  <div className="absolute inset-0">
                    {!isProtect && year > 2045 && (
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          background: "radial-gradient(circle at 50% 25%, rgba(245, 158, 11, 0.3) 0%, rgba(239, 68, 68, 0.2) 70%, transparent 100%)",
                          opacity: Math.min(0.85, (year - 2045) / 55),
                        }}
                      />
                    )}
                    <div className="absolute bottom-6 left-6 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg text-white">
                      <span className={`w-2 h-2 rounded-full ${!isProtect ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
                      <span>
                        Aquifer Depth: {Number((34 + degradationFactor * 34).toFixed(1))}m · Tube-well Cost: ₹{Math.round(59 + degradationFactor * 153)}k
                      </span>
                    </div>
                  </div>
                )}

                {/* Marathwada: Terraces, Soil Retention, & Watershed Recharge */}
                {landscape.id === "marathwada" && (
                  <div className="absolute inset-0">
                    <div
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{
                        background: !isProtect
                          ? "radial-gradient(ellipse at 50% 60%, rgba(120, 53, 15, 0.3) 0%, transparent 80%)"
                          : "radial-gradient(ellipse at 50% 60%, rgba(5, 150, 105, 0.25) 0%, transparent 80%)",
                        opacity: 0.3 + (isProtect ? restorationFactor * 0.7 : degradationFactor * 0.7),
                      }}
                    />
                    <div className="absolute bottom-6 left-6 glass-panel px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg text-white">
                      <span className={`w-2 h-2 rounded-full ${!isProtect ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
                      <span>
                        {isProtect
                          ? `Contour Terracing Active: Soil Retained ${Math.round(11 + restorationFactor * 17)} t/ha/yr`
                          : `Dry Spell Duration: ${Math.round(22 + degradationFactor * 24)} Days · Tankers: ${Math.round(840 + degradationFactor * 2560)}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Illustrated Fallback */
            <div className="relative w-full h-full bg-slate-900" />
          )}

          {/* Interactive Human-Scale Hotspot Beacons */}
          {landscape.hotspots.map((hotspot) => (
            <Hotspot key={hotspot.id} hotspot={hotspot} scenario={scenario} />
          ))}
        </div>
      )}

      {/* Top HUD: Location Info & Honesty Labels */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full">
            <MapPin className="w-4 h-4 text-sky-400" aria-hidden="true" />
            <span className="text-xs font-bold text-white">{landscape.name}</span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              ({landscape.coordinates.lat.toFixed(2)}°, {landscape.coordinates.lng.toFixed(2)}°)
            </span>
          </div>

          {/* Explicit Honesty Label as strictly required */}
          <div
            className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-mono border-amber-500/30 text-amber-200"
            title="Projection Honesty Label: These are scientific climate model simulations, not deterministic predictions."
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-semibold">
              {photoPath ? "Photograph + Data-based projection" : "Data-based projection"}
            </span>
            <span className="hidden md:inline text-[10px] text-amber-300/80">
              (Projections, not predictions)
            </span>
          </div>
        </div>

        {/* View Mode & Scenario Indicator */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "scene" ? "map" : "scene")}
            aria-label={viewMode === "scene" ? "Map View - switch to base map" : "Photo & Overlays - switch to visual scene"}
            className="flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {viewMode === "scene" ? (
              <>
                <Map className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span>Map View</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                <span>Photo & Overlays</span>
              </>
            )}
          </button>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold glass-panel ${
              isProtect
                ? "text-emerald-300 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                : "text-rose-300 border-rose-500/30 shadow-[0_0_15px_rgba(239,68,68,0.25)]"
            }`}
          >
            {isProtect ? (
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Thermometer className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {isProtect ? "Protect It · 1.5°C Paris" : "Carry On · SSP5-8.5"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scene Subtitle & Disclaimer */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-slate-300 pointer-events-none z-10">
        <div className="glass-panel px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-2">
          <span className="font-semibold text-white">
            {isProtect ? landscape.scenarios.protect.tagline : landscape.scenarios.carryOn.tagline}
          </span>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            Scientific Data Modeling & Visual Overlays
          </span>
        </div>

        <div className="text-[10px] font-mono text-slate-300 glass-panel px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
          <span>Interactive: click pulse markers to inspect local human-scale impacts</span>
        </div>
      </div>
    </div>
  );
};

export default Scene;
