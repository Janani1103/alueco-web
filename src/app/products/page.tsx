import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Premium Aluminium Products",
  description:
    "Explore our range of aluminium doors, windows and architectural solutions.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="OUR PRODUCTS"
        title="Premium Aluminium Products"
        description="Explore our range of aluminium doors, windows and architectural solutions crafted for Sri Lankan homes and commercial spaces."
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=3000&q=90&auto=format&fit=crop"
        imageAlt="Premium aluminium windows and doors"
        size="large"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <AnimatedSection>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          </AnimatedSection>
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      <PageCTA
        title="Need Help Choosing a Product?"
        description="Our team will guide you to the right aluminium solution for your project."
        buttonLabel="Get a Free Quote"
      />
    </>
  );
}
