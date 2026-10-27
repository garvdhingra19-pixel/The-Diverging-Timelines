"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { Hotspot as HotspotType } from "@/content/schema";
import { ScenarioType } from "@/lib/climate-math";
import {
  Waves,
  Flame,
  TreePine,
  Building2,
  ShieldCheck,
  Snowflake,
  Wheat,
  Droplets,
  X,
  HelpCircle,
} from "lucide-react";

interface HotspotProps {
  hotspot: HotspotType;
  scenario: ScenarioType;
}

const CATEGORY_ICONS: Record<HotspotType["category"], React.ElementType> = {
  flood: Waves,
  heat: Flame,
  ecology: TreePine,
  infrastructure: Building2,
  adaptation: ShieldCheck,
  cryosphere: Snowflake,
  agriculture: Wheat,
  water: Droplets,
};

export const Hotspot: React.FC<HotspotProps> = ({ hotspot, scenario }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const Icon = CATEGORY_ICONS[hotspot.category] || HelpCircle;
  const isProtect = scenario === "protect";
  const impactText = isProtect ? hotspot.impactProtect : hotspot.impactCarryOn;

  const handleClose = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Keyboard navigation: Escape key closes popover dialog (WCAG 2.2 AA)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const dialogId = `hotspot-dialog-${hotspot.id}`;
  const titleId = `hotspot-title-${hotspot.id}`;
  const descId = `hotspot-desc-${hotspot.id}`;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      {/* 
        WCAG 2.2 AA Accessible Beacon Button 
        Minimum 44x44px touch target (w-11 h-11)
      */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        aria-label={`Inspect hotspot: ${hotspot.title} (${hotspot.category})`}
        tabIndex={0}
        className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
          isProtect
            ? "focus-visible:ring-emerald-400"
            : "focus-visible:ring-rose-400"
        }`}
      >
        {/* Pulsing Beacon Ring */}
        <span
          className={`absolute inset-1 rounded-full pointer-events-none animate-ping opacity-60 ${
            isProtect ? "bg-emerald-400" : "bg-rose-400"
          }`}
        />

        <div
          className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-lg ${
            isProtect
              ? "bg-emerald-500 text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.8)]"
              : "bg-rose-500 text-white shadow-[0_0_16px_rgba(239,68,68,0.8)]"
          }`}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
      </button>

      {/* Popover Card with Full Keyboard Accessibility */}
      {isOpen && (
        <div
          id={dialogId}
          ref={dialogRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-72 sm:w-80 p-4 rounded-xl glass-panel-elevated shadow-2xl border border-slate-700/80 z-30 transition-all duration-200 ease-out"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <span
              className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full ${
                isProtect
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}
            >
              {hotspot.category}
            </span>
            <button
              type="button"
              onClick={handleClose}
              aria-label={`Close details for ${hotspot.title}`}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <h4 id={titleId} className="text-sm font-bold text-white mb-1.5">
            {hotspot.title}
          </h4>
          <p id={descId} className="text-xs text-slate-300 mb-3 leading-relaxed">
            {hotspot.description}
          </p>

          <div
            className={`p-2.5 rounded-lg border text-xs leading-relaxed ${
              isProtect
                ? "bg-emerald-950/40 border-emerald-600/30 text-emerald-200"
                : "bg-rose-950/40 border-rose-600/30 text-rose-200"
            }`}
          >
            <div className="font-semibold text-[10px] uppercase tracking-wider mb-0.5 text-slate-400">
              {isProtect ? "Protect It Scenario Impact" : "Carry On Scenario Impact"}
            </div>
            <p>{impactText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotspot;
