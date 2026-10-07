import { getLocale, getTranslations } from "next-intl/server";

import { BusinessGlobeStage } from "~/components/business/globe-stage";
import { Shell } from "~/components/landing/shell";
import { Button } from "~/components/ui/button";
import { getBusinessMailto } from "~/lib/site";

export async function BusinessGlobe() {
  const t = await getTranslations("business.globe");
  const locale = await getLocale();

  return (
    <section id="mundo" className="bg-white text-charcoal">
      <Shell className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24">
        <BusinessGlobeStage label={t("stageLabel")} />

        <div className="max-w-xl lg:justify-self-end">
          <h2 className="text-forest max-w-[14ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] md:text-5xl lg:text-[3.35rem]">
            {t("title")}
          </h2>
          <p className="text-charcoal/70 mt-6 max-w-[42ch] text-base leading-relaxed md:text-lg">
            {t("sub")}
          </p>
          <Button variant="senda" size="cta" asChild className="mt-8">
            <a href={getBusinessMailto(locale)}>{t("cta")}</a>
          </Button>
        </div>
      </Shell>
    </section>
  );
}
