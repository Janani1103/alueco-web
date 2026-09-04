"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Testimonial() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const testimonial = testimonials[active];

  return (
    <section className="py-16 md:py-24">
      <div className="container-main">
        <AnimatedSection className="mb-10 text-center">
          <SectionLabel>CUSTOMER STORIES</SectionLabel>
          <SectionHeading className="mt-3">Trusted by Homeowners & Builders</SectionHeading>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[20px] border border-border bg-soft-green p-8 shadow-[var(--shadow-subtle)] md:p-12">
            <svg
              className="mb-6 h-10 w-10 text-brand/40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.6 9.3c0-3.1 2.5-5.6 5.6-5.6 1.2 0 2.3.4 3.2 1l-1.4 2.4c-.6-.4-1.3-.6-2-.6-1.5 0-2.7 1.2-2.7 2.7v1.1H12v7.1H4.6V9.3zm10.8 0c0-3.1 2.5-5.6 5.6-5.6 1.2 0 2.3.4 3.2 1l-1.4 2.4c-.6-.4-1.3-.6-2-.6-1.5 0-2.7 1.2-2.7 2.7v1.1h4.9v7.1h-7.1V9.3z" />
            </svg>

            <div className="relative min-h-[140px]">
              {testimonials.map((t, i) => (
                <blockquote
                  key={t.id}
                  className={`absolute inset-0 text-lg leading-relaxed text-heading transition-all duration-700 md:text-xl ${
                    i === active
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-8 opacity-0"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              ))}
            </div>

            <div className="mt-2 flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} className="h-4 w-4 text-brand" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.35 4.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                </svg>
              ))}
            </div>

            <footer className="mt-6 border-t border-border/60 pt-6">
              <cite className="not-italic">
                <span className="block text-base font-semibold text-heading">
                  {testimonial.customer}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {testimonial.location}
                  {testimonial.projectType && ` · ${testimonial.projectType}`}
                </span>
              </cite>
            </footer>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-brand" : "w-2 bg-border hover:bg-brand/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
