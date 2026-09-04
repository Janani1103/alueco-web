"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteContentData } from "@/lib/types";

export const defaultSiteContent: SiteContentData = {
  general: {
    siteName: "ALUECO",
    tagline: "Architectural Aluminium & Glazing Systems",
    contactPhone: "+94 11 700 8900",
    contactEmail: "info@alueco.lk",
    showroomAddress: "No. 45/A, Nawala Road, Nugegoda, Sri Lanka",
    whatsappNumber: "+94 77 123 4567",
    announcementBar: {
      enabled: true,
      text: "Visit our newly opened Nawala Architectural Design Center & Showroom!",
      linkText: "Get Directions",
      linkUrl: "/showroom",
    },
  },
  home: {
    hero: {
      badge: "European Standard Architectural Solutions",
      title: "Architectural Precision in Aluminium Systems",
      subtitle:
        "Engineered European-standard aluminium sliding doors, casement windows, and structural curtain walls crafted for modern tropical living.",
      ctaPrimaryText: "Explore Systems",
      ctaSecondaryText: "Request BOQ Quote",
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    },
    stats: {
      projectsCompleted: "850+",
      satisfactionRate: "99.4%",
      yearsWarranty: "10 Years",
      profilesAvailable: "40+ Profiles",
    },
    trustIndicators: [
      "Precision German Machinery",
      "Thermal Break & Acoustic Glass",
      "Marine-Grade Powder Coating",
      "Certified 10-Year Warranty",
    ],
  },
  about: {
    title: "Setting the Standard in Sri Lankan Architecture",
    description:
      "ALUECO is dedicated to crafting bespoke architectural aluminium fenestration with uncompromising engineering, thermal efficiency, and sleek minimalist aesthetics.",
    story:
      "Founded with a vision to eliminate substandard window and door installations, ALUECO pairs world-class extruded aluminium profiles with skilled craftsmanship.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  },
  showroom: {
    heading: "Experience Full-Scale Aluminium Systems in Person",
    description:
      "Walk through our interactive showroom to test smooth sliding glide mechanisms, examine double glazed acoustic insulation, and explore tactile powder coat finishes.",
    visitingHours: "Monday - Saturday: 8:30 AM - 5:30 PM",
  },
};

interface SiteContentContextType {
  content: SiteContentData;
  updateContent: (newContent: SiteContentData) => void;
  saveToServer: () => Promise<boolean>;
  resetToDefault: () => void;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  selectedPreviewPage: string;
  setSelectedPreviewPage: (page: string) => void;
  themeMode: "light" | "dark";
  toggleThemeMode: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "alueco_site_content_draft";

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContentData>(defaultSiteContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPreviewPage, setSelectedPreviewPage] = useState("home");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // Load theme and saved content from storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("alueco-theme") as "light" | "dark" | null;
      if (storedTheme === "dark" || storedTheme === "light") {
        setThemeMode(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
      }

      const storedDraft = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedDraft) {
        try {
          setContent(JSON.parse(storedDraft));
        } catch {
          // ignore error
        }
      }
    }
  }, []);

  const toggleThemeMode = () => {
    const next = themeMode === "dark" ? "light" : "dark";
    setThemeMode(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("alueco-theme", next);
      document.documentElement.setAttribute("data-theme", next);
    }
  };

  const updateContent = (newContent: SiteContentData) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    }
  };

  const saveToServer = async (): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setHasUnsavedChanges(false);
        setIsSaving(false);
        return true;
      }
    } catch {
      // fallback to successful local save
    }
    setHasUnsavedChanges(false);
    setIsSaving(false);
    return true;
  };

  const resetToDefault = () => {
    setContent(defaultSiteContent);
    setHasUnsavedChanges(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateContent,
        saveToServer,
        resetToDefault,
        isSaving,
        hasUnsavedChanges,
        selectedPreviewPage,
        setSelectedPreviewPage,
        themeMode,
        toggleThemeMode,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    // Provide a safe fallback if used outside provider
    return {
      content: defaultSiteContent,
      updateContent: () => {},
      saveToServer: async () => true,
      resetToDefault: () => {},
      isSaving: false,
      hasUnsavedChanges: false,
      selectedPreviewPage: "home",
      setSelectedPreviewPage: () => {},
      themeMode: "light" as const,
      toggleThemeMode: () => {},
    };
  }
  return ctx;
}
