import { getTranslations } from "next-intl/server";

import { BusinessGlobe } from "~/components/business/globe";
import { BusinessHero } from "~/components/business/hero";
import { SiteFooter } from "~/components/landing/footer";
import { SiteHeader } from "~/components/landing/header";

export async function BusinessPage() {
  const t = await getTranslations("business.a11y");

  return (
    <>
      <a
        href="#main"
        className="focus-visible:bg-cream focus-visible:text-forest sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[80] focus-visible:px-3 focus-visible:py-2"
      >
        {t("skip")}
      </a>
      <SiteHeader />
      <main id="main">
        <BusinessHero />
        <BusinessGlobe />
      </main>
      <SiteFooter />
    </>
  );
}
