import { Banknote, CircleCheck, MessageCircle } from "lucide-react";

import { HowItWorks1 } from "~/components/21st/how-it-works-1";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

const steps = [
  {
    number: "01",
    title: "Escribile a Senda por WhatsApp",
    copy: "No hace falta bajar otra app. El chat es el producto.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Decí a quién y cuánto",
    copy: "Alias o CVU de Mercado Pago, el monto, y listo.",
    icon: Banknote,
  },
  {
    number: "03",
    title: "Confirmá. Ellos ven los pesos.",
    copy: "El recibo vuelve al mismo chat. La familia cobra como siempre.",
    icon: CircleCheck,
  },
];

export function HowItWorks() {
  return (
    <HowItWorks1
      id="como-funciona"
      eyebrow="Cómo funciona"
      title="Recibí remesas en tres pasos"
      description="WhatsApp de un lado. Mercado Pago del otro. Stellar viaja por debajo."
      steps={steps}
      action={
        <Button variant="senda" size="cta" asChild>
          <a href={site.startHref}>Empezar envío</a>
        </Button>
      }
    />
  );
}
