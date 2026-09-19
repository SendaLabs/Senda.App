"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { LanguageSwitch } from "~/components/landing/language-switch";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { navItems, site } from "~/lib/site";

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header className="border-stone/70 sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <Link href="#top" className="shrink-0" aria-label={t("home")}>
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
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-charcoal text-[0.95rem] underline-offset-4 hover:underline"
            >
              {t(item.key)}
            </a>
          ))}
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
            <a href={site.startHref}>{t("start")}</a>
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
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="text-forest flex min-h-11 items-center rounded-xl px-3 py-3 text-lg"
                    >
                      {t(item.key)}
                    </a>
                  </SheetClose>
                ))}
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
                    <a href={site.startHref}>{t("start")}</a>
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
