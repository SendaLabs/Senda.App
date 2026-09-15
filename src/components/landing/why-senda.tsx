import {
  EyeOff,
  Globe,
  MessageCircle,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

import { BentoGrid, type BentoItem } from "~/components/21st/bento-grid";
import { Shell } from "~/components/landing/shell";
import { site } from "~/lib/site";

const tiles: BentoItem[] = [
  {
    title: "Todo desde WhatsApp",
    description:
      "Como Félix, el envío vive en el chat. Sin filas y sin una app más en el teléfono.",
    icon: <MessageCircle className="size-4 text-forest" />,
    status: "Canal",
    tags: ["WhatsApp", "B2C"],
    meta: "sin app",
    cta: "Empezar →",
    href: site.startHref,
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Blockchain invisible",
    description:
      "Mandás plata. Ellos reciben pesos. Nadie en la familia tiene que saber qué es una wallet.",
    icon: <EyeOff className="size-4 text-forest" />,
    status: "Diseño",
    tags: ["Invisible"],
    meta: "bajo el capó",
    cta: "Ver cómo viaja →",
    href: "#confianza",
  },
  {
    title: "Stellar, por debajo",
    description:
      "Transferencias rápidas y comisiones mínimas. Las stablecoins son el caño, no la pantalla.",
    icon: <Zap className="size-4 text-forest" />,
    status: "Riel",
    tags: ["Stellar"],
    meta: "segundos",
    cta: "Por qué Stellar →",
    href: "#confianza",
  },
  {
    title: "Cobra en Mercado Pago",
    description:
      "El último tramo es el que ya usan. Alias, CVU, pesos. Familiar de punta a punta.",
    icon: <Wallet className="size-4 text-forest" />,
    status: "Destino",
    tags: ["ARS", "MP"],
    meta: "alias o CVU",
    cta: "Cómo cobran →",
    href: "#mercado-pago",
    colSpan: 2,
  },
  {
    title: "Un producto B2C simple",
    description:
      "Una persona manda. Otra cobra. Sin onboarding de empresa ni API.",
    icon: <Users className="size-4 text-forest" />,
    status: "B2C",
    tags: ["Personas"],
    cta: "Empezar →",
    href: site.startHref,
  },
  {
    title: "El hueco que dejan los grandes",
    description:
      "Western Union, Remitly y Wise cubren mal este tramo: sucursal, app extra, o un destino que no es Mercado Pago.",
    icon: <Globe className="size-4 text-forest" />,
    status: "Mercado",
    tags: ["Competencia"],
    cta: "Comparar →",
    href: "#comparar",
    colSpan: 2,
  },
];

export function WhySenda() {
  return (
    <section id="por-que-senda" className="bg-cream py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[14ch] text-4xl text-forest md:text-5xl">
          Hecho para mandar a casa, no para explicar cripto
        </h2>
        <BentoGrid className="mt-12" items={tiles} />
      </Shell>
    </section>
  );
}
