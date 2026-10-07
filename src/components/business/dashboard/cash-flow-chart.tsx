import { getLocale, getTranslations } from "next-intl/server";

import type { DemoDashboard } from "~/components/business/dashboard/demo-data";
import {
  FILTER_PARAMS,
  type Range,
} from "~/components/business/dashboard/filters";
import { getDashboardFormatters } from "~/components/business/dashboard/format";
import { Panel } from "~/components/business/dashboard/panel";
import { ParamSelect } from "~/components/business/dashboard/param-select";
import { cn } from "~/lib/utils";

const TICK_STEP = 20_000;

export async function CashFlowChart({
  points,
  range,
}: {
  points: DemoDashboard["cashFlow"];
  range: Range;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("business.dashboard.cashFlow"),
    getLocale(),
  ]);
  const f = getDashboardFormatters(locale);

  let peak = 0;
  for (const point of points) {
    peak = Math.max(peak, point.income, point.expenses);
  }
  const max = Math.max(TICK_STEP, Math.ceil(peak / TICK_STEP) * TICK_STEP);
  const ticks = Array.from(
    { length: max / TICK_STEP + 1 },
    (_, i) => i * TICK_STEP,
  );
  const height = (value: number) => `${(value / max) * 100}%`;
  const lastIndex = points.length - 1;

  return (
    <Panel
      id="cash-flow"
      title={t("title")}
      action={
        <ParamSelect
          param={FILTER_PARAMS.range}
          value={range}
          defaultValue="12"
          label={t("rangeLabel")}
          options={[
            { value: "12", label: t("range12") },
            { value: "6", label: t("range6") },
          ]}
        />
      }
    >
      <ul className="text-charcoal/70 flex gap-4 text-xs" aria-hidden>
        <li className="flex items-center gap-1.5">
          <span className="bg-forest size-2.5 rounded-[3px]" />
          {t("income")}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-[3px] bg-[#d9d5ca]" />
          {t("expenses")}
        </li>
      </ul>

      <div
        className="mt-4 grid flex-1 grid-cols-[auto_minmax(0,1fr)] grid-rows-[minmax(10rem,1fr)_auto] gap-x-3 gap-y-2"
        aria-hidden
      >
        <div className="text-charcoal/45 relative w-9 text-right text-[0.68rem] tabular-nums">
          {ticks.map((tick) => (
            <span
              key={tick}
              className="absolute right-0 translate-y-1/2"
              style={{ bottom: height(tick) }}
            >
              {f.compactCurrency(tick)}
            </span>
          ))}
        </div>

        <div className="relative">
          {ticks.map((tick) => (
            <span
              key={tick}
              className={cn(
                "absolute inset-x-0 border-t",
                tick === 0 ? "border-stone" : "border-stone/50 border-dashed",
              )}
              style={{ bottom: height(tick) }}
            />
          ))}
          <div className="absolute inset-0 flex items-end justify-around">
            {points.map((point) => (
              <div
                key={point.month}
                className="flex h-full items-end gap-[3px]"
              >
                <span
                  className="bg-forest w-2 rounded-t-[3px] sm:w-2.5"
                  style={{ height: height(point.income) }}
                />
                <span
                  className="w-2 rounded-t-[3px] bg-[#d9d5ca] sm:w-2.5"
                  style={{ height: height(point.expenses) }}
                />
              </div>
            ))}
          </div>
        </div>

        <span />
        <div className="text-charcoal/55 flex justify-around text-[0.68rem] capitalize">
          {points.map((point, index) => (
            <span
              key={point.month}
              className={cn(
                index === lastIndex && "text-charcoal font-semibold",
              )}
            >
              {f.month(point.month).replace(".", "")}
            </span>
          ))}
        </div>
      </div>

      <table className="sr-only">
        <caption>{t("tableCaption")}</caption>
        <thead>
          <tr>
            <th scope="col">{t("month")}</th>
            <th scope="col">{t("income")}</th>
            <th scope="col">{t("expenses")}</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <tr key={point.month}>
              <th scope="row">{f.longMonth(point.month)}</th>
              <td>{f.currency(point.income)}</td>
              <td>{f.currency(point.expenses)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
