import { getLocale, getTranslations } from "next-intl/server";

import type {
  CategoryKey,
  DemoDashboard,
} from "~/components/business/dashboard/demo-data";
import {
  FILTER_PARAMS,
  type CategoryPeriod,
} from "~/components/business/dashboard/filters";
import { getDashboardFormatters } from "~/components/business/dashboard/format";
import { Panel } from "~/components/business/dashboard/panel";
import { ParamSelect } from "~/components/business/dashboard/param-select";

const COLORS: Record<CategoryKey, string> = {
  software: "#123c36",
  services: "#1f6b55",
  marketing: "#4b9278",
  operations: "#b5d3c3",
  people: "#d2b07c",
  other: "#e8e0cc",
};

const RADIUS = 15.915;
const SEGMENT_GAP = 0.8;

export async function SpendByCategory({
  categories,
  period,
}: {
  categories: DemoDashboard["categories"];
  period: CategoryPeriod;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("business.dashboard.categories"),
    getLocale(),
  ]);
  const f = getDashboardFormatters(locale);

  const { slices, total } = categories;
  let offset = 0;
  const segments = slices.map((slice) => {
    const share = total > 0 ? slice.amount / total : 0;
    const segment = { ...slice, share, start: offset };
    offset += share * 100;
    return segment;
  });

  return (
    <Panel
      id="spend-by-category"
      title={t("title")}
      action={
        <ParamSelect
          param={FILTER_PARAMS.categoryPeriod}
          value={period}
          defaultValue="current"
          label={t("periodLabel")}
          options={[
            { value: "current", label: t("current") },
            { value: "previous", label: t("previous") },
          ]}
        />
      }
    >
      <div className="flex flex-1 flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative size-40 shrink-0">
          <svg viewBox="0 0 42 42" className="size-full -rotate-90" aria-hidden>
            <circle
              cx="21"
              cy="21"
              r={RADIUS}
              fill="none"
              stroke="#f1eee6"
              strokeWidth="6"
            />
            {segments.map((segment) => {
              const length = Math.max(segment.share * 100 - SEGMENT_GAP, 0);
              return (
                <circle
                  key={segment.key}
                  cx="21"
                  cy="21"
                  r={RADIUS}
                  fill="none"
                  stroke={COLORS[segment.key]}
                  strokeWidth="6"
                  strokeDasharray={`${length} ${100 - length}`}
                  strokeDashoffset={-segment.start}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-charcoal text-xl font-semibold tracking-[-0.02em] tabular-nums">
              {f.currency(total)}
            </p>
            <p className="text-charcoal/55 text-xs first-letter:uppercase">
              {f.longMonth(categories.month)}
            </p>
          </div>
        </div>

        <table className="w-full text-sm">
          <caption className="sr-only">{t("title")}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">{t("category")}</th>
              <th scope="col">{t("share")}</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment.key}>
                <th
                  scope="row"
                  className="text-charcoal/80 py-1.5 text-left font-normal"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="size-2.5 shrink-0 rounded-[3px]"
                      style={{ backgroundColor: COLORS[segment.key] }}
                      aria-hidden
                    />
                    {t(`items.${segment.key}`)}
                  </span>
                </th>
                <td
                  className="text-charcoal py-1.5 pl-3 text-right font-medium tabular-nums"
                  title={f.currency(segment.amount)}
                >
                  {f.percent(segment.share)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
