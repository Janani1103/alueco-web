import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  ariaLabel?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-[#6aaa00] border border-brand shadow-sm",
  secondary:
    "bg-surface text-text border border-border hover:border-brand hover:text-brand",
  outline:
    "bg-transparent text-text border border-border hover:border-brand hover:text-brand",
  ghost: "bg-transparent text-text hover:text-brand",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  external,
  ariaLabel,
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-[9px] font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  const showArrow =
    typeof children === "string" &&
    !children.includes("→") &&
    (children.toLowerCase().includes("quote") ||
      children.toLowerCase().includes("direction") ||
      children.toLowerCase().includes("view") ||
      children.toLowerCase().includes("project"));

  const content = (
    <>
      {children}
      {showArrow && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
