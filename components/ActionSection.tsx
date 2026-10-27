"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, HeartHandshake, BookOpen } from "lucide-react";

const ACTION_PILLARS = [
  {
    id: "watershed",
    title: "1. Decentralized Watersheds & Terraces",
    region: "Marathwada & Deccan Traps",
    challenge: "45-day rainless spells and rapid topsoil silt erosion.",
    solution:
      "Ridge-to-valley continuous contour trenching (CCT), farm ponds, and community stone bunding.",
    proof:
      "WOTR and Pani Foundation initiatives proved that catching 85% of monsoon runoff raises open-well water tables by 4–8 meters, eliminating emergency water tanker dependency.",
    metric: "85% runoff captured · Zero tanker reliance in treated watersheds",
  },
  {
    id: "agriculture",
    title: "2. Climate-Resilient Agroecology",
    region: "Karnal & Indo-Gangetic Plains",
    challenge: "Terminal heat shocks (>35°C) and sinking groundwater tube-well costs.",
    solution:
      "Adoption of heat-tolerant wheat cultivars (DBW-303, PBW-1Zn), direct-seeded rice (DSR), and laser land leveling.",
    proof:
      "CSSRI and state field trials demonstrate DSR slashes irrigation pumping demand by 35%, cutting farmer electricity and borehole re-drilling costs while maintaining harvest productivity at >4.6 t/ha.",
    metric: "35% less irrigation water · Yields preserved >4.6 t/ha",
  },
  {
    id: "coastal",
    title: "3. Coastal Bioshields & Sponge Defenses",
    region: "Mumbai Coastline & Estuaries",
    challenge: "High astronomical tides overtopping seawalls and inundating ground-floor homes.",
    solution:
      "Active mangrove forest regeneration along the Mithi mouth, permeable road bio-retention swales, and tidal backflow flap gates.",
    proof:
      "The Mumbai Climate Action Plan (MCAP) demonstrates that dense Avicennia mangrove canopies dissipate up to 60% of wave energy, providing self-healing breakwaters that safeguard over 100,000 low-lying homes.",
    metric: "60% wave energy dissipated · 2,400 hectares protected",
  },
  {
    id: "mountain",
    title: "4. Alpine Cryosphere Stewardship",
    region: "Gangotri & Garhwal Himalaya",
    challenge: "Glacier snout recession and acute pre-monsoon dry season river scarcity.",
    solution:
      "Clean cookstove transitions to eliminate black carbon soot deposition, automated proglacial lake monitoring, and alpine birch-rhododendron forest conservation.",
    proof:
      "Curtailing black carbon deposition lowers glacier surface solar absorption by 22%, slowing ablation rates and maintaining reliable spring baseflow for downstream pilgrimage shrines.",
    metric: "22% albedo preservation · Perennial baseflow protected",
  },
];

export const ActionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      aria-labelledby="action-heading"
      className="w-full max-w-7xl mx-auto py-12 space-y-8"
    >
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Evidence-Based Climate Solutions</span>
        </div>
        <h2
          id="action-heading"
          className="text-2xl sm:text-4xl font-black tracking-tight text-white"
        >
          What Can Be Done:{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Ending with Agency, Not Fear
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The future is not a predetermined tragedy—it is an arena of choices. 
          The data clearly shows that every decimal degree of avoided warming, 
          every restored contour terrace, and every preserved mangrove hectare translates directly into human security.
        </p>
      </div>

      {/* Action Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACTION_PILLARS.map((pillar, idx) => {
          const isSelected = activeTab === idx;
          return (
            <div
              key={pillar.id}
              onClick={() => setActiveTab(idx)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.2)] ring-1 ring-emerald-400/50"
                  : "glass-panel hover:bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
                    Pillar 0{idx + 1}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  )}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{pillar.title}</h3>
                <div className="text-[11px] font-mono text-slate-400 mb-3">{pillar.region}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  <strong className="text-slate-200">Solution: </strong>
                  {pillar.solution}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-300">
                {pillar.metric}
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Proof & Recovery Detail Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-emerald-500/30 bg-emerald-950/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Field Proof & Realized Impact: {ACTION_PILLARS[activeTab].title}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white">
            {ACTION_PILLARS[activeTab].region}
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">
            {ACTION_PILLARS[activeTab].proof}
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/methods"
            className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-sky-400" aria-hidden="true" />
            <span>Methods & Data</span>
          </Link>

          <Link
            href="/case-study"
            className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>Case Study</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
