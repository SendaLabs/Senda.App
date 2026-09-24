"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

import {
  ComingSoon1,
  type WaitlistFormStatus,
} from "~/components/21st/coming-soon-1";
import { Cta4 } from "~/components/21st/cta-4";

type JoinResponse =
  | { ok: true; duplicate?: boolean }
  | { ok: false; error: string; code?: string };

async function submitWaitlist(payload: {
  email: string;
  name?: string;
  locale: string;
  source: string;
}): Promise<JoinResponse> {
  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as JoinResponse;
    if (data && typeof data === "object" && "ok" in data) {
      return data;
    }

    return { ok: false, error: "network", code: String(response.status) };
  } catch {
    return { ok: false, error: "network" };
  }
}

export function WaitlistJoinForm({ variant }: { variant: "hero" | "band" }) {
  const t = useTranslations("waitlist.form");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<WaitlistFormStatus>("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus("error");
      setErrorKey("required");
      return;
    }

    setStatus("loading");
    setErrorKey(null);

    const result = await submitWaitlist({
      email: trimmedEmail,
      name: name.trim() || undefined,
      locale,
      source: variant,
    });

    if (!result.ok) {
      setStatus("error");
      setErrorKey(result.error === "invalid" ? "invalid" : "generic");
      return;
    }

    setStatus(result.duplicate ? "duplicate" : "success");
  }

  const errorMessage =
    errorKey === "required"
      ? t("errors.required")
      : errorKey === "invalid"
        ? t("errors.invalid")
        : errorKey
          ? t("errors.generic")
          : undefined;

  if (variant === "band") {
    return (
      <Cta4
        title={t("bandTitle")}
        description={t("bandDescription")}
        emailLabel={t("email")}
        emailPlaceholder={t("emailPlaceholder")}
        submitLabel={t("submit")}
        submittingLabel={t("submitting")}
        privacyNote={t("privacy")}
        successMessage={t("success")}
        duplicateMessage={t("duplicate")}
        errorMessage={errorMessage}
        status={status}
        email={email}
        onEmailChange={(value) => {
          setEmail(value);
          if (status === "error") setStatus("idle");
        }}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <ComingSoon1
      title={t("title")}
      description={t("description")}
      emailLabel={t("email")}
      emailPlaceholder={t("emailPlaceholder")}
      nameLabel={t("name")}
      namePlaceholder={t("namePlaceholder")}
      submitLabel={t("submit")}
      submittingLabel={t("submitting")}
      socialProof={t("socialProof")}
      privacyNote={t("privacy")}
      status={status}
      errorMessage={errorMessage}
      successMessage={t("success")}
      duplicateMessage={t("duplicate")}
      email={email}
      name={name}
      onEmailChange={(value) => {
        setEmail(value);
        if (status === "error") setStatus("idle");
      }}
      onNameChange={setName}
      onSubmit={onSubmit}
    />
  );
}
