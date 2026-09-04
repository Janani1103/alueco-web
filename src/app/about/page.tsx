import type { Metadata } from "next";
import { siteConfig } from "@/data/site.config";
import { processSteps } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { InteractiveImage } from "@/components/ui/InteractiveImage";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";
import { HowWeWork } from "@/components/home/HowWeWork";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ALUECO — Sri Lanka's premium aluminium fabrication company for doors, windows and architectural solutions.",
};

const sectionImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=85",
];

export default function AboutPage() {
  const { about, stats } = siteConfig;

  const sections = [
    { id: "who", title: "Who We Are", content: about.whoWeAre },
    { id: "mission", title: "Our Mission", content: about.mission },
    { id: "vision", title: "Our Vision", content: about.vision },
    { id: "why", title: "Why ALUECO", content: about.whyAlueco },
    { id: "quality", title: "Quality & Craftsmanship", content: about.quality },
  ];

  return (
    <>
      <PageHero
        label="ABOUT ALUECO"
        title={about.heroTitle}
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=3000&q=90&auto=format&fit=crop"
        imageAlt="Modern architectural building with aluminium windows"
        size="large"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 80}>
                <div className="rounded-[14px] border border-border bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-subtle)]">
                  <p className="text-3xl font-bold text-brand">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section py-12 md:py-16">
        <div className="container-main space-y-16">
          {sections.map((section, i) => (
            <div
              key={section.id}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <AnimatedSection delay={i * 50}>
                <SectionLabel>{section.title.toUpperCase()}</SectionLabel>
                <SectionHeading className="mt-3">{section.title}</SectionHeading>
                <p className="mt-4 text-base leading-relaxed text-muted">{section.content}</p>
              </AnimatedSection>
              <InteractiveImage
                src={sectionImages[i]}
                alt={section.title}
                delay={i * 50 + 80}
              />
            </div>
          ))}
        </div>
      </section>

      <HowWeWork />

      <PageCTA
        title="Partner With ALUECO"
        description="Experience the difference of premium aluminium craftsmanship on your next project."
        buttonLabel="Learn More — Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
