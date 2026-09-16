"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

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
  return (
    <header className="border-stone/70 sticky top-0 z-50 -mb-[4.5rem] rounded-b-2xl border bg-white shadow-sm">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <Link href="#top" className="shrink-0" aria-label="Senda, inicio">
          <Image
            src="/images/logoverde.png"
            alt="Senda"
            width={430}
            height={101}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-charcoal text-[0.95rem] underline-offset-4 hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="senda"
            size="cta"
            asChild
            className="hidden sm:inline-flex"
          >
            <a href={site.startHref}>Empezar envío</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream">
              <SheetHeader>
                <SheetTitle className="sr-only">Menú</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Móvil">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="text-forest rounded-xl px-3 py-3 text-lg"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button variant="senda" size="cta" asChild className="mt-4">
                    <a href={site.startHref}>Empezar envío</a>
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
