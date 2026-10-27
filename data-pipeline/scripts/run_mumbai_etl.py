"""
ETL Runner Script for Mumbai Landscape
Processes NASA Sea Level Projection Tool (IPCC AR6) data for Marine Drive, Mahim, and Mithi River.
Validates against the schema and updates /content/landscapes/mumbai.json.
"""

import sys
import os
import json

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

current_dir = os.path.dirname(os.path.abspath(__file__))
pipeline_root = os.path.abspath(os.path.join(current_dir, ".."))
sys.path.insert(0, pipeline_root)

from etl.mumbai_sea_level import process_mumbai_sea_level_projections
from scripts.run_karnal_etl import ZOD_EQUIVALENT_SCHEMA

def main():
    print("[ETL] Starting Mumbai Coastal & High-Tide Projection Pipeline (NASA IPCC AR6)...")
    
    print("  [1/3] Extracting station sea level rise trajectories for Mumbai (18.92N, 72.83E)...")
    payload = process_mumbai_sea_level_projections()
    print("        Processed projections for Marine Drive, Mahim, and Mithi River mouth.")

    print("  [2/3] Validating synthesized data against Zod-equivalent schema...")
    try:
        import jsonschema
        jsonschema.validate(instance=payload, schema=ZOD_EQUIVALENT_SCHEMA)
        print("        [PASS] Schema Validation Passed.")
    except Exception as e:
        print(f"        [FAIL] Validation Error: {e}")
        sys.exit(1)

    workspace_root = os.path.abspath(os.path.join(pipeline_root, ".."))
    output_path = os.path.join(workspace_root, "content", "landscapes", "mumbai.json")

    print(f"  [3/3] Writing validated Mumbai dataset to {output_path}...")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)

    print("[SUCCESS] Mumbai reference landscape dataset successfully written!")

if __name__ == "__main__":
    main()
