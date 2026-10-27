"use client";

import React, { useState } from "react";
import sourcesLog from "@/content/sources.json";
import { BookOpen, ExternalLink, X, Database } from "lucide-react";

export const SourcesModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white glass-panel hover:bg-slate-800/60 transition"
      >
        <BookOpen className="w-3.5 h-3.5 text-sky-400" />
        <span>Data Sources & Methodology</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-elevated p-6 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {sourcesLog.project}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Scientific Data Provenance & Methodology
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-200">Methodology Note: </span>
              {sourcesLog.methodology}
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                Primary Scientific Sources ({sourcesLog.sources.length})
              </h4>
              {sourcesLog.sources.map((src) => (
                <div
                  key={src.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-sm font-semibold text-slate-200">
                      {src.title}
                    </h5>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-sky-400 hover:text-sky-300 transition shrink-0"
                      title="Open source paper"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {src.author} ({src.year})
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {src.usedFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SourcesModal;
