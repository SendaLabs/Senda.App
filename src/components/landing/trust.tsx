import { getTranslations } from "next-intl/server";

import { ForestShapes } from "~/components/21st/elegant-shape";
import { Shell } from "~/components/landing/shell";

export async function Trust() {
  const t = await getTranslations("trust");

  return (
    <section
      id="confianza"
      className="bg-forest text-cream relative isolate overflow-hidden py-20 md:py-24"
    >
      <ForestShapes />
      <Shell className="relative z-10">
        <h2 className="editorial-display max-w-[16ch] text-3xl md:text-5xl">
          {t("title")}
        </h2>
        <p className="hero-impact-line text-cream mt-6 max-w-[22ch] text-2xl md:text-3xl">
          {t("line")}
        </p>
        <div className="mt-9 grid gap-8 md:grid-cols-2">
          <p className="text-cream/85 max-w-[60ch] text-base leading-relaxed md:text-lg">
            {t("left")}
          </p>
          <p className="text-cream/85 max-w-[60ch] text-base leading-relaxed md:text-lg">
            {t("right")}
          </p>
        </div>
      </Shell>
    </section>
  );
}
