import { MessageCircle, Banknote, CircleCheck } from "lucide-react";

import { Shell } from "~/components/landing/shell";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

const steps = [
  {
    n: "1",
    title: "Escribile a Senda por WhatsApp",
    body: "No hace falta bajar otra app. El chat es el producto.",
    icon: MessageCircle,
  },
  {
    n: "2",
    title: "Decí a quién y cuánto",
    body: "Alias o CVU de Mercado Pago, el monto, y listo.",
    icon: Banknote,
  },
  {
    n: "3",
    title: "Confirmá. Ellos ven los pesos.",
    body: "El recibo vuelve al mismo chat. La familia cobra como siempre.",
    icon: CircleCheck,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-cream py-20 md:py-28">
      <Shell>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="editorial-display max-w-[16ch] text-4xl text-forest md:text-5xl">
            Recibí remesas en tres pasos
          </h2>
          <Button variant="senda" size="cta" asChild className="self-start">
            <a href={site.startHref}>Empezar envío</a>
          </Button>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <li key={step.n} className="max-w-[40ch]">
              <step.icon className="size-6 text-forest" aria-hidden />
              <p className="mt-5 text-sm tabular-nums text-forest/70">
                {step.n}
              </p>
              <h3 className="mt-2 text-xl text-forest">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal/80">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
