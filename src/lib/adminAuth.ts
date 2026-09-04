"use client";

export const ADMIN_AUTH_KEY = "app_admin_auth";
export const ADMIN_USER_KEY = "app_admin_user";
export const ADMIN_CUSTOM_PIN_KEY = "app_admin_custom_pin";

export interface AdminUser {
  name: string;
  role: string;
  email: string;
  lastLogin: string;
  avatarUrl?: string;
}

const DEFAULT_ADMIN: AdminUser = {
  name: "Alueco Admin",
  role: "System Administrator",
  email: "admin@alueco.lk",
  lastLogin: new Date().toISOString(),
};

/**
 * Check if the admin is authenticated in sessionStorage.
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Get the stored admin profile or return default.
 */
export function getAdminUser(): AdminUser {
  if (typeof window === "undefined") return DEFAULT_ADMIN;
  try {
    const raw = sessionStorage.getItem(ADMIN_USER_KEY);
    if (!raw) return DEFAULT_ADMIN;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ADMIN;
  }
}

/**
 * Validates PIN or password.
 * Accepts default PIN: "2026", default password: "admin",
 * or any custom PIN stored in localStorage.
 */
export function loginAdmin(credential: string): { success: boolean; error?: string } {
  if (typeof window === "undefined") return { success: false, error: "Window not available" };

  const trimmed = credential.trim();
  if (!trimmed) {
    return { success: false, error: "Please enter your Admin PIN or password." };
  }

  const customPin = localStorage.getItem(ADMIN_CUSTOM_PIN_KEY);
  const validCredentials = ["alueco2026", "2026", "admin", "1234", "admin123"];
  if (customPin) validCredentials.push(customPin);

  if (validCredentials.includes(trimmed)) {
    const now = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const user: AdminUser = {
      ...DEFAULT_ADMIN,
      lastLogin: now,
    };

    sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
    sessionStorage.setItem("alueco_admin_auth", "true");
    sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("admin-auth-change"));
    return { success: true };
  }

  return {
    success: false,
    error: "Invalid PIN or Password. (Demo default: alueco2026 or 2026)",
  };
}

/**
 * Logs out the current admin session and dispatches event.
 */
export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
  sessionStorage.removeItem("alueco_admin_auth");
  sessionStorage.removeItem("glx_admin_auth");
  sessionStorage.removeItem(ADMIN_USER_KEY);
  window.dispatchEvent(new Event("admin-auth-change"));
}
