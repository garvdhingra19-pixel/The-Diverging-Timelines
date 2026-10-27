"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { ScenarioType } from "@/lib/climate-math";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface YearSliderProps {
  year: number;
  scenario: ScenarioType;
  onChange: (year: number) => void;
}

const MILESTONES = [
  { year: 2025, label: "2025", desc: "Present Baseline" },
  { year: 2030, label: "2030", desc: "UN SDG Milestone" },
  { year: 2050, label: "2050", desc: "Net-Zero Deadline" },
  { year: 2075, label: "2075", desc: "Tipping Cascades" },
  { year: 2100, label: "2100", desc: "Century Horizon" },
];

export const YearSlider: React.FC<YearSliderProps> = ({
  year,
  scenario,
  onChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isProtect = scenario === "protect";
  const progressPercent = ((year - 2025) / (2100 - 2025)) * 100;

  // Timeline auto-play animation loop
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        onChange(year >= 2100 ? 2025 : year + 1);
      }, 350);
    } else if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, year, onChange]);

  const handleStep = useCallback(
    (delta: number) => {
      const next = Math.min(2100, Math.max(2025, year + delta));
      onChange(next);
    },
    [year, onChange]
  );

  // WCAG 2.2 AA Comprehensive Keyboard Navigation Handler for Slider
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        handleStep(1);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        handleStep(-1);
        break;
      case "PageUp":
        e.preventDefault();
        handleStep(5);
        break;
      case "PageDown":
        e.preventDefault();
        handleStep(-5);
        break;
      case "Home":
        e.preventDefault();
        onChange(2025);
        break;
      case "End":
        e.preventDefault();
        onChange(2100);
        break;
      default:
        break;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl shadow-xl w-full max-w-4xl mx-auto space-y-4">
      {/* Top Header: Year Badge & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Simulation Year
            </div>
            <div className="flex items-baseline gap-3">
              <span
                key={year}
                className={`text-4xl lg:text-5xl font-black font-mono tracking-tight transition-colors duration-300 ${
                  isProtect ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {year}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-slate-800/90 text-slate-300 border border-slate-700/60">
                +{year - 2025} yrs elapsed
              </span>
            </div>
          </div>
        </div>

        {/* Playback & Step Controls - All with WCAG 2.2 Touch Target Compliance (min 44x44px) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleStep(-5)}
            disabled={year <= 2025}
            aria-label="Decrease year by 5"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800/70 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/60 disabled:opacity-30 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause simulation timeline" : "Play Simulation timeline"}
            className={`min-h-[44px] px-4 py-2.5 flex items-center gap-2 rounded-xl font-semibold text-xs transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 focus-visible:ring-amber-400"
                : isProtect
                ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 focus-visible:ring-emerald-400"
                : "bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/20 focus-visible:ring-rose-400"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Play Simulation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleStep(5)}
            disabled={year >= 2100}
            aria-label="Increase year by 5"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800/70 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/60 disabled:opacity-30 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onChange(2025)}
            aria-label="Reset timeline to 2025 baseline"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800/70 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            title="Reset to 2025 baseline"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* 
        Interactive Slider Track with Framer Motion Scrubbing
        WCAG 2.2 AA Keyboard Navigation via native range input
      */}
      <div className="relative pt-3 pb-2">
        <div
          ref={trackRef}
          className="relative w-full h-4 bg-slate-800/90 rounded-full cursor-pointer border border-slate-700/60"
        >
          {/* Animated Progress Fill */}
          <div
            className={`h-full rounded-full transition-[width] duration-150 ease-out motion-reduce:transition-none ${
              isProtect
                ? "bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400"
                : "bg-gradient-to-r from-amber-500 via-rose-500 to-red-600"
            }`}
            style={{ width: `${progressPercent}%` }}
          />

          {/* Scrubbing Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] border-2 border-slate-950 pointer-events-none transition-[left] duration-150 ease-out motion-reduce:transition-none"
            style={{ left: `${progressPercent}%` }}
          />

          {/* Accessible Range Input with full keyboard and touch support */}
          <input
            type="range"
            min={2025}
            max={2100}
            step={1}
            value={year}
            onChange={(e) => onChange(Number(e.target.value))}
            onKeyDown={handleKeyDown}
            aria-label="Global warming simulation year slider from 2025 to 2100"
            aria-valuemin={2025}
            aria-valuemax={2100}
            aria-valuenow={year}
            aria-valuetext={`Simulation year ${year}, under ${isProtect ? "Protect It Scenario" : "Carry On Scenario"}`}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full"
          />
        </div>
      </div>

      {/* Milestone Markers */}
      <div className="grid grid-cols-5 gap-1 pt-1 text-center">
        {MILESTONES.map((m) => {
          const isSelected = year === m.year;
          const isPassed = year >= m.year;

          return (
            <button
              key={m.year}
              type="button"
              onClick={() => onChange(m.year)}
              className="group min-h-[44px] flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
            >
              <div
                className={`w-3 h-3 rounded-full transition-transform duration-200 mb-1.5 ${
                  isSelected
                    ? isProtect
                      ? "bg-emerald-400 ring-4 ring-emerald-500/30 scale-125"
                      : "bg-rose-400 ring-4 ring-rose-500/30 scale-125"
                    : isPassed
                    ? "bg-slate-400 group-hover:bg-slate-200"
                    : "bg-slate-700 group-hover:bg-slate-500"
                }`}
              />
              <span
                className={`text-xs font-mono font-bold transition-colors ${
                  isSelected
                    ? isProtect
                      ? "text-emerald-300"
                      : "text-rose-300"
                    : isPassed
                    ? "text-slate-300"
                    : "text-slate-400"
                }`}
              >
                {m.label}
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-400 group-hover:text-slate-300 truncate max-w-full">
                {m.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default YearSlider;
