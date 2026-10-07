"use client";

import { Menu } from "lucide-react";
import type { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function DashboardMobileNav({
  openLabel,
  title,
  children,
}: {
  openLabel: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={openLabel}
          className="focus-visible:ring-cream/40 flex size-11 items-center justify-center rounded-xl text-white outline-none hover:bg-white/10 focus-visible:ring-2"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[17rem] border-none bg-[#061f1b] p-0 text-white [&>button]:text-white/70 [&>button]:hover:bg-white/10"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
