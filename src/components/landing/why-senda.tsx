"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Shell } from "~/components/landing/shell";
import { site } from "~/lib/site";

// Double checkmark icon for WhatsApp messages
function DoubleCheck() {
  return (
    <span
      className="ml-1.5 inline-flex items-center select-none text-[11px] font-bold text-[#45b7e8]"
      title="Leído"
    >
      <svg
        viewBox="0 0 16 11"
        className="inline size-3.5 fill-current"
        aria-hidden="true"
      >
        <path d="M11.05.2a.75.75 0 0 1 1.06 0l3.69 3.69a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0L3.5 8.71a.75.75 0 1 1 1.06-1.06l3.18 3.18 6.97-6.97a.75.75 0 0 1 .34-.66zm-4 0a.75.75 0 0 1 1.06 0L9.4 1.49a.75.75 0 1 1-1.06 1.06L7.58 1.8 3.86 5.52a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 .25-.26z" />
      </svg>
    </span>
  );
}

// Circular Colombia flag badge for Card 1
function ColombiaFlag() {
  return (
    <div
      className="relative size-6 shrink-0 overflow-hidden rounded-full shadow-xs ring-1 ring-black/10"
      aria-label="Bandera de Colombia"
    >
      <div className="h-1/2 w-full bg-[#FCD116]" />
      <div className="h-1/4 w-full bg-[#003893]" />
      <div className="h-1/4 w-full bg-[#CE1126]" />
    </div>
  );
}

