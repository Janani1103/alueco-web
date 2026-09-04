"use client";

import { useState } from "react";
import { productFilters } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.filterCategory === active);

  return (
    <>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Product categories"
      >
        {productFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={active === filter.id}
            onClick={() => setActive(filter.id)}
            className={`rounded-[9px] border px-4 py-2 text-sm font-medium transition-all ${
              active === filter.id
                ? "border-brand bg-brand text-white"
                : "border-border bg-surface text-text hover:border-brand hover:text-brand"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">No products found in this category.</p>
      )}
    </>
  );
}
