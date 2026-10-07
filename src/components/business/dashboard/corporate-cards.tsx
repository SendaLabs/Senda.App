import { CreditCard, Nfc } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import type { DemoDashboard } from "~/components/business/dashboard/demo-data";
import { Panel, SeeAllButton } from "~/components/business/dashboard/panel";

export async function CorporateCards({ cards }: Pick<DemoDashboard, "cards">) {
  const t = await getTranslations("business.dashboard");

  return (
    <Panel
      id="corporate-cards"
      title={t("cards.title")}
      tone="dark"
      action={<SeeAllButton label={t("cards.seeAll")} tone="dark" />}
      className="relative isolate overflow-hidden"
    >
      <svg
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 size-full"
        aria-hidden
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-20 ${150 - i * 14} C 80 ${110 - i * 18}, 170 ${200 - i * 10}, 320 ${70 - i * 16}`}
            fill="none"
            stroke="#3f8a72"
            strokeOpacity={0.16 + i * 0.03}
            strokeWidth="1"
          />
        ))}
      </svg>

      <div
        className="relative mx-auto aspect-[1.586] w-full max-w-[18rem] rounded-2xl bg-gradient-to-br from-[#1d5145] to-[#0a231e] p-4 shadow-[0_18px_36px_rgba(0,0,0,0.35)] ring-1 ring-white/12"
        role="img"
        aria-label={t("cards.number", { last4: cards.last4 })}
      >
        <div className="flex items-center gap-2" aria-hidden>
          <Image
            src="/images/logoblanco.png"
            alt=""
            width={420}
            height={110}
            className="h-4 w-auto"
            sizes="64px"
          />
          <span className="border-l border-white/30 pl-2 text-[0.7rem] text-white/70">
            {t("brandSuffix")}
          </span>
        </div>
        <span
          className="mt-5 block h-7 w-9 rounded-md bg-gradient-to-br from-[#e9d9b0] to-[#b89a5e]"
          aria-hidden
        />
        <div
          className="absolute inset-x-4 bottom-4 flex items-end justify-between"
          aria-hidden
        >
          <p className="font-mono text-sm tracking-[0.2em] text-white/90">
            •••• {cards.last4}
          </p>
          <span className="flex items-center gap-1.5 text-xs text-white/75">
            <Nfc className="size-4" />
            {cards.currency}
          </span>
        </div>
      </div>

      <p className="mt-auto flex items-center gap-2 pt-5 text-sm text-white/75">
        <CreditCard className="size-4" aria-hidden />
        {t("cards.active", { active: cards.active, total: cards.total })}
      </p>
    </Panel>
  );
}
