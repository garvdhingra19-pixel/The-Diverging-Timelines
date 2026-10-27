import React, { Suspense } from "react";
import ClimateExplorer from "@/components/ClimateExplorer";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
              Loading TerraScope Simulation...
            </span>
          </div>
        </div>
      }
    >
      <ClimateExplorer />
    </Suspense>
  );
}
