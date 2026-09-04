import { whyChooseFeatures } from "@/data/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";
import { LineIcon } from "@/components/ui/LineIcon";

export function WhyChooseUs() {
  return (
    <section className="bg-section py-16 md:py-24 overflow-hidden">
      <div className="container-main">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <SectionLabel>WHY CHOOSE ALUECO</SectionLabel>
          <SectionHeading className="mt-3">
            Built to Last.
            <br />
            Designed for Life.
          </SectionHeading>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We combine quality aluminium systems with skilled craftsmanship to deliver lasting performance and elegant results.
          </p>
        </AnimatedSection>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {whyChooseFeatures.map((feature, i) => (
            <AnimatedSection
              key={feature.title}
              delay={i * 100}
              className="min-w-[280px] snap-start lg:min-w-0"
            >
              <article className="group h-full rounded-[14px] border border-border bg-surface p-6 transition-all duration-400 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-hover)]">
                <div className="mb-4 transition-transform duration-400 group-hover:scale-110 group-hover:rotate-3">
                  <LineIcon name={feature.icon} />
                </div>
                <h3 className="text-base font-semibold text-heading">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
