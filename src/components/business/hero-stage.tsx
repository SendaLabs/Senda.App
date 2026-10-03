import {
  ArrowLeftRight,
  CreditCard,
  Home,
  Landmark,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function BusinessHeroStage() {
  const t = await getTranslations("business.mock");
  const label = await getTranslations("business.hero");

  return (
    <div
      id="business-hero-stage"
      className="relative mx-auto w-full max-w-[42rem] lg:max-w-none lg:pl-8 lg:pr-6"
    >
      <div
        className="pointer-events-none absolute top-[18%] left-[12%] h-[58%] w-[76%] rounded-full bg-[#1d6b58]/40 blur-3xl"
        aria-hidden
      />

      <div className="[perspective:1800px]">
        <div className="relative mx-auto w-[90%] origin-bottom [transform:rotateX(7deg)_rotateY(-6deg)]">
          <div className="rounded-[1.45rem] bg-[#0b0e0d] p-[0.7rem] pt-3 shadow-[0_50px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/12">
            <div className="mb-2 flex items-center justify-center" aria-hidden>
              <span className="size-1.5 rounded-full bg-[#2b3330] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
            </div>
            <div
              className="overflow-hidden rounded-[0.65rem] bg-[#f7f6f2]"
              role="img"
              aria-label={label("mockLabel")}
            >
              <DashboardScreen />
            </div>
          </div>
          <div
            className="mx-auto h-3 w-[102%] -translate-x-[1%] rounded-b-[1.25rem] bg-gradient-to-b from-[#2f3633] via-[#171c1a] to-[#0a0c0b]"
            aria-hidden
          />
          <div
            className="mx-auto -mt-0.5 h-3 w-[64%] rounded-[100%] bg-black/45 blur-md"
            aria-hidden
          />
        </div>
      </div>

      <article className="absolute top-[3%] right-4 z-10 hidden w-[11.4rem] rounded-2xl border border-white/20 bg-gradient-to-br from-[#1b4a43]/92 to-[#0c241f]/92 p-3.5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-md sm:block">
        <div className="flex items-center justify-between text-[0.62rem] tracking-[0.16em] uppercase">
          <span className="font-medium">Senda</span>
          <span className="text-white/65">{t("cardKind")}</span>
        </div>
        <p className="mt-7 font-mono text-[0.8rem] tracking-[0.28em] text-white/90">
          •••• {t("cardLast4")}
        </p>
        <div className="mt-5 flex items-end justify-between">
          <p className="text-[0.62rem] tracking-[0.18em] text-white/50 uppercase">
            {t("cardKind")}
          </p>
          <p className="text-[0.78rem] font-semibold tracking-[0.12em] italic">
            {t("cardNetwork")}
          </p>
        </div>
      </article>

      <article className="absolute top-[38%] right-3 z-10 hidden w-[12.2rem] rounded-2xl border border-white/45 bg-white/92 p-3.5 text-[#123c36] shadow-[0_16px_36px_rgba(0,0,0,0.2)] backdrop-blur-md sm:block">
        <p className="text-[0.72rem] font-medium">{t("limitsTitle")}</p>
        <dl className="mt-2.5 space-y-2 text-[0.68rem]">
          <LimitRow
            label={t("limitSpend")}
            value={t("limitSpendValue")}
            delta={t("limitSpendDelta")}
          />
          <LimitRow label={t("limitCards")} value={t("limitCardsValue")} />
          <LimitRow
            label={t("limitCountries")}
            value={t("limitCountriesValue")}
            delta={t("limitCountriesDelta")}
          />
        </dl>
      </article>

      <article className="absolute bottom-[10%] left-0 z-10 flex items-center gap-2 rounded-2xl border border-white/45 bg-white/92 px-3 py-2 text-[#123c36] shadow-[0_14px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <StellarMark />
        <p className="text-[0.72rem] font-medium">{t("stellar")}</p>
      </article>
    </div>
  );
}

async function DashboardScreen() {
  const t = await getTranslations("business.mock");
  const nav = [
    { key: "navHome", icon: Home, active: true },
    { key: "navTreasury", icon: Landmark, active: false },
    { key: "navMass", icon: ArrowLeftRight, active: false },
    { key: "navCards", icon: CreditCard, active: false },
    { key: "navSettings", icon: Settings, active: false },
  ] as const;

  const rows = [
    [t("row1Date"), t("row1Dest"), t("row1Amount"), t("row1Status")],
    [t("row2Date"), t("row2Dest"), t("row2Amount"), t("row2Status")],
    [t("row3Date"), t("row3Dest"), t("row3Amount"), t("row3Status")],
  ];

  return (
    <div className="grid min-h-[18.5rem] grid-cols-[4.4rem_1fr] text-[#171918] sm:min-h-[24rem] sm:grid-cols-[7.6rem_1fr]">
      <aside className="border-r border-[#e4e0d6] bg-[#f3f0e8] px-2 py-3 sm:px-3">
        <Image
          src="/images/logoverde.png"
          alt=""
          width={120}
          height={28}
          className="mb-4 h-3.5 w-auto sm:h-4"
        />
        <ul className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.key}
                className={
                  item.active
                    ? "flex items-center gap-1.5 rounded-md bg-[#123c36] px-1.5 py-1.5 text-[0.58rem] text-[#f4f1e8] sm:text-[0.65rem]"
                    : "flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[0.58rem] text-[#123c36]/75 sm:text-[0.65rem]"
                }
              >
                <Icon className="size-3 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{t(item.key)}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="space-y-2 bg-[#fbfaf6] px-2.5 py-2.5 sm:space-y-2.5 sm:px-3.5 sm:py-3">
        <div className="flex items-center justify-between">
          <p className="text-[0.78rem] font-medium sm:text-[0.9rem]">
            {t("greeting")}
          </p>
          <p className="text-[0.58rem] text-[#123c36]/50">{t("period")}</p>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <Kpi label={t("kpiBalance")} value={t("kpiBalanceValue")} />
          <Kpi label={t("kpiPayments")} value={t("kpiPaymentsValue")} />
          <Kpi
            label={t("kpiFees")}
            value={t("kpiFeesValue")}
            hint={t("kpiFeesDelta")}
          />
        </div>

        <div className="grid grid-cols-[1.45fr_0.85fr] gap-1.5">
          <div className="rounded-lg border border-[#e6e2d6] bg-white px-2 py-1.5">
            <p className="text-[0.55rem] text-[#123c36]/55">{t("flow")}</p>
            <svg
              viewBox="0 0 160 52"
              className="mt-1 h-11 w-full sm:h-14"
              aria-hidden
            >
              <path
                d="M0 38 C18 36 28 22 46 24 C64 26 72 12 90 16 C108 20 118 32 140 14 L160 10 L160 52 L0 52 Z"
                fill="#123c36"
                fillOpacity="0.08"
              />
              <path
                d="M0 38 C18 36 28 22 46 24 C64 26 72 12 90 16 C108 20 118 32 140 14 L160 10"
                fill="none"
                stroke="#123c36"
                strokeWidth="1.6"
              />
              <path
                d="M0 42 C22 40 40 32 62 34 C84 36 110 26 160 22"
                fill="none"
                stroke="#123c36"
                strokeOpacity="0.28"
                strokeWidth="1.2"
              />
            </svg>
          </div>
          <div className="rounded-lg border border-[#e6e2d6] bg-white px-2 py-1.5">
            <p className="text-[0.55rem] text-[#123c36]/55">{t("mix")}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <div
                className="size-9 shrink-0 rounded-full sm:size-11"
                style={{
                  background:
                    "conic-gradient(#123c36 0 42%, #3d5c56 42% 74%, #d9d5ca 74% 100%)",
                }}
                aria-hidden
              />
              <ul className="text-[0.5rem] leading-tight text-[#123c36]/80 sm:text-[0.58rem]">
                <li>42% {t("mixOps")}</li>
                <li>32% {t("mixPayroll")}</li>
                <li>26% {t("mixOther")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[#e6e2d6] bg-white px-2 py-1.5">
          <p className="text-[0.55rem] text-[#123c36]/55">{t("recent")}</p>
          <table className="mt-1 w-full text-left text-[0.5rem] sm:text-[0.58rem]">
            <thead className="text-[#123c36]/40">
              <tr>
                <th className="py-0.5 font-medium">{t("colDate")}</th>
                <th className="font-medium">{t("colDest")}</th>
                <th className="font-medium">{t("colAmount")}</th>
                <th className="hidden font-medium sm:table-cell">
                  {t("colStatus")}
                </th>
              </tr>
            </thead>
            <tbody className="text-[#171918]/85">
              {rows.map((row) => (
                <tr key={row[1]}>
                  <td className="py-0.5">{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td className="hidden sm:table-cell">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-[#e6e2d6] bg-white px-1.5 py-1.5 sm:px-2">
      <p className="truncate text-[0.5rem] text-[#123c36]/50 sm:text-[0.55rem]">
        {label}
      </p>
      <p className="text-[0.68rem] font-medium tracking-tight sm:text-[0.8rem]">
        {value}
      </p>
      {hint ? (
        <p className="text-[0.5rem] text-[#123c36]/45">{hint}</p>
      ) : null}
    </div>
  );
}

function LimitRow({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-[#123c36]/60">{label}</dt>
      <dd className="text-right">
        <span className="block font-medium">{value}</span>
        {delta ? (
          <span className="text-[0.6rem] text-[#123c36]/45">{delta}</span>
        ) : null}
      </dd>
    </div>
  );
}

function StellarMark() {
  return (
    <span
      className="flex size-6 items-center justify-center rounded-full bg-[#123c36] text-white"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
        <path d="M12 2.2 14.1 9.9 21.8 12 14.1 14.1 12 21.8 9.9 14.1 2.2 12 9.9 9.9Z" />
      </svg>
    </span>
  );
}
