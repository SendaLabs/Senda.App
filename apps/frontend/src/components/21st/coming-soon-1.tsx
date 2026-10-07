/**
 * 21st.dev community — @7ovr/coming-soon-1
 * Source: https://7ovr.com/r/coming-soon-1.json
 * Listing: https://21st.dev/@7ovr/coming-soon-1
 * License: MIT-0
 * Adapted for Senda waitlist (brand tokens, Spanish copy props, real form).
 */
"use client";

import Image from "next/image";
import { Rocket } from "lucide-react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { site } from "~/lib/site";
import { cn } from "~/lib/utils";

export type WaitlistFormStatus = "idle" | "loading" | "success" | "duplicate" | "error";

type ComingSoon1Props = {
  title: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  socialProof: string;
  privacyNote: string;
  status: WaitlistFormStatus;
  errorMessage?: string;
  successMessage?: string;
  duplicateMessage?: string;
  email: string;
  name: string;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
  footer?: ReactNode;
};

export function ComingSoon1({
  title,
  description,
  emailLabel,
  emailPlaceholder,
  nameLabel,
  namePlaceholder,
  submitLabel,
  submittingLabel,
  socialProof,
  privacyNote,
  status,
  errorMessage,
  successMessage,
  duplicateMessage,
  email,
  name,
  onEmailChange,
  onNameChange,
  onSubmit,
  className,
  footer,
}: ComingSoon1Props) {
  const busy = status === "loading";
  const done = status === "success" || status === "duplicate";

  return (
    <section
      className={cn(
        "bg-cream text-charcoal flex w-full flex-col items-center justify-center gap-8 px-5 py-12 text-center md:px-8",
        className,
      )}
    >
      <div className="bg-forest/8 border-forest/15 flex size-12 items-center justify-center rounded-2xl border">
        <Rocket className="text-forest size-6" aria-hidden="true" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <h2 className="editorial-display text-forest max-w-[18ch] text-3xl md:text-4xl">
          {title}
        </h2>
        <p className="text-charcoal/80 max-w-md text-base leading-relaxed">
          {description}
        </p>
      </div>

      {done ? (
        <p
          className="bg-forest/8 text-forest max-w-md rounded-2xl px-5 py-4 text-base leading-relaxed"
          role="status"
          aria-live="polite"
        >
          {status === "duplicate" ? duplicateMessage : successMessage}
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-md flex-col gap-3 text-left"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="waitlist-name" className="text-forest text-sm">
              {nameLabel}
            </Label>
            <Input
              id="waitlist-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder={namePlaceholder}
              value={name}
              disabled={busy}
              onChange={(event) => onNameChange(event.target.value)}
              className="border-stone bg-white text-charcoal h-12 rounded-xl px-4 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="waitlist-email" className="text-forest text-sm">
              {emailLabel}
            </Label>
            <Input
              id="waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              placeholder={emailPlaceholder}
              value={email}
              disabled={busy}
              aria-invalid={status === "error" ? true : undefined}
              aria-describedby={
                status === "error" ? "waitlist-error" : "waitlist-privacy"
              }
              onChange={(event) => onEmailChange(event.target.value)}
              className="border-stone bg-white text-charcoal h-12 rounded-xl px-4 text-base"
            />
          </div>
          <Button
            type="submit"
            variant="senda"
            size="cta"
            disabled={busy}
            className="mt-1 min-h-12 w-full"
          >
            {busy ? submittingLabel : submitLabel}
          </Button>
          {status === "error" && errorMessage ? (
            <p
              id="waitlist-error"
              className="text-destructive text-sm"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}
          <p id="waitlist-privacy" className="text-forest/70 text-xs">
            {privacyNote}
          </p>
        </form>
      )}

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {["/images/P_Emilio.svg", "/images/P_Delfina.svg", "/images/P_Nicolas.png.svg"].map(
            (src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
                className="border-cream size-7 rounded-full border-2 object-cover"
              />
            ),
          )}
        </div>
        <span className="text-forest/75 text-xs">{socialProof}</span>
      </div>

      {footer ?? (
        <div className="text-forest/70 flex items-center gap-4">
          <a
            href={site.github}
            aria-label="GitHub"
            className="hover:text-forest"
            target="_blank"
            rel="noreferrer"
          >
            <GithubMark className="size-5" />
          </a>
          <a
            href={site.x}
            aria-label="X"
            className="hover:text-forest"
            target="_blank"
            rel="noreferrer"
          >
            <XMark className="size-5" />
          </a>
        </div>
      )}
    </section>
  );
}

type MarkProps = React.ComponentProps<"svg"> & { size?: number | string };

function GithubMark({ size = 24, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
    </svg>
  );
}

function XMark({ size = 24, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z" />
    </svg>
  );
}
