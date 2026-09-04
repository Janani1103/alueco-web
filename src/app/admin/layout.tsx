"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, Sun, Moon, Globe, Loader2, Building2 } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { useTheme } from "@/components/theme/ThemeProvider";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Synchronous session check on mount to prevent any loading delays between tabs
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      if (pathname === "/admin/login") return true;
      return (
        sessionStorage.getItem("alueco_admin_auth") === "true" ||
        sessionStorage.getItem("glx_admin_auth") === "true" ||
        sessionStorage.getItem("app_admin_auth") === "true"
      );
    }
    return true;
  });

  useEffect(() => {
    if (pathname === "/admin/login") return;

    if (typeof window !== "undefined") {
      const auth =
        sessionStorage.getItem("alueco_admin_auth") === "true" ||
        sessionStorage.getItem("glx_admin_auth") === "true" ||
        sessionStorage.getItem("app_admin_auth") === "true";

      if (!auth) {
        setIsAuthenticated(false);
        router.replace("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Only show fallback if definitely unauthenticated while redirecting to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-900 dark:text-white">
        <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <Loader2 className="w-8 h-8 text-lime-500 animate-spin" />
          <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
            Redirecting to Admin Login...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Mobile Top App Bar (Visible on mobile screens < lg) */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer border border-slate-200 dark:border-slate-700"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-lime-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm flex-shrink-0">
              AL
            </div>
            <div>
              <span className="font-extrabold text-xs text-slate-900 dark:text-white block leading-tight">
                ALUECO ADMIN
              </span>
              <span className="text-[9px] text-lime-600 dark:text-lime-400 font-bold uppercase">
                Management Hub
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>

          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"
            title="Public Website"
          >
            <Globe className="w-4 h-4 text-lime-600 dark:text-lime-400" />
          </Link>
        </div>
      </header>

      {/* Responsive Sidebar (Desktop sticky & Mobile drawer) */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-h-[calc(100vh-56px)] lg:h-screen lg:overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteContentProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SiteContentProvider>
  );
}
