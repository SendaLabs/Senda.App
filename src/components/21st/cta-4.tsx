/**
 * 21st.dev community — @7ovr/cta-4
 * Source: https://7ovr.com/r/cta-4.json
 * Listing: https://21st.dev/@7ovr/cta-4
 * License: MIT-0
 * Adapted for Senda waitlist email capture (forest band, ArrowRight).
 */
"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

import type { WaitlistFormStatus } from "~/components/21st/coming-soon-1";

type Cta4Props = {
  title: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  privacyNote: string;
  successMessage: string;
  duplicateMessage: string;
  errorMessage?: string;
  status: WaitlistFormStatus;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

export function Cta4({
  title,
  description,
  emailLabel,
  emailPlaceholder,
  submitLabel,
  submittingLabel,
  privacyNote,
  successMessage,
  duplicateMessage,
  errorMessage,
  status,
  email,
  onEmailChange,
  onSubmit,
  className,
}: Cta4Props) {
  const busy = status === "loading";
  const done = status === "success" || status === "duplicate";

  return (
    <section
      className={cn(
        "bg-forest text-cream flex w-full items-center justify-center px-5 py-16 md:px-8 md:py-20",
        className,
      )}
    >
      <div className="border-cream/20 bg-forest-soft/40 mx-auto w-full max-w-2xl rounded-2xl border px-6 py-12 text-center sm:px-12 sm:py-14">
        <h2 className="editorial-display text-cream text-3xl text-balance md:text-4xl">
          {title}
        </h2>
        <p className="text-cream/85 mx-auto mt-4 max-w-lg text-base leading-relaxed text-pretty md:text-lg">
          {description}
        </p>

        {done ? (
          <p
            className="bg-cream/10 text-cream mx-auto mt-8 max-w-md rounded-2xl px-5 py-4 text-base"
            role="status"
            aria-live="polite"
          >
            {status === "duplicate" ? duplicateMessage : successMessage}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-end"
            noValidate
          >
            <div className="flex-1 text-left">
              <Label htmlFor="cta4-email" className="sr-only">
                {emailLabel}
              </Label>
              <Input
                id="cta4-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                placeholder={emailPlaceholder}
                value={email}
                disabled={busy}
                aria-invalid={status === "error" ? true : undefined}
                onChange={(event) => onEmailChange(event.target.value)}
                className="border-cream/25 bg-cream/95 text-charcoal h-12 w-full rounded-xl px-4 text-base"
              />
            </div>
            <Button
              type="submit"
              variant="cream"
              size="cta"
              disabled={busy}
              className="h-12 shrink-0"
            >
              {busy ? submittingLabel : submitLabel}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </form>
        )}

        {status === "error" && errorMessage ? (
          <p className="text-cream mt-3 text-sm" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <p className="text-cream/70 mt-5 flex items-center justify-center gap-1.5 text-xs">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          {privacyNote}
        </p>
      </div>
    </section>
  );
}
