import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { HeroBlob } from "~/components/landing/hero-blob";
import { HeroParallax } from "~/components/landing/hero-parallax";
import { QuoteCard } from "~/components/landing/quote-card";
import { Shell } from "~/components/landing/shell";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="top"
      className="bg-forest text-cream relative isolate flex min-h-[100dvh] items-center overflow-x-hidden"
    >
      <HeroBlob />
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden
      >
        <Image
          src="/images/TEST.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-top opacity-80 motion-safe:animate-[senda-path_1.1s_cubic-bezier(.22,1,.36,1)_both]"
        />
      </div>
      <div className="from-forest/70 via-forest/40 to-forest/20 absolute inset-0 z-[2] bg-gradient-to-r" />

      <Shell className="relative z-10 w-full pt-28 pb-16 md:pt-32 md:pb-20">
        <HeroParallax
          copy={
            <div className="motion-safe:animate-[senda-rise_0.9s_cubic-bezier(.22,1,.36,1)_both]">
              <h1 className="editorial-display text-cream max-w-[12ch] text-5xl md:text-6xl lg:text-7xl">
                {t("title")}
              </h1>
              <p className="hero-impact-line text-cream mt-4 max-w-[18ch] text-3xl md:text-4xl lg:text-5xl">
                {t("line")}
              </p>
              <p className="text-cream/85 mt-6 max-w-[36ch] text-lg leading-relaxed">
                {t("sub")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="cream" size="cta" asChild className="min-h-11">
                  <a href={site.startHref}>{t("start")}</a>
                </Button>
                <Button variant="ghostForest" size="cta" asChild className="min-h-11">
                  <a href={site.howHref}>{t("how")}</a>
                </Button>
              </div>
            </div>
          }
          card={<QuoteCard />}
        />
      </Shell>
    </section>
  );
}
