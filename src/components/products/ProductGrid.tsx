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
            className={`rounded-[9px] border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active === filter.id
                ? "scale-[1.02] border-brand bg-brand text-white shadow-[var(--shadow-subtle)]"
                : "border-border bg-surface text-text hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div key={active} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product, i) => (
          <div
            key={product.slug}
            className="animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">No products found in this category.</p>
      )}
    </>
  );
}
