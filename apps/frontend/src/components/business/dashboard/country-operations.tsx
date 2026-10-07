import { getLocale, getTranslations } from "next-intl/server";

import { CountryFlag } from "~/components/business/dashboard/country-flag";
import type { DemoDashboard } from "~/components/business/dashboard/demo-data";
import type { Region } from "~/components/business/dashboard/filters";
import { getDashboardFormatters } from "~/components/business/dashboard/format";
import { Panel, SeeAllButton } from "~/components/business/dashboard/panel";
import { cn } from "~/lib/utils";

export async function CountryOperations({
  volumes,
  region,
}: {
  volumes: DemoDashboard["countryVolumes"];
  region: Region;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("business.dashboard.countries"),
    getLocale(),
  ]);
  const f = getDashboardFormatters(locale);

  let max = 0;
  for (const volume of volumes) max = Math.max(max, volume.amount);

  return (
    <Panel
      id="country-operations"
      title={t("title")}
      action={<SeeAllButton label={t("seeDetail")} />}
    >
      <ul className="space-y-4">
        {volumes.map((volume) => {
          const dimmed = region !== "global" && region !== volume.country;
          const width = max > 0 ? (volume.amount / max) * 100 : 0;
          return (
            <li
              key={volume.country}
              aria-current={region === volume.country ? "true" : undefined}
              className={cn(
                "grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)_auto] items-center gap-3 text-sm transition-opacity",
                dimmed && "opacity-40",
              )}
            >
              <span className="text-charcoal flex min-w-0 items-center gap-2">
                <CountryFlag code={volume.country} />
                <span className="truncate">{f.country(volume.country)}</span>
              </span>
              <span
                className="bg-cream-deep h-2 overflow-hidden rounded-full"
                aria-hidden
              >
                <span
                  className="bg-forest block h-full rounded-full"
                  style={{ width: `${width}%` }}
                />
              </span>
              <span className="text-charcoal font-medium tabular-nums">
                {f.compactCurrency(volume.amount)}
              </span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
