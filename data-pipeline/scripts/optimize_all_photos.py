"""
Optimizes hero photographs for Gangotri, Karnal, and Marathwada
to WebP format strictly under 150 KB each.
"""

import os
from PIL import Image

images = [
    (
        r"C:\Users\GARV DHINGRA\.gemini\antigravity-ide\brain\de20798b-57b3-41c0-aeca-2e72a91c5f35\gangotri_himalaya_hero_1793116399549.jpg",
        r"C:\global-warming\public\img\gangotri.webp",
        1100,
        50
    ),
    (
        r"C:\Users\GARV DHINGRA\.gemini\antigravity-ide\brain\de20798b-57b3-41c0-aeca-2e72a91c5f35\karnal_plains_hero_1793116431847.jpg",
        r"C:\global-warming\public\img\karnal.webp",
        1280,
        68
    ),
    (
        r"C:\Users\GARV DHINGRA\.gemini\antigravity-ide\brain\de20798b-57b3-41c0-aeca-2e72a91c5f35\marathwada_watershed_hero_1793116455029.jpg",
        r"C:\global-warming\public\img\marathwada.webp",
        1050,
        48
    ),
]

for src, dest, target_w, qual in images:
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with Image.open(src) as im:
        im = im.resize((target_w, int(target_w * im.height / im.width)), Image.Resampling.LANCZOS)
        im.save(dest, "WEBP", quality=qual, method=6)
    
    size_kb = os.path.getsize(dest) / 1024
    status = "PASS" if size_kb < 150 else "FAIL"
    print(f"Optimized: {os.path.basename(dest)} -> {size_kb:.1f} KB [{status}]")
