import { ArrowRight, CreditCard, Globe2, Mail, Shield, Zap } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { BusinessHeroStage } from "~/components/business/hero-stage";
import { Shell } from "~/components/landing/shell";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";
import { getBusinessMailto } from "~/lib/site";

const pillarIcons = [Shield, Zap, CreditCard, Globe2] as const;

export async function BusinessHero() {
  const t = await getTranslations("business.hero");
  const locale = await getLocale();
  const mailto = getBusinessMailto(locale);
  const pillars = t.raw("pillars") as { title: string; copy: string }[];

  return (
    <section id="top" className="relative isolate">
      <div className="relative -mt-[4.5rem] overflow-x-clip bg-[#061f1b] pt-[4.5rem] text-cream">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(28,92,74,0.55),transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden
        />

        <Shell className="relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[32rem_minmax(0,1fr)] lg:gap-4 lg:py-[4.5rem]">
          <div>
            <p className="inline-flex rounded-full border border-white/15 bg-white/8 px-3.5 py-1 text-[0.68rem] tracking-[0.2em] text-white/75 uppercase">
              {t("kicker")}
            </p>
            <h1 className="mt-7 max-w-[13ch] text-[2.6rem] leading-[1.02] font-medium tracking-[-0.04em] text-white md:text-5xl lg:text-[3.55rem]">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/70 md:text-lg">
              {t("sub")}
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-nowrap">
              <Button
                variant="cream"
                size="cta"
                asChild
                className="min-h-11 px-5 text-[0.95rem]"
              >
                <a href={mailto}>
                  <Mail data-icon="inline-start" aria-hidden />
                  {t("start")}
                </a>
              </Button>
              <Button
                variant="ghostForest"
                size="cta"
                asChild
                className="min-h-11 px-5 text-[0.95rem]"
              >
                <Link href="/lista-de-espera">
                  {t("waitlist")}
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          <BusinessHeroStage />
        </Shell>
      </div>

      <div className="bg-white">
        <Shell className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4 lg:gap-8 lg:py-14">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Shield;
            return (
              <div key={pillar.title} className="flex flex-col items-center text-center">
                <span
                  className="mb-3 flex size-10 items-center justify-center rounded-full border border-forest/15 text-forest"
                  aria-hidden
                >
                  <Icon className="size-4" strokeWidth={1.6} />
                </span>
                <h2 className="text-forest text-[1.05rem] font-medium tracking-tight">
                  {pillar.title}
                </h2>
                <p className="text-charcoal/68 mt-1.5 max-w-[28ch] text-sm leading-relaxed">
                  {pillar.copy}
                </p>
              </div>
            );
          })}
        </Shell>
      </div>
    </section>
  );
}
