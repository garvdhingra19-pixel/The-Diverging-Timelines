"use client";

import React from "react";
import type { StatMetric } from "@/content/schema";
import { ScenarioType, calculateMetricValue } from "@/lib/climate-math";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

interface StatCardProps {
  metric: StatMetric;
  year: number;
  scenario: ScenarioType;
}

export const StatCard: React.FC<StatCardProps> = ({ metric, year, scenario }) => {
  const currentValue = calculateMetricValue(metric, year, scenario);
  const diffFromBaseline = Number((currentValue - metric.baseline).toFixed(1));
  const isWorsening =
    (metric.direction === "up" && currentValue > metric.baseline) ||
    (metric.direction === "down" && currentValue < metric.baseline);

  const isProtect = scenario === "protect";

  return (
    <div
      role="region"
      aria-label={`${metric.label} projection`}
      className={`relative p-5 rounded-xl border transition-all duration-300 glass-panel ${
        isProtect
          ? "hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          : "hover:border-rose-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          {metric.label}
        </span>
        <div
          className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-mono font-medium transition-colors duration-300 ${
            isWorsening
              ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
              : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
          }`}
          title={`Change from 2025 baseline (${metric.baseline} ${metric.unit})`}
        >
          {diffFromBaseline > 0 ? (
            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span>
            {diffFromBaseline > 0 ? `+${diffFromBaseline}` : diffFromBaseline}{" "}
            {metric.unit}
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-2 my-2">
        <span
          key={currentValue}
          className={`text-3xl lg:text-4xl font-black tracking-tight font-mono transition-all duration-200 ${
            isProtect ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {currentValue.toLocaleString()}
        </span>
        <span className="text-sm font-medium text-slate-300">{metric.unit}</span>
      </div>

      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-700/40 text-xs text-slate-400">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
        <p className="line-clamp-2 leading-relaxed">{metric.context}</p>
      </div>
    </div>
  );
};

export default StatCard;
