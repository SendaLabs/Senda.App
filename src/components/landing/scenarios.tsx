import { Scenarios1 } from "~/components/21st/scenarios-1";

const scenarios = [
  {
    quote:
      "Escribís desde el celular que ya usás. Tu familia ve pesos en Mercado Pago. Nadie abre una wallet.",
    route: "Madrid → Buenos Aires",
    detail: "Escenario de corredor, no un testimonio",
    initials: "MD",
  },
  {
    quote:
      "Mandás el alias, el monto y confirmás en el chat. El recibo vuelve al mismo hilo.",
    route: "Miami → Córdoba",
    detail: "WhatsApp de ida. Mercado Pago de llegada",
    initials: "MI",
  },
  {
    quote:
      "Stellar mueve el valor en minutos. En la pantalla solo hay plata que ya conocen.",
    route: "Berlín → Rosario",
    detail: "Riel invisible. Destino familiar",
    initials: "BE",
  },
] as const;

export function Scenarios() {
  return (
    <Scenarios1
      eyebrow="Escenarios"
      title="Cualquiera manda a Argentina. Hoy."
      description="No son reseñas de clientes. Son el producto contado en tres corredores típicos."
      items={scenarios}
    />
  );
}
