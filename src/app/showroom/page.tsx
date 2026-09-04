import type { Metadata } from "next";
<<<<<<< Updated upstream
import Image from "next/image";
import { siteConfig } from "@/data/site.config";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";
=======
import { ShowroomContent } from "@/components/showroom/ShowroomContent";
>>>>>>> Stashed changes

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Visit the ALUECO Experience Center in Wellaweriya, Sri Lanka. Explore our premium aluminium products and finishes.",
};

<<<<<<< Updated upstream
const showroomFeatures = [
  {
    title: "Product Displays",
    description: "See our full range of doors, windows and systems in person.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
  },
  {
    title: "Aluminium Finishes",
    description: "Explore powder coated, anodized and custom finish options.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
  },
  {
    title: "Glass Options",
    description: "Compare glazing types and glass configurations.",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=85",
  },
  {
    title: "Consultation Area",
    description: "Meet our team for personalized project consultation.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
  },
];

export default function ShowroomPage() {
  const { showroom } = siteConfig;

  return (
    <>
      <PageHero
        label="SHOWROOM"
        title={showroom.name}
        description={`Visit us in ${showroom.location} — ${showroom.shortHours}`}
        image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=3000&q=90&auto=format&fit=crop"
        imageAlt="ALUECO Experience Center showroom"
        size="large"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="grid gap-10 lg:grid-cols-2">
            <AnimatedSection>
              <SectionHeading>{showroom.location}</SectionHeading>
              <div className="mt-6 space-y-4">
                <div className="rounded-[14px] border border-border bg-surface p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-[var(--shadow-subtle)]">
                  <h2 className="text-sm font-semibold text-brand">Opening Hours</h2>
                  <p className="mt-1 text-text">{showroom.hours}</p>
                  <p className="text-muted">{showroom.time}</p>
                </div>
                <div className="rounded-[14px] border border-border bg-surface p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-[var(--shadow-subtle)]">
                  <h2 className="text-sm font-semibold text-brand">Contact</h2>
                  <p className="mt-1 text-text">{siteConfig.phone}</p>
                  <p className="text-muted">{siteConfig.email}</p>
                </div>
              </div>
              <div className="mt-8">
                <Button href="https://maps.google.com/?q=Wellaweriya+Sri+Lanka" external>
                  Visit Our Showroom
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="overflow-hidden rounded-[16px] border border-border shadow-[var(--shadow-subtle)] transition-shadow duration-300 hover:shadow-[var(--shadow-hover)]">
                <iframe
                  title="ALUECO showroom location"
                  src="https://maps.google.com/maps?q=Wellaweriya+Sri+Lanka&output=embed"
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-section py-12 md:py-16">
        <div className="container-main">
          <AnimatedSection className="text-center">
            <SectionLabel>WHAT TO EXPECT</SectionLabel>
            <SectionHeading className="mt-3">Explore Our Experience Center</SectionHeading>
          </AnimatedSection>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {showroomFeatures.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 80}>
                <article className="group overflow-hidden rounded-[14px] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-hover)]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="50vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-heading">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted">{feature.description}</p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to Visit?"
        description="Experience ALUECO quality in person at our Wellaweriya showroom."
        buttonLabel="Get Directions"
        buttonHref="https://maps.google.com/?q=Wellaweriya+Sri+Lanka"
        buttonExternal
      />
    </>
  );
=======
export default function ShowroomPage() {
  return <ShowroomContent />;
>>>>>>> Stashed changes
}
