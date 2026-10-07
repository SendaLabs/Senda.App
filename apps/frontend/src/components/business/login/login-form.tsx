"use client";

import { ArrowRight, Eye, EyeOff, Info, Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FormEvent, useId, useState, useTransition } from "react";

import { Link, useRouter } from "~/i18n/navigation";
import { BUSINESS_DASHBOARD_PATH, site } from "~/lib/site";
import { cn } from "~/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { email?: string; password?: string };

export function LoginForm() {
  const t = useTranslations("business.login");
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showNotice, setShowNotice] = useState(false);
  const [isNavigating, startNavigation] = useTransition();
  const router = useRouter();

  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
  const forgotHref = `mailto:${site.email}?subject=${encodeURIComponent(t("forgotSubject"))}`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FieldErrors = {};
    if (!EMAIL_PATTERN.test(email.trim())) next.email = t("errors.email");
    if (!password) next.password = t("errors.password");
    setErrors(next);
    setShowNotice(false);
    if (Object.keys(next).length > 0) return;

    // Demo only: credentials are never sent or stored anywhere.
    setPassword("");
    startNavigation(() => router.push(BUSINESS_DASHBOARD_PATH));
  }

  return (
    <div className="w-full max-w-[22.5rem]">
      <h1 className="text-forest text-[2rem] leading-tight font-semibold tracking-[-0.03em]">
        {t("title")}
      </h1>
      <p className="text-charcoal/60 mt-1.5 text-[0.95rem]">{t("sub")}</p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor={emailId}
            className="text-charcoal mb-2 block text-sm font-medium"
          >
            {t("email")}
          </label>
          <div className="relative">
            <Mail
              className="text-charcoal/45 pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              id={emailId}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              className={inputClass(Boolean(errors.email))}
            />
          </div>
          {errors.email ? (
            <p id={`${emailId}-error`} className="mt-1.5 text-xs text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={passwordId}
            className="text-charcoal mb-2 block text-sm font-medium"
          >
            {t("password")}
          </label>
          <div className="relative">
            <Lock
              className="text-charcoal/45 pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={
                errors.password ? `${passwordId}-error` : undefined
              }
              className={cn(inputClass(Boolean(errors.password)), "pr-11")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? t("hidePassword") : t("showPassword")}
              aria-pressed={showPassword}
              className="text-charcoal/50 hover:text-forest focus-visible:ring-forest/30 absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg outline-none focus-visible:ring-2"
            >
              {showPassword ? (
                <EyeOff className="size-4" strokeWidth={1.75} />
              ) : (
                <Eye className="size-4" strokeWidth={1.75} />
              )}
            </button>
          </div>
          {errors.password ? (
            <p
              id={`${passwordId}-error`}
              className="mt-1.5 text-xs text-red-700"
            >
              {errors.password}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="text-charcoal flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="accent-forest size-4 cursor-pointer rounded"
            />
            {t("remember")}
          </label>
          <a
            href={forgotHref}
            className="text-forest font-medium underline underline-offset-4 hover:no-underline"
          >
            {t("forgot")}
          </a>
        </div>

        <button
          type="submit"
          disabled={isNavigating}
          aria-busy={isNavigating || undefined}
          className="bg-forest text-cream hover:bg-forest-soft focus-visible:ring-forest/40 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl text-[0.95rem] font-medium transition-colors outline-none focus-visible:ring-3 disabled:cursor-wait disabled:opacity-80"
        >
          {isNavigating ? t("submitting") : t("submit")}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </form>

      <div
        role="status"
        aria-live="polite"
        className={cn(showNotice ? "mt-5" : "sr-only")}
      >
        {showNotice ? (
          <div className="border-forest/15 bg-cream-deep text-forest flex gap-3 rounded-xl border px-4 py-3.5">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <div className="text-sm leading-relaxed">
              <p className="font-medium">{t("notice.title")}</p>
              <p className="text-charcoal/70 mt-1">{t("notice.copy")}</p>
              <Link
                href="/lista-de-espera"
                className="mt-2 inline-flex font-medium underline underline-offset-4 hover:no-underline"
              >
                {t("notice.cta")}
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <div className="my-6 flex items-center gap-4" aria-hidden>
        <span className="bg-stone h-px flex-1" />
        <span className="text-charcoal/50 text-xs">{t("divider")}</span>
        <span className="bg-stone h-px flex-1" />
      </div>

      <SocialButton label={t("google")} onClick={() => setShowNotice(true)}>
        <GoogleMark />
      </SocialButton>
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "text-charcoal placeholder:text-charcoal/40 h-12 w-full rounded-xl border bg-white pr-3.5 pl-10 text-[0.95rem] transition-colors outline-none focus-visible:ring-3",
    invalid
      ? "border-red-600/70 focus-visible:ring-red-600/15"
      : "border-stone focus-visible:border-forest/50 focus-visible:ring-forest/15",
  );
}

function SocialButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-stone text-charcoal hover:bg-cream focus-visible:ring-forest/30 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl border bg-white px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3"
    >
      {children}
      {label}
    </button>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.1rem]" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.8 14.2a6.6 6.6 0 0 1 0-4.4V7H2.1a11 11 0 0 0 0 10l3.7-2.8Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4Z"
      />
    </svg>
  );
}
