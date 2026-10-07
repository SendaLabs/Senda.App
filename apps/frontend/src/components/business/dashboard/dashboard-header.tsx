import { CalendarDays, Globe, Plus } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import type { DemoDashboard } from "~/components/business/dashboard/demo-data";
import { DemoActionButton } from "~/components/business/dashboard/demo-notice";
import {
  DASHBOARD_COUNTRIES,
  FILTER_PARAMS,
  type Region,
} from "~/components/business/dashboard/filters";
import { getDashboardFormatters } from "~/components/business/dashboard/format";
import { ParamSelect } from "~/components/business/dashboard/param-select";

export async function DashboardHeader({
  user,
  period,
  region,
}: Pick<DemoDashboard, "user" | "period"> & { region: Region }) {
  const [t, locale] = await Promise.all([
    getTranslations("business.dashboard"),
    getLocale(),
  ]);
  const f = getDashboardFormatters(locale);

  const regionOptions = [
    { value: "global", label: t("header.regionGlobal") },
    ...DASHBOARD_COUNTRIES.map((code) => ({
      value: code,
      label: f.country(code),
    })),
  ];

  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-forest text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] sm:text-[2rem]">
            {t("header.greeting", { name: user.firstName })}
          </h1>
          <span className="bg-forest/8 text-forest rounded-full px-2.5 py-1 text-xs font-medium">
            {t("demoBadge")}
          </span>
        </div>
        <p className="text-charcoal/65 mt-1 text-[0.95rem]">
          {t("header.sub")}{" "}
          <span className="text-charcoal/50">{t("demoNote")}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <ParamSelect
          param={FILTER_PARAMS.region}
          value={region}
          defaultValue="global"
          options={regionOptions}
          label={t("header.regionLabel")}
          icon={<Globe className="size-4" aria-hidden />}
          className="min-w-[13.5rem] flex-1 sm:flex-none"
        />
        <p className="border-stone text-charcoal flex h-10 items-center gap-2 rounded-xl border bg-white px-3 text-sm">
          <CalendarDays className="text-forest/70 size-4" aria-hidden />
          <span className="sr-only">{t("header.periodLabel")}: </span>
          <time dateTime={`${period.from}/${period.to}`}>
            {f.dateRange(period.from, period.to)}
          </time>
        </p>
        <DemoActionButton className="bg-forest text-cream hover:bg-forest-soft focus-visible:ring-forest/40 inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3">
          <Plus className="size-4" aria-hidden />
          {t("header.newPayment")}
        </DemoActionButton>
      </div>
    </header>
  );
}
