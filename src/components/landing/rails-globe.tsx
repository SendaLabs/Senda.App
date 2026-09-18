"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { RailsGlobeFallback } from "~/components/landing/rails-globe-fallback";
import { Shell } from "~/components/landing/shell";

const RailsGlobeScene = dynamic(
  () =>
    import("~/components/landing/rails-globe-scene").then(
      (mod) => mod.RailsGlobeScene,
    ),
  { ssr: false, loading: () => <RailsGlobeFallback /> },
);

export function RailsGlobe() {
  const t = useTranslations("rails");
  const [useScene, setUseScene] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseScene(desktop.matches && !motion.matches);
    update();
    desktop.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      id="rieles"
      className="bg-cream scroll-mt-28 overflow-x-clip py-20 md:py-28"
    >
      <Shell className="min-w-0">
        <h2 className="editorial-display mx-auto max-w-[18ch] text-center text-4xl text-forest md:text-5xl">
          {t("title")}
        </h2>
        <p className="text-charcoal/80 mx-auto mt-5 max-w-[42ch] text-center text-lg leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="mt-10 min-w-0">
          {useScene ? <RailsGlobeScene /> : <RailsGlobeFallback />}
        </div>
      </Shell>
    </section>
  );
}
