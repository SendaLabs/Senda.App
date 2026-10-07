import {
  ArrowDown,
  ArrowUp,
  Clock3,
  Send,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import type { DemoDashboard } from "~/components/business/dashboard/demo-data";
import { getDashboardFormatters } from "~/components/business/dashboard/format";
import { cn } from "~/lib/utils";

export async function KpiGrid({ kpis }: Pick<DemoDashboard, "kpis">) {
  const [t, locale] = await Promise.all([
    getTranslations("business.dashboard.kpi"),
    getLocale(),
  ]);
  const f = getDashboardFormatters(locale);

  const balanceUp = kpis.balance.change >= 0;
  const spendUp = kpis.spend.change >= 0;

  return (
    <section aria-label={t("aria")}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label={t("balance")}
          value={f.currency(kpis.balance.value)}
          icon={ArrowUp}
          iconTone="positive"
          footnote={
            <Trend
              up={balanceUp}
              good={balanceUp}
              text={t("vsPrevious", {
                change: f.signedPercent(kpis.balance.change),
              })}
            />
          }
        />
        <Kpi
          label={t("payable")}
          value={f.currency(kpis.payable.value)}
          icon={Clock3}
          iconTone="warning"
          footnote={t("invoices", {
            count: f.integer(kpis.payable.invoices),
          })}
        />
        <Kpi
          label={t("spend")}
          value={f.currency(kpis.spend.value)}
          icon={ArrowDown}
          iconTone="positive"
          footnote={
            <Trend
              up={spendUp}
              good={!spendUp}
              text={t("vsPrevious", {
                change: f.signedPercent(kpis.spend.change),
              })}
            />
          }
        />
        <Kpi
          label={t("international")}
          value={f.currency(kpis.international.value)}
          icon={Send}
          iconTone="neutral"
          footnote={t("payments", {
            count: f.integer(kpis.international.payments),
          })}
        />
      </ul>
    </section>
  );
}

const ICON_TONES = {
  positive: "bg-[#e3efe8] text-[#1f6b55]",
  warning: "bg-[#fbeedd] text-[#9a5b12]",
  neutral: "bg-[#e9efec] text-forest",
} as const;

function Kpi({
  label,
  value,
  icon: Icon,
  iconTone,
  footnote,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  iconTone: keyof typeof ICON_TONES;
  footnote: ReactNode;
}) {
  return (
    <li className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(23,25,24,0.04),0_8px_24px_rgba(23,25,24,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-charcoal/65 text-sm">{label}</p>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full",
            ICON_TONES[iconTone],
          )}
          aria-hidden
        >
          <Icon className="size-4" strokeWidth={2} />
        </span>
      </div>
      <p className="text-charcoal -mt-1 text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] tabular-nums">
        {value}
      </p>
      <p className="text-charcoal/60 mt-2 text-xs">{footnote}</p>
    </li>
  );
}

function Trend({
  up,
  good,
  text,
}: {
  up: boolean;
  good: boolean;
  text: string;
}) {
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium",
        good ? "text-[#1f6b55]" : "text-[#a3402b]",
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {text}
    </span>
  );
}
