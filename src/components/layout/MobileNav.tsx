"use client";

import Link from "next/link";
import { useEffect } from "react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-5" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-text transition-colors hover:bg-soft-green hover:text-brand"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border p-5">
          <Button href="/contact#quote" className="w-full" onClick={onClose}>
            Get a Free Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
