import { Shell } from "~/components/landing/shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const faqs = [
  {
    q: "¿Hace falta bajar una app?",
    a: "No. Escribís por WhatsApp, como si le hablaras a un conocido. El destinatario cobra en Mercado Pago.",
  },
  {
    q: "¿Mi familia necesita cripto o una cuenta en Senda?",
    a: "No. Ellos no tocan Stellar, ni stablecoins, ni una wallet. Ven pesos en Mercado Pago.",
  },
  {
    q: "¿Qué hace Stellar acá?",
    a: "Mueve el valor rápido y barato, por debajo. Es infraestructura. La pantalla es el chat y el crédito en pesos.",
  },
  {
    q: "¿Puedo mandar desde cualquier país?",
    a: "Esa es la idea del producto: cualquiera en el mundo manda a Argentina. El corredor que abrimos primero es ese.",
  },
  {
    q: "¿Cuánto tarda y cuánto sale?",
    a: "La mayoría de los envíos se resuelve en minutos. La comisión se muestra antes de confirmar. En esta página los números son de ejemplo.",
  },
  {
    q: "¿Es para empresas?",
    a: "No. Senda es B2C: una persona manda, otra cobra. Simple a propósito.",
  },
  {
    q: "¿Por qué no alcanza con Western Union o Wise?",
    a: "Cubren el mundo, pero el último tramo argentino sigue siendo fricción: sucursal, app extra, o un destino que no es el que la familia ya usa.",
  },
  {
    q: "¿Van a mandar a otros países?",
    a: "Sí. El mapa es habilitar más destinos con sus rieles locales, no pedirles que aprendan cripto.",
  },
];

export function FaqSection() {
  return (
    <section id="preguntas" className="bg-cream py-20 md:py-28">
      <Shell className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="editorial-display max-w-[12ch] text-4xl text-forest md:text-5xl">
          Preguntas que nos hacen
        </h2>
        <Accordion type="single" collapsible className="border-t border-stone">
          {faqs.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`}>
              <AccordionTrigger className="py-5 text-base text-forest hover:no-underline md:text-lg">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[65ch] pb-5 text-base leading-relaxed text-charcoal/80">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Shell>
    </section>
  );
}
