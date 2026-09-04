interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.15em] text-brand ${className}`}
    >
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  children,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <Tag
      className={`text-3xl font-bold leading-tight tracking-tight text-heading md:text-4xl ${className}`}
    >
      {children}
    </Tag>
  );
}
