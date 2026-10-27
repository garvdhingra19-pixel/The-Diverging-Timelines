import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, BookOpen, ExternalLink, FileCheck2, ImageIcon, ShieldCheck, Database, Layers } from "lucide-react";
import sourcesData from "@/content/sources.json";

export const metadata: Metadata = {
  title: "Methods & Sources · Scientific Documentation",
  description:
    "Scientific methodology, downscaled datasets (NASA NEX-GDDP-CMIP6, IPCC AR6), peer-reviewed papers, and transparent asset licensing for the Four Landscapes simulator.",
};

export default function MethodsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-sky-400 transition"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back to Simulation</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/case-study"
              className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 transition"
            >
              Read Case Study
            </Link>
            <div className="text-[11px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              v{sourcesData.version} Verified
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Title Hero */}
        <div className="space-y-4 border-b border-slate-800/60 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open Science & Verification Log</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Methods, Sources & Data Provenance
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Every metric and projection in TerraScope is anchored to published peer-reviewed glaciological surveys,
            NASA Earth Exchange daily climate models, and official hydrogeological bulletins.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Last Verified: {sourcesData.lastUpdated}
            </span>
            <span className="text-slate-600">|</span>
            <span>Dataset Count: {sourcesData.sources.length} Primary Collections</span>
            <span className="text-slate-600">|</span>
            <span>Optimized Media Assets: {sourcesData.imageAssets.length} Visual Targets</span>
          </div>
        </div>

        {/* Core Methodology Overview */}
        <section aria-labelledby="methodology-overview" className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <h2 id="methodology-overview" className="text-xl sm:text-2xl font-bold text-white">
              Data Pipeline & Extraction Methodology
            </h2>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 leading-relaxed text-sm text-slate-300 space-y-4">
            <p>
              {sourcesData.methodology}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="font-semibold text-sky-400 flex items-center gap-1.5">
                  <Database className="w-4 h-4" />
                  <span>1. NASA NEX-GDDP-CMIP6</span>
                </div>
                <p className="text-slate-400">
                  Global daily downscaled projections at 0.25° resolution (~25 km) processed via Python <code className="text-slate-200">xarray</code> for regional bounding boxes.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="font-semibold text-teal-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Scenarios: Carry On vs. Protect</span>
                </div>
                <p className="text-slate-400">
                  Mapped to standard IPCC emission storylines: High emissions (SSP5-8.5 / RCP 8.5) vs. Ambitious mitigation and aggressive local adaptation (SSP1-2.6 / RCP 2.6).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>3. Schema Enforcement</span>
                </div>
                <p className="text-slate-400">
                  Pre-build automated TypeScript/Zod validation ensures every metric, hotspot, plain-verb copy string, and stat card is intact prior to static export generation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Scientific Sources */}
        <section aria-labelledby="primary-sources" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <h2 id="primary-sources" className="text-xl sm:text-2xl font-bold text-white">
                Primary Scientific Papers & Datasets
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {sourcesData.sources.length} Citations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sourcesData.sources.map((src) => (
              <div
                key={src.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                      {src.id}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{src.year}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-sky-300 transition">
                    {src.title}
                  </h3>
                  <p className="text-xs text-slate-400 italic">{src.author}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/60">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
                      Applied To Projections:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {src.usedFor.map((metric, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium pt-1"
                  >
                    <span>View Official Source / DOI</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Image Assets & Honesty Labels Log */}
        <section aria-labelledby="image-assets" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-400" />
              <h2 id="image-assets" className="text-xl sm:text-2xl font-bold text-white">
                Image Assets & Visual Honesty Log
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Strictly &lt; 150 KB Budget Enforced
            </span>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="Image Assets and Visual Honesty Log"
            className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">File Path</th>
                  <th className="py-3.5 px-4">Subject Description</th>
                  <th className="py-3.5 px-4">Format / Size</th>
                  <th className="py-3.5 px-4">Visual Honesty Policy</th>
                  <th className="py-3.5 px-4">Demonstration License</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
                {sourcesData.imageAssets.map((asset, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/80 transition">
                    <td className="py-3 px-4 font-mono text-sky-400 font-medium">
                      {asset.file}
                    </td>
                    <td className="py-3 px-4 max-w-xs">{asset.subject}</td>
                    <td className="py-3 px-4 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 mr-2">
                        {asset.format}
                      </span>
                      <span className="text-emerald-400 font-semibold">{asset.sizeKB} KB</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[11px]">
                        <ShieldCheck className="w-3 h-3" />
                        {asset.honestyLabel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">{asset.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Reproducibility Statement */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Reproducibility & Open Access Commitment</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The data extraction pipeline scripts (<code className="text-sky-300">data-pipeline/etl/nex_gddp_cmip6.py</code>),
            Zod validation contracts (<code className="text-sky-300">content/schema.ts</code>), and automated Vitest suites
            are included in this repository. All users are empowered to run the local pipeline and verify raw metrics against the primary datasets.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <p>The Four Landscapes · Open Source Climate Scenario Framework · 2026</p>
      </footer>
    </div>
  );
}
