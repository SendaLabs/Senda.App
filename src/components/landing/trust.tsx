import { getTranslations } from "next-intl/server";

import { ForestShapes } from "~/components/21st/elegant-shape";
import { Shell } from "~/components/landing/shell";

export async function Trust() {
  const t = await getTranslations("trust");

  return (
    <section
      id="confianza"
      className="relative isolate overflow-hidden bg-forest py-24 text-cream md:py-32"
    >
      <ForestShapes />
      <Shell className="relative z-10">
        <h2 className="editorial-display max-w-[16ch] text-4xl md:text-6xl">
          {t("title")}
        </h2>
        <p className="hero-impact-line mt-8 max-w-[22ch] text-3xl text-cream md:text-4xl">
          {t("line")}
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <p className="max-w-[60ch] text-lg leading-relaxed text-cream/85">
            {t("left")}
          </p>
          <p className="max-w-[60ch] text-lg leading-relaxed text-cream/85">
            {t("right")}
          </p>
        </div>
      </Shell>
    </section>
  );
}
