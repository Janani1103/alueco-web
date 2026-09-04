import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { siteConfig } from "@/data/site.config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container-main">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="overflow-hidden rounded-[16px] border border-border">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={525}
                  className="aspect-[4/3] w-full object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {product.gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {product.gallery.slice(0, 3).map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-[12px] border border-border">
                      <Image
                        src={img}
                        alt={`${product.name} gallery ${i + 1}`}
                        width={220}
                        height={165}
                        className="aspect-[4/3] w-full object-cover"
                        sizes="33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-heading md:text-4xl">{product.name}</h1>
              <p className="mt-4 text-base leading-relaxed text-muted">{product.description}</p>

              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Applications
                </h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <li
                      key={app}
                      className="rounded-full border border-border bg-section px-3 py-1 text-sm text-text"
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
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-section py-12 md:py-16">
        <div className="container-main space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-heading">Specifications</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="rounded-[12px] border border-border bg-surface p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-text">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-heading">Available Configurations</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.configurations.map((c) => (
                <li
                  key={c}
                  className="rounded-[9px] border border-border bg-surface px-4 py-2 text-sm text-text"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-heading">Gallery</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-[14px] border border-border">
                  <Image
                    src={img}
                    alt={`${product.name} - image ${i + 1}`}
                    width={400}
                    height={300}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-heading">Related Products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
