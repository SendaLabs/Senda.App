import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ForestShapes } from "~/components/21st/elegant-shape";
import { SiteFooter } from "~/components/landing/footer";
import { Shell } from "~/components/landing/shell";
import { CorridorBeam } from "~/components/waitlist/corridor-beam";
import { WaitlistJoinForm } from "~/components/waitlist/waitlist-join-form";
import { Link } from "~/i18n/navigation";
import { routing } from "~/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: "Senda" };
  }
  const t = await getTranslations({ locale, namespace: "waitlist.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function WaitlistPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("waitlist");
  const pillars = t.raw("pillars.items") as {
    title: string;
    copy: string;
  }[];

  return (
    <>
      <a
        href="#waitlist-form"
        className="bg-forest text-cream focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-3 focus:py-2 sr-only focus:not-sr-only focus:rounded-lg"
      >
        {t("a11y.skipForm")}
      </a>

      <header className="border-stone/70 sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
          <Link href="/" className="shrink-0" aria-label={t("nav.home")}>
            <Image
              src="/images/logoverde.png"
              alt="Senda"
              width={430}
              height={101}
              className="h-8 w-auto"
              sizes="160px"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-forest text-sm underline-offset-4 hover:underline"
          >
            {t("nav.back")}
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-forest text-cream relative isolate overflow-hidden">
          <ForestShapes />
          <div className="from-forest via-forest/90 to-forest/60 absolute inset-0 z-[2] bg-gradient-to-b" />
          <Shell className="relative z-10 py-16 md:py-24">
            <h1 className="editorial-display text-cream max-w-[16ch] text-4xl md:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="hero-impact-line text-cream mt-4 max-w-[22ch] text-2xl md:text-3xl lg:text-4xl">
              {t("hero.line")}
            </p>
            <p className="text-cream/85 mt-6 max-w-[42ch] text-base leading-relaxed md:text-lg">
              {t("hero.sub")}
            </p>
          </Shell>
        </section>

        <section className="bg-cream-deep py-14 md:py-16">
          <Shell>
            <h2 className="editorial-display text-forest max-w-[18ch] text-3xl md:text-4xl">
              {t("story.title")}
            </h2>
            <p className="text-charcoal/80 mt-4 max-w-[56ch] text-base leading-relaxed md:text-lg">
              {t("story.lead")}
            </p>
            <div className="mt-10">
              <CorridorBeam
                fromLabel={t("story.from")}
                viaLabel={t("story.via")}
                toLabel={t("story.to")}
                caption={t("story.caption")}
              />
            </div>
          </Shell>
        </section>

        <section id="waitlist-form" className="bg-cream scroll-mt-24">
          <WaitlistJoinForm variant="hero" />
        </section>

        <section className="bg-white py-16 md:py-20">
          <Shell>
            <h2 className="editorial-display text-forest max-w-[16ch] text-3xl md:text-4xl">
              {t("pillars.title")}
            </h2>
            <p className="text-charcoal/80 mt-4 max-w-[52ch] text-base leading-relaxed md:text-lg">
              {t("pillars.lead")}
            </p>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {pillars.map((item) => (
                <li
                  key={item.title}
                  className="border-stone/80 rounded-2xl border bg-cream/50 px-5 py-6"
                >
                  <h3 className="text-forest text-lg font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/80 mt-3 text-sm leading-relaxed md:text-base">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ul>
          </Shell>
        </section>

        <section className="bg-cream-deep py-16 md:py-20">
          <Shell className="max-w-3xl">
            <h2 className="editorial-display text-forest text-3xl md:text-4xl">
              {t("roadmap.title")}
            </h2>
            <p className="text-charcoal/80 mt-4 text-base leading-relaxed md:text-lg">
              {t("roadmap.copy")}
            </p>
          </Shell>
        </section>

        <WaitlistJoinForm variant="band" />
      </main>

      <SiteFooter />
    </>
  );
}
