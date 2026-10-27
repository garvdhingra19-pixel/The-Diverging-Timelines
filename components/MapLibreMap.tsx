"use client";

import React, { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { LandscapeContent } from "@/content/schema";
import { ScenarioType } from "@/lib/climate-math";

interface MapLibreMapProps {
  landscape: LandscapeContent;
  year: number;
  scenario: ScenarioType;
}

// Open tiles raster style (OpenStreetMap) - 100% free, no API keys required
const OPEN_TILES_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    "open-raster-tiles": {
      type: "raster",
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: "open-tiles-layer",
      type: "raster",
      source: "open-raster-tiles",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export const MapLibreMap: React.FC<MapLibreMapProps> = ({
  landscape,
  scenario,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const isProtect = scenario === "protect";

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize MapLibre GL map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: OPEN_TILES_STYLE,
      center: [landscape.coordinates.lng, landscape.coordinates.lat],
      zoom: 6.5,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, showZoom: true }),
      "top-right"
    );

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    mapRef.current = map;

    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to new landscape coordinates when landscape changes
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [landscape.coordinates.lng, landscape.coordinates.lat],
      zoom: 6.5,
      essential: true,
      duration: 1800,
    });

    // Clean up existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Main landscape marker
    const el = document.createElement("div");
    el.className = "flex items-center justify-center";
    el.innerHTML = `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${isProtect ? "#10b981" : "#ef4444"};
        border: 3px solid #ffffff;
        box-shadow: 0 0 15px ${isProtect ? "rgba(16,185,129,0.8)" : "rgba(239,68,68,0.8)"};
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: bold;
        font-size: 14px;
      ">
        ★
      </div>
    `;

    const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
      <div style="color: #0f172a; padding: 4px;">
        <strong style="font-size: 13px;">${landscape.name}</strong>
        <p style="font-size: 11px; margin: 4px 0 0 0; color: #475569;">${landscape.region}</p>
      </div>
    `);

    const mainMarker = new maplibregl.Marker({ element: el })
      .setLngLat([landscape.coordinates.lng, landscape.coordinates.lat])
      .setPopup(popup)
      .addTo(mapRef.current);

    markersRef.current.push(mainMarker);

    // Add Hotspot markers slightly offset around the region
    landscape.hotspots.forEach((hs, idx) => {
      const offsetLat = (hs.y - 50) * 0.015;
      const offsetLng = (hs.x - 50) * 0.02;
      const hsLng = landscape.coordinates.lng + offsetLng;
      const hsLat = landscape.coordinates.lat + offsetLat;

      const hsEl = document.createElement("div");
      hsEl.innerHTML = `
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #0f172a;
          border: 2px solid ${isProtect ? "#34d399" : "#fb7185"};
          box-shadow: 0 0 8px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f8fafc;
          font-size: 10px;
          font-weight: bold;
          cursor: pointer;
        ">
          ${idx + 1}
        </div>
      `;

      const hsPopup = new maplibregl.Popup({ offset: 15 }).setHTML(`
        <div style="color: #0f172a; padding: 4px; max-width: 200px;">
          <span style="font-size: 9px; text-transform: uppercase; font-weight: bold; color: #64748b;">${hs.category}</span>
          <div style="font-size: 12px; font-weight: bold; margin-top: 2px;">${hs.title}</div>
          <p style="font-size: 11px; margin-top: 4px; color: #334155;">${hs.description}</p>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: hsEl })
        .setLngLat([hsLng, hsLat])
        .setPopup(hsPopup)
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [landscape, isProtect]);

  return (
    <div className="relative w-full h-full min-h-[360px] md:min-h-[460px] rounded-3xl overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none border border-slate-700/60 rounded-3xl shadow-inner" />
      <div className="absolute bottom-2 left-2 z-10 glass-panel px-3 py-1 rounded-md text-[10px] text-slate-300 font-mono">
        MapLibre GL · OpenStreetMap Base Tiles (Open & Zero-Key)
      </div>
    </div>
  );
};

export default MapLibreMap;
