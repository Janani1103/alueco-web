import type { Metadata } from "next";
<<<<<<< Updated upstream
import { siteConfig } from "@/data/site.config";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactMethodsGrid } from "@/components/contact/ContactMethodsGrid";
=======
import { ContactContent } from "@/components/contact/ContactContent";
>>>>>>> Stashed changes

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ALUECO for premium aluminium doors, windows and fabrication in Sri Lanka.",
};

<<<<<<< Updated upstream
const contactMethods = [
  { title: "Call Us", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { title: "WhatsApp", value: "Chat with us", href: siteConfig.social.whatsapp },
  { title: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { title: "Showroom", value: siteConfig.showroom.location, href: "/showroom" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="GET IN TOUCH"
        title="Contact ALUECO"
        description="Reach out for a free quote, showroom visit or project consultation."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=3000&q=90&auto=format&fit=crop"
        imageAlt="Modern architectural space with aluminium glazing"
        align="center"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <ContactMethodsGrid methods={contactMethods} />

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16" id="quote">
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-heading">Get in Touch</h2>
              <p className="mt-3 text-muted">
                Fill out the form and our team will respond within 24 hours.
              </p>
              <dl className="mt-8 space-y-4">
                <div>
                  <dt className="text-xs text-muted">Phone</dt>
                  <dd>
                    <a href={`tel:${siteConfig.phone}`} className="text-sm font-medium hover:text-brand">
                      {siteConfig.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Email</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm font-medium hover:text-brand">
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Location</dt>
                  <dd className="text-sm font-medium">
                    {siteConfig.address.line1}, {siteConfig.address.line2}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Showroom Hours</dt>
                  <dd className="text-sm font-medium">{siteConfig.showroom.shortHours}</dd>
                </div>
              </dl>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="rounded-[16px] border border-border bg-soft-green p-6 shadow-[var(--shadow-subtle)] md:p-8">
                <QuoteForm id="contact-quote" showEmail submitLabel="Request My Free Quote" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <PageCTA buttonLabel="Start Your Project" />
    </>
  );
=======
export default function ContactPage() {
  return <ContactContent />;
>>>>>>> Stashed changes
}
