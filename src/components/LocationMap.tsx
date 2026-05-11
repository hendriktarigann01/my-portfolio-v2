"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const HOME = {
  lat: -6.2329298,
  lng: 107.1418222,
  city: "Cikarang",
  country: "Indonesia"
};

function degToRad(deg: number) { return deg * (Math.PI / 180); }
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLng = degToRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

type GeoData = { city: string; country_name: string; latitude: number; longitude: number; };

export function LocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [geo, setGeo] = useState<GeoData | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationSource, setLocationSource] = useState<"gps" | "ip">("ip");

  // 1. Fetch geo (GPS -> fallback IP)
  useEffect(() => {
    const fetchIP = () => {
      fetch("/api/geo")
        .then((r) => r.json())
        .then((data) => {
          if (data.latitude && !isNaN(data.latitude)) {
            setGeo(data);
            setDistance(getDistanceKm(HOME.lat, HOME.lng, data.latitude, data.longitude));
            setLocationSource("ip");
          }
        })
        .catch(() => null);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const data = {
            city: "Your location",
            country_name: "",
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setGeo(data);
          setDistance(getDistanceKm(HOME.lat, HOME.lng, data.latitude, data.longitude));
          setLocationSource("gps");
        },
        fetchIP,
        { timeout: 5000 }
      );
    } else {
      fetchIP();
    }
  }, []);

  // 2. Init map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
      center: [HOME.lng, HOME.lat],
      zoom: 10,
      interactive: false,
      attributionControl: false,
    });

    return () => { map.current?.remove(); map.current = null; };
  }, []);

  // 3. Render markers + line + zoom out — jalan setelah geo ready
  useEffect(() => {
    if (!geo || isNaN(geo.latitude) || isNaN(geo.longitude)) return;
    if (!map.current) return;
    const m = map.current;

    const onLoad = () => {
      // Home marker
      const homeEl = document.createElement("div");
      homeEl.style.cssText = `
        width: 48px; height: 48px;
        background: url('/illustration/ht-illustration-locs.webp') center/contain no-repeat;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
      `;
      new maplibregl.Marker({ element: homeEl, anchor: "bottom" })
        .setLngLat([HOME.lng, HOME.lat])
        .addTo(m);

      // User marker
      const userEl = document.createElement("div");
      userEl.style.cssText = `
        width: 14px; height: 14px; border-radius: 50%;
        background: rgba(239,209,195,0.6);
        border: 2px solid #efd1c3;
        box-shadow: 0 0 0 4px rgba(239,209,195,0.15);
      `;
      new maplibregl.Marker({ element: userEl })
        .setLngLat([geo.longitude, geo.latitude])
        .addTo(m);

      // Dashed line
      if (!m.getSource("line")) {
        m.addSource("line", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [[HOME.lng, HOME.lat], [geo.longitude, geo.latitude]],
            },
          },
        });
        m.addLayer({
          id: "dashed-line",
          type: "line",
          source: "line",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#efd1c3",
            "line-width": 1.5,
            "line-opacity": 0.5,
            "line-dasharray": [2, 3],
          },
        });
      }

      // Zoom out
      setTimeout(() => {
        m.fitBounds(
          [
            [Math.min(HOME.lng, geo.longitude) - 5, Math.min(HOME.lat, geo.latitude) - 5],
            [Math.max(HOME.lng, geo.longitude) + 5, Math.max(HOME.lat, geo.latitude) + 5],
          ],
          { duration: 2800, essential: true, padding: 80 }
        );
      }, 800);
    };

    if (m.isStyleLoaded()) onLoad();
    else m.on("load", onLoad);
  }, [geo]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ borderRadius: "1.25rem", overflow: "hidden", border: "1px solid rgba(239,209,195,0.1)", aspectRatio: "16/9", position: "relative" }}>
        <style>{`
          .maplibregl-canvas { border-radius: 1.25rem; }
          .maplibregl-ctrl-bottom-left, .maplibregl-ctrl-bottom-right { display: none !important; }
        `}</style>
        <div ref={mapContainer} style={{ width: "100%", height: "100%", minHeight: "220px" }} />
        {!geo && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(1,48,50,0.6)", backdropFilter: "blur(4px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#efd1c3", animation: "pulse 1.2s infinite" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(239,209,195,0.5)" }}>Detecting location...</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "1.125rem 1.375rem", borderRadius: "1rem", background: "rgba(239,209,195,0.04)", border: "1px solid rgba(239,209,195,0.08)" }}>
        {distance !== null && geo ? (
          <>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(239,209,195,0.6)", lineHeight: 1.7, fontWeight: 300 }}>
              I&apos;m based in{" "}
              <span style={{ color: "#efd1c3", fontWeight: 500 }}>{HOME.city}, {HOME.country}</span>
              {" "}— roughly{" "}
              <span style={{ color: "#efd1c3", fontWeight: 600, fontFamily: "var(--font-display)" }}>
                {distance.toLocaleString()} km
              </span>
              {" "}away from{" "}
              <span style={{ color: "#efd1c3", fontWeight: 500 }}>
                {locationSource === "gps" ? "your location" : `${geo.city}, ${geo.country_name}`}
              </span>.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(239,209,195,0.25)", marginTop: "0.375rem", fontWeight: 300 }}>
              {locationSource === "gps"
                ? "Based on your device GPS. Accurate to your exact location."
                : "Based on your IP address. Your actual location may differ."}
            </p>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(239,209,195,0.3)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(239,209,195,0.3)", fontWeight: 300 }}>
              Detecting your location...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}