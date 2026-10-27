"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Share2, Check, Globe } from "lucide-react";
import { ClimateState } from "@/hooks/use-climate-state";

const SourcesModal = dynamic(() => import("./SourcesModal"), { ssr: false });

interface HeaderProps {
  state: ClimateState;
}

export const Header: React.FC<HeaderProps> = ({ state }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentQuery = `?place=${state.place}&year=${state.year}&scenario=${
    state.scenario === "protect" ? "protect" : "carry-on"
  }`;

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>TerraScope</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                2025–2100 Projections
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Interactive Multi-Decadal Climate Scenario Simulator
            </p>
          </div>
        </div>

        {/* URL State Display & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Query State Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-slate-400">URL:</span>
            <span className="text-sky-300 font-semibold">{currentQuery}</span>
          </div>

          {/* Supporting Pages Navigation */}
          <nav aria-label="Site Navigation" className="flex items-center gap-1">
            <a
              href="/methods"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
            >
              <span className="hidden sm:inline">Methods & Sources</span>
              <span className="sm:hidden">Methods</span>
            </a>
            <a
              href="/case-study"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
            >
              <span className="hidden sm:inline">Case Study</span>
              <span className="sm:hidden">Study</span>
            </a>
          </nav>

          {/* Copy Shareable URL */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={copied ? "Copied to clipboard" : "Share View"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
              copied
                ? "bg-emerald-500 text-slate-950"
                : "glass-panel text-slate-200 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Share View</span>
              </>
            )}
          </button>

          <SourcesModal />
        </div>
      </div>
    </header>
  );
};

export default Header;
