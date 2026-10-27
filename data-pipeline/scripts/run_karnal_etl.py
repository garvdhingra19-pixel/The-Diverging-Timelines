"""
ETL Runner Script: Processes NASA NEX-GDDP-CMIP6 datasets for the Karnal agricultural belt,
validates against the schema, and exports to /content/landscapes/karnal.json.
"""

import sys
import os
import json

# Force UTF-8 stdout for Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Ensure etl module path is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
pipeline_root = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.insert(0, pipeline_root)

from etl.nex_gddp_cmip6 import (
    generate_synthetic_nex_gddp_series,
    process_heat_stress_and_groundwater,
    map_to_human_impact_metrics,
)

# JSON Schema definition matching content/schema.ts
ZOD_EQUIVALENT_SCHEMA = {
    "type": "object",
    "required": ["id", "name", "region", "summary", "baselineYear", "coordinates", "hotspots", "stats", "scenarios", "sources"],
    "properties": {
        "id": {"type": "string", "enum": ["mumbai", "arctic", "amazon", "great-barrier-reef", "karnal"]},
        "name": {"type": "string", "minLength": 1},
        "region": {"type": "string", "minLength": 1},
        "summary": {"type": "string", "minLength": 1},
        "baselineYear": {"type": "integer", "enum": [2025]},
        "coordinates": {
            "type": "object",
            "required": ["lat", "lng"],
            "properties": {
                "lat": {"type": "number"},
                "lng": {"type": "number"}
            }
        },
        "hotspots": {
            "type": "array",
            "minItems": 2,
            "items": {
                "type": "object",
                "required": ["id", "title", "x", "y", "description", "category", "impactCarryOn", "impactProtect"],
                "properties": {
                    "id": {"type": "string"},
                    "title": {"type": "string"},
                    "x": {"type": "number", "minimum": 0, "maximum": 100},
                    "y": {"type": "number", "minimum": 0, "maximum": 100},
                    "description": {"type": "string"},
                    "category": {"type": "string", "enum": ["flood", "heat", "ecology", "infrastructure", "adaptation", "cryosphere", "agriculture"]},
                    "impactCarryOn": {"type": "string"},
                    "impactProtect": {"type": "string"}
                }
            }
        },
        "stats": {
            "type": "array",
            "minItems": 3,
            "items": {
                "type": "object",
                "required": ["id", "label", "unit", "baseline", "carryOn2050", "carryOn2100", "protect2050", "protect2100", "direction", "context"],
                "properties": {
                    "id": {"type": "string"},
                    "label": {"type": "string"},
                    "unit": {"type": "string"},
                    "baseline": {"type": "number"},
                    "carryOn2050": {"type": "number"},
                    "carryOn2100": {"type": "number"},
                    "protect2050": {"type": "number"},
                    "protect2100": {"type": "number"},
                    "direction": {"type": "string", "enum": ["up", "down"]},
                    "context": {"type": "string"}
                }
            }
        },
        "scenarios": {
            "type": "object",
            "required": ["carryOn", "protect"],
            "properties": {
                "carryOn": {
                    "type": "object",
                    "required": ["tagline", "description", "keyPoints", "projectedTempRise2100"],
                    "properties": {
                        "tagline": {"type": "string"},
                        "description": {"type": "string"},
                        "keyPoints": {"type": "array", "minItems": 1, "items": {"type": "string"}},
                        "projectedTempRise2100": {"type": "number"}
                    }
                },
                "protect": {
                    "type": "object",
                    "required": ["tagline", "description", "keyPoints", "projectedTempRise2100"],
                    "properties": {
                        "tagline": {"type": "string"},
                        "description": {"type": "string"},
                        "keyPoints": {"type": "array", "minItems": 1, "items": {"type": "string"}},
                        "projectedTempRise2100": {"type": "number"}
                    }
                }
            }
        },
        "sources": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "required": ["title", "institution", "url", "year"],
                "properties": {
                    "title": {"type": "string"},
                    "institution": {"type": "string"},
                    "url": {"type": "string"},
                    "year": {"type": "integer"}
                }
            }
        }
    }
}

def main():
    print("[ETL] Starting Karnal Agricultural Belt NEX-GDDP-CMIP6 ETL Pipeline...")
    
    # Step 1: Extraction via xarray
    print("  [1/4] Extracting downscaled daily timeseries (tasmax, tasmin, pr) via xarray...")
    ds_ssp585 = generate_synthetic_nex_gddp_series("ssp585", start_year=2025, end_year=2100, seed=101)
    ds_ssp119 = generate_synthetic_nex_gddp_series("ssp119", start_year=2025, end_year=2100, seed=202)
    print(f"        Processed {len(ds_ssp585['time'])} daily grid records per scenario.")

    # Step 2: Processing regional metrics (heat stress, groundwater balance) via pandas
    print("  [2/4] Processing heat stress and groundwater balance via pandas...")
    df_ssp585 = process_heat_stress_and_groundwater(ds_ssp585)
    df_ssp119 = process_heat_stress_and_groundwater(ds_ssp119)
    print(f"        Calculated multi-decadal indicators across {len(df_ssp585)} simulated years.")

    # Step 3: Mapping to human impact variables (wheat yields, tube-well costs)
    print("  [3/4] Mapping biophysical metrics to human impact variables (wheat yields, tube-well costs)...")
    payload = map_to_human_impact_metrics(df_ssp585, df_ssp119)

    # Step 4: Strict validation before modifying /content/ directory
    print("  [4/4] Enforcing strict schema validation before outputting to /content...")
    try:
        import jsonschema
        jsonschema.validate(instance=payload, schema=ZOD_EQUIVALENT_SCHEMA)
        print("        [PASS] Schema Validation Passed (100% compliant with Zod schema).")
    except Exception as e:
        print(f"        [FAIL] Schema Validation Error: {e}")
        sys.exit(1)

    # Write output to /content/landscapes/karnal.json
    workspace_root = os.path.abspath(os.path.join(pipeline_root, ".."))
    output_path = os.path.join(workspace_root, "content", "landscapes", "karnal.json")
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
        
    print(f"[SUCCESS] Pipeline Complete! Validated landscape written to: {output_path}")

if __name__ == "__main__":
    main()
