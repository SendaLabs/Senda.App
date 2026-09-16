import { Banknote, CircleCheck, CreditCard, MessageCircle } from "lucide-react";

import { HowItWorks1 } from "~/components/21st/how-it-works-1";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

const steps = [
  {
    number: "1",
    title: "Escribí en WhatsApp",
    copy: "Iniciá la conversación con Senda.",
    icon: MessageCircle,
  },
  {
    number: "2",
    title: "Elegí qué necesitás",
    copy: "Indicá el monto y a quién querés enviar.",
    icon: Banknote,
  },
  {
    number: "3",
    title: "Confirmá el pago",
    copy: "Seguí las instrucciones y listo.",
    icon: CreditCard,
  },
  {
    number: "4",
    title: "Recibí el envío",
    copy: "Tu familiar recibe pesos en Mercado Pago.",
    icon: CircleCheck,
  },
];

export function HowItWorks() {
  return (
    <HowItWorks1
      id="como-funciona"
      eyebrow="Cómo funciona"
      title="Recibí remesas en cuatro pasos"
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
