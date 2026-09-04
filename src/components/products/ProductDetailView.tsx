"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit3,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  X,
  Upload,
  Loader2,
  Layers,
  Sparkles,
  Settings,
  Shield,
} from "lucide-react";
import { Product } from "@/data/products";
import { useSiteData } from "@/context/SiteDataContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductDetailViewProps {
  initialProduct: Product;
  relatedProducts: Product[];
  whatsappUrl?: string;
}

export function ProductDetailView({
  initialProduct,
  relatedProducts: initialRelated,
  whatsappUrl = "https://wa.me/94770000000",
}: ProductDetailViewProps) {
  const { products, updateProduct, siteConfig } = useSiteData();

  // Find the product in dynamic context, fallback to server rendered initialProduct
  const product = products.find((p) => p.slug === initialProduct.slug) || initialProduct;
  const related = (products.length > 0 ? products.filter((p) => p.slug !== product.slug).slice(0, 3) : initialRelated);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "media" | "applications" | "specs">("general");

  // Form state for editing
  const [editingData, setEditingData] = useState<Product>(JSON.parse(JSON.stringify(product)));
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Input states for adding new items
  const [newAppTag, setNewAppTag] = useState("");
  const [newFinishItem, setNewFinishItem] = useState("");
  const [newFeatureItem, setNewFeatureItem] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newConfigItem, setNewConfigItem] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Check if admin is authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth =
        sessionStorage.getItem("alueco_admin_auth") ||
        sessionStorage.getItem("app_admin_auth") ||
        sessionStorage.getItem("glx_admin_auth");
      if (auth) {
        setIsAdmin(true);
      }
    }
  }, []);

  // Sync editingData when product updates or modal opens
  const openEditModal = () => {
    setEditingData(JSON.parse(JSON.stringify(product)));
    setIsEditModalOpen(true);
  };

  // Add / Remove Handlers
  const handleAddApp = () => {
    if (!newAppTag.trim()) return;
    if (!editingData.applications.includes(newAppTag.trim())) {
      setEditingData({
        ...editingData,
        applications: [...editingData.applications, newAppTag.trim()],
      });
    }
    setNewAppTag("");
  };

  const handleRemoveApp = (tag: string) => {
    setEditingData({
      ...editingData,
      applications: editingData.applications.filter((a) => a !== tag),
    });
  };

  const handleAddFinish = () => {
    if (!newFinishItem.trim()) return;
    if (!editingData.finishes.includes(newFinishItem.trim())) {
      setEditingData({
        ...editingData,
        finishes: [...editingData.finishes, newFinishItem.trim()],
      });
    }
    setNewFinishItem("");
  };

  const handleRemoveFinish = (item: string) => {
    setEditingData({
      ...editingData,
      finishes: editingData.finishes.filter((f) => f !== item),
    });
  };

  const handleAddFeature = () => {
    if (!newFeatureItem.trim()) return;
    setEditingData({
      ...editingData,
      features: [...editingData.features, newFeatureItem.trim()],
    });
    setNewFeatureItem("");
  };

  const handleRemoveFeature = (index: number) => {
    setEditingData({
      ...editingData,
      features: editingData.features.filter((_, i) => i !== index),
    });
  };

  const handleAddSpec = () => {
    if (!newSpecLabel.trim() || !newSpecValue.trim()) return;
    setEditingData({
      ...editingData,
      specifications: [
        ...editingData.specifications,
        { label: newSpecLabel.trim(), value: newSpecValue.trim() },
      ],
    });
    setNewSpecLabel("");
    setNewSpecValue("");
  };

  const handleRemoveSpec = (index: number) => {
    setEditingData({
      ...editingData,
      specifications: editingData.specifications.filter((_, i) => i !== index),
    });
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setEditingData({
      ...editingData,
      gallery: [...editingData.gallery, newGalleryUrl.trim()],
    });
    setNewGalleryUrl("");
  };

  const handleRemoveGallery = (index: number) => {
    setEditingData({
      ...editingData,
      gallery: editingData.gallery.filter((_, i) => i !== index),
    });
  };

  const handleAddConfig = () => {
    if (!newConfigItem.trim()) return;
    setEditingData({
      ...editingData,
      configurations: [...(editingData.configurations || []), newConfigItem.trim()],
    });
    setNewConfigItem("");
  };

  const handleRemoveConfig = (index: number) => {
    setEditingData({
      ...editingData,
      configurations: (editingData.configurations || []).filter((_, i) => i !== index),
    });
  };

  // Upload cover image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setEditingData({ ...editingData, image: data.url });
      }
    } catch (err) {
      console.error(err);
    }
    setIsUploading(false);
    e.target.value = "";
  };

  // Save Modal Changes
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const success = await updateProduct(editingData);
      if (success) {
        setSaveSuccessMsg("Product updated and published live!");
        setTimeout(() => {
          setSaveSuccessMsg("");
          setIsEditModalOpen(false);
        }, 1200);
      } else {
        alert("Failed to save changes. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving product.");
    }

    setIsSaving(false);
  };

  const resolvedWhatsapp = siteConfig.social?.whatsapp || whatsappUrl;

  return (
    <>
      {/* Floating Admin Banner (shown only when admin session is active) */}
      {isAdmin && (
        <aside
          aria-label="Admin controls"
          className="sticky top-20 z-40 bg-slate-900 text-white px-4 py-2.5 border-b border-lime-500/40 shadow-lg backdrop-blur-md"
        >
          <div className="container-main flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="flex h-2 w-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="font-bold text-lime-400 uppercase tracking-wider text-[10px]">
                Admin Active
              </span>
              <span className="text-slate-300">
                You are viewing: <strong className="text-white">{product.name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openEditModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Product Details (Finishes, Features & Specs)</span>
              </button>

              <Link
                href={`/admin/catalog?edit=${product.slug}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition"
              >
                <span>Admin Catalog</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
            </div>
          </div>
        </aside>
      )}

      {/* Main Product View Section */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Gallery Column */}
            <div>
              <div className="overflow-hidden rounded-[16px] border border-border bg-slate-100 dark:bg-slate-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={525}
                  className="aspect-[4/3] w-full object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {product.gallery && product.gallery.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {product.gallery.slice(0, 6).map((img, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-[12px] border border-border bg-slate-100 dark:bg-slate-800"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} gallery ${i + 1}`}
                        width={220}
                        height={165}
                        className="aspect-[4/3] w-full object-cover hover:scale-105 transition duration-300"
                        sizes="33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-heading md:text-4xl">{product.name}</h1>
                {isAdmin && (
                  <button
                    onClick={openEditModal}
                    className="shrink-0 p-2 rounded-xl bg-lime-500/10 text-lime-600 hover:bg-lime-500/20 transition cursor-pointer"
                    title="Quick Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="mt-4 text-base leading-relaxed text-muted">
                {product.description || product.shortDescription}
              </p>

              {/* APPLICATIONS */}
              {product.applications && product.applications.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                    Applications
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <li
                        key={app}
                        className="rounded-full border border-border bg-section px-3 py-1 text-sm text-text"
                      >
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AVAILABLE FINISHES */}
              {product.finishes && product.finishes.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                    Available Finishes
                  </h2>
                  <ul className="mt-2 space-y-1">
                    {product.finishes.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted">
                        <span className="text-brand font-bold" aria-hidden="true">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* KEY FEATURES */}
              {product.features && product.features.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                    Key Features
                  </h2>
                  <ul className="mt-2 space-y-1.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="mt-0.5 text-brand font-bold" aria-hidden="true">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact#quote">Request a Quote</Button>
                <Button href={resolvedWhatsapp} variant="secondary" external>
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications & Configurations Section */}
      <section className="border-t border-border bg-section py-12 md:py-16">
        <div className="container-main space-y-12">
          {product.specifications && product.specifications.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-heading">Specifications</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-[12px] border border-border bg-surface p-4 shadow-sm"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-text">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {product.configurations && product.configurations.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-heading">Available Configurations</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.configurations.map((c, i) => (
                  <li
                    key={i}
                    className="rounded-[9px] border border-border bg-surface px-4 py-2 text-sm text-text font-medium"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Products */}
          {related && related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-heading">Related Products</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FULL IN-PAGE PRODUCT CUSTOMIZATION MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/15 text-lime-600 dark:text-lime-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Edit System: {product.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize title, applications, finishes, key features, gallery & technical specs.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab("general")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "general"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                1. General & Copy
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "media"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                2. Cover & Gallery ({editingData.gallery?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "applications"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                3. Applications & Finishes
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === "specs"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                4. Features, Specs & Configurations
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
              {saveSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* TAB 1: GENERAL */}
              {activeTab === "general" && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingData.name}
                        onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Category Slug *
                      </label>
                      <input
                        type="text"
                        value={editingData.category}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            category: e.target.value as any,
                            filterCategory: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Short Description (Card Summary)
                    </label>
                    <textarea
                      rows={2}
                      value={editingData.shortDescription}
                      onChange={(e) =>
                        setEditingData({ ...editingData, shortDescription: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Full Technical Description
                    </label>
                    <textarea
                      rows={4}
                      value={editingData.description}
                      onChange={(e) =>
                        setEditingData({ ...editingData, description: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA & GALLERY */}
              {activeTab === "media" && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Main Hero Cover Photo URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingData.image}
                        onChange={(e) => setEditingData({ ...editingData, image: e.target.value })}
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                        title="Upload file"
                      >
                        {isUploading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-lime-500" />
                        ) : (
                          <Upload className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                    </div>
                    {editingData.image && (
                      <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img
                          src={editingData.image}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* GALLERY LIST */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-700 dark:text-slate-300 font-semibold">
                        Detail Page Gallery Images
                      </label>
                      <span className="text-[11px] text-slate-500">
                        {editingData.gallery?.length || 0} photos
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add gallery image URL (https://...)"
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 font-bold text-xs"
                      >
                        Add Photo
                      </button>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1">
                      {editingData.gallery?.map((img, i) => (
                        <div
                          key={i}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950"
                        >
                          <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveGallery(i)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition shadow"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: APPLICATIONS & FINISHES */}
              {activeTab === "applications" && (
                <div className="space-y-6 animate-in fade-in">
                  {/* Applications */}
                  <div className="space-y-3">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold">
                      Applications (e.g. Living rooms, Balconies, Patios)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type application tag..."
                        value={newAppTag}
                        onChange={(e) => setNewAppTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddApp();
                          }
                        }}
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddApp}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 font-bold text-xs"
                      >
                        Add Tag
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {editingData.applications?.map((app) => (
                        <span
                          key={app}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <span>{app}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveApp(app)}
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Quick Suggestions */}
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Quick Add:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Living rooms", "Balconies", "Patios", "Villas", "Commercial storefronts", "Hotels", "Kitchens"].map(
                          (tag) =>
                            !editingData.applications?.includes(tag) && (
                              <button
                                key={tag}
                                type="button"
                                onClick={() =>
                                  setEditingData({
                                    ...editingData,
                                    applications: [...editingData.applications, tag],
                                  })
                                }
                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-lime-100 dark:hover:bg-lime-950/40 text-[10px] text-slate-600 dark:text-slate-400 transition"
                              >
                                + {tag}
                              </button>
                            )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Finishes */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold">
                      Available Finishes (e.g. Powder coated, Anodized)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add finish option..."
                        value={newFinishItem}
                        onChange={(e) => setNewFinishItem(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddFinish();
                          }
                        }}
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddFinish}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 font-bold text-xs"
                      >
                        Add Finish
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {editingData.finishes?.map((f) => (
                        <div
                          key={f}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <span className="flex items-center gap-2 font-medium">
                            <Check className="w-3.5 h-3.5 text-lime-500" />
                            {f}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFinish(f)}
                            className="p-1 text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Quick Finish Presets */}
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Quick Add:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Powder coated", "Anodized", "Wood grain", "Custom RAL colors", "Matte Charcoal", "Gloss White"].map(
                          (fin) =>
                            !editingData.finishes?.includes(fin) && (
                              <button
                                key={fin}
                                type="button"
                                onClick={() =>
                                  setEditingData({
                                    ...editingData,
                                    finishes: [...editingData.finishes, fin],
                                  })
                                }
                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-lime-100 dark:hover:bg-lime-950/40 text-[10px] text-slate-600 dark:text-slate-400 transition"
                              >
                                + {fin}
                              </button>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: FEATURES, SPECS & CONFIGURATIONS */}
              {activeTab === "specs" && (
                <div className="space-y-6 animate-in fade-in">
                  {/* Key Features */}
                  <div className="space-y-3">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold">
                      Key Bullet Features
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Smooth sliding mechanism..."
                        value={newFeatureItem}
                        onChange={(e) => setNewFeatureItem(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 font-bold text-xs"
                      >
                        Add Feature
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {editingData.features?.map((f, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lime-500 font-bold">✓</span>
                            {f}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(idx)}
                            className="p-1 text-slate-400 hover:text-rose-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specifications Key-Value */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold">
                      Technical Specifications (Table Rows)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      <input
                        type="text"
                        placeholder="Spec Label (e.g. Glass)"
                        value={newSpecLabel}
                        onChange={(e) => setNewSpecLabel(e.target.value)}
                        className="sm:col-span-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Spec Value (e.g. Double Glazed Acoustic)"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        className="sm:col-span-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddSpec}
                        className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 font-bold text-xs"
                      >
                        Add Row
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {editingData.specifications?.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <div className="grid grid-cols-2 gap-4 flex-1">
                            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px]">
                              {spec.label}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">
                              {spec.value}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSpec(idx)}
                            className="p-1 text-slate-400 hover:text-rose-500 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Configurations */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold">
                      Configurations
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 2-Track, 3-Track, Pocket Door..."
                        value={newConfigItem}
                        onChange={(e) => setNewConfigItem(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddConfig}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 font-bold text-xs"
                      >
                        Add Config
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {editingData.configurations?.map((c, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs"
                        >
                          <span>{c}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveConfig(idx)}
                            className="text-slate-400 hover:text-rose-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold shadow-md shadow-lime-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <span>Save & Publish Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
