import {
  ArrowLeftRight,
  Blocks,
  ChartColumn,
  CreditCard,
  FileText,
  House,
  Landmark,
  LogOut,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import type { DemoDashboard } from "~/components/business/dashboard/demo-data";
import { Link } from "~/i18n/navigation";
import { BUSINESS_DASHBOARD_PATH, BUSINESS_LOGIN_PATH } from "~/lib/site";

type NavKey =
  | "home"
  | "payments"
  | "payables"
  | "expenses"
  | "cards"
  | "treasury"
  | "reports"
  | "integrations";

const NAV: readonly { key: NavKey; icon: LucideIcon }[] = [
  { key: "home", icon: House },
  { key: "payments", icon: ArrowLeftRight },
  { key: "payables", icon: FileText },
  { key: "expenses", icon: Receipt },
  { key: "cards", icon: CreditCard },
  { key: "treasury", icon: Landmark },
  { key: "reports", icon: ChartColumn },
  { key: "integrations", icon: Blocks },
];

export async function DashboardSidebarContent({
  company,
  user,
}: Pick<DemoDashboard, "company" | "user">) {
  const t = await getTranslations("business.dashboard");

  return (
    <div className="flex h-full flex-col px-4 pt-6 pb-4">
      <Link
        href={BUSINESS_DASHBOARD_PATH}
        aria-label={t("home")}
        className="flex w-fit items-center gap-2.5 rounded-lg px-2 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <Image
          src="/images/logoblanco.png"
          alt=""
          width={420}
          height={110}
          className="h-6 w-auto"
          sizes="100px"
        />
        <span className="border-l border-white/30 pl-2.5 text-sm text-white/75">
          {t("brandSuffix")}
        </span>
      </Link>

      <nav aria-label={t("nav.aria")} className="mt-9">
        <ul className="space-y-1">
          {NAV.map(({ key, icon: Icon }) =>
            key === "home" ? (
              <li key={key}>
                <Link
                  href={BUSINESS_DASHBOARD_PATH}
                  aria-current="page"
                  className="flex min-h-10 items-center gap-3 rounded-xl bg-white/10 px-3 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Icon
                    className="size-[1.1rem]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ) : (
              <li key={key}>
                <span
                  aria-disabled="true"
                  className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm text-white/60"
                >
                  <Icon
                    className="size-[1.1rem]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="flex-1">{t(`nav.${key}`)}</span>
                  <span className="rounded-full bg-white/8 px-2 py-0.5 text-[0.65rem] text-white/55">
                    {t("nav.soon")}
                  </span>
                </span>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="mt-auto space-y-3 pt-8">
        <div className="flex items-center gap-3 rounded-xl bg-white/6 px-3 py-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#3f8a72] text-sm font-semibold"
            aria-hidden
          >
            {company.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{company.name}</p>
            <p className="text-xs text-white/60">
              {t("company.countries", { count: company.countries })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 px-1 pt-3">
          <Image
            src={user.avatar}
            alt=""
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-full bg-[#ebe6d8] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-white/60">{t("user.role")}</p>
          </div>
          <Link
            href={BUSINESS_LOGIN_PATH}
            aria-label={t("user.signOut")}
            title={t("user.signOut")}
            className="flex size-9 items-center justify-center rounded-lg text-white/65 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <LogOut className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
