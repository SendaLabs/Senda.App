"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { Link } from "~/i18n/navigation";
import {
  getMarketingStartHref,
  isInternalMarketingPath,
  WAITLIST_PATH,
} from "~/lib/marketing-cta";
import type { AppPathname } from "~/i18n/routing";
import { cn } from "~/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

/**
 * Primary marketing CTA. Destination flips via NEXT_PUBLIC_MARKETING_CTA_MODE.
 */
export const StartCtaLink = forwardRef<HTMLAnchorElement, Props>(
  function StartCtaLink({ children, className, ...rest }, ref) {
    const href = getMarketingStartHref();

    if (isInternalMarketingPath(href)) {
      const pathname: AppPathname =
        href === WAITLIST_PATH ? WAITLIST_PATH : "/";
      return (
        <Link href={pathname} ref={ref} className={cn(className)} {...rest}>
          {children}
        </Link>
      );
    }

    const external = href.startsWith("http");

    return (
      <a
        href={href}
        ref={ref}
        className={cn(className)}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
