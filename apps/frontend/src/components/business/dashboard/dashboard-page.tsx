import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { CashFlowChart } from "~/components/business/dashboard/cash-flow-chart";
import { CorporateCards } from "~/components/business/dashboard/corporate-cards";
import { CountryOperations } from "~/components/business/dashboard/country-operations";
import { DashboardHeader } from "~/components/business/dashboard/dashboard-header";
import { getDemoDashboard } from "~/components/business/dashboard/demo-data";
import { DemoNoticeProvider } from "~/components/business/dashboard/demo-notice";
import type { DashboardFilters } from "~/components/business/dashboard/filters";
import { KpiGrid } from "~/components/business/dashboard/kpi-grid";
import { DashboardMobileNav } from "~/components/business/dashboard/mobile-nav";
import { RecentActivity } from "~/components/business/dashboard/recent-activity";
import { DashboardSidebarContent } from "~/components/business/dashboard/sidebar";
import { SpendByCategory } from "~/components/business/dashboard/spend-by-category";
import { UpcomingPayments } from "~/components/business/dashboard/upcoming-payments";
import { Link } from "~/i18n/navigation";
import { BUSINESS_DASHBOARD_PATH } from "~/lib/site";

export async function BusinessDashboardPage({
  filters,
}: {
  filters: DashboardFilters;
}) {
  const t = await getTranslations("business.dashboard");
  const data = getDemoDashboard(filters);
  const sidebar = (
    <DashboardSidebarContent company={data.company} user={data.user} />
  );

  return (
    <DemoNoticeProvider
      labels={{
        title: t("demoAction.title"),
        copy: t("demoAction.copy"),
        cta: t("demoAction.cta"),
        dismiss: t("demoAction.dismiss"),
      }}
    >
      <a
        href="#panel"
        className="bg-forest text-cream sr-only z-[60] rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t("skip")}
      </a>

      <div className="min-h-dvh bg-[#f3f1ea] lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-dvh overflow-y-auto bg-[#061f1b] text-white lg:block">
          {sidebar}
        </aside>

        <div className="min-w-0">
          <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[#061f1b] px-4 lg:hidden">
            <Link
              href={BUSINESS_DASHBOARD_PATH}
              aria-label={t("home")}
              className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image
                src="/images/logoblanco.png"
                alt=""
                width={420}
                height={110}
                className="h-6 w-auto"
                sizes="100px"
                priority
              />
              <span className="border-l border-white/30 pl-2.5 text-sm text-white/75">
                {t("brandSuffix")}
              </span>
            </Link>
            <DashboardMobileNav
              openLabel={t("nav.openMenu")}
              title={t("nav.menu")}
            >
              {sidebar}
            </DashboardMobileNav>
          </div>

          <main
            id="panel"
            tabIndex={-1}
            className="mx-auto w-full max-w-[1520px] space-y-5 px-4 py-6 outline-none sm:px-6 lg:px-8 lg:py-8"
          >
            <DashboardHeader
              user={data.user}
              period={data.period}
              region={filters.region}
            />

            <KpiGrid kpis={data.kpis} />

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.8fr)]">
              <CashFlowChart points={data.cashFlow} range={filters.range} />
              <SpendByCategory
                categories={data.categories}
                period={filters.categoryPeriod}
              />
              <CorporateCards cards={data.cards} />
            </div>

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.75fr)]">
              <UpcomingPayments
                payments={data.upcomingPayments}
                today={data.today}
              />
              <RecentActivity activity={data.activity} today={data.today} />
              <CountryOperations
                volumes={data.countryVolumes}
                region={filters.region}
              />
            </div>
          </main>
        </div>
      </div>
    </DemoNoticeProvider>
  );
}
