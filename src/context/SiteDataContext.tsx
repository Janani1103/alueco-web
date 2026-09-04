"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site.config";
import { products as defaultProducts, Product } from "@/data/products";
import { projects as defaultProjects, Project } from "@/data/projects";
import { LeadItem } from "@/lib/types";

export type SiteConfigType = SiteConfig;

interface SiteDataContextType {
  siteConfig: SiteConfigType;
  products: Product[];
  projects: Project[];
  leads: LeadItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
  updateSiteConfig: (newConfig: Partial<SiteConfigType>) => Promise<boolean>;
  updateProduct: (product: Product) => Promise<boolean>;
  addProduct: (product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (slug: string) => Promise<boolean>;
  updateProject: (project: Project) => Promise<boolean>;
  addProject: (project: Partial<Project>) => Promise<boolean>;
  deleteProject: (slug: string) => Promise<boolean>;
  submitInquiry: (inquiry: Partial<LeadItem>) => Promise<boolean>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SITE_CONFIG: "alueco_dynamic_site_config",
  PRODUCTS: "alueco_dynamic_products",
  PROJECTS: "alueco_dynamic_projects",
};

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfigType>(defaultSiteConfig);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Initial load: check localStorage for instant hydration, then fetch fresh data from API
  const refreshData = useCallback(async () => {
    try {
      // Parallel fetch from API routes
      const [resConfig, resProducts, resProjects, resLeads] = await Promise.all([
        fetch("/api/content").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch("/api/catalog").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch("/api/projects").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch("/api/leads").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);

      if (resConfig) {
        setSiteConfig(resConfig);
        localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(resConfig));
      }
      if (Array.isArray(resProducts) && resProducts.length > 0) {
        setProducts(resProducts);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(resProducts));
      }
      if (Array.isArray(resProjects) && resProjects.length > 0) {
        setProjects(resProjects);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(resProjects));
      }
      if (Array.isArray(resLeads)) {
        setLeads(resLeads);
      }
    } catch (err) {
      console.error("Error refreshing site data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Instant cache read
      try {
        const cachedConfig = localStorage.getItem(STORAGE_KEYS.SITE_CONFIG);
        if (cachedConfig) setSiteConfig(JSON.parse(cachedConfig));

        const cachedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (cachedProducts) setProducts(JSON.parse(cachedProducts));

        const cachedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        if (cachedProjects) setProjects(JSON.parse(cachedProjects));
      } catch (e) {
        // ignore JSON parse error
      }

      refreshData();

      // Listen for cross-tab or local updates
      const handleSync = () => {
        try {
          const cachedConfig = localStorage.getItem(STORAGE_KEYS.SITE_CONFIG);
          if (cachedConfig) setSiteConfig(JSON.parse(cachedConfig));

          const cachedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
          if (cachedProducts) setProducts(JSON.parse(cachedProducts));

          const cachedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
          if (cachedProjects) setProjects(JSON.parse(cachedProjects));
        } catch (e) {}
      };

      const handlePostMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === "ALUECO_LIVE_PREVIEW_SYNC" && event.data.config) {
          setSiteConfig(event.data.config);
        }
      };

      window.addEventListener("alueco-data-sync", handleSync);
      window.addEventListener("storage", handleSync);
      window.addEventListener("message", handlePostMessage);
      return () => {
        window.removeEventListener("alueco-data-sync", handleSync);
        window.removeEventListener("storage", handleSync);
        window.removeEventListener("message", handlePostMessage);
      };
    }
  }, [refreshData]);

  // Dispatch sync event to other components & tabs
  const broadcastSync = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("alueco-data-sync"));
    }
  };

  // 2. Actions
  const updateSiteConfig = async (newConfig: Partial<SiteConfigType>): Promise<boolean> => {
    const merged = { ...siteConfig, ...newConfig };
    setSiteConfig(merged);
    localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(merged));
    broadcastSync();

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const updateProduct = async (product: Product): Promise<boolean> => {
    const updated = products.map((p) => (p.slug === product.slug ? product : p));
    setProducts(updated);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    broadcastSync();

    try {
      const res = await fetch("/api/catalog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const addProduct = async (product: Partial<Product>): Promise<boolean> => {
    try {
      const res = await fetch("/api/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success && data.product) {
        const updated = [data.product, ...products];
        setProducts(updated);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
        broadcastSync();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteProduct = async (slug: string): Promise<boolean> => {
    const updated = products.filter((p) => p.slug !== slug);
    setProducts(updated);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    broadcastSync();

    try {
      const res = await fetch(`/api/catalog?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const updateProject = async (project: Project): Promise<boolean> => {
    const updated = projects.map((p) => (p.slug === project.slug ? project : p));
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    broadcastSync();

    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const addProject = async (project: Partial<Project>): Promise<boolean> => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      if (data.success && data.project) {
        const updated = [data.project, ...projects];
        setProjects(updated);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
        broadcastSync();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteProject = async (slug: string): Promise<boolean> => {
    const updated = projects.filter((p) => p.slug !== slug);
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    broadcastSync();

    try {
      const res = await fetch(`/api/projects?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const submitInquiry = async (inquiry: Partial<LeadItem>): Promise<boolean> => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => [data.lead, ...prev]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteConfig,
        products,
        projects,
        leads,
        loading,
        refreshData,
        updateSiteConfig,
        updateProduct,
        addProduct,
        deleteProduct,
        updateProject,
        addProject,
        deleteProject,
        submitInquiry,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    return {
      siteConfig: defaultSiteConfig,
      products: defaultProducts,
      projects: defaultProjects,
      leads: [],
      loading: false,
      refreshData: async () => {},
      updateSiteConfig: async () => false,
      updateProduct: async () => false,
      addProduct: async () => false,
      deleteProduct: async () => false,
      updateProject: async () => false,
      addProject: async () => false,
      deleteProject: async () => false,
      submitInquiry: async () => false,
    };
  }
  return context;
}
