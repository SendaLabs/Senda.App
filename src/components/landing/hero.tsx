import { getTranslations } from "next-intl/server";
import { Globe2 } from "lucide-react";
import Image from "next/image";

import { ForestShapes } from "~/components/21st/elegant-shape";
import { QuoteCard } from "~/components/landing/quote-card";
import { Shell } from "~/components/landing/shell";
import { StartCtaLink } from "~/components/landing/start-cta-link";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="top"
      className="bg-forest text-cream relative isolate -mt-[4.5rem] min-h-[92dvh] overflow-hidden pt-[4.5rem]"
    >
      <ForestShapes />
      <Image
        src="/images/TEST.png"
        alt=""
        width={1600}
        height={900}
        priority
        className="pointer-events-none absolute top-24 -right-16 z-[1] w-[72%] max-w-4xl opacity-80 motion-safe:animate-[senda-path_1.1s_cubic-bezier(.22,1,.36,1)_both] md:top-16 md:right-0 md:w-[58%]"
      />
      <div className="from-forest via-forest/92 to-forest/55 absolute inset-0 z-[2] bg-gradient-to-r" />

      <Shell className="relative z-10 grid min-h-[92dvh] items-center gap-10 py-8 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-12">
        <div className="motion-safe:animate-[senda-rise_0.9s_cubic-bezier(.22,1,.36,1)_both]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dce5dc] bg-[#f5f7f3] px-3 py-1.5 text-xs font-medium text-forest shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
            <Globe2 className="size-3.5 text-[#157b5b]" strokeWidth={2.2} aria-hidden />
            {t("badge")}
          </div>
          <h1 className="editorial-display text-cream max-w-[12ch] text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="hero-impact-line text-cream mt-3 max-w-[18ch] text-2xl md:text-3xl lg:text-4xl">
            {t("line")}
          </p>
          <p className="text-cream/85 mt-5 max-w-[36ch] text-base leading-relaxed md:text-lg">
            {t("sub")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="cream" size="cta" asChild>
              <StartCtaLink>{t("start")}</StartCtaLink>
            </Button>
            <Button variant="ghostForest" size="cta" asChild>
              <a href={site.howHref}>{t("how")}</a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="relative z-10">
            <QuoteCard />
          </div>
        </div>
      </Shell>
    </section>
  );
}
