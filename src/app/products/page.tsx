import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Premium Aluminium Products",
  description:
    "Explore our range of aluminium doors, windows and architectural solutions.",
};

export default function ProductsPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-main">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
        <SectionHeading>Premium Aluminium Products</SectionHeading>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Explore our range of aluminium doors, windows and architectural solutions.
        </p>
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
