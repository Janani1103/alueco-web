"use client";

import Image from "next/image";
import { useSiteData } from "@/context/SiteDataContext";
import { processSteps } from "@/data/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";

export function AboutContent() {
  const { siteConfig } = useSiteData();
  const { about, stats } = siteConfig;

  const sections = [
    { id: "who", title: "Who We Are", content: about?.whoWeAre },
    { id: "mission", title: "Our Mission", content: about?.mission },
    { id: "vision", title: "Our Vision", content: about?.vision },
    { id: "why", title: "Why ALUECO", content: about?.whyAlueco },
    { id: "quality", title: "Quality & Craftsmanship", content: about?.quality },
  ];

  return (
    <>
      <section className="relative">
        <div className="relative h-[40vh] min-h-[300px] max-h-[420px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
            alt="Modern architectural building with aluminium windows"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-main">
              <h1 className="max-w-2xl text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {about?.heroTitle || "Building Better Spaces with Aluminium"}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(stats || []).map((stat) => (
              <AnimatedSection key={stat.label}>
                <div className="rounded-[14px] border border-border bg-surface p-6 text-center">
                  <p className="text-3xl font-bold text-brand">{stat.value}</p>
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
            <AnimatedSection key={section.id} delay={i * 50}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <SectionLabel>{section.title.toUpperCase()}</SectionLabel>
                  <SectionHeading className="mt-3">{section.title}</SectionHeading>
                  <p className="mt-4 text-base leading-relaxed text-muted">{section.content}</p>
                </div>
                <div className="overflow-hidden rounded-[16px] border border-border shadow-[var(--shadow-subtle)]">
                  <Image
                    src={
                      [
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
                        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
                        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
                        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
                        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
                      ][i]
                    }
                    alt={section.title}
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16" id="process">
        <div className="container-main">
          <div className="text-center">
            <SectionLabel>OUR PROCESS</SectionLabel>
            <SectionHeading className="mt-3">How We Work</SectionHeading>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand bg-surface">
                  <span className="text-sm font-bold text-brand">{step.number}</span>
                </div>
                <h3 className="mt-4 font-semibold text-heading">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
