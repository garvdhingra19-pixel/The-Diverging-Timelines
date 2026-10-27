# Scientific Climate Data Pipeline (Offline ETL)

This directory contains the offline Python ETL pipeline, exploratory analysis scripts, and raw source datasets used to synthesize multi-decadal projections (2025–2100) for the Four Landscapes platform.

---

## Architectural Principles
1. **Zero Client Runtime Overhead**: Massive multi-terabyte raw climate arrays (NetCDF4 / HDF5 / GRIB) are processed strictly offline. No raw arrays or dynamic Python computations are delivered to client browsers.
2. **Schema-First Contract**: All pipeline outputs must conform to the Zod schema in `content/schema.ts` before being written to `content/landscapes/*.json`.
3. **Peer-Reviewed Provenance**: Every baseline and projection links to official published datasets (NASA NEX-GDDP-CMIP6, IPCC AR6, Wadia Institute, CGWB, WOTR) and is cataloged in `content/sources.json`.

---

## Directory Layout
```
data-pipeline/
├── etl/
│   ├── nex_gddp_cmip6.py          # xarray & pandas extraction routine for CMIP6 NetCDF files
│   └── sea_level_ipcc_ar6.py      # NASA Sea Level Projection Tool tide-gauge parser
├── scripts/
│   └── process_climate_data.py    # Automated multi-landscape synthesis & interpolation CLI
├── raw/
│   ├── ipcc_ar6_sea_level.csv     # NASA / IPCC AR6 tide gauge projections (Mumbai)
│   └── nex_gddp_sample.nc         # Sample NetCDF CMIP6 file for testing
├── notebooks/                     # Exploratory research notebooks
└── requirements.txt               # Python scientific dependencies
```

---

## Environment Setup & Dependencies

Requires **Python 3.10+**.

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate       # macOS / Linux
# or: .venv\Scripts\activate    # Windows PowerShell

# Install scientific dependencies
pip install -r requirements.txt
```

### Core Libraries
- **`xarray`**: Multi-dimensional raster & NetCDF dataset manipulation.
- **`pandas`** & **`numpy`**: Time-series extraction, rolling averages, and decadal interpolation.
- **`netCDF4`** & **`h5netcdf`**: Low-level binary NetCDF driver backends.
- **`scipy`**: Piecewise cubic Hermite interpolating polynomials (PCHIP) and spline smoothing.

---

## Execution Workflows

### 1. Extracting Daily CMIP6 Temperature & Precipitation
```bash
python etl/nex_gddp_cmip6.py \
  --lat 18.93 --lon 72.83 \
  --scenarios ssp585,ssp126 \
  --variables tasmax,pr \
  --output ../content/landscapes/mumbai.json
```

### 2. Processing Multi-Landscape Batch Synthesis
```bash
python scripts/process_climate_data.py \
  --input-dir raw/ \
  --output-dir ../content/landscapes/
```

### 3. Build-Time Schema Validation Gate
After generating or modifying landscape JSON files, execute the root validation script:
```bash
npm run validate
```
This runs `content/validate.ts` ensuring all coordinates, scenarios, metrics, and hotspots pass strict Zod schema validation.
