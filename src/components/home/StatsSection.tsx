import { siteConfig } from "@/data/site.config";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function StatsSection() {
  const { stats } = siteConfig;

  return (
    <section className="border-y border-border bg-surface py-14 md:py-16">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 100} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-brand md:text-5xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted/80">
          Figures are illustrative placeholders — update via site configuration.
        </p>
      </div>
    </section>
  );
}
