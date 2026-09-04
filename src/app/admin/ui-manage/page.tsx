"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Save,
  CheckCircle2,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Plus,
  Trash2,
  Building2,
  Phone,
  BarChart3,
  Loader2,
  RefreshCw,
  Info,
  Globe,
  MapPin,
  Mail,
  Layers,
} from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { HeroSlide, SiteConfig } from "@/data/site.config";
import { productCategories } from "@/data/products";

type ActiveSection = "home" | "products_section" | "showroom" | "about" | "contact" | "header_footer";

export default function VisualUiCustomizerPage() {
  const { siteConfig, updateSiteConfig, products } = useSiteData();
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [deviceViewport, setDeviceViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewPath, setPreviewPath] = useState("/");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local draft state for real-time live preview
  const [draftConfig, setDraftConfig] = useState<SiteConfig>(siteConfig);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (siteConfig) {
      setDraftConfig(siteConfig);
    }
  }, [siteConfig]);

  // Sync draft to iframe in real time via postMessage
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "ALUECO_LIVE_PREVIEW_SYNC", config: draftConfig },
        "*"
      );
    }
  }, [draftConfig]);

  // Handle section dropdown change & auto-navigate preview
  const handleSectionChange = (section: ActiveSection) => {
    setActiveSection(section);
    let targetPath = "/";
    if (section === "showroom") targetPath = "/showroom";
    else if (section === "about") targetPath = "/about";
    else if (section === "contact") targetPath = "/contact";
    else if (section === "products_section") targetPath = "/#products";
    else if (section === "home" || section === "header_footer") targetPath = "/";

    setPreviewPath(targetPath);
    if (iframeRef.current) {
      iframeRef.current.src = `${targetPath}?preview=true&t=${Date.now()}`;
    }
  };

  // Handle hero slide changes
  const handleUpdateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    const updatedImages = [...(draftConfig.hero?.images || [])];
    if (updatedImages[index]) {
      updatedImages[index] = { ...updatedImages[index], [field]: value };
      setDraftConfig({
        ...draftConfig,
        hero: {
          ...draftConfig.hero,
          images: updatedImages,
          image: updatedImages[0]?.src || draftConfig.hero.image,
        },
      });
    }
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=3000&q=90",
      alt: "Architectural aluminium design showcase",
    };
    const updatedImages = [...(draftConfig.hero?.images || []), newSlide];
    setDraftConfig({
      ...draftConfig,
      hero: {
        ...draftConfig.hero,
        images: updatedImages,
      },
    });
  };

  const handleRemoveSlide = (index: number) => {
    if ((draftConfig.hero?.images || []).length <= 1) {
      alert("At least one hero slide must be present.");
      return;
    }
    const updatedImages = (draftConfig.hero?.images || []).filter((_, i) => i !== index);
    setDraftConfig({
      ...draftConfig,
      hero: {
        ...draftConfig.hero,
        images: updatedImages,
        image: updatedImages[0]?.src || draftConfig.hero.image,
      },
    });
  };

  // Handle stat update
  const handleUpdateStat = (index: number, field: "value" | "label", val: string) => {
    const currentStats = draftConfig.stats || [];
    const updated = [...currentStats];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: val };
      setDraftConfig({ ...draftConfig, stats: updated });
    }
  };

  // Save all draft changes to global context and disk
  const handleSaveChanges = async () => {
    setSaving(true);
    const success = await updateSiteConfig(draftConfig);
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
      if (iframeRef.current) {
        iframeRef.current.src = `${previewPath}?preview=true&t=${Date.now()}`;
      }
    }
  };

  // Switch preview path and reload iframe
  const handleNavigatePreview = (path: string) => {
    setPreviewPath(path);
    if (iframeRef.current) {
      iframeRef.current.src = `${path}?preview=true&t=${Date.now()}`;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-2rem)] max-w-full overflow-hidden">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-500/15 text-lime-600 dark:text-lime-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Visual UI & Text Customizer
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Live Preview
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Edit homepage headlines, showroom, about, contact & footer details live.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Device Switcher */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setDeviceViewport("desktop")}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                deviceViewport === "desktop"
                  ? "bg-white dark:bg-slate-700 text-lime-600 dark:text-lime-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceViewport("tablet")}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                deviceViewport === "tablet"
                  ? "bg-white dark:bg-slate-700 text-lime-600 dark:text-lime-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceViewport("mobile")}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                deviceViewport === "mobile"
                  ? "bg-white dark:bg-slate-700 text-lime-600 dark:text-lime-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
              title="Mobile View (390px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Save Changes Button */}
          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-md shadow-lime-500/20 active:scale-95 transition disabled:opacity-60 cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-950" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Saving..." : saveSuccess ? "Saved to Web!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Main Split Body: Left Editor & Right Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT COLUMN: Controls & Form */}
        <div className="lg:col-span-5 xl:col-span-4 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Section Selector Dropdown (Only relevant ALUECO sections) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Select Section / Page to Edit:
            </label>
            <div className="relative">
              <select
                value={activeSection}
                onChange={(e) => handleSectionChange(e.target.value as ActiveSection)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-lime-500 shadow-sm cursor-pointer"
              >
                <option value="home">🏠 Home Page: Hero & Statistics</option>
                <option value="products_section">🪟 Home Page: Our Products Showcase</option>
                <option value="showroom">🏢 Showroom & Experience Center</option>
                <option value="about">ℹ️ About Us & Brand Story</option>
                <option value="contact">📞 Contact, Phone & WhatsApp</option>
                <option value="header_footer">🌐 Header, Footer & Social Links</option>
              </select>
            </div>
          </div>

          {/* 1. 🏠 HOME PAGE */}
          {activeSection === "home" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Hero Headings & Text
                </span>
                <span className="text-[10px] text-lime-600 dark:text-lime-400 font-semibold">Live Edit</span>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Hero Top Badge Text
                </label>
                <input
                  type="text"
                  value={draftConfig.hero?.eyebrow || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      hero: { ...draftConfig.hero, eyebrow: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Main Heading Line 1
                </label>
                <input
                  type="text"
                  value={draftConfig.hero?.title || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      hero: { ...draftConfig.hero, title: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Main Heading Line 2
                </label>
                <input
                  type="text"
                  value={draftConfig.hero?.titleLine2 || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      hero: { ...draftConfig.hero, titleLine2: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Heading Highlight (Green Accent)
                </label>
                <input
                  type="text"
                  value={draftConfig.hero?.titleHighlight || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      hero: { ...draftConfig.hero, titleHighlight: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-lime-600 dark:text-lime-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={draftConfig.hero?.description || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      hero: { ...draftConfig.hero, description: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={draftConfig.hero?.ctas?.primary?.label || "Request a Free Quote"}
                    onChange={(e) =>
                      setDraftConfig({
                        ...draftConfig,
                        hero: {
                          ...draftConfig.hero,
                          ctas: {
                            ...draftConfig.hero.ctas,
                            primary: { ...draftConfig.hero.ctas.primary, label: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Secondary CTA Label
                  </label>
                  <input
                    type="text"
                    value={draftConfig.hero?.ctas?.secondary?.label || "Explore Our Products"}
                    onChange={(e) =>
                      setDraftConfig({
                        ...draftConfig,
                        hero: {
                          ...draftConfig.hero,
                          ctas: {
                            ...draftConfig.hero.ctas,
                            secondary: { ...draftConfig.hero.ctas.secondary, label: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
              </div>

              {/* SLIDES LIST */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Hero Slider Photos ({draftConfig.hero?.images?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSlide}
                    className="flex items-center gap-1 text-xs font-semibold text-lime-600 dark:text-lime-400 hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Slide</span>
                  </button>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {draftConfig.hero?.images?.map((slide, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 flex items-start gap-2.5 text-xs"
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-16 h-12 rounded-lg object-cover bg-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <input
                          type="text"
                          value={slide.src}
                          onChange={(e) => handleUpdateSlide(idx, "src", e.target.value)}
                          placeholder="Image URL..."
                          className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono"
                        />
                        <input
                          type="text"
                          value={slide.alt}
                          onChange={(e) => handleUpdateSlide(idx, "alt", e.target.value)}
                          placeholder="Alt description..."
                          className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlide(idx)}
                        className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* STATS SECTION */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Trust Statistics & Metrics
                </span>
                <div className="space-y-2">
                  {draftConfig.stats?.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 grid grid-cols-2 gap-2 text-xs"
                    >
                      <div>
                        <label className="block text-[9px] font-semibold text-slate-500 mb-0.5">Value</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => handleUpdateStat(idx, "value", e.target.value)}
                          className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-semibold text-slate-500 mb-0.5">Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleUpdateStat(idx, "label", e.target.value)}
                          className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 1.5 🪟 HOME PAGE: PRODUCTS SECTION */}
          {activeSection === "products_section" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Our Products Showcase
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Live edit the section titles, badges, and product categories displayed on the homepage.
                  </p>
                </div>
                <span className="text-[10px] text-lime-600 dark:text-lime-400 font-semibold">Live Edit</span>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Section Eyebrow / Label
                </label>
                <input
                  type="text"
                  value={draftConfig.homeProducts?.badge ?? "OUR PRODUCTS"}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      homeProducts: {
                        badge: e.target.value,
                        heading: draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions",
                        subheading: draftConfig.homeProducts?.subheading,
                        featuredBadge: draftConfig.homeProducts?.featuredBadge ?? "Featured Product",
                        categoryOverrides: draftConfig.homeProducts?.categoryOverrides || {},
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Section Main Heading
                </label>
                <input
                  type="text"
                  value={draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions"}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      homeProducts: {
                        badge: draftConfig.homeProducts?.badge ?? "OUR PRODUCTS",
                        heading: e.target.value,
                        subheading: draftConfig.homeProducts?.subheading,
                        featuredBadge: draftConfig.homeProducts?.featuredBadge ?? "Featured Product",
                        categoryOverrides: draftConfig.homeProducts?.categoryOverrides || {},
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Section Subheading / Paragraph (Optional)
                </label>
                <textarea
                  rows={2}
                  value={draftConfig.homeProducts?.subheading ?? ""}
                  placeholder="Optional brief description below the heading..."
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      homeProducts: {
                        badge: draftConfig.homeProducts?.badge ?? "OUR PRODUCTS",
                        heading: draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions",
                        subheading: e.target.value,
                        featuredBadge: draftConfig.homeProducts?.featuredBadge ?? "Featured Product",
                        categoryOverrides: draftConfig.homeProducts?.categoryOverrides || {},
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Featured Product Preview Tag
                </label>
                <input
                  type="text"
                  value={draftConfig.homeProducts?.featuredBadge ?? "Featured Product"}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      homeProducts: {
                        badge: draftConfig.homeProducts?.badge ?? "OUR PRODUCTS",
                        heading: draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions",
                        subheading: draftConfig.homeProducts?.subheading,
                        featuredBadge: e.target.value,
                        categoryOverrides: draftConfig.homeProducts?.categoryOverrides || {},
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* CATEGORY CARDS CUSTOMIZER */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                      Category Cards & Text Overrides ({productCategories.length})
                    </span>
                    <p className="text-[10px] text-slate-500">
                      Customize titles, descriptions & images for each category card.
                    </p>
                  </div>
                  <a
                    href="/admin/catalog"
                    className="text-[10px] font-semibold text-lime-600 dark:text-lime-400 hover:underline flex items-center gap-0.5"
                  >
                    Catalog Manager <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                  {productCategories.map((cat) => {
                    const override = draftConfig.homeProducts?.categoryOverrides?.[cat.slug];
                    const matchedProd = products.find((p) => p.slug === cat.slug || p.category === cat.slug);
                    const currentTitle = override?.title ?? cat.name;
                    const currentDesc = override?.description ?? matchedProd?.shortDescription ?? "";
                    const currentImage = override?.image ?? matchedProd?.image ?? "";

                    return (
                      <div
                        key={cat.slug}
                        className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                            <span className="w-2 h-2 rounded-full bg-lime-500"></span>
                            <span>{cat.name}</span>
                            <span className="text-[10px] font-normal text-slate-400">({cat.slug})</span>
                          </div>
                          {override && (
                            <button
                              type="button"
                              onClick={() => {
                                const overrides = { ...(draftConfig.homeProducts?.categoryOverrides || {}) };
                                delete overrides[cat.slug];
                                setDraftConfig({
                                  ...draftConfig,
                                  homeProducts: {
                                    badge: draftConfig.homeProducts?.badge ?? "OUR PRODUCTS",
                                    heading: draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions",
                                    subheading: draftConfig.homeProducts?.subheading,
                                    featuredBadge: draftConfig.homeProducts?.featuredBadge ?? "Featured Product",
                                    categoryOverrides: overrides,
                                  },
                                });
                              }}
                              className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                            >
                              Reset default
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-[9px] font-semibold text-slate-500 mb-0.5">
                            Card Title
                          </label>
                          <input
                            type="text"
                            value={currentTitle}
                            placeholder={cat.name}
                            onChange={(e) => {
                              const overrides = { ...(draftConfig.homeProducts?.categoryOverrides || {}) };
                              overrides[cat.slug] = {
                                ...overrides[cat.slug],
                                title: e.target.value,
                              };
                              setDraftConfig({
                                ...draftConfig,
                                homeProducts: {
                                  badge: draftConfig.homeProducts?.badge ?? "OUR PRODUCTS",
                                  heading: draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions",
                                  subheading: draftConfig.homeProducts?.subheading,
                                  featuredBadge: draftConfig.homeProducts?.featuredBadge ?? "Featured Product",
                                  categoryOverrides: overrides,
                                },
                              });
                            }}
                            className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-semibold text-slate-500 mb-0.5">
                            Card Description
                          </label>
                          <textarea
                            rows={2}
                            value={currentDesc}
                            placeholder="Short description..."
                            onChange={(e) => {
                              const overrides = { ...(draftConfig.homeProducts?.categoryOverrides || {}) };
                              overrides[cat.slug] = {
                                ...overrides[cat.slug],
                                description: e.target.value,
                              };
                              setDraftConfig({
                                ...draftConfig,
                                homeProducts: {
                                  badge: draftConfig.homeProducts?.badge ?? "OUR PRODUCTS",
                                  heading: draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions",
                                  subheading: draftConfig.homeProducts?.subheading,
                                  featuredBadge: draftConfig.homeProducts?.featuredBadge ?? "Featured Product",
                                  categoryOverrides: overrides,
                                },
                              });
                            }}
                            className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-semibold text-slate-500 mb-0.5">
                            Preview Photo URL
                          </label>
                          <div className="flex items-center gap-2">
                            {currentImage && (
                              <img
                                src={currentImage}
                                alt={currentTitle}
                                className="w-8 h-8 rounded-lg object-cover bg-slate-200 shrink-0 border border-slate-200 dark:border-slate-700"
                              />
                            )}
                            <input
                              type="text"
                              value={currentImage}
                              placeholder="https://images.unsplash.com/..."
                              onChange={(e) => {
                                const overrides = { ...(draftConfig.homeProducts?.categoryOverrides || {}) };
                                overrides[cat.slug] = {
                                  ...overrides[cat.slug],
                                  image: e.target.value,
                                };
                                setDraftConfig({
                                  ...draftConfig,
                                  homeProducts: {
                                    badge: draftConfig.homeProducts?.badge ?? "OUR PRODUCTS",
                                    heading: draftConfig.homeProducts?.heading ?? "Premium Aluminium Solutions",
                                    subheading: draftConfig.homeProducts?.subheading,
                                    featuredBadge: draftConfig.homeProducts?.featuredBadge ?? "Featured Product",
                                    categoryOverrides: overrides,
                                  },
                                });
                              }}
                              className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 2. 🏢 SHOWROOM & EXPERIENCE CENTER */}
          {activeSection === "showroom" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Experience Center & Showroom
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Appears on homepage and `/showroom` page.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Showroom Center Name
                </label>
                <input
                  type="text"
                  value={draftConfig.showroom?.name || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      showroom: { ...draftConfig.showroom, name: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Showroom Address / Location
                </label>
                <input
                  type="text"
                  value={draftConfig.showroom?.location || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      showroom: { ...draftConfig.showroom, location: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Operating Days
                  </label>
                  <input
                    type="text"
                    value={draftConfig.showroom?.hours || ""}
                    onChange={(e) =>
                      setDraftConfig({
                        ...draftConfig,
                        showroom: { ...draftConfig.showroom, hours: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={draftConfig.showroom?.time || ""}
                    onChange={(e) =>
                      setDraftConfig({
                        ...draftConfig,
                        showroom: { ...draftConfig.showroom, time: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. ℹ️ ABOUT US */}
          {activeSection === "about" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  About Us & Brand Story
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Appears on `/about` company information.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  About Page Headline
                </label>
                <input
                  type="text"
                  value={draftConfig.about?.heroTitle || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      about: { ...draftConfig.about, heroTitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Who We Are
                </label>
                <textarea
                  rows={3}
                  value={draftConfig.about?.whoWeAre || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      about: { ...draftConfig.about, whoWeAre: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={2}
                  value={draftConfig.about?.mission || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      about: { ...draftConfig.about, mission: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={2}
                  value={draftConfig.about?.vision || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      about: { ...draftConfig.about, vision: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Why Choose ALUECO
                </label>
                <textarea
                  rows={2}
                  value={draftConfig.about?.whyAlueco || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      about: { ...draftConfig.about, whyAlueco: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Quality & Standards Focus
                </label>
                <textarea
                  rows={2}
                  value={draftConfig.about?.quality || ""}
                  onChange={(e) =>
                    setDraftConfig({
                      ...draftConfig,
                      about: { ...draftConfig.about, quality: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 4. 📞 CONTACT & LOCATIONS */}
          {activeSection === "contact" && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Contact & Locations
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Hotline, WhatsApp, email and office address.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Hotline Phone Number
                </label>
                <input
                  type="text"
                  value={draftConfig.phone || ""}
                  onChange={(e) => setDraftConfig({ ...draftConfig, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  WhatsApp Direct Number
                </label>
                <input
                  type="text"
                  value={draftConfig.whatsapp || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const num = val.replace(/[^0-9]/g, "");
                    setDraftConfig({
                      ...draftConfig,
                      whatsapp: val,
                      social: {
                        ...draftConfig.social,
                        whatsapp: num ? `https://wa.me/${num}` : draftConfig.social.whatsapp,
                      },
                    });
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                  Inquiries Email Address
                </label>
                <input
                  type="email"
                  value={draftConfig.email || ""}
                  onChange={(e) => setDraftConfig({ ...draftConfig, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Office & Facility Address
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      value={draftConfig.address?.line1 || ""}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          address: { ...draftConfig.address, line1: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                      City / Country
                    </label>
                    <input
                      type="text"
                      value={draftConfig.address?.line2 || ""}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          address: { ...draftConfig.address, line2: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. 🌐 HEADER, FOOTER & SOCIAL LINKS */}
          {activeSection === "header_footer" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-3">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Company Brand & Tagline
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={draftConfig.name || ""}
                    onChange={(e) => setDraftConfig({ ...draftConfig, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Brand Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={draftConfig.tagline || ""}
                    onChange={(e) => setDraftConfig({ ...draftConfig, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* FOOTER DETAILS & SOCIAL LINKS */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Footer Details & Social Links
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Footer About / Description
                  </label>
                  <textarea
                    rows={2}
                    value={draftConfig.footerAbout || draftConfig.description || ""}
                    onChange={(e) => setDraftConfig({ ...draftConfig, footerAbout: e.target.value })}
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Copyright Notice
                  </label>
                  <input
                    type="text"
                    value={draftConfig.copyright || ""}
                    onChange={(e) => setDraftConfig({ ...draftConfig, copyright: e.target.value })}
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={draftConfig.social?.facebook || ""}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          social: { ...draftConfig.social, facebook: e.target.value },
                        })
                      }
                      className="w-full p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={draftConfig.social?.instagram || ""}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          social: { ...draftConfig.social, instagram: e.target.value },
                        })
                      }
                      className="w-full p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={draftConfig.social?.linkedin || ""}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          social: { ...draftConfig.social, linkedin: e.target.value },
                        })
                      }
                      className="w-full p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={draftConfig.social?.youtube || ""}
                      onChange={(e) =>
                        setDraftConfig({
                          ...draftConfig,
                          social: { ...draftConfig.social, youtube: e.target.value },
                        })
                      }
                      className="w-full p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Interactive Live Preview Frame */}
        <div className="lg:col-span-7 xl:col-span-8 bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-start p-2 sm:p-4 overflow-hidden relative">
          <div
            className={`w-full h-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-300 dark:border-slate-800 transition-all duration-300 flex flex-col ${
              deviceViewport === "mobile"
                ? "max-w-[390px] max-h-[844px] my-auto ring-8 ring-slate-800"
                : deviceViewport === "tablet"
                  ? "max-w-[768px] max-h-[1024px] my-auto ring-8 ring-slate-800"
                  : "w-full h-full"
            }`}
          >
            {/* Preview Browser Address Bar with Page Switcher */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-[11px] shrink-0 gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              </div>

              {/* Page Navigator Dropdown */}
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400">Page:</span>
                <select
                  value={previewPath}
                  onChange={(e) => handleNavigatePreview(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="/">🏠 Homepage (/)</option>
                  <option value="/products">🪟 Products (/products)</option>
                  <option value="/projects">🏢 Projects (/projects)</option>
                  <option value="/showroom">✨ Showroom (/showroom)</option>
                  <option value="/about">ℹ️ About Us (/about)</option>
                  <option value="/contact">📞 Contact (/contact)</option>
                </select>
              </div>

              <a
                href={previewPath}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-500 hover:text-lime-600 text-[11px] shrink-0"
                title="Open current page in new tab"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Iframe Viewport */}
            <iframe
              ref={iframeRef}
              src={`${previewPath}?preview=true`}
              className="w-full flex-1 border-0"
              title="ALUECO Live Website Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
