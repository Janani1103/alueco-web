import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/ui/QuoteForm";

export function QuoteSection() {
  return (
    <section className="bg-soft-green py-16 md:py-24" id="quote">
      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection className="hidden lg:block">
            <div className="group overflow-hidden rounded-[24px] shadow-[var(--shadow-subtle)]">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=85"
                alt="Premium aluminium windows and doors interior"
                width={600}
                height={520}
                className="aspect-[6/5.2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="50vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <SectionHeading>Let&apos;s Build Something Beautiful.</SectionHeading>
            <p className="mt-3 text-base text-muted">
              Tell us about your project and our team will help you find the right aluminium solution.
            </p>
            <div className="mt-8 rounded-[16px] border border-border bg-surface p-6 md:p-8 shadow-[var(--shadow-subtle)]">
              <QuoteForm id="home-quote" showEmail submitLabel="Request My Free Quote" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
