"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Layers,
  Plus,
  Edit3,
  Trash2,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  ExternalLink,
  Check,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { Product, ProductCategory } from "@/data/products";

const categoryPresets = [
  { label: "Sliding Doors", value: "sliding-doors" },
  { label: "Windows", value: "windows" },
  { label: "Folding Doors", value: "folding" },
  { label: "Swing Doors", value: "swing" },
  { label: "Lift & Sliding", value: "lift-sliding" },
  { label: "Louvers", value: "louver" },
  { label: "Fanlights", value: "fanlights" },
];

function CatalogManagerContent() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useSiteData();
  const searchParams = useSearchParams();
  const editSlug = searchParams?.get("edit");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"general" | "media" | "applications" | "specs">("general");
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Sub-input helpers for tags/arrays
  const [newAppInput, setNewAppInput] = useState("");
  const [newFinishInput, setNewFinishInput] = useState("");
  const [newFeatureInput, setNewFeatureInput] = useState("");
  const [newGalleryInput, setNewGalleryInput] = useState("");
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [newConfigInput, setNewConfigInput] = useState("");

  const coverFileRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  // Auto-open modal if ?edit=[slug] is provided in query string
  useEffect(() => {
    if (editSlug && products.length > 0) {
      const found = products.find((p) => p.slug === editSlug);
      if (found) {
        handleOpenEditModal(found);
      }
    }
  }, [editSlug, products]);

  const handleOpenAddModal = () => {
    setEditingItem({
      slug: `product-${Date.now()}`,
      name: "",
      category: "sliding-doors",
      filterCategory: "sliding-doors",
      shortDescription: "",
      description: "",
      applications: ["Residential", "Living rooms", "Commercial"],
      finishes: ["Powder coated", "Anodized", "Custom RAL colors"],
      features: [
        "High-grade aluminium profile",
        "Smooth sliding mechanism",
        "Large glass panels",
        "Weather resistant",
      ],
      specifications: [
        { label: "Profile", value: "Premium thermal aluminium" },
        { label: "Glass", value: "Single / Double glazed" },
        { label: "Hardware", value: "Heavy duty stainless steel roller assemblies" },
      ],
      configurations: ["2-Track Sliding", "3-Track Sliding"],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      ],
    });
    setModalTab("general");
    setModalError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Product) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setModalTab("general");
    setModalError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the systems catalog?`)) {
      return;
    }

    try {
      const ok = await deleteProduct(slug);
      if (ok) {
        showNotification(`"${name}" removed from catalog.`);
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add / Remove helpers
  const handleAddApp = () => {
    if (!editingItem || !newAppInput.trim()) return;
    if (!editingItem.applications.includes(newAppInput.trim())) {
      setEditingItem({
        ...editingItem,
        applications: [...editingItem.applications, newAppInput.trim()],
      });
    }
    setNewAppInput("");
  };

  const handleRemoveApp = (tag: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      applications: editingItem.applications.filter((a) => a !== tag),
    });
  };

  const handleAddFinish = () => {
    if (!editingItem || !newFinishInput.trim()) return;
    if (!editingItem.finishes.includes(newFinishInput.trim())) {
      setEditingItem({
        ...editingItem,
        finishes: [...editingItem.finishes, newFinishInput.trim()],
      });
    }
    setNewFinishInput("");
  };

  const handleRemoveFinish = (item: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      finishes: editingItem.finishes.filter((f) => f !== item),
    });
  };

  const handleAddFeature = () => {
    if (!editingItem || !newFeatureInput.trim()) return;
    setEditingItem({
      ...editingItem,
      features: [...editingItem.features, newFeatureInput.trim()],
    });
    setNewFeatureInput("");
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      features: editingItem.features.filter((_, i) => i !== index),
    });
  };

  const handleAddSpec = () => {
    if (!editingItem || !newSpecLabel.trim() || !newSpecValue.trim()) return;
    setEditingItem({
      ...editingItem,
      specifications: [
        ...editingItem.specifications,
        { label: newSpecLabel.trim(), value: newSpecValue.trim() },
      ],
    });
    setNewSpecLabel("");
    setNewSpecValue("");
  };

  const handleRemoveSpec = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      specifications: editingItem.specifications.filter((_, i) => i !== index),
    });
  };

  const handleAddGalleryUrl = () => {
    if (!editingItem || !newGalleryInput.trim()) return;
    setEditingItem({
      ...editingItem,
      gallery: [...editingItem.gallery, newGalleryInput.trim()],
    });
    setNewGalleryInput("");
  };

  const handleRemoveGallery = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      gallery: editingItem.gallery.filter((_, i) => i !== index),
    });
  };

  const handleAddConfig = () => {
    if (!editingItem || !newConfigInput.trim()) return;
    setEditingItem({
      ...editingItem,
      configurations: [...(editingItem.configurations || []), newConfigInput.trim()],
    });
    setNewConfigInput("");
  };

  const handleRemoveConfig = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      configurations: (editingItem.configurations || []).filter((_, i) => i !== index),
    });
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

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
        setEditingItem({ ...editingItem, image: data.url });
      }
    } catch (err) {
      console.error(err);
    }
    setIsUploading(false);
    e.target.value = "";
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name?.trim()) {
      setModalError("Please enter a valid product name.");
      return;
    }

    setIsSaving(true);
    setModalError("");

    const isEditing = products.some((p) => p.slug === editingItem.slug);

    const productPayload: Product = {
      ...editingItem,
      slug: editingItem.slug || editingItem.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      filterCategory: (editingItem.category as string) || "sliding-doors",
      applications: editingItem.applications || ["Residential", "Commercial"],
      finishes: editingItem.finishes || ["Powder coated", "Anodized"],
      features: editingItem.features || ["Weather resistant", "Smooth operation"],
      specifications: editingItem.specifications || [{ label: "Profile", value: "Premium aluminium" }],
      configurations: editingItem.configurations || ["Standard configuration"],
      gallery: editingItem.gallery || [],
    };

    try {
      let success = false;
      if (isEditing) {
        success = await updateProduct(productPayload);
      } else {
        success = await addProduct(productPayload);
      }

      if (success) {
        setIsModalOpen(false);
        showNotification(
          isEditing ? `"${productPayload.name}" updated successfully.` : `"${productPayload.name}" added to catalog!`
        );
      } else {
        setModalError("Failed to save product to catalog.");
      }
    } catch (err: any) {
      setModalError(err.message || "Error saving product.");
    }

    setIsSaving(false);
  };

  const filteredItems = products.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory || item.filterCategory === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.shortDescription && item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-wider">
            Products Catalog Manager
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Aluminium Doors, Windows & Systems
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure titles, descriptions, photography, applications, finishes, key features and technical specifications.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-lg shadow-lime-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Category Pills & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 shadow-sm"
                : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            All Systems
          </button>
          {categoryPresets.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-lime-500"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-lime-500 animate-spin" />
          <span className="text-xs text-slate-500">Loading catalog items...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Layers className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No products found</p>
          <p className="text-xs text-slate-500">Try adjusting your search query or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.slug}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur text-lime-400 border border-lime-500/30">
                    ALUECO
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur text-white">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      {item.specifications?.[0]?.value || "Architectural Aluminium Spec"}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.shortDescription || item.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <a
                      href={`/products/${item.slug}`}
                      target="_blank"
                      className="text-xs font-semibold text-lime-600 hover:text-lime-700 dark:text-lime-400 flex items-center gap-1"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                        title="Edit Full Product (Finishes, Features, Specs, Gallery)"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.slug, item.name)}
                        className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 transition cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMPREHENSIVE TABBED PRODUCT EDIT MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/15 text-lime-600 dark:text-lime-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {products.some((p) => p.slug === editingItem.slug) ? `Edit System: ${editingItem.name}` : "Add New Aluminium System"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize title, applications, finishes, key features, gallery & technical specs.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 overflow-x-auto shrink-0">
              <button
                onClick={() => setModalTab("general")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  modalTab === "general"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                1. General & Copy
              </button>
              <button
                onClick={() => setModalTab("media")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  modalTab === "media"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                2. Cover & Gallery ({editingItem.gallery?.length || 0})
              </button>
              <button
                onClick={() => setModalTab("applications")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  modalTab === "applications"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                3. Applications & Finishes
              </button>
              <button
                onClick={() => setModalTab("specs")}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition border-b-2 whitespace-nowrap cursor-pointer ${
                  modalTab === "specs"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 bg-white dark:bg-slate-900 shadow-sm"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                4. Features, Specs & Configurations
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
              {modalError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* TAB 1: GENERAL INFO */}
              {modalTab === "general" && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        placeholder="e.g. Premium Sliding Doors"
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Category *
                      </label>
                      <select
                        value={editingItem.category}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            category: e.target.value as ProductCategory,
                            filterCategory: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                      >
                        {categoryPresets.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Short Description (Card summary)
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.shortDescription}
                      onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                      placeholder="Brief headline description..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Full Technical Description (Product detail page body)
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      placeholder="Full description detailing precision engineering, durability, weather-stripping and architectural benefits..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA & GALLERY */}
              {modalTab === "media" && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Main Cover Photography URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                      <input
                        type="file"
                        ref={coverFileRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                      />
                      <button
                        type="button"
                        onClick={() => coverFileRef.current?.click()}
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
                    {editingItem.image && (
                      <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Gallery */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-700 dark:text-slate-300 font-semibold">
                        Detail Page Gallery Images
                      </label>
                      <span className="text-[11px] text-slate-500">{editingItem.gallery?.length || 0} photos</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add photo URL (https://...)"
                        value={newGalleryInput}
                        onChange={(e) => setNewGalleryInput(e.target.value)}
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
                      {editingItem.gallery?.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950"
                        >
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGallery(idx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition shadow"
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
              {modalTab === "applications" && (
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
                        value={newAppInput}
                        onChange={(e) => setNewAppInput(e.target.value)}
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

                    <div className="flex flex-wrap gap-2">
                      {editingItem.applications?.map((app) => (
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

                    {/* Presets */}
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Quick Suggestions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Living rooms", "Balconies", "Patios", "Villas", "Commercial storefronts", "Hotels", "Kitchens"].map(
                          (tag) =>
                            !editingItem.applications?.includes(tag) && (
                              <button
                                key={tag}
                                type="button"
                                onClick={() =>
                                  setEditingItem({
                                    ...editingItem,
                                    applications: [...editingItem.applications, tag],
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
                        value={newFinishInput}
                        onChange={(e) => setNewFinishInput(e.target.value)}
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

                    <div className="space-y-1.5">
                      {editingItem.finishes?.map((f) => (
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

                    {/* Presets */}
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Quick Suggestions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Powder coated", "Anodized", "Wood grain", "Custom RAL colors", "Matte Charcoal", "Gloss White"].map(
                          (fin) =>
                            !editingItem.finishes?.includes(fin) && (
                              <button
                                key={fin}
                                type="button"
                                onClick={() =>
                                  setEditingItem({
                                    ...editingItem,
                                    finishes: [...editingItem.finishes, fin],
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
              {modalTab === "specs" && (
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
                        value={newFeatureInput}
                        onChange={(e) => setNewFeatureInput(e.target.value)}
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
                      {editingItem.features?.map((f, idx) => (
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

                  {/* Specifications */}
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
                      {editingItem.specifications?.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <div className="grid grid-cols-2 gap-4 flex-1">
                            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px]">
                              {spec.label}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">{spec.value}</span>
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
                        value={newConfigInput}
                        onChange={(e) => setNewConfigInput(e.target.value)}
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
                      {editingItem.configurations?.map((c, idx) => (
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
                  onClick={() => setIsModalOpen(false)}
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
                      <span>Saving System...</span>
                    </>
                  ) : (
                    <span>Save to Catalog</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminCatalogManagerPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-500">Loading catalog manager...</div>}>
      <CatalogManagerContent />
    </Suspense>
  );
}
