"use client";

import React from "react";
import { ScenarioType } from "@/lib/climate-math";
import { Flame, ShieldCheck, AlertTriangle, Sparkles } from "lucide-react";

interface ScenarioToggleProps {
  currentScenario: ScenarioType;
  onChange: (scenario: ScenarioType) => void;
}

export const ScenarioToggle: React.FC<ScenarioToggleProps> = ({
  currentScenario,
  onChange,
}) => {
  const isCarryOn = currentScenario === "carry-on";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange("carry-on");
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange("protect");
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Select climate policy scenario"
      onKeyDown={handleKeyDown}
      className="p-1.5 rounded-2xl glass-panel-elevated flex items-center gap-2 max-w-xl mx-auto shadow-xl"
    >
      {/* Carry On Option */}
      <button
        type="button"
        role="radio"
        aria-checked={isCarryOn}
        tabIndex={isCarryOn ? 0 : -1}
        onClick={() => onChange("carry-on")}
        className={`relative flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl transition-colors duration-200 font-medium text-sm text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
          isCarryOn ? "text-white" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        {isCarryOn && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.45)] ring-1 ring-rose-400 transition-all duration-300"
          />
        )}
        <div
          className={`relative z-10 p-1.5 rounded-lg shrink-0 ${
            isCarryOn ? "bg-white/20" : "bg-slate-800 text-slate-400"
          }`}
        >
          {isCarryOn ? (
            <Flame className="w-4 h-4 text-amber-200 animate-pulse" aria-hidden="true" />
          ) : (
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
          )}
        </div>
        <div className="relative z-10">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <span>Carry On</span>
            {isCarryOn && (
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-black/40 text-amber-300 border border-amber-400/30">
                Fossil Heavy
              </span>
            )}
          </div>
          <div
            className={`text-xs line-clamp-1 ${
              isCarryOn ? "text-rose-100" : "text-slate-400"
            }`}
          >
            Business as usual · SSP5-8.5
          </div>
        </div>
      </button>

      {/* Protect It Option */}
      <button
        type="button"
        role="radio"
        aria-checked={!isCarryOn}
        tabIndex={!isCarryOn ? 0 : -1}
        onClick={() => onChange("protect")}
        className={`relative flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl transition-colors duration-200 font-medium text-sm text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          !isCarryOn ? "text-white" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        {!isCarryOn && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400 transition-all duration-300"
          />
        )}
        <div
          className={`relative z-10 p-1.5 rounded-lg shrink-0 ${
            !isCarryOn ? "bg-white/20" : "bg-slate-800 text-slate-400"
          }`}
        >
          {!isCarryOn ? (
            <ShieldCheck className="w-4 h-4 text-emerald-200" aria-hidden="true" />
          ) : (
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          )}
        </div>
        <div className="relative z-10">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <span>Protect It</span>
            {!isCarryOn && (
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-black/40 text-emerald-300 border border-emerald-400/30">
                1.5°C Paris
              </span>
            )}
          </div>
          <div
            className={`text-xs line-clamp-1 ${
              !isCarryOn ? "text-emerald-100" : "text-slate-400"
            }`}
          >
            Regeneration & Net-Zero
          </div>
        </div>
      </button>
    </div>
  );
};

export default ScenarioToggle;
