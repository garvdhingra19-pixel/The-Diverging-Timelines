"use client";

import React from "react";
import { Mountain, Sprout, Layers, Waves, ArrowDown, Compass } from "lucide-react";
import { LandscapeId } from "@/hooks/use-climate-state";

interface IntroHeroProps {
  onSelectLandscape: (id: LandscapeId) => void;
}

const TRANSECT_CARDS = [
  {
    id: "gangotri" as LandscapeId,
    title: "1. The Mountains",
    location: "Gangotri Glacier, Garhwal Himalaya",
    elevation: "3,100m – 6,500m",
    hazard: "Glacial recession & lean-season river baseflow",
    icon: Mountain,
    color: "from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400",
  },
  {
    id: "karnal" as LandscapeId,
    title: "2. The Plains",
    location: "Karnal Belt, Haryana",
    elevation: "250m Alluvial Plain",
    hazard: "Terminal heat waves & tube-well groundwater depletion",
    icon: Sprout,
    color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400",
  },
  {
    id: "marathwada" as LandscapeId,
    title: "3. The Plateau",
    location: "Marathwada Rain-Shadow, Maharashtra",
    elevation: "550m Deccan Basalt",
    hazard: "Erratic monsoon breaks, topsoil erosion & tanker dependency",
    icon: Layers,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    id: "mumbai" as LandscapeId,
    title: "4. The Coast",
    location: "Mumbai Coastline, Arabian Sea",
    elevation: "0m – 15m Sea Level",
    hazard: "High-tide astronomical flooding & coastal surge",
    icon: Waves,
    color: "from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400",
  },
];

export const IntroHero: React.FC<IntroHeroProps> = ({ onSelectLandscape }) => {
  return (
    <section aria-labelledby="intro-heading" className="w-full max-w-7xl mx-auto pt-4 pb-8 space-y-6">
      {/* Hero Narrative Header */}
      <div className="relative p-6 sm:p-10 rounded-3xl glass-panel-elevated border border-slate-800 shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>National Climate Transect · 2025–2100</span>
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              IPCC AR6 & NEX-GDDP-CMIP6 Data
            </span>
          </div>

          <h2 id="intro-heading" className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Four Landscapes. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              One Shared Water Cycle.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From the high Himalayan glacial snout of Gangotri down to the Arabian Sea surge line of Mumbai, 
            climate change is not a remote abstraction—it is the lived reality of melting snows, plunging tube-wells, 
            eroding basalt terraces, and flooded commuter rail lines. Explore multi-decadal projections 
            between 2025 and 2100 under two divergent policy trajectories: <strong>Carry On</strong> (unabated emissions) 
            versus <strong>Protect It</strong> (regeneration and Paris alignment).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#simulation-view"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-sky-500 to-teal-500 text-slate-950 hover:brightness-110 transition shadow-lg shadow-sky-500/20 flex items-center gap-2"
            >
              <span>Explore Interactive Simulator</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
            <span className="text-xs text-slate-400 font-mono">
              Honesty Label: Projections, not deterministic predictions
            </span>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* The Transect 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRANSECT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                onSelectLandscape(card.id);
                document.getElementById("simulation-view")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`p-5 rounded-2xl border glass-panel bg-gradient-to-br ${card.color} text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    {card.title}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-1">{card.location}</h3>
                <div className="text-[11px] font-mono text-slate-400 mb-2">{card.elevation}</div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{card.hazard}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400">
                <span>Simulate Landscape</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default IntroHero;
