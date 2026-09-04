import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-hover)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-heading">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <p className="mt-3 text-xs text-muted">
          {product.applications.slice(0, 3).join(" · ")}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View Details →
        </span>
      </div>
    </Link>
  );
}
