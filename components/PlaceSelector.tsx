"use client";

import React, { useMemo } from "react";
import { LandscapeId } from "@/hooks/use-climate-state";
import type { LandscapeContent } from "@/content/schema";
import { Globe2 } from "lucide-react";

interface PlaceSelectorProps {
  currentPlace: LandscapeId;
  landscapes: Record<string, LandscapeContent>;
  onChange: (place: LandscapeId) => void;
}

const PRIMARY_TRANSECT: LandscapeId[] = [
  "mumbai",
  "gangotri",
  "karnal",
  "marathwada",
];

export const PlaceSelector: React.FC<PlaceSelectorProps> = ({
  currentPlace,
  landscapes,
  onChange,
}) => {
  // Sort so primary Four Landscapes transect appears in geographical/thematic order
  const sortedLandscapes = useMemo(() => {
    const list = Object.values(landscapes);
    return list.sort((a, b) => {
      const idxA = PRIMARY_TRANSECT.indexOf(a.id as LandscapeId);
      const idxB = PRIMARY_TRANSECT.indexOf(b.id as LandscapeId);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [landscapes]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Globe2 className="w-4 h-4 text-sky-400" aria-hidden="true" />
          <span>The Four Landscapes (Mountains · Plains · Plateau · Coast)</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Select region to simulate
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sortedLandscapes
          .filter((l) => PRIMARY_TRANSECT.includes(l.id as LandscapeId))
          .map((l) => {
            const isSelected = currentPlace === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => onChange(l.id as LandscapeId)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? "bg-slate-800/90 border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/50"
                    : "glass-panel hover:bg-slate-800/50 hover:border-slate-600/60"
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 mb-1">
                    {l.id === "gangotri" && "1. Mountains"}
                    {l.id === "karnal" && "2. Plains"}
                    {l.id === "marathwada" && "3. Plateau"}
                    {l.id === "mumbai" && "4. Coastline"}
                  </div>
                  <div
                    className={`text-sm font-bold truncate ${
                      isSelected ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {l.name}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {l.region}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {l.hotspots.length} hotspots
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                  )}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default PlaceSelector;
