"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Shell } from "~/components/landing/shell";

const GAP_S = 0.4;
const TYPING_S = 0.6;
const BUBBLE_MS = 380;
const AMOUNT_TARGET = 270_000;

type ChatMessage = { side: "in" | "out"; text: string };

function buildSchedule(messages: ChatMessage[]) {
  return messages.reduce<
    { side: "in" | "out"; text: string; typingAt: number | null; appearAt: number }[]
  >((acc, message) => {
    const prev = acc.at(-1);
    let cursor = prev ? prev.appearAt + GAP_S : 0;
    const typingAt = message.side === "out" ? cursor : null;
    if (message.side === "out") cursor += TYPING_S;
    acc.push({ ...message, typingAt, appearAt: cursor });
    return acc;
  }, []);
}

export function WhatsAppFlow() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const reduce = useReducedMotion() ?? false;
  const [inView, setInView] = useState(false);
  const started = reduce || inView;
  const schedule = useMemo(
    () => buildSchedule(t.raw("messages") as ChatMessage[]),
    [t],
  );
  const chatEndsAt = (schedule.at(-1)?.appearAt ?? 0) + GAP_S;

  return (
    <section className="bg-cream-deep py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[16ch] text-4xl text-forest md:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-charcoal/80">
          {t("lead")}
        </p>

        <motion.div
          className="mt-12 grid min-w-0 gap-6 lg:grid-cols-2"
          viewport={{ once: true, amount: 0.28 }}
          onViewportEnter={() => setInView(true)}
        >
          <article className="min-w-0 overflow-hidden rounded-2xl bg-forest p-5 text-cream shadow-[0_18px_40px_rgba(10,43,32,0.28)] md:p-7">
            <p className="text-sm text-cream/70">{t("sender")}</p>
            <div className="mt-6 space-y-3">
              {schedule.map((message) => (
                <ChatLine
                  key={message.text}
                  message={message}
                  started={started}
                  reduce={reduce}
                />
              ))}
            </div>
          </article>

          <ReceiverCard
            started={started}
            reduce={reduce}
            chatEndsAt={chatEndsAt}
            locale={locale === "es" ? "es-AR" : "en-US"}
            copy={{
              receiver: t("receiver"),
              mp: t("mp"),
              received: t("received"),
              note: t("note"),
            }}
          />
        </motion.div>
      </Shell>
    </section>
  );
}

function ChatLine({
  message,
  started,
  reduce,
}: {
  message: { side: "in" | "out"; text: string; typingAt: number | null; appearAt: number };
  started: boolean;
  reduce: boolean;
}) {
  const [phase, setPhase] = useState<"idle" | "typing" | "shown">(
    reduce ? "shown" : "idle",
  );

  useEffect(() => {
    if (!started || reduce) return;

    const timers: number[] = [];
    if (message.typingAt !== null) {
      timers.push(
        window.setTimeout(
          () => setPhase("typing"),
          message.typingAt * 1000,
        ),
      );
    }
    timers.push(
      window.setTimeout(() => setPhase("shown"), message.appearAt * 1000),
    );
    return () => {
      for (const id of timers) window.clearTimeout(id);
    };
  }, [message.appearAt, message.typingAt, reduce, started]);

  if (phase === "idle") {
    return message.side === "out" ? (
      <div className="min-h-[2.75rem]" aria-hidden />
    ) : null;
  }

  if (phase === "typing") {
    return (
      <div className="mr-auto flex min-h-[2.75rem] w-fit max-w-[85%] items-center gap-1 rounded-2xl rounded-tl-sm bg-forest-soft px-4 py-3 shadow-[0_8px_18px_rgba(10,43,32,0.28)]">
        <TypingDots />
      </div>
    );
  }

  return (
    <motion.p
      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reduce
          ? { duration: 0.2 }
          : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
      }
      className={
        message.side === "in"
          ? "ml-auto max-w-[85%] break-words rounded-2xl rounded-tr-sm bg-cream px-4 py-3 text-sm leading-relaxed text-charcoal shadow-[0_8px_18px_rgba(10,43,32,0.14)]"
          : "mr-auto min-h-[2.75rem] max-w-[85%] break-words rounded-2xl rounded-tl-sm bg-forest-soft px-4 py-3 text-sm leading-relaxed text-cream shadow-[0_8px_18px_rgba(10,43,32,0.32)]"
      }
    >
      {message.text}
    </motion.p>
  );
}

function TypingDots() {
  const t = useTranslations("chat");
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="bg-cream/80 size-1.5 rounded-full motion-safe:animate-[chat-dot_0.9s_ease-in-out_infinite]"
          style={{ animationDelay: `${index * 0.16}s` }}
        />
      ))}
      <span className="sr-only">{t("typing")}</span>
    </span>
  );
}

function ReceiverCard({
  started,
  reduce,
  chatEndsAt,
  locale,
  copy,
}: {
  started: boolean;
  reduce: boolean;
  chatEndsAt: number;
  locale: string;
  copy: {
    receiver: string;
    mp: string;
    received: string;
    note: string;
  };
}) {
  const [visible, setVisible] = useState(reduce);

  useEffect(() => {
    if (!started || reduce) return;
    const id = window.setTimeout(
      () => setVisible(true),
      chatEndsAt * 1000 + BUBBLE_MS,
    );
    return () => window.clearTimeout(id);
  }, [chatEndsAt, reduce, started]);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, scale: 0.97, y: 12 }}
      animate={
        visible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.97, y: reduce ? 0 : 12 }
      }
      transition={{ duration: reduce ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-0 rounded-2xl bg-white p-5 shadow-[0_18px_42px_rgba(18,60,54,0.12)] md:p-7"
    >
      <p className="text-sm text-forest/70">{copy.receiver}</p>
      <div className="mt-8 rounded-2xl bg-cream p-6 shadow-[0_10px_24px_rgba(18,60,54,0.08)]">
        <p className="text-sm text-forest/70">{copy.mp}</p>
        <div className="mt-3 flex items-center gap-3">
          <p className="text-4xl tabular-nums tracking-tight text-forest">
            <CountUp
              value={AMOUNT_TARGET}
              active={visible}
              reduce={reduce}
              locale={locale}
            />
          </p>
          <DrawnCheck active={visible} reduce={reduce} />
        </div>
        <p className="mt-2 text-base text-charcoal/80">{copy.received}</p>
        <p className="mt-8 max-w-[40ch] text-sm leading-relaxed text-forest/80">
          {copy.note}
        </p>
      </div>
    </motion.article>
  );
}

function CountUp({
  value,
  active,
  reduce,
  locale,
}: {
  value: number;
  active: boolean;
  reduce: boolean;
  locale: string;
}) {
  const [amount, setAmount] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setAmount(value);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setAmount(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, reduce, value]);

  return `+$${amount.toLocaleString(locale)}`;
}

function DrawnCheck({
  active,
  reduce,
}: {
  active: boolean;
  reduce: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="text-forest size-8 shrink-0"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="opacity-25"
      />
      <motion.path
        d="M7.2 12.4 10.4 15.6 16.8 8.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: active || reduce ? 1 : 0 }}
        transition={{ duration: reduce ? 0.2 : 0.55, delay: reduce ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
