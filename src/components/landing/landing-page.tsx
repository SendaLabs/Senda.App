import { Compare } from "~/components/landing/compare";
import { FaqSection } from "~/components/landing/faq-section";
import { FinalCta } from "~/components/landing/final-cta";
import { SiteFooter } from "~/components/landing/footer";
import { SiteHeader } from "~/components/landing/header";
import { Hero } from "~/components/landing/hero";
import { HowItWorks } from "~/components/landing/how-it-works";
import { MercadoPago } from "~/components/landing/mercado-pago";
import { PromoBar } from "~/components/landing/promo-bar";
import { ReceiveRail } from "~/components/landing/receive-rail";
import { Roadmap } from "~/components/landing/roadmap";
import { Team } from "~/components/landing/team";
import { Trust } from "~/components/landing/trust";
import { WhatsAppFlow } from "~/components/landing/whatsapp-flow";
import { WhySenda } from "~/components/landing/why-senda";

export function LandingPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-cream focus:px-3 focus:py-2 focus:text-forest"
      >
        Saltar al contenido
      </a>
      <PromoBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <ReceiveRail />
        <HowItWorks />
        <WhySenda />
        <WhatsAppFlow />
        <Compare />
        <Trust />
        <MercadoPago />
        <Roadmap />
        <Team />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
