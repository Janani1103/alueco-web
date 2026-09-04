import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
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

  const siteConfig = await getStoredSiteConfig();
  const related = allProducts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <ProductDetailView
      initialProduct={product}
      relatedProducts={related}
      whatsappUrl={siteConfig.social?.whatsapp}
    />
  );
}
