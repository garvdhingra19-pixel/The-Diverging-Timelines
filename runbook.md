# Four Landscapes: Operational Runbook & Maintenance Guide

This runbook defines the exact operational procedures, engineering workflows, and quality assurance gates required to maintain, update, and deploy the **Four Landscapes** climate visualization platform.

---

## Table of Contents
1. [Architecture Overview & Repository Layout](#1-architecture-overview--repository-layout)
2. [Updating Climate Science Data](#2-updating-climate-science-data)
3. [Updating Landscape Content JSONs](#3-updating-landscape-content-jsons)
4. [Updating Hero Images & Visual Assets](#4-updating-hero-images--visual-assets)
5. [Updating the Sources & Citation Log](#5-updating-the-sources--citation-log)
6. [Local Testing & Quality Assurance Gates](#6-local-testing--quality-assurance-gates)
7. [GitHub Repository & Protected Main Branch Setup](#7-github-repository--protected-main-branch-setup)
8. [Deploying to Cloudflare Pages & Netlify (Custom Domain & HTTPS)](#8-deploying-to-cloudflare-pages--netlify-custom-domain--https)

---

## 1. Architecture Overview & Repository Layout

The project follows a **zero-server static-first architecture** designed to eliminate runtime database dependencies, avoid Vercel Hobby commercial portfolio limitations, and achieve sub-second TTFB on global CDNs.

```
/
├── app/                      # Next.js App Router (page.tsx, /methods, /case-study, sitemap.ts)
├── components/               # Accessible React 19 UI components (Scene, Hotspot, YearSlider, etc.)
├── content/                  # Zod validation schema and landscape JSON datasets
│   ├── landscapes/           # mumbai.json, gangotri.json, karnal.json, marathwada.json
│   ├── schema.ts             # Zod validation contract for all landscape content
│   ├── sources.json          # Complete scientific DOI citations & image honesty logs
│   └── validate.ts           # Build-time JSON dataset validation script
├── data-pipeline/            # Offline Python ETL scripts and Jupyter notebooks
│   ├── etl/                  # nex_gddp_cmip6.py, process_climate_data.py
│   └── requirements.txt      # Python dependencies (xarray, pandas, netCDF4)
├── public/                   # Static assets, hero images, and edge headers
│   ├── img/                  # Optimized WebP/AVIF hero photographs (<150 KB)
│   ├── _headers              # Edge security headers & caching for Cloudflare Pages
│   └── _redirects            # Static redirect mappings
├── scripts/                  # Performance budget & validation scripts (check-budgets.cjs)
├── tests/                    # Automated testing suite
│   ├── a11y/                 # Axe WCAG 2.2 AA accessibility test specifications
│   ├── e2e/                  # Playwright end-to-end user flow specifications
│   └── unit/                 # Vitest math, schema, and token unit tests
├── .github/workflows/ci.yml  # GitHub Actions PR & branch protection pipeline
├── .lighthouserc.json        # Lighthouse CI performance & accessibility budget gates
├── netlify.toml              # Netlify static deployment configuration
└── wrangler.toml             # Cloudflare Pages deployment configuration
```

---

## 2. Updating Climate Science Data

All climate projections are pre-computed offline via Python into zero-runtime JSON micro-datasets. Raw NetCDF arrays are never loaded into the client browser.

### Prerequisites
- Python 3.10+
- Virtual environment with scientific libraries:
  ```bash
  python -m venv .venv
  source .venv/bin/activate  # On Windows: .venv\Scripts\activate
  pip install -r data-pipeline/requirements.txt
  ```

### Step-by-Step Data Extraction

1. **Obtain Raw Earth Observation Datasets**:
   - **NASA NEX-GDDP-CMIP6**: Download daily downscaled `pr` (precipitation), `tasmax` (max temperature), and `tasmin` (min temperature) for the target coordinate bounding box (0.25° grid) under scenarios `ssp585` (Carry On) and `ssp126` or `ssp245` (Protect It).
   - **NASA Sea Level Projection Tool (IPCC AR6)**: Download tide-gauge decadal sea level projections for the Mumbai coordinate (`18.93°N, 72.83°E`).
   - **Central Ground Water Board (CGWB)**: Ingest seasonal water level logs for Karnal district from the latest *Dynamic Ground Water Resources of India* report.
   - **Watershed Organisation Trust (WOTR)**: Ingest soil retention and aquifer recharge coefficients for Marathwada rain-shadow micro-watersheds.

2. **Execute the Offline ETL Pipeline**:
   ```bash
   python data-pipeline/scripts/process_climate_data.py \
     --dataset nex-gddp-cmip6 \
     --scenarios ssp585,ssp126 \
     --output-dir content/landscapes/
   ```

3. **Verify Extracted Output**:
   Ensure generated values conform to decadal baseline intervals:
   - Projections span `2025` through `2100` in 5-year or 10-year increments.
   - Values include both `carryOn` and `protect` numerical series.

---

## 3. Updating Landscape Content JSONs

Every landscape file in `content/landscapes/<place>.json` must strictly conform to the Zod schema defined in `content/schema.ts`.

### Strict Schema Rules
1. **Coordinates**: `[longitude, latitude]` array of numbers.
2. **Scenarios**: Must supply full copy for both `carryOn` and `protect`, including:
   - `name`: Human-readable label.
   - `tagline`: Concise policy summary.
   - `temperatureAnomaly`: Temperature deviation at 2100 in °C.
   - `description`: 2-3 paragraph plain-language narrative.
3. **Stats**: Minimum 2 and maximum 4 key metrics, each defining:
   - `id`, `label`, `unit`, `baseline2025`
   - `carryOn2050`, `carryOn2100`, `protect2050`, `protect2100`
   - `description`: Contextual explanation.
4. **Hotspots**: Minimum 3 interactive markers defining:
   - `id`, `title`, `description`, `category`
   - `x`, `y`: Relative coordinate percentages (0 to 100) on the hero photograph.
   - `impactCarryOn` & `impactProtect`: Plain-verb statements of impact.
5. **Editorial Dignity Compliance (The Marathwada Rule)**:
   - Never use sensationalized language depicting agrarian poverty or despair voyeurism.
   - Always pair disruptions with concrete community-scale adaptation (water budgets, contour trenching, decentralized agro-forestry).

### Validating Content
Run the automated Zod validation script before committing:
```bash
npm run validate
```
If any required field is missing or out of range, the script will exit with code 1 and highlight the exact JSON path and error.

---

## 4. Updating Hero Images & Visual Assets

All landscape hero visuals must be authentic photographs paired with scientific overlays.

### Image Requirements
- **Format**: Modern `WebP` or `AVIF` format (WebP is standard across all targets).
- **File Size Constraint**: Must remain strictly **under 150 KB** (uncompressed images degrade LCP).
- **Dimensions & Aspect Ratio**: 1920×1080px (16:9 widescreen) or 1600×900px, 75-82% quality compression.
- **Directory**: Place files directly into `public/img/<place>.webp`.

### Optimization Command
Use `cwebp` or Node `sharp` to compress raw photographs:
```bash
# Using cwebp CLI
cwebp -q 80 -resize 1920 1080 -metadata none raw_photo.jpg -o public/img/mumbai.webp

# Verify file size is strictly under 150 KB
ls -lh public/img/mumbai.webp
```

### Visual Honesty Demarcation
Every photograph displayed in the application is explicitly accompanied by the persistent badge:
> `Photograph + Data-based flood projection`

Projections (water inundation lines, glacier retreat masks, soil retention contours) are rendered as layered CSS/SVG visual overlays—never burned into the source image as AI hallucinations.

---

## 5. Updating the Sources & Citation Log

Whenever a new dataset, paper, or image asset is added, update `content/sources.json`:

1. **Add to `sources` Array**:
   ```json
   {
     "id": "unique-slug",
     "dataset": "Official Dataset Name",
     "institution": "Publishing Agency / University",
     "peerReviewedPaper": "Title of Primary Research Paper",
     "authors": "Author List",
     "year": 2024,
     "doi": "10.xxxx/yyyy",
     "url": "https://doi.org/10.xxxx/yyyy",
     "license": "Open Data Commons / CC BY 4.0",
     "coverage": "Spatial & Temporal Coverage",
     "usedInLandscape": ["mumbai"]
   }
   ```
2. **Add to `imageAssets` Array**:
   ```json
   {
     "id": "place-hero",
     "landscape": "Landscape Name",
     "file": "/img/place.webp",
     "format": "WebP",
     "sizeKb": 128,
     "photographer": "Source Credit",
     "license": "Creative Commons / Editorial Use",
     "honestyNote": "Photograph + Data-based flood projection"
   }
   ```
3. Test that the Methods page renders properly:
   Visit `http://localhost:3000/methods` to verify search filtering and DOI link rendering.

---

## 6. Local Testing & Quality Assurance Gates

Before pushing code or opening a pull request, execute the comprehensive quality gate sequence:

```bash
# 1. Validate content datasets against Zod schema
npm run validate

# 2. Verify TypeScript types
npm run type-check

# 3. Run ESLint static analysis
npm run lint

# 4. Run Vitest unit tests (schema, math interpolation, URL state, tokens)
npm test

# 5. Build static export bundle
npm run build

# 6. Verify initial JavaScript performance budget (< 200 KB gzipped)
npm run check-budgets

# 7. Run Playwright End-to-End user flows (Desktop & Mobile Chrome)
npm run test:e2e

# 8. Run Axe WCAG 2.2 AA accessibility audit
npm run test:a11y
```

All 8 checks must exit with code 0.

---

## 7. GitHub Repository & Protected Main Branch Setup

To enforce quality and prevent broken code or unauthorized credential leaks from reaching production, configure branch protection on the `main` branch.

### Enabling Branch Protection via GitHub UI
1. Navigate to your repository on GitHub: `Settings` &rarr; `Branches`.
2. Click **Add branch protection rule** (or create a **Ruleset**).
3. Set **Branch name pattern** to `main`.
4. Check the following protection settings:
   - &check; **Require a pull request before merging**
     - Require approvals: `1`
     - Dismiss stale pull request approvals when new commits are pushed: `Checked`
   - &check; **Require status checks to pass before merging**
     - Require branches to be up to date before merging: `Checked`
     - Select status checks:
       - `secret-scan` (🔒 Gitleaks Secret Scanning)
       - `qa-and-test-gates` (🧪 Type-Check, Lint, Tests, Axe & Budgets)
   - &check; **Require conversation resolution before merging**
   - &check; **Do not allow bypassing the above settings**

### Enabling Branch Protection via GitHub CLI
Run this command from your terminal:
```bash
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  /repos/:owner/:repo/branches/main/protection \
  -f required_status_checks='{"strict":true,"contexts":["secret-scan","qa-and-test-gates"]}' \
  -F enforce_admins=true \
  -F required_pull_request_reviews='{"dismiss_stale_reviews":true,"require_code_owner_reviews":false,"required_approving_review_count":1}' \
  -F restrictions=null
```

---

## 8. Deploying to Cloudflare Pages & Netlify (Custom Domain & HTTPS)

To avoid Vercel Hobby tier restrictions on commercial portfolio and organizational use, the application is pre-configured for **Cloudflare Pages** and **Netlify**. Both provide free unlimited bandwidth, automated HTTPS, global edge caching, and custom domain mapping.

### Option A: Cloudflare Pages Deployment (Recommended)

Cloudflare Pages provides zero-cold-start edge distribution with unlimited bandwidth.

1. **Dashboard Setup**:
   - Log into the [Cloudflare Dashboard](https://dash.cloudflare.com) &rarr; **Workers & Pages** &rarr; **Create Application** &rarr; **Pages** &rarr; **Connect to Git**.
   - Select the `global-warming` repository.
2. **Build Settings**:
   - **Framework Preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/`
   - **Environment Variables**:
     - `NODE_VERSION`: `20`
3. **Custom Domain & HTTPS**:
   - In Pages project &rarr; **Custom domains** &rarr; **Set up a custom domain**.
   - Enter your domain (e.g., `fourlandscapes.climate` or `landscapes.yourdomain.com`).
   - Cloudflare automatically provisions a Universal SSL/TLS certificate with HTTP/3 support and zero manual certificate renewals.
4. **Edge Headers & Caching**:
   - Cloudflare automatically applies the rules defined in `public/_headers` (replicated to `out/_headers`), enforcing strict Content-Security-Policy headers and 1-year immutable caching on static chunks.

### Option B: Netlify Deployment

1. **Dashboard Setup**:
   - Log into [Netlify](https://app.netlify.com) &rarr; **Add new site** &rarr; **Import an existing project**.
   - Select GitHub and choose your repository.
2. **Build Settings**:
   - The settings are automatically read from `netlify.toml`:
     - Publish directory: `out`
     - Build command: `npm run build`
3. **Custom Domain & HTTPS**:
   - Navigate to **Site configuration** &rarr; **Domain management** &rarr; **Custom domains**.
   - Add your custom domain.
   - Point your DNS CNAME record to `<your-site-name>.netlify.app`.
   - Under **HTTPS**, Netlify automatically issues a Let's Encrypt SSL/TLS certificate.
4. **Header Verification**:
   - `netlify.toml` automatically applies strict CSP, X-Frame-Options, X-Content-Type-Options, and immutable asset caching.

---

## 9. Incident Response & Emergency Procedures

- **Failed Secret Scan**: If Gitleaks flags a committed credential, invalidate the secret immediately, rotate credentials, and scrub Git history using `git-filter-repo` before force-pushing to a feature branch.
- **Exceeded Performance Budget**: If `npm run check-budgets` fails (> 200 KB JS), inspect new npm dependencies using `@next/bundle-analyzer` and verify that heavy dynamic modules (like `maplibre-gl`) use `dynamic(() => import(...), { ssr: false })` and types are imported via `import type`.
- **Accessibility Regressions**: If Axe flags an accessibility violation, check contrast ratios (minimum 4.5:1 against slate-950) and verify that all interactive controls have a minimum touch target of 44×44px.
