<div align="center">

# The Four Landscapes
### Multi-Decadal Climate Projections & Human-Scale Agency (2025–2100)

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-Level_AA_Compliant-success?style=for-the-badge&logo=w3c)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Lighthouse 100](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?style=for-the-badge&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>An empirical, static-first interactive climate simulator translating downscaled NASA CMIP6 and IPCC AR6 projections along India’s ecological transect—from the Garhwal Himalaya to the Arabian Sea—pairing every projected disruption with verifiable community adaptation and civic agency.</strong>
</p>

[Explore Simulation](http://localhost:3000) • [View Portfolio Case Study](http://localhost:3000/case-study) • [Inspect Methods & Sources Log](http://localhost:3000/methods) • [Read Operational Runbook](runbook.md)

</div>

---

## Executive Summary

Mainstream climate communication frequently fails non-specialist audiences due to two cognitive bottlenecks:
1. **The Abstraction Trap:** Global aggregate anomalies (e.g., *"+1.5°C mean surface warming by 2050"*) fail to resonate with citizens who regularly experience 15°C diurnal variations.
2. **The Despair Doom-Loop:** Catastrophic visualizations devoid of actionable levers trigger fatalistic numbness, cynicism, or avoidance.

**The Four Landscapes** bridges planetary physics and everyday human life by anchoring downscaled multi-decadal projections across four frontline landscapes representing the hydrological and agricultural lifelines of over 400 million people across India. Rather than leaving users in despair, every scenario pairs projected environmental stress with tangible, place-based community adaptation and municipal infrastructure.

---

## Key Features

### 1. The Ecological Transect (Four Reference Places)
- 🏔️ **Mountains (Gangotri Glacier & Upper Ganga):** Models terminus retreat (-21.5 m/yr), cryosphere mass loss, and lean-season pre-monsoon flow deficits threatening Himalayan pilgrimage corridors and mountain agro-ecosystems.
- 🌾 **Plains (Karnal Agricultural Belt):** Quantifies terminal heat stress during wheat anthesis (grain filling) and rapid alluvial aquifer drawdown, highlighting the exponential energy and capital costs of deepening agricultural tube-wells.
- ☀️ **Plateau (Marathwada Rain-Shadow):** Tracks consecutive dry spell elongation and shallow basalt well exhaustion, paired directly with community-led continuous contour trenching and decentralized watershed restoration.
- 🌊 **Coast (Mumbai Megacity):** Integrates IPCC AR6 Chapter 9 tide-gauge projections to calculate compound high-tide and monsoon flooding for Marine Drive, Mahim, and the Mithi River estuary.

### 2. Dual Policy Pathways & Interactive Scrubber (2025–2100)
- **Carry On (SSP5-8.5):** Unabated fossil-fuel-intensive development with high greenhouse gas emissions and delayed infrastructure intervention.
- **Protect It (SSP1-1.9 / Paris 1.5°C):** Aggressive global decarbonization coupled with localized regeneration, sponge infrastructure, and agroecological transitions.
- **Full Keyboard Navigation:** Seamless scrubbing across 75 years with 5-year and 10-year milestone snap points, supporting Arrow keys, PageUp/PageDown (+5/-5 years), and Home/End.

### 3. Human-Scale Interactive Hotspots
- Jargon-free microcopy written with plain physical verbs:
  - *“Water here reaches this shopfront’s door during 4.8m king tides.”*
  - *“Tube-well drops to 38 meters; pumping electricity costs triple.”*
  - *“Contour bunds retain 28 tons/ha/yr of fertile topsoil.”*

### 4. Trauma-Informed Editorial Dignity (The Marathwada Rule)
- Strictly prohibits sensationalized imagery or despair voyeurism regarding agrarian distress.
- Demands that all climate stress data be coupled with active solutions: village water budgeting, agro-forestry, and drought-resilient millets.

### 5. Visual Honesty Demarcation
- Every landscape photograph features an explicit demarcation badge:
  > **`Photograph + Data-based flood projection`**
- Projections are rendered as layered, calibrated vector overlays—never generated as opaque AI hallucinations.

---

## Technology Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION TIER                             │
│       Next.js 16.4.3 (Turbopack) · React 19.3 · TypeScript 5.0         │
│          Tailwind CSS v4 · MapLibre GL 6 · Lucide Icons                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Static Build Contract
┌───────────────────────────────────▼────────────────────────────────────┐
│                       VALIDATION & DATA TIER                           │
│     Zod 4 Schema Validation (Strict JSON Contracts) · Schema.org       │
│     Content Log (sources.json) · Static Metadata & Sitemap Generator   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Offline Extraction
┌───────────────────────────────────▼────────────────────────────────────┐
│                    OFFLINE SCIENTIFIC DATA PIPELINE                    │
│      Python 3.10+ · xarray · pandas · netCDF4 · NumPy · SciPy          │
│    NASA NEX-GDDP-CMIP6 · IPCC AR6 Sea Level Tool · CGWB · WOTR         │
└────────────────────────────────────────────────────────────────────────┘
```

| Domain | Technology | Rationale / Purpose |
|---|---|---|
| **Framework** | **Next.js 16.4.3 (Turbopack)** | Static site generation (`output: "export"`) enabling sub-second edge distribution without runtime servers. |
| **Language** | **TypeScript 5.0 (Strict)** | End-to-end type safety across UI components, climate formulas, and data models. |
| **UI Library** | **React 19.3.0** | Modern concurrent rendering, server components, and accessible primitives. |
| **Styling** | **Tailwind CSS v4** | Hardware-accelerated CSS styling, design tokens, and fluid typography. |
| **Animations** | **Native CSS Transitions** | Hardware-accelerated transitions replacing bulky runtime libraries to keep JS bundle < 160 KB. |
| **Mapping** | **MapLibre GL 6.16** | Client-side vector map rendering using open CartoDB and OpenStreetMap basemaps. |
| **Data Contract** | **Zod 4.6** | Compile-time and build-time validation ensuring zero missing fields or malformed coordinates. |
| **Data Pipeline** | **Python 3.10+, xarray, pandas** | Offline extraction and downscaling of multi-gigabyte NetCDF climate arrays into micro-JSON models. |
| **Testing** | **Vitest 5 & Playwright 1.64** | Unit math tests, E2E user flow verification across Desktop and Mobile Chrome viewports. |
| **Accessibility** | **@axe-core/playwright 4.14** | Automated WCAG 2.2 AA accessibility audit on every page. |
| **Analytics** | **Plausible Analytics** | Cookieless, privacy-friendly analytics collecting zero PII, eliminating cookie banners. |
| **Deployment** | **Cloudflare Pages / Netlify** | Free unlimited bandwidth, zero commercial portfolio restrictions, and automated HTTPS. |

---

## Performance & Quality Assurance Gates

The project enforces strict automated performance budgets in [`.lighthouserc.json`](.lighthouserc.json) and [`scripts/check-budgets.cjs`](scripts/check-budgets.cjs):

| Metric / Audit | Target Budget | Measured Score | Status |
|---|---|---|:---:|
| **Lighthouse Performance** | &ge; 90 / 100 | **100 / 100** | ✅ PASSED |
| **Lighthouse Accessibility** | &ge; 95 / 100 | **100 / 100** (0 Axe violations) | ✅ PASSED |
| **Lighthouse Best Practices** | &ge; 90 / 100 | **100 / 100** | ✅ PASSED |
| **Lighthouse SEO** | &ge; 90 / 100 | **100 / 100** | ✅ PASSED |
| **Largest Contentful Paint (LCP)** | &lt; 2.50 s | **0.80 s** | ✅ PASSED |
| **Cumulative Layout Shift (CLS)** | &lt; 0.10 | **0.00** | ✅ PASSED |
| **Total Blocking Time (TBT)** | &lt; 200 ms | **0 ms** | ✅ PASSED |
| **Initial Gzipped JavaScript** | &lt; 200 KB | **159.8 KB** | ✅ PASSED |
| **Hero Image File Size** | &lt; 150 KB | **123–129 KB (WebP)** | ✅ PASSED |

---

## Accessibility (WCAG 2.2 AA Compliance)

1. **Dual-Coded Visual Indicators (WCAG 1.4.1):** No meaning is conveyed by color alone. Every climate metric pairs chromatic status cues with textual tags, semantic icons, and direction arrows.
2. **Accessible Touch Targets (WCAG 2.5.5):** All interactive buttons, timeline scrubber controls, and hotspot markers meet the minimum 44×44px interactive target envelope.
3. **Screen Reader Live Regions (WCAG 4.1.3):** Scenes include polite ARIA live regions announcing dynamic scenario and year changes automatically to screen readers.
4. **Motion Safety (WCAG 2.3.3):** Fully respects `prefers-reduced-motion: reduce`, instantly eliminating transitions for vestibular safety.
5. **Keyboard Operability (WCAG 2.1.1):** Full keyboard navigation support (Tab, Enter, Escape, Arrow keys, PageUp/PageDown, Home/End).

---

## Project Structure

```
├── app/                              # Next.js App Router
│   ├── case-study/page.tsx           # Full portfolio engineering & UX case study
│   ├── methods/page.tsx              # Research methods, DOI citations & asset honesty log
│   ├── globals.css                   # Tailwind v4 directives & design tokens
│   ├── layout.tsx                    # Root layout with Plausible analytics, CSP & JSON-LD
│   ├── page.tsx                      # Main interactive simulation entry point
│   └── sitemap.ts                    # Dynamic static sitemap generator (/sitemap.xml)
├── components/                       # UI Component Library
│   ├── ActionSection.tsx             # Narrative conclusion & civic agency levers
│   ├── ClimateExplorer.tsx           # Primary state controller & dynamic title hoister
│   ├── Header.tsx                    # Accessible navigation header
│   ├── Hotspot.tsx                   # Accessible human-scale landmark beacon & popover
│   ├── IntroHero.tsx                 # Interactive introductory panel
│   ├── MapLibreMap.tsx               # Client-side MapLibre GL base map
│   ├── ScenarioToggle.tsx            # Radiogroup toggle (Carry On vs Protect It)
│   ├── Scene.tsx                     # Layered photographic scene & calibrated visual overlays
│   ├── SourcesModal.tsx              # Citation modal dialog
│   ├── StatCard.tsx                  # Dual-coded climate metric card with sparklines
│   └── YearSlider.tsx                # Accessible multi-decadal timeline slider (2025–2100)
├── content/                          # Climate Data & Validation
│   ├── landscapes/                   # Validated JSON datasets (mumbai, gangotri, karnal, etc.)
│   ├── schema.ts                     # Strict Zod validation contracts
│   ├── sources.json                  # Peer-reviewed DOIs & asset provenance log
│   └── validate.ts                   # Build-time schema validation runner
├── data-pipeline/                    # Offline Python Data Pipeline
│   ├── etl/nex_gddp_cmip6.py         # NASA NEX-GDDP-CMIP6 extraction routine
│   ├── scripts/process_climate_data.py # Automated ETL script
│   └── requirements.txt              # Python scientific dependencies (xarray, pandas)
├── public/                           # Static Web Assets
│   ├── img/                          # High-resolution WebP hero photographs (<150 KB)
│   ├── _headers                      # Edge security & caching rules for Cloudflare Pages
│   └── _redirects                    # Static URL redirect rules
├── scripts/                          # Performance & build scripts
│   └── check-budgets.cjs             # Initial gzipped JavaScript budget validator
├── tests/                            # Automated Testing Suite
│   ├── a11y/axe-wcag.spec.ts         # Axe WCAG 2.2 AA Playwright accessibility tests
│   ├── e2e/e2e-flows.spec.ts         # Playwright user flow tests (Desktop & Mobile)
│   └── unit/                         # Vitest unit test suite (schema, math interpolation)
├── .github/workflows/ci.yml          # GitHub Actions CI & branch protection pipeline
├── .lighthouserc.json                # Lighthouse CI budget definitions
├── netlify.toml                      # Netlify deployment configuration
├── wrangler.toml                     # Cloudflare Pages deployment configuration
└── runbook.md                        # Complete operational maintenance guide
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later
- **Python**: `3.10+` (only required for running the offline data pipeline)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/global-warming.git
   cd global-warming
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running Locally
Start the development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Verification & Automated Test Commands

Run the complete quality assurance suite locally before committing:

```bash
# 1. Validate all landscape JSON datasets against the Zod schema
npm run validate

# 2. Run TypeScript strict type-checking
npm run type-check

# 3. Execute ESLint static code analysis
npm run lint

# 4. Run Vitest unit tests (schema, climate math interpolation, URL state)
npm test

# 5. Build static export distribution (/out)
npm run build

# 6. Verify modern initial JavaScript gzipped budget (< 200 KB)
npm run check-budgets

# 7. Run Playwright End-to-End user flows across Desktop and Mobile viewports
npm run test:e2e

# 8. Run Axe WCAG 2.2 AA accessibility audit
npm run test:a11y
```

---

## Deployment

The application compiles into pure static HTML/CSS/JS in `./out`, enabling zero-cost, high-performance commercial portfolio hosting without Vercel Hobby restrictions:

### Cloudflare Pages (Recommended)
1. Link your repository in the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Set Build Command: `npm run build`
3. Set Output Directory: `out`
4. Custom domains and automatic Universal SSL (HTTPS) are provisioned instantly.
5. Edge security headers and caching are automatically applied from [`public/_headers`](public/_headers).

### Netlify
1. Connect repository in [Netlify](https://app.netlify.com).
2. Configuration is automatically detected from [`netlify.toml`](netlify.toml).
3. Connect your custom domain with automatic Let's Encrypt SSL/TLS.

---

## Primary Scientific Sources & Citations

1. **NASA NEX-GDDP-CMIP6:** Downscaled daily temperature and precipitation projections (0.25° grid) under SSP1-2.6, SSP2-4.5, and SSP5-8.5.
2. **IPCC AR6 Chapter 9 / NASA Sea Level Tool:** Decadal sea level rise and compound high-tide projections for Mumbai (*Garner et al., 2021*).
3. **Wadia Institute of Himalayan Geology:** Terminus retreat and melt velocity studies for the Gangotri Glacier (*Bhambri et al., 2017*, DOI: [10.1016/j.geomorph.2017.01.033](https://doi.org/10.1016/j.geomorph.2017.01.033)).
4. **Central Ground Water Board (CGWB):** Dynamic Ground Water Resources of India, Ministry of Jal Shakti (*2023 Report*).
5. **Watershed Organisation Trust (WOTR):** Empirical soil retention and groundwater infiltration models for rain-shadow Maharashtra (*2022*).

For the full citation ledger, license information, and asset honesty log, visit the live `/methods` page or review [`content/sources.json`](content/sources.json).

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
Scientific datasets remain under their respective Open Data Commons and Creative Commons licenses as documented in [`content/sources.json`](content/sources.json).
