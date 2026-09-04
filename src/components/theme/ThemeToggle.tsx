"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

interface ThemeToggleProps {
  /** Light style for use over dark hero image */
  overHero?: boolean;
  className?: string;
}

export function ThemeToggle({ overHero = false, className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  const base =
    "relative flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border transition-all duration-300";
  const styles = overHero
    ? "border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/20"
    : "border-border bg-surface text-text hover:border-brand hover:text-brand";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${base} ${styles} ${className}`}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      title={isDark ? "Day mode" : "Night mode"}
    >
      <span className="sr-only">{isDark ? "Day mode" : "Night mode"}</span>
      {/* Sun */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${
          mounted && isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {/* Moon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={`absolute transition-all duration-500 ${
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      >
        <path
          d="M21 14.5A8.5 8.5 0 1112.5 3a6.5 6.5 0 009.5 11.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
