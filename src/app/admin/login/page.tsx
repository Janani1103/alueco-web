"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, AlertCircle, ArrowRight, Sun, Moon, Building2, ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

import { ADMIN_CUSTOM_PIN_KEY } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const customPin = typeof window !== "undefined" ? localStorage.getItem(ADMIN_CUSTOM_PIN_KEY) : null;
    const validPins = ["alueco2026", "2026", "admin", "1234", "admin123"];
    if (customPin) validPins.push(customPin.trim());

    if (validPins.includes(pin.trim())) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("alueco_admin_auth", "true");
        sessionStorage.setItem("app_admin_auth", "true");
      }
      router.push("/admin");
    } else {
      setError("Invalid Access PIN. (Demo default: alueco2026 or 2026)");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center p-4 relative transition-colors duration-200">
      {/* Top Corner Theme Switcher */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer"
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-blue-600" />
          )}
        </button>
      </div>

      <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-400 via-lime-500 to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-lime-500/20 mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            ALUECO Management Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Secure admin authentication for Architectural CMS & Systems Hub.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Enter Admin Access PIN / Key
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Default PIN: alueco2026"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white font-mono placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-lime-500 transition"
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Development key:{" "}
              <code className="text-lime-600 dark:text-lime-400 font-bold">alueco2026</code> or{" "}
              <code className="text-lime-600 dark:text-lime-400 font-bold">2026</code>
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-lime-500/20 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? "Authenticating..." : "Enter Unified Admin Hub"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition inline-block"
          >
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
