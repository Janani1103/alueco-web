"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { productCategories, products as defaultProducts } from "@/data/products";
import { useSiteData } from "@/context/SiteDataContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";
import { LineIcon } from "@/components/ui/LineIcon";

export function ProductCategories() {
  const { products: contextProducts, siteConfig } = useSiteData();
  const products = contextProducts && contextProducts.length > 0 ? contextProducts : defaultProducts;

  const homeProducts = siteConfig?.homeProducts;
  const sectionBadge = homeProducts?.badge || "OUR PRODUCTS";
  const sectionHeading = homeProducts?.heading || "Premium Aluminium Solutions";
  const sectionSubheading = homeProducts?.subheading;
  const featuredBadge = homeProducts?.featuredBadge || "Featured Product";

  const getCategoryName = (cat: { slug: string; name: string }) => {
    return homeProducts?.categoryOverrides?.[cat.slug]?.title || cat.name;
  };

  const getProductImage = (slug: string) => {
    const override = homeProducts?.categoryOverrides?.[slug]?.image;
    if (override) return override;
    return products.find((p) => p.slug === slug || p.category === slug)?.image ?? products[0]?.image ?? "";
  };

  const getProductDescription = (slug: string) => {
    const override = homeProducts?.categoryOverrides?.[slug]?.description;
    if (override) return override;
    return products.find((p) => p.slug === slug || p.category === slug)?.shortDescription ?? "";
  };

  const [active, setActive] = useState<string>(productCategories[0].slug);
  const activeProduct = products.find((p) => p.slug === active || p.category === active);

  return (
    <section className="py-16 md:py-24" id="products">
      <div className="container-main">
        <AnimatedSection className="text-center">
          <SectionLabel>{sectionBadge}</SectionLabel>
          <SectionHeading className="mt-3">{sectionHeading}</SectionHeading>
          {sectionSubheading && (
            <p className="mt-3 max-w-2xl mx-auto text-sm text-muted">
              {sectionSubheading}
            </p>
          )}
        </AnimatedSection>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Category list */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {productCategories.map((cat, i) => (
              <AnimatedSection key={cat.slug} delay={i * 60}>
                <Link
                  href={`/products/${cat.slug}`}
                  onMouseEnter={() => setActive(cat.slug)}
                  onFocus={() => setActive(cat.slug)}
                  className={`group flex flex-col rounded-[14px] border p-4 transition-all duration-300 md:p-5 ${
                    active === cat.slug
                      ? "-translate-y-1 border-brand bg-soft-green shadow-[var(--shadow-hover)]"
                      : "border-border bg-surface hover:-translate-y-1 hover:border-brand/50 hover:shadow-[var(--shadow-subtle)]"
                  }`}
                >
                  <LineIcon
                    name={cat.icon}
                    className={`mb-3 transition-transform duration-300 ${
                      active === cat.slug ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="text-sm font-semibold text-heading">{getCategoryName(cat)}</span>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {getProductDescription(cat.slug)}
                  </p>
                  <span
                    className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-all duration-300 ${
                      active === cat.slug ? "translate-x-1" : "group-hover:translate-x-1"
                    }`}
                  >
                    Explore
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Preview panel - desktop */}
          <AnimatedSection delay={200} className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[20px] border border-border bg-surface shadow-[var(--shadow-subtle)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                {productCategories.map((cat) => (
                  <Image
                    key={cat.slug}
                    src={getProductImage(cat.slug)}
                    alt={getCategoryName(cat)}
                    fill
                    className={`object-cover transition-all duration-700 ease-out ${
                      active === cat.slug
                        ? "scale-100 opacity-100"
                        : "pointer-events-none scale-[1.03] opacity-0"
                    }`}
                    sizes="50vw"
                    priority={cat.slug === productCategories[0].slug}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                    {featuredBadge}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    {homeProducts?.categoryOverrides?.[active]?.title || activeProduct?.name || "Premium Aluminium"}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-white/85">
                    {homeProducts?.categoryOverrides?.[active]?.description || activeProduct?.shortDescription}
                  </p>
                  <Link
                    href={`/products/${active}`}
                    className="mt-4 inline-flex items-center gap-1 rounded-[9px] bg-white px-4 py-2 text-sm font-semibold text-heading transition-colors hover:bg-soft-green"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
