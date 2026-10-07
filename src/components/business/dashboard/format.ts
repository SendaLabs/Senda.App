import { htmlLang } from "~/i18n/routing";

const TIME_ZONE = "America/Argentina/Buenos_Aires";

export type DashboardFormatters = ReturnType<typeof buildFormatters>;

function buildFormatters(locale: string) {
  const tag = htmlLang(locale);
  const currency = new Intl.NumberFormat(tag, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });
  const signedCurrency = new Intl.NumberFormat(tag, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  });
  const compactCurrency = new Intl.NumberFormat(tag, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    notation: "compact",
    maximumFractionDigits: 0,
  });
  const percent = new Intl.NumberFormat(tag, {
    style: "percent",
    maximumFractionDigits: 1,
  });
  const signedPercent = new Intl.NumberFormat(tag, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });
  const integer = new Intl.NumberFormat(tag);
  const shortDate = new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "short",
    timeZone: TIME_ZONE,
  });
  const time = new Intl.DateTimeFormat(tag, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: TIME_ZONE,
  });
  const calendarDate = new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const month = new Intl.DateTimeFormat(tag, {
    month: "short",
    timeZone: "UTC",
  });
  const longMonth = new Intl.DateTimeFormat(tag, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const range = new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const regions = new Intl.DisplayNames(tag, { type: "region" });

  return {
    currency: (value: number) => currency.format(value),
    signedCurrency: (value: number) => signedCurrency.format(value),
    compactCurrency: (value: number) => compactCurrency.format(value),
    percent: (ratio: number) => percent.format(ratio),
    signedPercent: (ratio: number) => signedPercent.format(ratio),
    integer: (value: number) => integer.format(value),
    shortDate: (iso: string) => shortDate.format(new Date(iso)),
    time: (iso: string) => time.format(new Date(iso)),
    /** Formats a `YYYY-MM-DD` calendar date without shifting it across time zones. */
    calendarDate: (date: string) => calendarDate.format(new Date(date)),
    month: (yearMonth: string) => month.format(new Date(`${yearMonth}-01`)),
    longMonth: (yearMonth: string) =>
      longMonth.format(new Date(`${yearMonth}-01`)),
    dateRange: (from: string, to: string) =>
      range.formatRange(new Date(from), new Date(to)),
    country: (code: string) => regions.of(code) ?? code,
  };
}

const cache = new Map<string, DashboardFormatters>();

export function getDashboardFormatters(locale: string): DashboardFormatters {
  let formatters = cache.get(locale);
  if (!formatters) {
    formatters = buildFormatters(locale);
    cache.set(locale, formatters);
  }
  return formatters;
}
