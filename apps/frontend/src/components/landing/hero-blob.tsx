"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useState } from "react";

import { HeroBlobFallback } from "~/components/landing/hero-blob-fallback";

const HeroBlobScene = dynamic(
  () =>
    import("~/components/landing/hero-blob-scene").then(
      (mod) => mod.HeroBlobScene,
    ),
  { ssr: false, loading: () => <HeroBlobFallback /> },
);

class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <HeroBlobFallback />;
    return this.props.children;
  }
}

export function HeroBlob() {
  const [useScene, setUseScene] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setUseScene(desktop.matches && !motion.matches);
    };

    update();
    desktop.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {useScene ? (
        <WebGLErrorBoundary>
          <HeroBlobScene />
        </WebGLErrorBoundary>
      ) : (
        <HeroBlobFallback />
      )}
    </div>
  );
}
