import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-heading";
  const accentColor = "text-brand";
  const iconBorder = variant === "light" ? "border-white/30 bg-white/10" : "border-brand/30 bg-brand/10";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="ALUECO Home"
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg border ${iconBorder}`}
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20V8l8-4 8 4v12"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-brand"
          />
          <path
            d="M9 20v-6h6v6M4 12h16"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-brand"
          />
        </svg>
      </span>
      <span className={`text-xl font-bold tracking-tight ${textColor}`}>
        ALU<span className={accentColor}>ECO</span>
      </span>
    </Link>
  );
}
