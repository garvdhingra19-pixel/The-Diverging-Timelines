"""
Optimizes the generated hero photograph of Mumbai to WebP format strictly under 150 KB.
"""

import os
from PIL import Image

src_img = r"C:\Users\GARV DHINGRA\.gemini\antigravity-ide\brain\de20798b-57b3-41c0-aeca-2e72a91c5f35\mumbai_hero_coast_1793115839125.jpg"
workspace = r"C:\global-warming"
dest_webp = os.path.join(workspace, "public", "img", "mumbai.webp")

os.makedirs(os.path.dirname(dest_webp), exist_ok=True)

with Image.open(src_img) as im:
    target_w = 1280
    im = im.resize((target_w, int(target_w * im.height / im.width)), Image.Resampling.LANCZOS)
    im.save(dest_webp, "WEBP", quality=68, method=6)

size_kb = os.path.getsize(dest_webp) / 1024
print(f"Saved optimized Mumbai hero image to {dest_webp}")
print(f"File size: {size_kb:.1f} KB (Target: under 150 KB -> {'PASS' if size_kb < 150 else 'FAIL'})")
