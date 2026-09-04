"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Globe,
  Share2,
  Building2,
  Layers,
  Loader2,
} from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

interface ContentFormState {
  eyebrow: string;
  title: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  productsEyebrow: string;
  productsHeading: string;
  productsSubheading: string;
  productsFeaturedBadge: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  showroomName: string;
  showroomLocation: string;
  showroomHours: string;
  showroomTime: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementLink: string;
}

export default function AdminContentPage() {
  const { siteConfig, updateSiteConfig } = useSiteData();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ContentFormState>({
    eyebrow: siteConfig.hero?.eyebrow || "",
    title: siteConfig.hero?.title || "",
    titleLine2: siteConfig.hero?.titleLine2 || "",
    titleHighlight: siteConfig.hero?.titleHighlight || "",
    description: siteConfig.hero?.description || "",
    productsEyebrow: siteConfig.homeProducts?.badge || "OUR PRODUCTS",
    productsHeading: siteConfig.homeProducts?.heading || "Premium Aluminium Solutions",
    productsSubheading: siteConfig.homeProducts?.subheading || "",
    productsFeaturedBadge: siteConfig.homeProducts?.featuredBadge || "Featured Product",
    phone: siteConfig.phone || "",
    whatsapp: siteConfig.whatsapp || "",
    email: siteConfig.email || "",
    addressLine1: siteConfig.address?.line1 || "",
    addressLine2: siteConfig.address?.line2 || "",
    showroomName: siteConfig.showroom?.name || "",
    showroomLocation: siteConfig.showroom?.location || "",
    showroomHours: siteConfig.showroom?.hours || "",
    showroomTime: siteConfig.showroom?.time || "",
    facebook: siteConfig.social?.facebook || "",
    instagram: siteConfig.social?.instagram || "",
    youtube: siteConfig.social?.youtube || "",
    linkedin: siteConfig.social?.linkedin || "",
    announcementEnabled: true,
    announcementText: "Visit our newly opened Wellaweriya Experience Center & Architectural Showroom!",
    announcementLink: "/showroom",
  });

  // Sync state when siteConfig updates
  useEffect(() => {
    if (siteConfig) {
      setForm({
        eyebrow: siteConfig.hero?.eyebrow || "",
        title: siteConfig.hero?.title || "",
        titleLine2: siteConfig.hero?.titleLine2 || "",
        titleHighlight: siteConfig.hero?.titleHighlight || "",
        description: siteConfig.hero?.description || "",
        productsEyebrow: siteConfig.homeProducts?.badge || "OUR PRODUCTS",
        productsHeading: siteConfig.homeProducts?.heading || "Premium Aluminium Solutions",
        productsSubheading: siteConfig.homeProducts?.subheading || "",
        productsFeaturedBadge: siteConfig.homeProducts?.featuredBadge || "Featured Product",
        phone: siteConfig.phone || "",
        whatsapp: siteConfig.whatsapp || "",
        email: siteConfig.email || "",
        addressLine1: siteConfig.address?.line1 || "",
        addressLine2: siteConfig.address?.line2 || "",
        showroomName: siteConfig.showroom?.name || "",
        showroomLocation: siteConfig.showroom?.location || "",
        showroomHours: siteConfig.showroom?.hours || "",
        showroomTime: siteConfig.showroom?.time || "",
        facebook: siteConfig.social?.facebook || "",
        instagram: siteConfig.social?.instagram || "",
        youtube: siteConfig.social?.youtube || "",
        linkedin: siteConfig.social?.linkedin || "",
        announcementEnabled: true,
        announcementText: "Visit our newly opened Wellaweriya Experience Center & Architectural Showroom!",
        announcementLink: "/showroom",
      });
    }
  }, [siteConfig]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const waNum = form.whatsapp.replace(/[^0-9]/g, "");
    const waUrl = waNum ? `https://wa.me/${waNum}` : (siteConfig.social?.whatsapp || "");

    const success = await updateSiteConfig({
      hero: {
        ...siteConfig.hero,
        eyebrow: form.eyebrow,
        title: form.title,
        titleLine2: form.titleLine2,
        titleHighlight: form.titleHighlight,
        description: form.description,
      },
      homeProducts: {
        badge: form.productsEyebrow,
        heading: form.productsHeading,
        subheading: form.productsSubheading,
        featuredBadge: form.productsFeaturedBadge,
        categoryOverrides: siteConfig.homeProducts?.categoryOverrides || {},
      },
      phone: form.phone,
      whatsapp: form.whatsapp,
      email: form.email,
      address: {
        ...siteConfig.address,
        line1: form.addressLine1,
        line2: form.addressLine2,
      },
      showroom: {
        ...siteConfig.showroom,
        name: form.showroomName,
        location: form.showroomLocation,
        hours: form.showroomHours,
        time: form.showroomTime,
      },
      social: {
        ...siteConfig.social,
        facebook: form.facebook,
        instagram: form.instagram,
        youtube: form.youtube,
        linkedin: form.linkedin,
        whatsapp: waUrl,
      },
    });

    setSaving(false);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-wider">
            Website Content CMS
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Site Content & Details Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Update hero headlines, showroom hours, phone numbers, and social media channels on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {saved && (
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Saved!</span>
            </div>
          )}
          <button
            type="submit"
            form="content-form"
            disabled={saving}
            className="px-4 py-2.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-lg shadow-lime-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? "Publishing..." : "Publish Changes"}</span>
          </button>
        </div>
      </div>

      <form id="content-form" onSubmit={handleSave} className="space-y-8">
        {/* 1. HERO SECTION HEADLINES */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-500/10 text-lime-600 dark:text-lime-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Homepage Hero Headline & Copy
              </h2>
              <p className="text-xs text-slate-500">First impression seen by homeowners, builders, and architects.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Eyebrow Sub-tag
              </label>
              <input
                type="text"
                value={form.eyebrow}
                onChange={(e) => setForm({ ...form, eyebrow: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Title Line 1
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Title Line 2
              </label>
              <input
                type="text"
                value={form.titleLine2}
                onChange={(e) => setForm({ ...form, titleLine2: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Highlight Accent Word / Phrase
              </label>
              <input
                type="text"
                value={form.titleHighlight}
                onChange={(e) => setForm({ ...form, titleHighlight: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-lime-600 dark:text-lime-400 font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Hero Description Paragraph
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* 1.5 HOMEPAGE PRODUCTS SECTION */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-500/10 text-lime-600 dark:text-lime-400">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Homepage Products Showcase Section
              </h2>
              <p className="text-xs text-slate-500">Edit the section badge, main heading and subheading appearing above product cards.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Section Eyebrow / Top Badge
              </label>
              <input
                type="text"
                value={form.productsEyebrow}
                onChange={(e) => setForm({ ...form, productsEyebrow: e.target.value })}
                placeholder="OUR PRODUCTS"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Featured Product Preview Tag
              </label>
              <input
                type="text"
                value={form.productsFeaturedBadge}
                onChange={(e) => setForm({ ...form, productsFeaturedBadge: e.target.value })}
                placeholder="Featured Product"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Main Section Heading
              </label>
              <input
                type="text"
                value={form.productsHeading}
                onChange={(e) => setForm({ ...form, productsHeading: e.target.value })}
                placeholder="Premium Aluminium Solutions"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Subheading / Paragraph (Optional)
              </label>
              <textarea
                rows={2}
                value={form.productsSubheading}
                onChange={(e) => setForm({ ...form, productsSubheading: e.target.value })}
                placeholder="Brief explanatory note under heading..."
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. SHOWROOM & OPERATING HOURS */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Showroom & Experience Center
              </h2>
              <p className="text-xs text-slate-500">Public location and visiting schedule displayed on website.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Showroom Name
              </label>
              <input
                type="text"
                value={form.showroomName}
                onChange={(e) => setForm({ ...form, showroomName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Showroom Location / Area
              </label>
              <input
                type="text"
                value={form.showroomLocation}
                onChange={(e) => setForm({ ...form, showroomLocation: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Visiting Days
              </label>
              <input
                type="text"
                value={form.showroomHours}
                onChange={(e) => setForm({ ...form, showroomHours: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Visiting Time
              </label>
              <input
                type="text"
                value={form.showroomTime}
                onChange={(e) => setForm({ ...form, showroomTime: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* 3. CONTACT CHANNELS */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Contact Hotline & Communications
              </h2>
              <p className="text-xs text-slate-500">Synced across header, footer, floating WhatsApp, and contact page.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Primary Hotline
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 uppercase text-[10px] tracking-wider">
                Support Email
              </label>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* 4. SOCIAL MEDIA CHANNELS */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Social Media Channels
              </h2>
              <p className="text-xs text-slate-500">Official social links connected to footer icons.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                value={form.facebook}
                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                YouTube URL
              </label>
              <input
                type="text"
                value={form.youtube}
                onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold px-6 py-3.5 text-xs shadow-lg shadow-lime-500/20 active:scale-95 transition cursor-pointer disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? "Publishing Changes..." : "Publish Content Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
