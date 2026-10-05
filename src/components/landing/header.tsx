"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { HomeNavLink } from "~/components/landing/home-nav-link";
import { LanguageSwitch } from "~/components/landing/language-switch";
import { StartCtaLink } from "~/components/landing/start-cta-link";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Link } from "~/i18n/navigation";
import { toInternalPathname } from "~/i18n/routing";
import { BUSINESS_LOGIN_PATH, BUSINESS_PATH, navItems } from "~/lib/site";
import { cn } from "~/lib/utils";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = toInternalPathname(usePathname());
  const onBusiness = pathname === BUSINESS_PATH;

  return (
    <header className="border-stone/70 sticky top-0 z-50 rounded-b-2xl border-b bg-white">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <Link href="/" className="shrink-0" aria-label={t("home")}>
          <Image
            src="/images/logoverde.png"
            alt="Senda"
            width={430}
            height={101}
            className="h-8 w-auto"
            sizes="160px"
            priority
          />
        </Link>

        <nav
          aria-label={t("aria")}
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => {
            const isBusiness = item.key === "business" && pathname === BUSINESS_PATH;
            return (
              <HomeNavLink
                key={item.key}
                pathname={item.pathname}
                hash={"hash" in item ? item.hash : undefined}
                className={cn(
                  "text-charcoal text-[0.95rem] underline-offset-4 hover:underline",
                  isBusiness && "text-forest font-semibold",
                )}
              >
                {t(item.key)}
              </HomeNavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch className="lg:hidden" />
          <LanguageSwitch className="hidden lg:flex" />
          <Button
            variant="senda"
            size="cta"
            asChild
            className="hidden sm:inline-flex"
          >
            {onBusiness ? (
              <Link href={BUSINESS_LOGIN_PATH}>{t("login")}</Link>
            ) : (
              <StartCtaLink>{t("start")}</StartCtaLink>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="lg:hidden"
                aria-label={t("openMenu")}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream">
              <SheetHeader>
                <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 px-4"
                aria-label={t("ariaMobile")}
              >
                {navItems.map((item) => {
                  const isBusiness =
                    item.key === "business" && pathname === BUSINESS_PATH;
                  return (
                    <SheetClose asChild key={item.key}>
                      <HomeNavLink
                        pathname={item.pathname}
                        hash={"hash" in item ? item.hash : undefined}
                        className={cn(
                          "text-forest flex min-h-11 items-center rounded-xl px-3 py-3 text-lg",
                          isBusiness && "bg-cream-deep font-semibold",
                        )}
                      >
                        {t(item.key)}
                      </HomeNavLink>
                    </SheetClose>
                  );
                })}
                <div className="mt-4 px-3">
                  <LanguageSwitch />
                </div>
                <SheetClose asChild>
                  <Button
                    variant="senda"
                    size="cta"
                    asChild
                    className="mt-4 min-h-11"
                  >
                    {onBusiness ? (
                      <Link href={BUSINESS_LOGIN_PATH}>{t("login")}</Link>
                    ) : (
                      <StartCtaLink>{t("start")}</StartCtaLink>
                    )}
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
