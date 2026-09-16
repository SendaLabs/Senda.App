"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";

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
  };
}

const FaqSection = React.forwardRef<HTMLElement, FaqSectionProps>(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full bg-white py-14 md:py-16", className)}
        {...props}
      >
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,38%)_minmax(0,1fr)] lg:gap-20 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-start lg:col-start-1 lg:pt-2"
          >
            <h2 className="editorial-display text-forest text-3xl md:text-[3.5rem]">
              {title}
            </h2>
            {description ? (
              <p className="text-forest/75 mt-4 max-w-[32ch] text-[17px] leading-relaxed">
                Encontrá acá las respuestas a las dudas más comunes sobre Senda.
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
                  <div className="relative origin-left -rotate-3">
                    <svg
                      viewBox="0 0 48 58"
                      aria-hidden="true"
                      className="text-forest absolute top-1 left-0 h-14 w-10"
                    >
                      <path
                        d="M43 4C25 5 10 15 8 31c-1 8 2 14 8 18"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 49 6 53M18 49l-7-11"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="5"
                      />
                    </svg>
                    <p className="text-forest pl-12 font-serif text-xl leading-[1.05] whitespace-pre-line italic">
                      {contactInfo.title}
                    </p>
                  </div>
                  {contactInfo.href ? (
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
        className="h-auto min-h-14 w-full justify-between rounded-xl px-4 py-3 text-left whitespace-normal hover:bg-transparent md:px-5"
      >
        <h3
          className={cn(
            "text-forest/75 group-hover:text-cream text-left text-sm font-medium transition-colors duration-200 md:text-[0.95rem]",
            isOpen && "text-forest",
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
            isOpen ? "text-forest" : "text-forest/50 group-hover:text-cream",
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
                className="text-charcoal/75 group-hover:text-cream text-sm leading-relaxed"
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

export { FaqSection };
