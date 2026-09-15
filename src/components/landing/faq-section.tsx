import { FaqSection as CommunityFaq } from "~/components/21st/faq-section";
import { site } from "~/lib/site";

const faqs = [
  {
    question: "¿Hace falta bajar una app?",
    answer:
      "No. Escribís por WhatsApp, como si le hablaras a un conocido. El destinatario cobra en Mercado Pago.",
  },
  {
    question: "¿Mi familia necesita cripto o una cuenta en Senda?",
    answer:
      "No. Ellos no tocan Stellar, ni stablecoins, ni una wallet. Ven pesos en Mercado Pago.",
  },
  {
    question: "¿Qué hace Stellar acá?",
    answer:
      "Mueve el valor rápido y barato, por debajo. Es infraestructura. La pantalla es el chat y el crédito en pesos.",
  },
  {
    question: "¿Puedo mandar desde cualquier país?",
    answer:
      "Esa es la idea del producto: cualquiera en el mundo manda a Argentina. El corredor que abrimos primero es ese.",
  },
  {
    question: "¿Cuánto tarda y cuánto sale?",
    answer:
      "La mayoría de los envíos se resuelve en minutos. La comisión se muestra antes de confirmar. En esta página los números son de ejemplo.",
  },
  {
    question: "¿Es para empresas?",
    answer:
      "No. Senda es B2C: una persona manda, otra cobra. Simple a propósito.",
  },
  {
    question: "¿Por qué no alcanza con Western Union o Wise?",
    answer:
      "Cubren el mundo, pero el último tramo argentino sigue siendo fricción: sucursal, app extra, o un destino que no es el que la familia ya usa.",
  },
  {
    question: "¿Van a mandar a otros países?",
    answer:
      "Sí. El mapa es habilitar más destinos con sus rieles locales, no pedirles que aprendan cripto.",
  },
];

export function FaqSection() {
  return (
    <CommunityFaq
      id="preguntas"
      title="Preguntas que nos hacen"
      description="Respuestas cortas. El detalle se confirma en el chat."
      items={faqs}
      contactInfo={{
        title: "¿Otra duda?",
        description:
          "Estamos en piloto. Escribinos a hello@senda.org. No inventamos un WhatsApp hasta tener número propio.",
        buttonText: "Escribir a Senda",
        href: site.mailto,
      }}
    />
  );
}
