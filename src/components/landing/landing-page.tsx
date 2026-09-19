import { getTranslations } from "next-intl/server";

import { Compare } from "~/components/landing/compare";
import { FaqSection } from "~/components/landing/faq-section";
import { FinalCta } from "~/components/landing/final-cta";
import { SiteFooter } from "~/components/landing/footer";
import { SiteHeader } from "~/components/landing/header";
import { Hero } from "~/components/landing/hero";
import { HowItWorks } from "~/components/landing/how-it-works";
import { ReceiveRail } from "~/components/landing/receive-rail";
import { ScrollReveal } from "~/components/landing/scroll-reveal";
import { Team } from "~/components/landing/team";
import { Trust } from "~/components/landing/trust";
import { WhatsAppFlow } from "~/components/landing/whatsapp-flow";
import { WhySenda } from "~/components/landing/why-senda";

export async function LandingPage() {
  const t = await getTranslations("a11y");

  return (
    <>
      <a
        href="#main"
        className="focus:bg-cream focus:text-forest sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:px-3 focus:py-2"
      >
        {t("skip")}
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ScrollReveal>
          <ReceiveRail />
        </ScrollReveal>
        <HowItWorks />
        <ScrollReveal>
          <WhySenda />
        </ScrollReveal>
        <WhatsAppFlow />
        <ScrollReveal>
          <Compare />
        </ScrollReveal>
        <ScrollReveal>
          <Trust />
        </ScrollReveal>
        <ScrollReveal>
          <Team />
        </ScrollReveal>
        <ScrollReveal>
          <FaqSection />
        </ScrollReveal>
        <ScrollReveal>
          <FinalCta />
        </ScrollReveal>
      </main>
      <ScrollReveal>
        <SiteFooter />
      </ScrollReveal>
    </>
  );
}
