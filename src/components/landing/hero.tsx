import Image from "next/image";

import { ForestShapes } from "~/components/21st/elegant-shape";
import { QuoteCard } from "~/components/landing/quote-card";
import { Shell } from "~/components/landing/shell";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-forest text-cream relative isolate min-h-[100dvh] overflow-hidden"
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

      <Shell className="relative z-10 grid min-h-[100dvh] items-center gap-10 py-10 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
        <div className="motion-safe:animate-[senda-rise_0.9s_cubic-bezier(.22,1,.36,1)_both]">
          <h1 className="editorial-display text-cream max-w-[12ch] text-5xl md:text-6xl lg:text-7xl">
            Mandá plata a casa.
          </h1>
          <p className="hero-impact-line text-cream mt-4 max-w-[18ch] text-3xl md:text-4xl lg:text-5xl">
            Ellos cobran en Mercado Pago.
          </p>
          <p className="text-cream/85 mt-6 max-w-[36ch] text-lg leading-relaxed">
            Desde cualquier país, por WhatsApp. Sin app nueva.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="cream" size="cta" asChild>
              <a href={site.startHref}>Empezar envío</a>
            </Button>
            <Button variant="ghostForest" size="cta" asChild>
              <a href={site.howHref}>Cómo funciona</a>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md translate-y-6 lg:mx-0 lg:translate-y-12 lg:justify-self-end">
          <QuoteCard />
        </div>
      </Shell>
    </section>
  );
}
