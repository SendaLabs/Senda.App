"use client";

import { useLocale } from "next-intl";
import { type ReactNode } from "react";

import { Link } from "~/i18n/navigation";
import type { BUSINESS_PATH } from "~/lib/site";

type HomePath = "/" | typeof BUSINESS_PATH;

type Props = {
  pathname?: HomePath;
  hash?: string;
  className?: string;
  children: ReactNode;
};

export function HomeNavLink({
  pathname = "/",
  hash,
  className,
  children,
}: Props) {
  const locale = useLocale();

  if (hash && pathname === "/") {
    return (
      <a href={`/${locale}#${hash}`} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={pathname} className={className}>
      {children}
    </Link>
  );
}
