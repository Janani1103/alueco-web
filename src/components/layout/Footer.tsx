"use client";

import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import { footerLinks } from "@/data/navigation";
import { productCategories as defaultCategories } from "@/data/products";
import { Logo } from "@/components/layout/Logo";

function SocialIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    instagram: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 4a5 5 0 100 10 5 5 0 000-10zm6.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    whatsapp: "M12 2a10 10 0 00-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 2a8 8 0 016.3 13l.2.2-.8 2.9-2.9-.8-.2-.2A8 8 0 1112 4z",
    youtube: "M10 15l5-3-5-3v6zm2-10a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 5z",
    linkedin: "M6 9h3v9H6V9zm1.5-4.5a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6zM10 9h3v1.2c.5-.9 1.7-1.5 3-1.5 2.2 0 3 1.4 3 4.1V18h-3v-5.2c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.7-1.8 1.4V18h-3V9z",
  };

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[icon] || paths.facebook} />
    </svg>
  );
}

export function Footer() {
  const { siteConfig, products } = useSiteData();

  const socialIcons = [
    { name: "Facebook", href: siteConfig.social?.facebook || "#", icon: "facebook" },
    { name: "Instagram", href: siteConfig.social?.instagram || "#", icon: "instagram" },
    { name: "WhatsApp", href: siteConfig.social?.whatsapp || "#", icon: "whatsapp" },
    { name: "YouTube", href: siteConfig.social?.youtube || "#", icon: "youtube" },
    { name: "LinkedIn", href: siteConfig.social?.linkedin || "#", icon: "linkedin" },
  ];

  const displayProducts = products && products.length > 0 ? products.slice(0, 8) : defaultCategories;

  return (
    <footer className="bg-footer text-white/80">
      <div className="container-main py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {siteConfig?.footerAbout || siteConfig?.description || "Premium aluminium doors, windows and architectural solutions across Sri Lanka."}
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-brand hover:text-brand"
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="space-y-2.5">
              {displayProducts.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-brand"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <span className="block text-white/40">Phone</span>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-brand">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <span className="block text-white/40">Email</span>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="block text-white/40">Location</span>
                {siteConfig.address?.line1},<br />
                {siteConfig.address?.line2}
              </li>
              <li>
                <span className="block text-white/40">Website</span>
                <a href={siteConfig.url || "https://alueco.lk"} className="hover:text-brand">
                  alueco.lk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-main py-6">
          <p className="text-center text-sm text-white/40">
            {siteConfig?.copyright || `© ${new Date().getFullYear()} ALUECO Architectural Systems. All Rights Reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
