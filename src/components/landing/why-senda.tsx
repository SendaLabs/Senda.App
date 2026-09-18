import {
  EyeOff,
  Globe,
  MessageCircle,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { BentoGrid, type BentoItem } from "~/components/21st/bento-grid";
import { Shell } from "~/components/landing/shell";
import { site } from "~/lib/site";

const icons = [MessageCircle, EyeOff, Zap, Wallet, Users, Globe] as const;
const hrefs = [
  site.startHref,
  "#confianza",
  "#confianza",
  "#rieles",
  site.startHref,
  "#comparar",
] as const;
const colSpans = [2, 1, 1, 2, 1, 2] as const;
const persistent = [true, false, false, false, false, false] as const;

export async function WhySenda() {
  const t = await getTranslations("why");
  const rawTiles = t.raw("tiles") as {
    title: string;
    description: string;
    status: string;
    tags: string[];
    meta?: string;
    cta: string;
  }[];

  const tiles: BentoItem[] = rawTiles.map((tile, index) => {
    const Icon = icons[index] ?? MessageCircle;
    return {
      ...tile,
      icon: <Icon className="size-4 text-forest" />,
      href: hrefs[index],
      colSpan: colSpans[index],
      hasPersistentHover: persistent[index],
    };
  });

  return (
    <section id="por-que-senda" className="bg-cream py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[14ch] text-4xl text-forest md:text-5xl">
          {t("title")}
        </h2>
        <BentoGrid className="mt-12" items={tiles} />
      </Shell>
    </section>
  );
}
