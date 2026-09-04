"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FolderKanban,
  Plus,
  Edit3,
  Trash2,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  MapPin,
  Calendar,
  ExternalLink,
  Layers,
  Check,
  ImageIcon,
} from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { Project, ProjectCategory } from "@/data/projects";

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

function AdminProjectsContent() {
  const searchParams = useSearchParams();
  const editSlug = searchParams ? searchParams.get("edit") : null;

  const { projects, loading, addProject, updateProject, deleteProject } = useSiteData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "media" | "products">("general");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  const [newProductTag, setNewProductTag] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const coverFileRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  // Auto-open modal if ?edit=[slug] is provided in query
  useEffect(() => {
    if (editSlug && projects.length > 0) {
      const found = projects.find((p) => p.slug === editSlug);
      if (found) {
        handleOpenEdit(found);
      }
    }
  }, [editSlug, projects]);

  const handleOpenAdd = () => {
    setEditingProject({
      slug: `project-${Date.now()}`,
      title: "",
      location: "Colombo",
      category: "residential",
      filterCategory: "residential",
      year: new Date().getFullYear().toString(),
      projectType: "Luxury Residence",
      productsUsed: ["Sliding Doors", "Casement Windows"],
      shortDescription: "",
      description: "",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      gallery: [],
    });
    setActiveTab("general");
    setModalError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject(JSON.parse(JSON.stringify(proj)));
    setActiveTab("general");
    setModalError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the projects portfolio?`)) {
      return;
    }

    try {
      const ok = await deleteProject(slug);
      if (ok) {
        showNotification(`Project "${title}" deleted successfully.`);
      } else {
        alert("Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProductTag = (tagToAdd?: string) => {
    if (!editingProject) return;
    const val = (tagToAdd || newProductTag).trim();
    if (!val) return;
    const current = editingProject.productsUsed || [];
    if (!current.includes(val)) {
      setEditingProject({
        ...editingProject,
        productsUsed: [...current, val],
      });
    }
    if (!tagToAdd) setNewProductTag("");
  };

  const handleRemoveProductTag = (tag: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      productsUsed: (editingProject.productsUsed || []).filter((p) => p !== tag),
    });
  };

  const handleAddGalleryUrl = () => {
    if (!editingProject || !newGalleryUrl.trim()) return;
    setEditingProject({
      ...editingProject,
      gallery: [...(editingProject.gallery || []), newGalleryUrl.trim()],
    });
    setNewGalleryUrl("");
  };

  const handleRemoveGalleryImage = (index: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      gallery: (editingProject.gallery || []).filter((_, idx) => idx !== index),
    });
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

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
        setEditingProject({ ...editingProject, image: data.url });
      } else {
        alert("Upload failed. Please use an image URL directly.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title?.trim()) {
      setModalError("Please provide a project title.");
      return;
    }

    setIsSaving(true);
    setModalError("");

    try {
      const isExisting = projects.some((p) => p.slug === editingProject.slug);
      let ok = false;

      if (isExisting) {
        ok = await updateProject(editingProject as Project);
      } else {
        const baseSlug = (editingProject.title || "project")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        const finalSlug = projects.some((p) => p.slug === baseSlug)
          ? `${baseSlug}-${Date.now()}`
          : baseSlug;

        ok = await addProject({
          ...editingProject,
          slug: finalSlug,
          filterCategory: editingProject.category || "residential",
        });
      }

      if (ok) {
        showNotification(
          isExisting
            ? `Project "${editingProject.title}" updated successfully.`
            : `Project "${editingProject.title}" added to portfolio.`
        );
        setIsModalOpen(false);
      } else {
        setModalError("Server error saving project. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setModalError("Unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProjects = projects.filter((proj) => {
    const matchSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.projectType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCat =
      selectedCategory === "all" ? true : proj.category === selectedCategory;

    return matchSearch && matchCat;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      {/* Action Notification */}
      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-wider">
            Portfolio & Installations Manager
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Architectural Projects Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage completed residential, commercial, villa installations, case studies and photography.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs shadow-lg shadow-lime-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

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
            All Projects
          </button>
          {categoryOptions.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedCategory(c.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === c.value
                  ? "bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-lime-500"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <FolderKanban className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No projects found</p>
          <p className="text-xs text-slate-500">Try adjusting your search query or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.slug}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur text-lime-400 border border-lime-500/30 uppercase tracking-wider">
                    ALUECO
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur text-white capitalize">
                    {proj.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                      <span>{proj.location}</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span>{proj.year}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {proj.shortDescription || proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.productsUsed?.map((prod) => (
                      <span
                        key={prod}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <a
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="text-xs font-semibold text-lime-600 hover:text-lime-700 dark:text-lime-400 flex items-center gap-1"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.slug, proj.title)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition"
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

      {/* Edit / Add Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]">
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {projects.some((p) => p.slug === editingProject.slug)
                    ? `Edit Project: ${editingProject.title}`
                    : "Add New Portfolio Project"}
                </h3>
                <p className="text-xs text-slate-500">Update project photography, architectural specs, and location.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
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
                2. Cover & Gallery ({editingProject.gallery?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`py-2.5 px-3 border-b-2 transition cursor-pointer ${
                  activeTab === "products"
                    ? "border-lime-500 text-lime-600 dark:text-lime-400 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                3. Products Used ({editingProject.productsUsed?.length || 0})
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
              {modalError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* TAB 1: GENERAL */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        placeholder="e.g. Modern Lake Villa"
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.location || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                        placeholder="e.g. Colombo 07"
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Project Type
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Luxury Residence"
                        value={editingProject.projectType || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, projectType: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Completion Year
                      </label>
                      <input
                        type="text"
                        value={editingProject.year || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        placeholder="2025"
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Category *
                      </label>
                      <select
                        value={editingProject.category || "residential"}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            category: e.target.value as ProjectCategory,
                            filterCategory: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer"
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
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={editingProject.shortDescription || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, shortDescription: e.target.value })
                      }
                      placeholder="Summary for project card previews..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Full Project Case Study Description *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={editingProject.description || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, description: e.target.value })
                      }
                      placeholder="Comprehensive description of glazing challenges, architectural features, and finishing..."
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA & GALLERY */}
              {activeTab === "media" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Cover Photography URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingProject.image || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-[11px]"
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
                        disabled={isUploading}
                        className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-1"
                        title="Upload image"
                      >
                        {isUploading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-lime-500" />
                        ) : (
                          <Upload className="w-4 h-4 text-slate-500" />
                        )}
                        <span>Upload</span>
                      </button>
                    </div>

                    {editingProject.image && (
                      <div className="mt-2 h-28 w-44 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img src={editingProject.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* GALLERY LIST */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Project Photo Gallery ({editingProject.gallery?.length || 0})
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
                      {editingProject.gallery?.map((img, idx) => (
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
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Products & Systems Installed
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Tags displayed on the project card and case study.
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
                      {editingProject.productsUsed?.map((tag) => (
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
                          const already = (editingProject.productsUsed || []).includes(preset);
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

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold shadow-md shadow-lime-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Project...</span>
                    </>
                  ) : (
                    <span>Save to Portfolio</span>
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

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading projects portfolio...</div>}>
      <AdminProjectsContent />
    </Suspense>
  );
}
