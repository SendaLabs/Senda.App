"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { MeshPhongMaterial } from "three";

import { railArcs } from "~/components/landing/rails-cities";
import { GlobeFrame } from "~/components/landing/rails-globe-frame";

type CountryFeature = {
  type: string;
  geometry: object;
};

const AUTO_ROTATE_SPEED = 1.45;
const RESUME_ROTATE_MS = 2000;

export function RailsGlobeScene() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [ready, setReady] = useState(false);
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const creamMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        color: "#e4eee8",
        emissive: "#c5d9cc",
        shininess: 5,
      }),
    [],
  );

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const update = () => setSize(Math.floor(node.clientWidth));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetch("/globe/countries.geojson")
      .then((res) => res.json())
      .then((data: { features?: CountryFeature[] }) => {
        if (!cancelled) setCountries(data.features ?? []);
      })
      .catch(() => {
        if (!cancelled) setCountries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const globe = globeRef.current;
    if (!globe) return;

    globe.pointOfView({ lat: -18, lng: -42, altitude: 1.8 }, 0);
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    let resumeTimer = 0;
    const pauseRotate = () => {
      controls.autoRotate = false;
      window.clearTimeout(resumeTimer);
    };
    const resumeRotate = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        controls.autoRotate = true;
      }, RESUME_ROTATE_MS);
    };

    controls.addEventListener("start", pauseRotate);
    controls.addEventListener("end", resumeRotate);

    return () => {
      window.clearTimeout(resumeTimer);
      controls.removeEventListener("start", pauseRotate);
      controls.removeEventListener("end", resumeRotate);
    };
  }, [ready]);

  return (
    <GlobeFrame>
      <div ref={wrapRef} className="absolute inset-0 min-w-0">
        {size > 0 ? (
          <Globe
            ref={globeRef}
            width={size}
            height={size}
            animateIn={false}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="/globe/globe-cream.jpg"
            globeMaterial={creamMaterial}
            rendererConfig={{
              antialias: false,
              alpha: true,
              powerPreference: "low-power",
            }}
            showAtmosphere
            atmosphereColor="#2ecc9f"
            atmosphereAltitude={0.15}
            enablePointerInteraction
            hexPolygonsData={countries}
            hexPolygonUseDots
            hexPolygonColor={() => "#123c36"}
            hexPolygonResolution={3}
            hexPolygonMargin={0.15}
            hexPolygonAltitude={0.005}
            hexPolygonsTransitionDuration={0}
            arcsData={railArcs}
            arcColor={() => "#2ecc9f"}
            arcStroke={0.65}
            arcDashLength={0.4}
            arcDashGap={0.75}
            arcDashInitialGap={(arc) =>
              (arc as (typeof railArcs)[number]).gap
            }
            arcDashAnimateTime={2200}
            arcAltitudeAutoScale={0.45}
            onGlobeReady={() => setReady(true)}
          />
        ) : null}
      </div>
    </GlobeFrame>
  );
}
