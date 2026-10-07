"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownRight, Mail } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface FaqSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  items: {
    question: string;
    answer: string;
  }[];
  contactInfo?: {
    title: string;
    description: string;
    buttonText: string;
    href?: string;
    onContact?: () => void;
    form?: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      submitLabel: string;
      successMessage: string;
      errorMessage: string;
    };
  };
}

const FaqSection = React.forwardRef<HTMLElement, FaqSectionProps>(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    const [showContactForm, setShowContactForm] = React.useState(false);

    return (
      <section
        ref={ref}
        className={cn("w-full bg-white py-12 md:py-14", className)}
        {...props}
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,38%)_minmax(0,1fr)] lg:gap-20 xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-start lg:col-start-1 lg:pt-2"
          >
            <h2 className="editorial-display text-forest text-2xl md:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="text-forest/75 mt-3 max-w-[32ch] text-base leading-relaxed">
                {description}
              </p>
            ) : null}
            {contactInfo ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 max-w-sm"
              >
                <div className="relative">
                  <div className="flex items-start gap-2">
                    <CornerDownRight
                      aria-hidden
                      strokeWidth={1.75}
                      className="text-forest mt-0.5 size-5 shrink-0"
                    />
                    <p className="text-forest font-serif text-xl leading-[1.15] whitespace-pre-line italic">
                      {contactInfo.title}
                    </p>
                  </div>
                  {contactInfo.form ? (
                    <>
                      <Button
                        type="button"
                        variant="senda"
                        size="sm"
                        aria-expanded={showContactForm}
                        onClick={() =>
                          setShowContactForm((current) => !current)
                        }
                        className="mt-8 h-12 min-w-52 rounded-full px-7 text-base"
                      >
                        <Mail className="size-5" />
                        {contactInfo.buttonText}
                      </Button>
                      {showContactForm ? (
                        <ContactForm copy={contactInfo.form} />
                      ) : null}
                    </>
                  ) : contactInfo.href ? (
                    <Button
                      variant="senda"
                      size="sm"
                      asChild
                      className="mt-8 h-12 min-w-52 rounded-full px-7 text-base"
                    >
                      <a href={contactInfo.href}>
                        <Mail className="size-5" />
                        {contactInfo.buttonText}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </motion.div>

          <div className="space-y-1.5 lg:col-start-2">
            {items.map((item, index) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
);
FaqSection.displayName = "FaqSection";

const FaqItem = React.forwardRef<
  HTMLDivElement,
  {
    question: string;
    answer: string;
    index: number;
  }
>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { question, answer, index } = props;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={cn(
        "group border-forest/15 hover:border-forest rounded-2xl border bg-white transition-all duration-200 ease-in-out",
        isOpen ? "bg-white" : "hover:bg-forest bg-white",
      )}
    >
      <Button
        type="button"
        variant="ghost"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="aria-expanded:bg-forest h-auto min-h-14 w-full justify-between rounded-xl bg-transparent px-4 py-3 text-left whitespace-normal hover:bg-transparent focus:bg-transparent active:bg-transparent aria-expanded:text-white md:px-5"
      >
        <h3
          className={cn(
            "text-left text-sm font-medium transition-colors duration-200 md:text-[0.95rem]",
            isOpen ? "text-white" : "text-black group-hover:text-white",
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "shrink-0 rounded-full p-0.5 transition-colors duration-200",
            isOpen ? "text-white" : "text-black group-hover:text-white",
          )}
        >
          <span className="text-xl leading-none font-normal">+</span>
        </motion.div>
      </Button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
          >
            <div className="px-6 pt-2 pb-4">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-sm leading-relaxed text-black"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
});
FaqItem.displayName = "FaqItem";

function ContactForm({
  copy,
}: {
  copy: NonNullable<FaqSectionProps["contactInfo"]>["form"];
}) {
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
      <label className="text-charcoal block text-sm">
        {copy?.nameLabel}
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className="border-stone focus:border-forest mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
        />
      </label>
      <label className="text-charcoal block text-sm">
        {copy?.emailLabel}
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border-stone focus:border-forest mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
        />
      </label>
      <label className="text-charcoal block text-sm">
        {copy?.messageLabel}
        <textarea
          name="message"
          required
          rows={4}
          className="border-stone focus:border-forest mt-1 w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none"
        />
      </label>
      <Button
        type="submit"
        variant="senda"
        size="sm"
        disabled={status === "sending"}
      >
        <Mail className="size-4" />
        {copy?.submitLabel}
      </Button>
      {status === "success" ? (
        <p role="status" className="text-forest text-sm">
          {copy?.successMessage}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm text-red-700">
          {copy?.errorMessage}
        </p>
      ) : null}
    </form>
  );
}

export { FaqSection };
