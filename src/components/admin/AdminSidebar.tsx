"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  MessageSquare,
  FileText,
  Settings,
  ExternalLink,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useSiteData } from "@/context/SiteDataContext";
import { logoutAdmin } from "@/lib/adminAuth";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ mobileOpen = false, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { products, projects, leads } = useSiteData();

  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  const navItems = [
    {
      label: "Dashboard",
      subtitle: "Overview & Metrics",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "UI Customizer",
      subtitle: "Visual Click-to-Edit CMS",
      href: "/admin/ui-manage",
      icon: Sparkles,
      badge: "Live",
      badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    },
    {
      label: "Products Catalog",
      subtitle: "Doors, Windows, Louvers",
      href: "/admin/catalog",
      icon: Layers,
      badge: String(products.length),
    },
    {
      label: "Projects Portfolio",
      subtitle: "Completed Works & Gallery",
      href: "/admin/projects",
      icon: FolderKanban,
      badge: String(projects.length),
    },
    {
      label: "Customer Inquiries",
      subtitle: "Quote Requests & Leads",
      href: "/admin/leads",
      icon: MessageSquare,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : String(leads.length),
      badgeColor: newLeadsCount > 0 ? "bg-lime-500 text-slate-950 font-bold" : "bg-lime-500/15 text-lime-700 dark:text-lime-300 border border-lime-500/30",
    },
    {
      label: "Site Content CMS",
      subtitle: "Hero, Showroom, Contact",
      href: "/admin/content",
      icon: FileText,
    },
    {
      label: "Admin Settings",
      subtitle: "Access PIN & Security",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto px-4 py-5">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <Link href="/admin" onClick={onCloseMobile} className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-lime-500/30 bg-lime-500/10 text-lime-600 dark:text-lime-400 shadow-sm transition-transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 20V8l8-4 8 4v12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M9 20v-6h6v6M4 12h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  ALU<span className="text-lime-600 dark:text-lime-400">ECO</span>
                </span>
                <span className="rounded-md bg-lime-500/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase text-lime-700 dark:text-lime-300 border border-lime-500/20">
                  PORTAL
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Architectural Admin
              </p>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Live Status Pill */}
        <div className="mx-1 flex items-center justify-between rounded-xl bg-slate-100/80 px-3 py-2 text-xs dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse"></span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
              Alueco Production
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">v2.0</span>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigation Menu
          </p>

          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`group flex items-center justify-between rounded-2xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-slate-900 text-white shadow-sm dark:bg-lime-500/15 dark:text-lime-400 dark:border dark:border-lime-500/30"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      active
                        ? "text-lime-400"
                        : "text-slate-400 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="truncate leading-none">{item.label}</p>
                    <p className="text-[10px] font-normal text-slate-400 dark:text-slate-500 truncate mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        item.badgeColor ||
                        (active
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300")
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {active && <ChevronRight className="h-3.5 w-3.5 text-lime-400 opacity-80" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3 pt-6 border-t border-slate-200/80 dark:border-slate-800">
        <Link
          href="/"
          target="_blank"
          className="group flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-lime-500 hover:bg-lime-50/40 hover:text-lime-700 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:border-lime-500/50 dark:hover:text-lime-300"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-lime-500 transition-colors" />
            Public Website
          </span>
          <span className="text-[10px] text-slate-400 font-mono">alueco.lk</span>
        </Link>

        {/* Profile & Controls */}
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-slate-100 p-2 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white dark:bg-lime-500 dark:text-slate-950">
              AL
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Alueco Admin
              </p>
              <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                Operations Lead
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-blue-600" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 lg:flex">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative flex h-full w-72 flex-col bg-white shadow-2xl dark:bg-slate-900 dark:border-r dark:border-slate-800">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

export { AdminSidebar };
