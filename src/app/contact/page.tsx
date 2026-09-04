import type { Metadata } from "next";
import { siteConfig } from "@/data/site.config";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ALUECO for premium aluminium doors, windows and fabrication in Sri Lanka.",
};

const contactMethods = [
  {
    title: "Call Us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    icon: "phone",
  },
  {
    title: "WhatsApp",
    value: "Chat with us",
    href: siteConfig.social.whatsapp,
    icon: "whatsapp",
  },
  {
    title: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: "email",
  },
  {
    title: "Showroom",
    value: siteConfig.showroom.location,
    href: "/showroom",
    icon: "location",
  },
];

export default function ContactPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-main">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading>Contact Us</SectionHeading>
          <p className="mt-3 text-base text-muted">
            Reach out for a free quote, showroom visit or project consultation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              className="group rounded-[14px] border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-subtle)]"
              {...(method.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                {method.title}
              </span>
              <p className="mt-2 text-sm font-medium text-text group-hover:text-brand">
                {method.value}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16" id="quote">
          <div>
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
          </div>

          <div className="rounded-[16px] border border-border bg-soft-green p-6 md:p-8">
            <QuoteForm id="contact-quote" showEmail submitLabel="Request My Free Quote" />
          </div>
        </div>
      </div>
    </section>
  );
}
