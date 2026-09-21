import { Geist } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { type Metadata } from "next";

import { routing } from "~/i18n/routing";
import { TRPCReactProvider } from "~/trpc/react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: "Senda" };
  }
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/images/favicon.png", type: "image/png", sizes: "700x700" },
      ],
      apple: [{ url: "/images/favicon.png", sizes: "180x180" }],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale === "es" ? "es-AR" : "en"}
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-charcoal antialiased">
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
