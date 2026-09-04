import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
