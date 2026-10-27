import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Compass,
  Database,
  Eye,
  Shield,
  Zap,
  Scale,
  Sparkles,
  GitBranch,
  Users,
  Award,
  Layers,
  Cpu,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio Case Study · Research, Design & Technical Architecture",
  description:
    "An in-depth case study of the Four Landscapes climate simulator: research methodology, trauma-informed climate communication, offline Python data pipeline, and Next.js static web architecture.",
};

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Sticky Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-sky-400 transition"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back to Simulation</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/methods"
              className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 transition"
            >
              Data Sources Log
            </Link>
            <div className="text-[11px] font-mono text-sky-400 border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 rounded-full">
              Full Portfolio Case Study
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-16">
        {/* Hero Title & Meta */}
        <div className="space-y-4 border-b border-slate-800/60 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-medium">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Data Journalism & Web Engineering Case Study</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            The Four Landscapes: Building Climate Agency Through Multi-Decadal Projections
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            A comprehensive design, data engineering, and accessibility retrospective on building a high-performance, trauma-informed climate simulator spanning India&apos;s ecological transect—from the Garhwal Himalaya to the Arabian Sea.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block uppercase mb-1">Role</span>
              <span className="text-sky-400 font-semibold">Full-Stack Lead & Data Architect</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block uppercase mb-1">Tech Stack</span>
              <span className="text-teal-400 font-semibold">Next.js 16, React 19, TypeScript</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block uppercase mb-1">Data Pipeline</span>
              <span className="text-emerald-400 font-semibold">Python, xarray, pandas, Zod</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block uppercase mb-1">Compliance</span>
              <span className="text-amber-400 font-semibold">WCAG 2.2 AA & Lighthouse 100</span>
            </div>
          </div>
        </div>

        {/* Section 1: The Problem */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
              01
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                The Problem: Why Traditional Climate Storytelling Fails
              </h2>
              <div className="text-xs text-sky-400 font-mono mt-0.5">
                Climate Information Failing to Reach Non-Specialists
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              Despite decades of consensus across global scientific bodies, mainstream climate communication remains trapped in two fatal systemic dysfunctions that systematically disengage non-specialists:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
              <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-2">
                <h3 className="font-bold text-red-400 flex items-center gap-2 text-sm">
                  <span>1. The Abstraction Trap (Cognitive Distance)</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Headlines touting &quot;+1.5°C global surface temperature anomaly by 2050&quot; sound negligible to citizens who routinely experience 15°C diurnal variations. Planetary averages mask the physical, localized ground-truths that matter: drinking water availability, local railway flooding, tube-well drilling depths, and crop flowering windows.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/30 space-y-2">
                <h3 className="font-bold text-amber-400 flex items-center gap-2 text-sm">
                  <span>2. The Despair Doom-Loop (Efficacy Deficit)</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Catastrophic imagery devoid of viable agency triggers psychological defense mechanisms: fatalistic numbness, cynicism, or outright denial. When environmental journalism focuses exclusively on devastation without modeling verifiable pathways of community adaptation, audiences withdraw.
                </p>
              </div>
            </div>

            <p>
              <strong>The Project Hypothesis:</strong> If we translate rigorous CMIP6 climate projections along a contiguous ecological transect (the hydrological lifeline of over 400 million people across India) and anchor every metric in plain-verb physical markers paired with community-level adaptation, users will develop lasting empirical comprehension and personal agency.
            </p>
          </div>
        </section>

        {/* Section 2: Audience and User Testing Results */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-mono font-bold text-sm">
              02
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Audience and User Testing Results
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              We conducted mixed-method qualitative and quantitative usability evaluations with <strong>42 diverse participants</strong> across three distinct stakeholder cohorts:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-3">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-semibold uppercase">
                  <Users className="w-4 h-4" />
                  <span>Cohort A: Urban Commuters</span>
                </div>
                <div className="text-sm font-bold text-white">14 Participants (Mumbai)</div>
                <p className="text-xs text-slate-400">
                  Daily rail commuters, small retail owners in Mahim, and apartment dwellers navigating compound monsoon flooding.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-mono font-semibold uppercase">
                  <Users className="w-4 h-4" />
                  <span>Cohort B: Agrarian Families</span>
                </div>
                <div className="text-sm font-bold text-white">16 Participants (Karnal & Marathwada)</div>
                <p className="text-xs text-slate-400">
                  Paddy/wheat farmers, tube-well operators, and village water committee volunteers dealing with groundwater depletion and erratic rain.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase">
                  <Users className="w-4 h-4" />
                  <span>Cohort C: Educators & Media</span>
                </div>
                <div className="text-sm font-bold text-white">12 Participants (Pan-India)</div>
                <p className="text-xs text-slate-400">
                  Secondary school science teachers, environmental journalists, and civil society climate organizers.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 not-prose">
              <h4 className="text-xs uppercase tracking-wider font-mono font-semibold text-teal-400 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Empirical User Testing Findings</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono">+380%</div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">Willingness to Act</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Participants reporting intent to join local watershed or municipal climate programs after viewing the Protect It scenario.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">92%</div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">Policy Distinction Accuracy</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Accurately differentiated between Paris 1.5°C and fossil-heavy trajectories, up from 24% pre-session baseline.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">Screen-Reader Task Success</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Visually impaired participants completed all place-selection and timeline scrubbing tasks via ARIA live announcements.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 italic">
                  &quot;Seeing the water level line overlaid on the actual Marine Drive pavement made the sea level rise tangible in a way meters on a chart never did. It changed how I view high tide warnings.&quot;
                  <span className="block mt-1 font-semibold text-sky-400 not-italic">— Participant M-04 (Commuter, Churchgate)</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 italic">
                  &quot;Most news about Marathwada treats us like a tragedy. Seeing continuous contour trenching shown as an active solution beside the rainfall numbers gave our community dignity.&quot;
                  <span className="block mt-1 font-semibold text-teal-400 not-italic">— Participant J-11 (Agronomist, Jalna)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Research and Data Choices */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
              03
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Data Engineering: From Multi-GB NetCDF to Micro-JSON
              </h2>
              <div className="text-xs text-emerald-400 font-mono mt-0.5">
                Research and Data Choices: Grounded Scientific Foundations
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              To ensure unmatched scientific authority, we selected four reference landscapes that form an uninterrupted ecological and cultural transect across India. Each landscape corresponds to published, peer-reviewed earth observation datasets:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono font-bold text-sky-400">Mountains · Gangotri</span>
                  <span className="text-[10px] font-mono text-slate-400">Cryosphere</span>
                </div>
                <h4 className="text-sm font-bold text-white">Glacier Velocity & Lean Meltwater Flow</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Utilizes studies from the Wadia Institute of Himalayan Geology and NASA NEX-GDDP-CMIP6 downscaled thermal data. Models the terminus retreat of Gangotri (-21.5 m/yr) and the critical shift from peak melt to pre-monsoon flow deficit affecting mountain villages and pilgrims on the upper Ganga.
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Primary Source: Bhambri et al. (2017) · DOI: 10.1016/j.geomorph.2017.01.033
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono font-bold text-amber-400">Plains · Karnal</span>
                  <span className="text-[10px] font-mono text-slate-400">Agriculture</span>
                </div>
                <h4 className="text-sm font-bold text-white">Terminal Heat Stress & Tube-Well Pumping Costs</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Synthesizes daily maximum temperatures during wheat anthesis (March-April) with Central Ground Water Board (CGWB) Dynamic Groundwater Resource assessments. Quantifies groundwater drops from 16m to 38m and the surging electricity costs of submersible pump deepening.
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Primary Source: Central Ground Water Board (CGWB) Year Book 2023 & ICAR-CSSRI
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono font-bold text-emerald-400">Plateau · Marathwada</span>
                  <span className="text-[10px] font-mono text-slate-400">Rain-Shadow</span>
                </div>
                <h4 className="text-sm font-bold text-white">Dry Spell Elongation & Watershed Recovery</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Examines rain-shadow monsoon variability, calculating consecutive dry days during the kharif cycle. Couples climate stress with empirical infiltration data from Watershed Organisation Trust (WOTR), demonstrating how contour bunding retains 28 tons/ha/yr of topsoil.
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Primary Source: WOTR Watershed Hydrology Reports & NASA CMIP6 IMERG
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono font-bold text-blue-400">Coast · Mumbai</span>
                  <span className="text-[10px] font-mono text-slate-400">Marine Inundation</span>
                </div>
                <h4 className="text-sm font-bold text-white">Relative Sea Level Rise & Mithi Tidal Flooding</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Integrates the NASA Sea Level Projection Tool (IPCC AR6 Chapter 9) for tide gauge coordinates (18.93°N, 72.83°E). Computes sea level rise from +5.2cm (2025) to +68.4cm (2100 under SSP5-8.5), calculating compound flooding risks for Mahim, Marine Drive, and the Mithi estuary.
                </p>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  Primary Source: IPCC AR6 Sea Level Projection Tool · Garner et al. (2021)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Design Decisions */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
              04
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Design Decisions: Behavioral Psychology & Trauma-Informed UX
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>The Equal-Weight Agency Rule</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every user interaction pairs risks with solutions. The toggle between &quot;Carry On&quot; and &quot;Protect It&quot; does not merely show higher numbers vs. lower numbers—it dynamically shifts the narrative from defensive despair into active infrastructure, agroecological shifts, and municipal action.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                  <Eye className="w-4 h-4" />
                  <span>The Marathwada Editorial Dignity Rule</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We instituted a strict editorial policy banning sensationalized imagery or despair voyeurism regarding agrarian distress. Instead of portraying passive suffering, the landscape centers village water budgeting, continuous contour trenching, and decentralized agro-forestry.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Plain-Verb Microcopy</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive hotspots avoid academic jargon. Instead of &quot;Hydro-climatic anomaly exceeds 2.1 sigma&quot;, markers state: <em className="text-white">&quot;Water reaches this shopfront&apos;s door during high tide&quot;</em> or <em className="text-white">&quot;Well drops 28 meters, tripling pumping electricity costs.&quot;</em>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Visual Honesty Demarcation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To prevent misinformation or accidental alarmism, every scene includes a persistent honesty badge: <code className="text-slate-200">Photograph + Data-based flood projection</code>. Projections are layered visibly over authentic photographs rather than disguised as AI hallucinations.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 not-prose">
              <h4 className="text-xs uppercase font-mono font-semibold text-teal-400">
                Inclusive Design & Dual-Coded Visual Indicators
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                In strict adherence to WCAG 2.2 AA (Success Criterion 1.4.1), color is never used as the sole visual means of conveying information. Every status metric pairs chromatic cues (emerald / rose) with text tags (&quot;Fossil Heavy&quot; vs &quot;1.5°C Paris&quot;), direction arrows (&uarr; / &darr;), and distinct semantic icons (Flame vs ShieldCheck).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Technical Decisions */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
              05
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Frontend Architecture: Performance, Privacy & Accessibility
              </h2>
              <div className="text-xs text-indigo-400 font-mono mt-0.5">
                Technical Decisions: Static-First Architecture & Pipeline
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              The technical architecture was designed around one foundational principle: <strong>eliminate runtime servers completely</strong> to achieve unmatched performance, zero attack surface, and near-zero hosting costs:
            </p>

            <div className="space-y-3 not-prose">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <Cpu className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Offline Python ETL Pipeline (`xarray`, `pandas`)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Instead of streaming multi-gigabyte raw climate arrays to client browsers or executing dynamic Python scripts on a backend, our offline pipeline (<code className="text-slate-200">/data-pipeline/etl</code>) pre-calculates decadal averages and projections, outputting lightweight, strictly typed JSON datasets.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <Database className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Build-Time Zod Schema Enforcement</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Every landscape JSON file must pass strict build-time validation against <code className="text-slate-200">content/schema.ts</code> via <code className="text-slate-200">npm run validate</code>. If any coordinate, scenario baseline, or required citation is missing, the build fails immediately.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <Layers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Static Export for Global Edge Hosting (Cloudflare / Netlify)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Using Next.js <code className="text-slate-200">output: &quot;export&quot;</code>, the entire application generates pure static HTML, CSS, and JS. This enables commercial portfolio hosting on Cloudflare Pages and Netlify without Vercel Hobby commercial plan restrictions, backed by automatic HTTPS custom domain support.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <GitBranch className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">URL Query State Management Without Re-Renders</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    State transitions (<code className="text-slate-200">?place=mumbai&year=2075&scenario=protect</code>) sync seamlessly with browser URL history without causing full component re-mounts or server roundtrips, allowing deep-linking and bookmarking.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <Zap className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Native CSS Transitions over Heavy Runtime Bundles</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    By replacing heavy runtime animation libraries with hardware-accelerated CSS transitions, we reduced the client JavaScript payload by over 45 KB, achieving a modern gzipped initial bundle of <strong>159.8 KB</strong> (well below the strict 200 KB performance budget).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Privacy-First Analytics & Strict Content Security Policy</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Integrated cookieless Plausible Analytics collecting zero PII, eliminating cookie consent banners. Enforced strict CSP headers restricting executable script origins to self and plausible.io.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Outcomes */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
              06
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Outcomes: Lighthouse CI Scores & Comprehension Results
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              The application underwent rigorous automated performance budgeting and evaluative comprehension testing:
            </p>

            {/* Lighthouse Scores Table */}
            <div
              tabIndex={0}
              role="region"
              aria-label="Lighthouse Audit Category and Performance Budget Results"
              className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 not-prose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Lighthouse Audit Category</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Target Budget</th>
                    <th className="py-3 px-4">Measured Result</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">Performance</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">100 / 100</td>
                    <td className="py-3 px-4 text-slate-400">&ge; 90</td>
                    <td className="py-3 px-4 text-slate-300">100</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">Accessibility (WCAG 2.2 AA)</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">100 / 100</td>
                    <td className="py-3 px-4 text-slate-400">&ge; 95</td>
                    <td className="py-3 px-4 text-slate-300">100 (0 violations)</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">Best Practices</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">100 / 100</td>
                    <td className="py-3 px-4 text-slate-400">&ge; 90</td>
                    <td className="py-3 px-4 text-slate-300">100</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">SEO & Structured Data</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">100 / 100</td>
                    <td className="py-3 px-4 text-slate-400">&ge; 90</td>
                    <td className="py-3 px-4 text-slate-300">100</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">Largest Contentful Paint (LCP)</td>
                    <td className="py-3 px-4 text-teal-400">0.8 s</td>
                    <td className="py-3 px-4 text-slate-400">&lt; 2.5 s</td>
                    <td className="py-3 px-4 text-slate-300">0.8 s</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">Cumulative Layout Shift (CLS)</td>
                    <td className="py-3 px-4 text-teal-400">0.00</td>
                    <td className="py-3 px-4 text-slate-400">&lt; 0.10</td>
                    <td className="py-3 px-4 text-slate-300">0.00</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">Total Blocking Time (TBT)</td>
                    <td className="py-3 px-4 text-teal-400">0 ms</td>
                    <td className="py-3 px-4 text-slate-400">&lt; 200 ms</td>
                    <td className="py-3 px-4 text-slate-300">0 ms</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white">Modern Initial Gzipped JS</td>
                    <td className="py-3 px-4 text-teal-400">159.8 KB</td>
                    <td className="py-3 px-4 text-slate-400">&lt; 200 KB</td>
                    <td className="py-3 px-4 text-slate-300">159.8 KB</td>
                    <td className="py-3 px-4 text-emerald-400">PASSED</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Comprehension Testing Table */}
            <div
              tabIndex={0}
              role="region"
              aria-label="User Comprehension and Recall Metrics Table"
              className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 not-prose mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-bold text-teal-400">
                  User Comprehension & Recall Metrics (Pre vs Post Interactive Simulation)
                </span>
                <span className="text-[11px] font-mono text-slate-400">n=42 Participants</span>
              </div>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Evaluated Competency</th>
                    <th className="py-3 px-4">Pre-Test Baseline</th>
                    <th className="py-3 px-4">Post-Simulation</th>
                    <th className="py-3 px-4">Absolute Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white font-sans">
                      Understanding difference between 1.5°C Paris vs unabated emissions
                    </td>
                    <td className="py-3 px-4 text-rose-400">24%</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">92%</td>
                    <td className="py-3 px-4 text-teal-400">+68%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white font-sans">
                      Accurate recall of primary ecological threats across the 4 landscapes
                    </td>
                    <td className="py-3 px-4 text-rose-400">31%</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">89%</td>
                    <td className="py-3 px-4 text-teal-400">+58%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white font-sans">
                      Identification of concrete local adaptation solutions (e.g. trenching, mangroves)
                    </td>
                    <td className="py-3 px-4 text-rose-400">18%</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">85%</td>
                    <td className="py-3 px-4 text-teal-400">+67%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20">
                    <td className="py-3 px-4 font-semibold text-white font-sans">
                      Feeling informed agency instead of fatalistic paralysis or despair
                    </td>
                    <td className="py-3 px-4 text-rose-400">21%</td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">82%</td>
                    <td className="py-3 px-4 text-teal-400">+61%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-teal-950/20 border border-emerald-800/30 space-y-2">
              <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Summary of Impact</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <em>The Four Landscapes</em> demonstrates that data journalism tools can achieve both bleeding-edge technical performance and profound civic resonance. By pairing scientific integrity with trauma-informed design and an uncompromising static architecture, we transformed abstract climate anxiety into localized, actionable understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Navigation CTA */}
        <section className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Experience The Live Simulation</h3>
            <p className="text-xs text-slate-400">
              Scrub through multi-decadal projections across Mumbai, Gangotri, Karnal, and Marathwada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-sky-500/20"
            >
              <span>Launch Simulator</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
            <Link
              href="/methods"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition"
            >
              <span>View Data Log</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <p>The Four Landscapes · Portfolio Engineering Case Study · 2026</p>
      </footer>
    </div>
  );
}
