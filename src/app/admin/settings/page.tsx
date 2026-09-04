"use client";

import { useState } from "react";
import {
  Settings,
  Shield,
  KeyRound,
  Check,
  AlertCircle,
  Save,
  Lock,
  RefreshCw,
} from "lucide-react";
import { ADMIN_CUSTOM_PIN_KEY } from "@/lib/adminAuth";

export default function SettingsPage() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinMsg, setPinMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [maintenanceMode, setMaintenanceMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("alueco_maintenance_mode") === "true";
    }
    return false;
  });

  const [emailAlerts, setEmailAlerts] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("alueco_email_alerts");
      return stored !== null ? stored === "true" : true;
    }
    return true;
  });

  const [autoQuoteNotification, setAutoQuoteNotification] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("alueco_auto_quote_notification");
      return stored !== null ? stored === "true" : true;
    }
    return true;
  });

  const handleToggleMaintenance = (val: boolean) => {
    setMaintenanceMode(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("alueco_maintenance_mode", String(val));
    }
  };

  const handleToggleEmail = (val: boolean) => {
    setEmailAlerts(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("alueco_email_alerts", String(val));
    }
  };

  const handleToggleSms = (val: boolean) => {
    setAutoQuoteNotification(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("alueco_auto_quote_notification", String(val));
    }
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinMsg(null);

    if (newPin.length < 4) {
      setPinMsg({ type: "error", text: "PIN must be at least 4 digits." });
      return;
    }

    if (newPin !== confirmPin) {
      setPinMsg({ type: "error", text: "New PIN and confirmation do not match." });
      return;
    }

    try {
      localStorage.setItem(ADMIN_CUSTOM_PIN_KEY, newPin);
      setPinMsg({ type: "success", text: `Admin PIN successfully updated! (Your new PIN is: ${newPin})` });
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
    } catch {
      setPinMsg({ type: "error", text: "Failed to save new PIN to storage." });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-wider">
            System & Security Settings
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Access Credentials & Security
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure admin security PIN, system maintenance mode, and automated lead notifications.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-500/20">
            System Operational
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Security & PIN Settings */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-500/10 text-lime-600 dark:text-lime-400">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Change Admin Access PIN
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update the PIN required at `/admin/login`
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePin} className="mt-6 space-y-4">
            {pinMsg && (
              <div
                className={`flex items-center gap-2 rounded-2xl p-3 text-xs border ${
                  pinMsg.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
                }`}
              >
                {pinMsg.type === "success" ? (
                  <Check className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{pinMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                New PIN or Password
              </label>
              <input
                type="password"
                placeholder="Enter 4+ digits"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                required
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-900 focus:border-lime-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Confirm New PIN
              </label>
              <input
                type="password"
                placeholder="Re-enter new PIN"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                required
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-900 focus:border-lime-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-lime-500 dark:text-slate-950 dark:hover:bg-lime-400"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save New PIN</span>
              </button>
            </div>
          </form>
        </div>

        {/* Portal Controls */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Website Gateways & Toggles
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage live system states
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Maintenance Mode
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Temporarily display a maintenance screen to public visitors
                </p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => handleToggleMaintenance(e.target.checked)}
                className="h-4 w-4 accent-lime-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Instant Email Leads Dispatch
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Send immediate notification to sales team on new lead submissions
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => handleToggleEmail(e.target.checked)}
                className="h-4 w-4 accent-lime-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Automatic Client SMS Acknowledgement
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Send automated SMS text with quote reference code
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoQuoteNotification}
                onChange={(e) => handleToggleSms(e.target.checked)}
                className="h-4 w-4 accent-lime-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
