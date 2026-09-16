import { Compare } from "~/components/landing/compare";
import { FaqSection } from "~/components/landing/faq-section";
import { FinalCta } from "~/components/landing/final-cta";
import { SiteFooter } from "~/components/landing/footer";
import { SiteHeader } from "~/components/landing/header";
import { Hero } from "~/components/landing/hero";
import { HowItWorks } from "~/components/landing/how-it-works";
import { MercadoPago } from "~/components/landing/mercado-pago";
import { ReceiveRail } from "~/components/landing/receive-rail";
import { Roadmap } from "~/components/landing/roadmap";
import { Scenarios } from "~/components/landing/scenarios";
import { Team } from "~/components/landing/team";
import { Trust } from "~/components/landing/trust";
import { WhatsAppFlow } from "~/components/landing/whatsapp-flow";
import { WhySenda } from "~/components/landing/why-senda";

export function LandingPage() {
  return (
    <>
      <a
        href="#main"
        className="focus:bg-cream focus:text-forest sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:px-3 focus:py-2"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ReceiveRail />
        <HowItWorks />
        <WhySenda />
        <WhatsAppFlow />
        <Scenarios />
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
