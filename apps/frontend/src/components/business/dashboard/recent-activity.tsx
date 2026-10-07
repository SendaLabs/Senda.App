import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { CountryFlag } from "~/components/business/dashboard/country-flag";
import type {
  ActivityKind,
  DemoDashboard,
} from "~/components/business/dashboard/demo-data";
import { getDashboardFormatters } from "~/components/business/dashboard/format";
import {
  EmptyState,
  Panel,
  SeeAllButton,
} from "~/components/business/dashboard/panel";
import { cn } from "~/lib/utils";

const KIND_ICONS: Record<ActivityKind, LucideIcon> = {
  supplierPayment: ArrowUpRight,
  internationalTransfer: Globe,
  fundsReceived: ArrowDownLeft,
  cardSpend: CreditCard,
};

export async function RecentActivity({
  activity,
  today,
}: {
  activity: DemoDashboard["activity"];
  today: string;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("business.dashboard.activity"),
    getLocale(),
  ]);
  const f = getDashboardFormatters(locale);

  return (
    <Panel
      id="recent-activity"
      title={t("title")}
      action={<SeeAllButton label={t("seeAll")} />}
    >
      {activity.length === 0 ? (
        <EmptyState>{t("empty")}</EmptyState>
      ) : (
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[18rem] table-fixed text-sm">
            <thead>
              <tr className="text-charcoal/50 border-stone/60 border-b text-left text-[0.7rem] tracking-[0.06em] uppercase">
                <th scope="col" className="pb-2 font-medium">
                  {t("description")}
                </th>
                <th
                  scope="col"
                  className="w-[4.75rem] pb-2 text-right font-medium"
                >
                  {t("amount")}
                </th>
                <th
                  scope="col"
                  className="w-[4.75rem] pb-2 pl-4 text-right font-medium"
                >
                  {t("date")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-stone/50 divide-y">
              {activity.map((item) => {
                const kindLabel = t(`kinds.${item.kind}`);
                const Icon = KIND_ICONS[item.kind];
                const time = f.time(item.at);
                const isToday = item.at.startsWith(today);
                return (
                  <tr key={item.id}>
                    <th
                      scope="row"
                      className="py-2.5 pr-3 text-left font-normal"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className="bg-cream-deep text-forest flex size-8 shrink-0 items-center justify-center rounded-lg"
                          aria-hidden
                        >
                          <Icon className="size-4" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0">
                          <span
                            className="text-charcoal block truncate font-medium"
                            title={kindLabel}
                          >
                            {kindLabel}
                          </span>
                          <span className="text-charcoal/55 flex min-w-0 items-center gap-1.5 text-xs">
                            <span className="truncate">
                              {item.counterparty}
                            </span>
                            <span
                              role="img"
                              aria-label={t("route", {
                                from: f.country(item.from),
                                to: f.country(item.to),
                              })}
                              className="flex shrink-0 items-center gap-1"
                            >
                              <CountryFlag code={item.from} />
                              <ArrowRight
                                className="text-charcoal/40 size-3"
                                aria-hidden
                              />
                              <CountryFlag code={item.to} />
                            </span>
                          </span>
                        </span>
                      </span>
                    </th>
                    <td
                      className={cn(
                        "py-2.5 text-right font-medium whitespace-nowrap tabular-nums",
                        item.amount < 0 ? "text-[#a3402b]" : "text-[#1f6b55]",
                      )}
                    >
                      {f.signedCurrency(item.amount)}
                    </td>
                    <td className="text-charcoal/70 py-2.5 pl-4 text-right text-xs whitespace-nowrap">
                      <time dateTime={item.at} className="flex flex-col">
                        <span>
                          {isToday ? t("today") : f.shortDate(item.at)}
                        </span>
                        <span className="text-charcoal/50">{time}</span>
                      </time>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