export function WhySenda() {
  const t = useTranslations("why");
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="por-que-senda"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#f4f7f5] via-[#eaf2ed] to-[#f4f1e8] py-16 md:py-24"
    >
      {/* Soft atmospheric gradient highlights */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 size-[560px] rounded-full bg-emerald-200/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-24 size-[480px] rounded-full bg-emerald-100/40 blur-3xl"
        aria-hidden="true"
      />
      {/* Decorative curved landscape wave at the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#cadccb]/35 via-[#dae8dc]/20 to-transparent"
        aria-hidden="true"
      />

      <Shell className="relative z-10">
        {/* Top Section: Header on left, WhatsApp 3D button + handwritten note on right */}
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          {/* Left: Badge, Title, Subtitle matching landing page typography */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-[#daf1e4] px-3.5 py-1 text-xs font-semibold tracking-wider text-forest uppercase shadow-xs">
              <Sparkles className="size-3.5 fill-forest text-forest" />
              <span>{t("badge")}</span>
            </div>

            <h2 className="editorial-display text-forest mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {t("title_line1")}
              <br />
              {t("title_line2")}
            </h2>

            <p className="text-charcoal/80 mt-3.5 max-w-xl text-base leading-relaxed md:text-lg">
              {t("subtitle")}
            </p>
          </div>

          {/* Right: Handwritten note + 3D WhatsApp button + 3D Globe */}
          <div className="relative flex items-center justify-end self-end pt-4 lg:self-start lg:pt-0">
            {/* Handwritten Note Top Right (Vector HTML with Caveat font — never clipped) */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative z-20 mr-2 flex flex-col items-end select-none"
            >
              <div className="font-handwriting text-forest/90 text-right text-lg leading-[1.2] -rotate-2 sm:text-xl lg:text-2xl">
                <p>Tu asistente</p>
                <p>financiero,</p>
                <p>siempre disponible</p>
                <p>por WhatsApp.</p>
                <p className="mt-0.5 text-xl sm:text-2xl">♡</p>
              </div>
              <svg
                width="48"
                height="38"
                viewBox="0 0 48 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-forest/75 mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M6 6 C 16 12, 30 18, 38 28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M29 30 L 39 29 L 37 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* 3D WhatsApp Button with clean floating movement */}
            <motion.a
              href={site.startHref}
              target="_blank"
              rel="noreferrer"
              className="group relative z-20 flex cursor-pointer items-center justify-center transition-transform hover:scale-105 active:scale-95"
              aria-label="Abrir Senda en WhatsApp"
              animate={reduce ? undefined : { y: [-4, 4, -4] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Radiating sound waves behind the WhatsApp button */}
              <div
                className="pointer-events-none absolute -top-3 -right-2 flex gap-1 select-none text-emerald-600/70"
                aria-hidden="true"
              >
                <span className="animate-pulse text-sm font-bold">)</span>
                <span className="animate-pulse text-base font-bold" style={{ animationDelay: "150ms" }}>
                  )
                </span>
                <span className="animate-pulse text-lg font-bold" style={{ animationDelay: "300ms" }}>
                  )
                </span>
              </div>

              {/* Circular soft ambient glow (completely circular, NO square box) */}
              <div
                className="pointer-events-none absolute inset-3 -z-10 rounded-full bg-emerald-500/20 blur-xl"
                aria-hidden="true"
              />

              <Image
                src="/images/why-senda/whatsapp_clean.png"
                alt="WhatsApp Senda"
                width={112}
                height={112}
                priority
                className="h-24 w-24 select-none md:h-28 md:w-28"
              />
            </motion.a>

            {/* 3D Glowing Globe on far right */}
            <div
              className="pointer-events-none absolute -top-12 -right-8 z-10 hidden select-none md:block lg:-top-16 lg:-right-14"
              aria-hidden="true"
            >
              <motion.div
                animate={reduce ? undefined : { y: [-4, 4, -4], scale: [1, 1.02, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Circular soft ambient glow */}
                <div
                  className="pointer-events-none absolute inset-4 -z-10 rounded-full bg-emerald-400/20 blur-2xl"
                  aria-hidden="true"
                />
                <Image
                  src="/images/why-senda/globe_clean.png"
                  alt=""
                  width={144}
                  height={230}
                  className="h-auto w-32 select-none opacity-90 lg:w-40"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Paper Airplane on the left */}
        <div
          className="pointer-events-none absolute top-56 -left-6 z-10 hidden select-none md:block lg:top-48 lg:-left-4"
          aria-hidden="true"
        >
          <motion.div
            animate={reduce ? undefined : { y: [-8, 8, -8], rotate: [-1, 2, -1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Circular soft ambient glow */}
            <div
              className="pointer-events-none absolute inset-3 -z-10 rounded-full bg-emerald-300/20 blur-xl"
              aria-hidden="true"
            />
            <Image
              src="/images/why-senda/airplane_clean.png"
              alt=""
              width={140}
              height={120}
              className="h-auto w-28 select-none lg:w-36"
            />
          </motion.div>
        </div>

        {/* Floating Coins on bottom left */}
        <div
          className="pointer-events-none absolute -bottom-4 -left-6 z-10 hidden select-none md:block lg:-bottom-2 lg:-left-4"
          aria-hidden="true"
        >
          <motion.div
            animate={reduce ? undefined : { y: [-5, 5, -5] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="relative"
          >
            {/* Circular soft ambient glow */}
            <div
              className="pointer-events-none absolute inset-3 -z-10 rounded-full bg-emerald-400/15 blur-xl"
              aria-hidden="true"
            />
            <Image
              src="/images/why-senda/coins_clean.png"
              alt=""
              width={150}
              height={130}
              className="h-auto w-32 select-none lg:w-40"
            />
          </motion.div>
        </div>

        {/* Handwritten Note on bottom right (Vector HTML with Caveat font — never clipped) */}
        <div
          className="pointer-events-none absolute -right-2 bottom-12 z-20 hidden select-none lg:block xl:right-4"
          aria-hidden="true"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-handwriting text-forest/90 select-none text-left text-lg leading-[1.2] rotate-2 sm:text-xl lg:text-2xl"
          >
            <p>Simple,</p>
            <p>rápido</p>
            <p>y seguro.</p>
            <p className="mt-0.5 text-xl sm:text-2xl">♡</p>
            <svg
              width="44"
              height="36"
              viewBox="0 0 44 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-forest/75 mt-0.5 -scale-x-100"
              aria-hidden="true"
            >
              <path
                d="M6 6 C 14 12, 24 20, 34 28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M26 30 L 35 29 L 33 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* 5 Chat Cards Grid */}
        <div className="relative z-10 mt-10 space-y-5 md:mt-12 md:space-y-6">
          {/* Row 1: 2 Cards (Remesas & Comisiones) */}
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Card 1: #Remesas */}
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="group relative flex flex-col justify-between rounded-[24px] border border-forest/10 bg-white/95 p-5 shadow-[0_12px_32px_rgba(18,60,54,0.06)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(18,60,54,0.12)] md:p-6"
            >
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-[84%] rounded-2xl rounded-tr-xs bg-[#dcf8c6] px-3.5 py-2.5 shadow-xs">
                    <p className="text-[13.5px] leading-snug font-normal text-[#111b21]">
                      {t("cards.remesas.user")}
                    </p>
                    <div className="mt-1 flex items-center justify-end text-[10px] text-gray-500">
                      <span>{t("cards.remesas.user_time")}</span>
                      <DoubleCheck />
                    </div>
                  </div>
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full shadow-xs">
                    <Image
                      src="/images/why-senda/avatar_user.png"
                      alt="Usuario"
                      width={28}
                      height={28}
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                {/* Senda Response */}
                <div className="flex items-start gap-2.5">
                  {/* Official Senda Logo in Avatar */}
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-[#183129] shadow-xs ring-1 ring-forest/20">
                    <Image
                      src="/images/favicon.png"
                      alt="Logo Senda"
                      width={28}
                      height={28}
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                  <div className="max-w-[88%] space-y-2.5">
                    <div className="rounded-2xl rounded-tl-xs bg-[#f2f6f4] px-4 py-3 shadow-xs">
                      {/* Name with mini Senda Logo */}
                      <div className="mb-1 flex items-center gap-1.5">
                        <div className="relative size-3.5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src="/images/favicon.png"
                            alt=""
                            width={14}
                            height={14}
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-forest">Senda</span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed font-normal text-charcoal">
                        {t("cards.remesas.bot")}
                      </p>

                      {/* Recipient Details Sub-card */}
                      <div className="mt-2.5 rounded-xl border border-[#d8e4dd] bg-white p-3 shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <ColombiaFlag />
                          <div>
                            <p className="text-sm font-semibold text-forest">
                              {t("cards.remesas.recipient_name")}
                            </p>
                            <p className="text-xs text-charcoal/70">
                              {t("cards.remesas.recipient_alias")}
                            </p>
                            <p className="text-xs text-charcoal/70">
                              {t("cards.remesas.recipient_bank")}
                            </p>
                          </div>
                        </div>
                        <div className="mt-1 flex justify-end text-[10px] text-gray-400">
                          {t("cards.remesas.bot_time")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag */}
              <div className="mt-5 pt-2">
                <span className="inline-flex cursor-default items-center rounded-full bg-forest/5 px-3 py-1 text-xs font-medium text-forest transition-colors hover:bg-forest/10">
                  {t("cards.remesas.tag")}
                </span>
              </div>
            </motion.article>

            {/* Card 2: #Comisiones */}
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="group relative flex flex-col justify-between rounded-[24px] border border-forest/10 bg-white/95 p-5 shadow-[0_12px_32px_rgba(18,60,54,0.06)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(18,60,54,0.12)] md:p-6"
            >
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-[84%] rounded-2xl rounded-tr-xs bg-[#dcf8c6] px-3.5 py-2.5 shadow-xs">
                    <p className="text-[13.5px] leading-snug font-normal text-[#111b21]">
                      {t("cards.comisiones.user")}
                    </p>
                    <div className="mt-1 flex items-center justify-end text-[10px] text-gray-500">
                      <span>{t("cards.comisiones.user_time")}</span>
                      <DoubleCheck />
                    </div>
                  </div>
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full shadow-xs">
                    <Image
                      src="/images/why-senda/avatar_user.png"
                      alt="Usuario"
                      width={28}
                      height={28}
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                {/* Senda Response */}
                <div className="flex items-start gap-2.5">
                  {/* Official Senda Logo in Avatar */}
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-[#183129] shadow-xs ring-1 ring-forest/20">
                    <Image
                      src="/images/favicon.png"
                      alt="Logo Senda"
                      width={28}
                      height={28}
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                  <div className="max-w-[88%]">
                    <div className="rounded-2xl rounded-tl-xs bg-[#f2f6f4] px-4 py-3 shadow-xs">
                      {/* Name with mini Senda Logo */}
                      <div className="mb-1 flex items-center gap-1.5">
                        <div className="relative size-3.5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src="/images/favicon.png"
                            alt=""
                            width={14}
                            height={14}
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-forest">Senda</span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed font-normal text-charcoal">
                        {t("cards.comisiones.bot")}
                      </p>
                      <div className="mt-1 flex justify-end text-[10px] text-gray-400">
                        {t("cards.comisiones.bot_time")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag */}
              <div className="mt-5 pt-2">
                <span className="inline-flex cursor-default items-center rounded-full bg-forest/5 px-3 py-1 text-xs font-medium text-forest transition-colors hover:bg-forest/10">
                  {t("cards.comisiones.tag")}
                </span>
              </div>
            </motion.article>
          </div>

          {/* Row 2: 3 Cards (Ahorro, Efectivo, Seguimiento) */}
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {/* Card 3: #Ahorro */}
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="group relative flex flex-col justify-between rounded-[24px] border border-forest/10 bg-white/95 p-5 shadow-[0_12px_32px_rgba(18,60,54,0.06)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(18,60,54,0.12)] md:p-6"
            >
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-[#dcf8c6] px-3.5 py-2.5 shadow-xs">
                    <p className="text-[13.5px] leading-snug font-normal text-[#111b21]">
                      {t("cards.ahorro.user")}
                    </p>
                    <div className="mt-1 flex items-center justify-end text-[10px] text-gray-500">
                      <span>{t("cards.ahorro.user_time")}</span>
                      <DoubleCheck />
                    </div>
                  </div>
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full shadow-xs">
                    <Image
                      src="/images/why-senda/avatar_user.png"
                      alt="Usuario"
                      width={28}
                      height={28}
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                {/* Senda Response */}
                <div className="flex items-start gap-2.5">
                  {/* Official Senda Logo in Avatar */}
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-[#183129] shadow-xs ring-1 ring-forest/20">
                    <Image
                      src="/images/favicon.png"
                      alt="Logo Senda"
                      width={28}
                      height={28}
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                  <div className="max-w-[88%]">
                    <div className="rounded-2xl rounded-tl-xs bg-[#f2f6f4] px-4 py-3 shadow-xs">
                      {/* Name with mini Senda Logo */}
                      <div className="mb-1 flex items-center gap-1.5">
                        <div className="relative size-3.5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src="/images/favicon.png"
                            alt=""
                            width={14}
                            height={14}
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-forest">Senda</span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed font-normal text-charcoal">
                        {t("cards.ahorro.bot")}
                      </p>
                      <div className="mt-1 flex justify-end text-[10px] text-gray-400">
                        {t("cards.ahorro.bot_time")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag */}
              <div className="mt-5 pt-2">
                <span className="inline-flex cursor-default items-center rounded-full bg-forest/5 px-3 py-1 text-xs font-medium text-forest transition-colors hover:bg-forest/10">
                  {t("cards.ahorro.tag")}
                </span>
              </div>
            </motion.article>

            {/* Card 4: #Efectivo */}
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="group relative flex flex-col justify-between rounded-[24px] border border-forest/10 bg-white/95 p-5 shadow-[0_12px_32px_rgba(18,60,54,0.06)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(18,60,54,0.12)] md:p-6"
            >
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-[#dcf8c6] px-3.5 py-2.5 shadow-xs">
                    <p className="text-[13.5px] leading-snug font-normal text-[#111b21]">
                      {t("cards.efectivo.user")}
                    </p>
                    <div className="mt-1 flex items-center justify-end text-[10px] text-gray-500">
                      <span>{t("cards.efectivo.user_time")}</span>
                      <DoubleCheck />
                    </div>
                  </div>
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full shadow-xs">
                    <Image
                      src="/images/why-senda/avatar_user.png"
                      alt="Usuario"
                      width={28}
                      height={28}
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                {/* Senda Response */}
                <div className="flex items-start gap-2.5">
                  {/* Official Senda Logo in Avatar */}
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-[#183129] shadow-xs ring-1 ring-forest/20">
                    <Image
                      src="/images/favicon.png"
                      alt="Logo Senda"
                      width={28}
                      height={28}
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                  <div className="max-w-[88%]">
                    <div className="rounded-2xl rounded-tl-xs bg-[#f2f6f4] px-4 py-3 shadow-xs">
                      {/* Name with mini Senda Logo */}
                      <div className="mb-1 flex items-center gap-1.5">
                        <div className="relative size-3.5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src="/images/favicon.png"
                            alt=""
                            width={14}
                            height={14}
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-forest">Senda</span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed font-normal text-charcoal">
                        {t("cards.efectivo.bot")}
                      </p>
                      <div className="mt-1 flex justify-end text-[10px] text-gray-400">
                        {t("cards.efectivo.bot_time")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag */}
              <div className="mt-5 pt-2">
                <span className="inline-flex cursor-default items-center rounded-full bg-forest/5 px-3 py-1 text-xs font-medium text-forest transition-colors hover:bg-forest/10">
                  {t("cards.efectivo.tag")}
                </span>
              </div>
            </motion.article>

            {/* Card 5: #Seguimiento */}
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="group relative flex flex-col justify-between rounded-[24px] border border-forest/10 bg-white/95 p-5 shadow-[0_12px_32px_rgba(18,60,54,0.06)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(18,60,54,0.12)] md:p-6"
            >
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-[#dcf8c6] px-3.5 py-2.5 shadow-xs">
                    <p className="text-[13.5px] leading-snug font-normal text-[#111b21]">
                      {t("cards.seguimiento.user")}
                    </p>
                    <div className="mt-1 flex items-center justify-end text-[10px] text-gray-500">
                      <span>{t("cards.seguimiento.user_time")}</span>
                      <DoubleCheck />
                    </div>
                  </div>
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full shadow-xs">
                    <Image
                      src="/images/why-senda/avatar_user.png"
                      alt="Usuario"
                      width={28}
                      height={28}
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                {/* Senda Response */}
                <div className="flex items-start gap-2.5">
                  {/* Official Senda Logo in Avatar */}
                  <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-[#183129] shadow-xs ring-1 ring-forest/20">
                    <Image
                      src="/images/favicon.png"
                      alt="Logo Senda"
                      width={28}
                      height={28}
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                  <div className="max-w-[88%]">
                    <div className="rounded-2xl rounded-tl-xs bg-[#f2f6f4] px-4 py-3 shadow-xs">
                      {/* Name with mini Senda Logo */}
                      <div className="mb-1 flex items-center gap-1.5">
                        <div className="relative size-3.5 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src="/images/favicon.png"
                            alt=""
                            width={14}
                            height={14}
                            className="size-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold text-forest">Senda</span>
                      </div>
                      <p className="text-[13.5px] leading-relaxed font-normal text-charcoal">
                        {t("cards.seguimiento.bot")}
                      </p>
                      <div className="mt-1 flex justify-end text-[10px] text-gray-400">
                        {t("cards.seguimiento.bot_time")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag */}
              <div className="mt-5 pt-2">
                <span className="inline-flex cursor-default items-center rounded-full bg-forest/5 px-3 py-1 text-xs font-medium text-forest transition-colors hover:bg-forest/10">
                  {t("cards.seguimiento.tag")}
                </span>
              </div>
            </motion.article>
          </div>
        </div>

        {/* Bottom CTA Button: Ver más preguntas frecuentes */}
        <div className="relative z-10 mt-12 flex justify-center md:mt-14">
          <Link
            href="#preguntas"
            className="group inline-flex items-center gap-2.5 rounded-full border border-forest/20 bg-white px-6 py-3 text-sm font-medium text-forest shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-forest/40 hover:bg-cream/40 hover:shadow-md md:text-base"
          >
            <MessageSquare className="size-4 text-forest transition-transform duration-200 group-hover:scale-110" />
            <span>{t("cta_faq")}</span>
            <ArrowRight className="size-4 text-forest transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </Shell>
    </section>
  );
}
