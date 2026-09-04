"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface ContactMethod {
  title: string;
  value: string;
  href: string;
}

export function ContactMethodsGrid({ methods }: { methods: ContactMethod[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {methods.map((method, i) => (
        <AnimatedSection key={method.title} delay={i * 80}>
          <a
            href={method.href}
            className="group flex h-full flex-col rounded-[14px] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-hover)]"
            {...(method.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              {method.title}
            </span>
            <p className="mt-2 flex-1 text-sm font-medium text-text transition-colors group-hover:text-brand">
              {method.value}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
              Connect →
            </span>
          </a>
        </AnimatedSection>
      ))}
    </div>
  );
}
