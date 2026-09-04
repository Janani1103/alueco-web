import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductCard } from "@/components/products/ProductCard";
import { products, getRelatedProducts } from "@/data/products";
import { getStoredProducts, getStoredSiteConfig } from "@/lib/serverDataStore";
import { ProductDetailView } from "@/components/products/ProductDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allProducts = await getStoredProducts();
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allProducts = await getStoredProducts();
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) notFound();

<<<<<<< Updated upstream
  const related = getRelatedProducts(slug);
  const allImages = [
    { src: product.image, alt: product.name },
    ...product.gallery
      .filter((g) => g !== product.image)
      .map((src, i) => ({ src, alt: `${product.name} - view ${i + 2}` })),
  ];

  return (
    <>
      <PageHero
        label="PRODUCT"
        title={product.name}
        description={product.shortDescription}
        image={product.image}
        imageAlt={product.name}
        size="large"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <AnimatedSection>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: product.name },
              ]}
            />
          </AnimatedSection>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ImageGallery images={allImages} priority />

            <AnimatedSection delay={100}>
              <p className="text-base leading-relaxed text-muted">{product.description}</p>

              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Applications
                </h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <li
                      key={app}
                      className="rounded-full border border-border bg-section px-3 py-1 text-sm text-text transition-colors hover:border-brand hover:text-brand"
                    >
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Available Finishes
                </h2>
                <ul className="mt-2 space-y-1">
                  {product.finishes.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted">
                      <span className="text-brand" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Key Features
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-0.5 text-brand" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact#quote">Request a Quote</Button>
                <Button href={siteConfig.social.whatsapp} variant="secondary" external>
                  WhatsApp Us
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-section py-12 md:py-16">
        <div className="container-main space-y-12">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-heading">Specifications</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {product.specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-[12px] border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[var(--shadow-subtle)]"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-text">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <h2 className="text-2xl font-bold text-heading">Available Configurations</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.configurations.map((c) => (
                <li
                  key={c}
                  className="rounded-[9px] border border-border bg-surface px-4 py-2 text-sm text-text transition-colors hover:border-brand hover:text-brand"
                >
                  {c}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {allImages.length > 1 && (
            <AnimatedSection delay={120}>
              <h2 className="text-2xl font-bold text-heading">Gallery</h2>
              <div className="mt-6">
                <GalleryGrid images={allImages} />
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-heading">Related Products</h2>
          </AnimatedSection>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <div
                key={p.slug}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title={`Interested in ${product.name}?`}
        description="Get a free quote and our team will help you with measurements and installation."
        buttonLabel="Get a Free Quote"
      />
    </>
=======
  const siteConfig = await getStoredSiteConfig();
  const related = allProducts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <ProductDetailView
      initialProduct={product}
      relatedProducts={related}
      whatsappUrl={siteConfig.social?.whatsapp}
    />
>>>>>>> Stashed changes
  );
}
