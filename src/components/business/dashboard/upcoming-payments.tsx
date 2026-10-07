import { getLocale, getTranslations } from "next-intl/server";

import { CountryFlag } from "~/components/business/dashboard/country-flag";
import type {
  DemoDashboard,
  PaymentStatus,
} from "~/components/business/dashboard/demo-data";
import { getDashboardFormatters } from "~/components/business/dashboard/format";
import {
  EmptyState,
  Panel,
  SeeAllButton,
} from "~/components/business/dashboard/panel";
import { cn } from "~/lib/utils";

const STATUS_STYLES: Record<PaymentStatus, string> = {
  pending: "bg-[#fbeedd] text-[#8a520f]",
  scheduled: "bg-[#e6efe9] text-[#1f6b55]",
  approved: "bg-forest text-cream",
};

export async function UpcomingPayments({
  payments,
  today,
}: {
  payments: DemoDashboard["upcomingPayments"];
  today: string;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("business.dashboard.upcoming"),
    getLocale(),
  ]);
  const f = getDashboardFormatters(locale);

  return (
    <Panel
      id="upcoming-payments"
      title={t("title")}
      action={<SeeAllButton label={t("seeAll")} />}
    >
      {payments.length === 0 ? (
        <EmptyState>{t("empty")}</EmptyState>
      ) : (
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[20rem] table-fixed text-sm">
            <thead>
              <tr className="text-charcoal/50 border-stone/60 border-b text-left text-[0.7rem] tracking-[0.06em] uppercase">
                <th scope="col" className="pb-2 font-medium">
                  {t("supplier")}
                </th>
                <th
                  scope="col"
                  className="w-[5rem] pb-2 text-right font-medium"
                >
                  {t("amount")}
                </th>
                <th scope="col" className="w-[6.5rem] pb-2 pl-4 font-medium">
                  {t("status")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-stone/50 divide-y">
              {payments.map((payment) => {
                const isToday = payment.dueDate === today;
                return (
                  <tr key={payment.id}>
                    <th
                      scope="row"
                      className="py-2.5 pr-3 text-left font-normal"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className="bg-cream-deep text-forest flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold"
                          aria-hidden
                        >
                          {initials(payment.supplier)}
                        </span>
                        <span className="min-w-0">
                          <span
                            className="text-charcoal block truncate font-medium"
                            title={payment.supplier}
                          >
                            {payment.supplier}
                          </span>
                          <span className="text-charcoal/55 flex items-center gap-1.5 text-xs">
                            <CountryFlag code={payment.country} />
                            <span className="truncate">
                              {f.country(payment.country)}
                            </span>
                          </span>
                        </span>
                      </span>
                    </th>
                    <td className="py-2.5 text-right whitespace-nowrap">
                      <span className="text-charcoal block font-medium tabular-nums">
                        {f.currency(payment.amount)}
                      </span>
                      <time
                        dateTime={payment.dueDate}
                        className={cn(
                          "block text-xs",
                          isToday
                            ? "font-medium text-[#a3402b]"
                            : "text-charcoal/55",
                        )}
                      >
                        <span className="sr-only">{t("date")}: </span>
                        {isToday ? t("today") : f.calendarDate(payment.dueDate)}
                      </time>
                    </td>
                    <td className="py-2.5 pl-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
                          STATUS_STYLES[payment.status],
                        )}
                      >
                        {t(`statuses.${payment.status}`)}
                      </span>
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

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}
