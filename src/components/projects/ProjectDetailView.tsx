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
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  FolderKanban,
} from "lucide-react";
import { Project, ProjectCategory } from "@/data/projects";
import { useSiteData } from "@/context/SiteDataContext";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";

const categoryOptions: { label: string; value: ProjectCategory }[] = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Apartments", value: "apartments" },
  { label: "Villas", value: "villas" },
  { label: "Renovations", value: "renovations" },
];

const PRESET_PRODUCTS = [
  "Sliding Doors",
  "Casement Windows",
  "Folding Doors",
  "Swing Doors",
  "Lift & Sliding",
  "Tilt & Turn",
  "Louver Windows",
  "Fanlights",
  "Curtain Walls",
  "Structural Glazing",
];

interface ProjectDetailViewProps {
  initialProject: Project;
  relatedProjects: Project[];
}

export function ProjectDetailView({
  initialProject,
  relatedProjects: initialRelated,
}: ProjectDetailViewProps) {
  const { projects, updateProject } = useSiteData();

  // Find the project in dynamic context, fallback to server rendered initialProject
  const project = projects.find((p) => p.slug === initialProject.slug) || initialProject;
  const related = projects.length > 0 ? projects.filter((p) => p.slug !== project.slug).slice(0, 3) : initialRelated;

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "media" | "products">("general");

  // Form state for editing
  const [editingData, setEditingData] = useState<Project>(JSON.parse(JSON.stringify(project)));
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [newProductTag, setNewProductTag] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const openEditModal = () => {
    setEditingData(JSON.parse(JSON.stringify(project)));
    setIsEditModalOpen(true);
  };

  const handleAddProductTag = (tagToAdd?: string) => {
    const val = (tagToAdd || newProductTag).trim();
    if (!val) return;
    const current = editingData.productsUsed || [];
    if (!current.includes(val)) {
      setEditingData({
        ...editingData,
        productsUsed: [...current, val],
      });
    }
    if (!tagToAdd) setNewProductTag("");
  };

  const handleRemoveProductTag = (tag: string) => {
    setEditingData({
      ...editingData,
      productsUsed: (editingData.productsUsed || []).filter((p) => p !== tag),
    });
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setEditingData({
      ...editingData,
      gallery: [...(editingData.gallery || []), newGalleryUrl.trim()],
    });
    setNewGalleryUrl("");
  };

  const handleRemoveGalleryImage = (index: number) => {
    setEditingData({
      ...editingData,
      gallery: (editingData.gallery || []).filter((_, idx) => idx !== index),
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setEditingData({ ...editingData, image: data.url });
      } else {
        alert("Upload failed. Please try pasting a direct image URL.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const ok = await updateProject(editingData);
      if (ok) {
        setSaveSuccessMsg("Project details updated successfully!");
        setTimeout(() => {
          setSaveSuccessMsg("");
          setIsEditModalOpen(false);
        }, 1200);
      } else {
        alert("Failed to save project.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* FLOATING ADMIN QUICK EDIT BAR */}
      {isAdmin && (
        <div className="sticky top-0 z-40 w-full bg-slate-950 text-white border-b border-lime-500/40 shadow-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex h-2 w-2 rounded-full bg-lime-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span className="font-semibold text-slate-200">Admin Mode:</span>
            <span className="text-slate-400 hidden sm:inline">Editing project details for</span>
            <strong className="text-lime-300 underline font-mono">{project.title}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openEditModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Project Details</span>
            </button>

            <Link
              href={`/admin/projects?edit=${project.slug}`}
              target="_blank"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition"
            >
              <span>Open in Projects CMS</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative">
        <div className="relative h-[40vh] min-h-[320px] max-h-[480px] w-full overflow-hidden md:h-[50vh]">
          <Image
            src={project.image}
            alt={`${project.title} - ${project.location}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full">
            <div className="container-main pb-8 md:pb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/20 backdrop-blur-md border border-lime-400/30 text-lime-300 text-xs font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
                <span className="opacity-40">•</span>
                <span>{project.projectType}</span>
                <span className="opacity-40">•</span>
                <span>{project.year}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl drop-shadow-md">
                {project.title} – {project.location}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS BODY */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-lime-600 dark:text-lime-400 mb-2">
                  Project Overview
                </h2>
                <p className="text-base leading-relaxed text-muted whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {project.shortDescription && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 italic">
                  &ldquo;{project.shortDescription}&rdquo;
                </div>
              )}
            </div>

            {/* PROJECT INFORMATION CARD */}
            <aside className="rounded-[16px] border border-border bg-section p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
                  <FolderKanban className="w-4 h-4" />
                  Project Information
                </h2>
                {isAdmin && (
                  <button
                    onClick={openEditModal}
                    className="text-[11px] font-bold text-lime-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-medium text-muted">Location</dt>
                  <dd className="text-sm font-semibold text-text mt-0.5">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted">Project Type</dt>
                  <dd className="text-sm font-semibold text-text mt-0.5">{project.projectType}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted">Year Completed</dt>
                  <dd className="text-sm font-semibold text-text mt-0.5">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted">Architectural Category</dt>
                  <dd className="text-sm font-semibold text-text capitalize mt-0.5">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-muted mb-1.5">Systems & Products Used</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.productsUsed?.map((p) => (
                      <span
                        key={p}
                        className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text shadow-sm"
                      >
                        {p}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          {/* GALLERY GRID */}
          <div className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-heading">Project Gallery</h2>
                <p className="text-xs text-muted mt-0.5">High-resolution photography of architectural installation</p>
              </div>
              {isAdmin && (
                <button
                  onClick={() => {
                    setActiveTab("media");
                    openEditModal();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-lime-500 hover:text-slate-950 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Manage Photos ({project.gallery?.length || 0})</span>
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery?.map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[16px] border border-border bg-slate-100 dark:bg-slate-900 shadow-sm"
                >
                  <Image
                    src={img}
                    alt={`${project.title} gallery photo ${i + 1}`}
                    width={500}
                    height={375}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={img}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-bold shadow-md hover:bg-white flex items-center gap-1"
                    >
                      <span>View Full Image</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="border-t border-border bg-soft-green py-12 md:py-16">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-heading">Have a Similar Project?</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto text-sm">
            Let our architectural facade engineers bring your residential or commercial vision to life with precision aluminium systems.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact#quote" size="lg">
              Request a Free Quote
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Speak with Engineer
            </Button>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      <section className="py-12 md:py-16 border-t border-border">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-heading">Related Projects</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* IN-PAGE ADMIN QUICK EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-500 text-slate-950">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Edit Project: {editingData.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Changes save immediately to disk and live website.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 px-5 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("general")}
                className={`py-2.5 px-3 border-b-2 transition cursor-pointer ${
                  activeTab === "general"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                1. Project Information
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`py-2.5 px-3 border-b-2 transition cursor-pointer ${
                  activeTab === "media"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                2. Cover & Gallery ({editingData.gallery?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`py-2.5 px-3 border-b-2 transition cursor-pointer ${
                  activeTab === "products"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                3. Products Used ({editingData.productsUsed?.length || 0})
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-4">
              {saveSuccessMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* TAB 1: GENERAL */}
              {activeTab === "general" && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingData.title}
                        onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
                        className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingData.location}
                        onChange={(e) => setEditingData({ ...editingData, location: e.target.value })}
                        className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Project Type
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Luxury Private Villa"
                        value={editingData.projectType}
                        onChange={(e) => setEditingData({ ...editingData, projectType: e.target.value })}
                        className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Completion Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2025"
                        value={editingData.year}
                        onChange={(e) => setEditingData({ ...editingData, year: e.target.value })}
                        className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={editingData.category}
                        onChange={(e) =>
                          setEditingData({
                            ...editingData,
                            category: e.target.value as ProjectCategory,
                            filterCategory: e.target.value,
                          })
                        }
                        className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs cursor-pointer"
                      >
                        {categoryOptions.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Short Description (Card Summary)
                    </label>
                    <input
                      type="text"
                      value={editingData.shortDescription}
                      onChange={(e) => setEditingData({ ...editingData, shortDescription: e.target.value })}
                      className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Detailed Description *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={editingData.description}
                      onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA & GALLERY */}
              {activeTab === "media" && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Hero Cover Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingData.image}
                        onChange={(e) => setEditingData({ ...editingData, image: e.target.value })}
                        className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1 cursor-pointer font-semibold"
                      >
                        {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>Upload</span>
                      </button>
                    </div>

                    {editingData.image && (
                      <div className="mt-2 h-28 w-44 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img src={editingData.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* GALLERY LIST */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Project Photo Gallery ({editingData.gallery?.length || 0})
                    </label>

                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Add high-res photo URL..."
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        className="px-3 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                      {editingData.gallery?.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950"
                        >
                          <img src={img} alt={`Gallery ${idx}`} className="w-full h-24 object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-600 text-white opacity-90 hover:opacity-100 cursor-pointer shadow"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCTS USED */}
              {activeTab === "products" && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Products & Architectural Systems Used
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Tags displayed on the project card and info sidebar.
                    </p>

                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="e.g. Thermal Break Sliding Doors"
                        value={newProductTag}
                        onChange={(e) => setNewProductTag(e.target.value)}
                        className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddProductTag()}
                        className="px-3 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Tag</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {editingData.productsUsed?.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-lime-500/10 border border-lime-500/30 text-lime-700 dark:text-lime-400 font-semibold text-xs"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveProductTag(tag)}
                            className="hover:text-rose-500 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Presets */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                        One-Click Presets:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_PRODUCTS.map((preset) => {
                          const already = (editingData.productsUsed || []).includes(preset);
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => handleAddProductTag(preset)}
                              disabled={already}
                              className={`px-2 py-1 rounded-md text-[11px] font-medium border transition cursor-pointer ${
                                already
                                  ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-default"
                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-lime-500 hover:text-lime-600"
                              }`}
                            >
                              + {preset}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-md shadow-lime-500/20 active:scale-95 transition cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
