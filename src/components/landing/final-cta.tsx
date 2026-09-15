import { Shell } from "~/components/landing/shell";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

export function FinalCta() {
  return (
    <section id="empezar" className="bg-forest py-24 text-cream md:py-32">
      <Shell className="max-w-3xl">
        <h2 className="editorial-display text-4xl md:text-6xl">
          Escribile a Senda
        </h2>
        <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-cream/85">
          Estamos en piloto. Contanos desde dónde mandás y a qué alias llega.
          Te respondemos por mail y armamos el envío por WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="cream" size="cta" asChild>
            <a href={site.mailto}>Escribir a Senda</a>
          </Button>
          <Button variant="ghostForest" size="cta" asChild>
            <a href={site.howHref}>Ver los pasos</a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-cream/70">{site.email}</p>
      </Shell>
    </section>
  );
}
