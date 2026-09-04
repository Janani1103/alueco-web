"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isOverHero = isHome && !scrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "h-[68px] border-b border-border/80 bg-surface/95 shadow-[var(--header-shadow)] backdrop-blur-md"
            : isHome
              ? "h-[80px] border-b border-white/10 bg-transparent"
              : "h-[80px] border-b border-border bg-surface"
        }`}
      >
        <div className="container-main flex h-full items-center justify-between gap-4">
          <Logo variant={isOverHero ? "light" : "dark"} />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {mainNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link-hover flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      isActive(item.href)
                        ? "is-active text-brand"
                        : isOverHero
                          ? "text-white/90 hover:text-brand-secondary"
                          : "text-text hover:text-brand"
                    }`}
                    aria-expanded={productsOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </Link>
                  <div
                    className={`absolute left-0 top-full pt-2 transition-all duration-300 ${
                      productsOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="min-w-[230px] rounded-xl border border-border bg-surface p-2 shadow-[var(--shadow-premium)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-sm text-text transition-colors hover:bg-soft-green hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link-hover rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? "is-active text-brand"
                      : isOverHero
                        ? "text-white/90 hover:text-brand-secondary"
                        : "text-text hover:text-brand"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle overHero={isOverHero} />
            <Button href="/contact#quote" size="md">
              Get a Free Quote
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle overHero={isOverHero} />
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-lg border lg:hidden ${
              isOverHero
                ? "border-white/30 text-white"
                : "border-border text-text"
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
