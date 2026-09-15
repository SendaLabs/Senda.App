import {
  MessageCircle,
  EyeOff,
  Zap,
  Wallet,
  Globe,
  Users,
} from "lucide-react";

import { Shell } from "~/components/landing/shell";
import { BentoCard, BentoGrid } from "~/components/ui/bento-grid";
import { site } from "~/lib/site";

const tiles = [
  {
    name: "Todo desde WhatsApp",
    description:
      "Como Félix, el envío vive en el chat. Sin filas y sin una app más en el teléfono.",
    Icon: MessageCircle,
    className: "md:col-span-2 bg-white",
    href: site.startHref,
    cta: "Abrir el chat",
    background: (
      <div className="absolute -right-8 -top-10 size-56 rounded-full bg-cream-deep" />
    ),
  },
  {
    name: "Blockchain invisible",
    description:
      "Mandás plata. Ellos reciben pesos. Nadie en la familia tiene que saber qué es una wallet.",
    Icon: EyeOff,
    className: "md:col-span-1 bg-forest text-cream [&_h3]:text-cream [&_p]:text-cream/80 [&_svg]:text-cream [&_a]:text-cream",
    href: "#confianza",
    cta: "Ver cómo viaja",
    background: null,
  },
  {
    name: "Stellar, por debajo",
    description:
      "Transferencias rápidas y comisiones mínimas. Las stablecoins son el caño, no la pantalla.",
    Icon: Zap,
    className: "md:col-span-1 bg-cream-deep",
    href: "#confianza",
    cta: "Por qué Stellar",
    background: null,
  },
  {
    name: "Cobra en Mercado Pago",
    description:
      "El último tramo es el que ya usan. Alias, CVU, pesos. Familiar de punta a punta.",
    Icon: Wallet,
    className: "md:col-span-2 bg-white",
    href: "#mercado-pago",
    cta: "Cómo cobran",
    background: (
      <div className="absolute bottom-0 right-0 h-32 w-48 bg-cream-deep/80" />
    ),
  },
  {
    name: "Un producto B2C simple",
    description:
      "Una persona manda. Otra cobra. Sin onboarding de empresa ni API.",
    Icon: Users,
    className: "md:col-span-1 bg-white",
    href: site.startHref,
    cta: "Empezar",
    background: null,
  },
  {
    name: "El hueco que dejan los grandes",
    description:
      "Western Union, Remitly y Wise cubren mal este tramo: sucursal, app extra, o un destino que no es Mercado Pago.",
    Icon: Globe,
    className: "md:col-span-2 bg-cream-deep",
    href: "#comparar",
    cta: "Comparar",
    background: null,
  },
];

export function WhySenda() {
  return (
    <section id="por-que-senda" className="bg-cream py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[14ch] text-4xl text-forest md:text-5xl">
          Hecho para mandar a casa, no para explicar cripto
        </h2>
        <BentoGrid className="mt-12 auto-rows-auto md:auto-rows-[20rem]">
          {tiles.map((tile) => (
            <BentoCard
              key={tile.name}
              name={tile.name}
              description={tile.description}
              Icon={tile.Icon}
              className={tile.className}
              href={tile.href}
              cta={tile.cta}
              background={tile.background}
            />
          ))}
        </BentoGrid>
      </Shell>
    </section>
  );
}
