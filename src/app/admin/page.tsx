"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  FolderKanban,
  MessageSquare,
  FileText,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Building2,
  Clock,
  Phone,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { LeadItem } from "@/lib/types";
import { useSiteData } from "@/context/SiteDataContext";

export default function AdminDashboardPage() {
  const { products, projects, siteConfig, leads: contextLeads } = useSiteData();
  const [leads, setLeads] = useState<LeadItem[]>(contextLeads || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contextLeads && contextLeads.length > 0) {
      setLeads(contextLeads);
    }
  }, [contextLeads]);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLeads(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadItem["status"]) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const totalPipelineLKR = leads
    .filter((l) => l.estimatedPrice)
    .reduce((sum, l) => sum + (l.estimatedPrice || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* 1. WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl dark:border-slate-800 sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-400/20 px-3 py-1 text-xs font-semibold text-lime-300 border border-lime-400/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Architectural Management Live</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              ALUECO Management Console
            </h1>
            <p className="max-w-xl text-xs text-slate-300 sm:text-sm">
              Manage aluminium door & window products, showcase portfolio projects, update website text, and respond to incoming quotation requests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/catalog"
              className="inline-flex items-center gap-2 rounded-2xl bg-lime-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-lime-500/20 hover:bg-lime-400 transition-all active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Add Product</span>
            </Link>
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/20 transition-all"
            >
              <span>Add Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-500/10 blur-2xl" />
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat 1: Catalog */}
        <Link
          href="/admin/catalog"
          className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-lime-500/50 dark:border-slate-800 dark:bg-slate-900/90"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Aluminium Systems
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-500/10 text-lime-600 dark:text-lime-400">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {products.length} Categories
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Sliding, Casement, Folding & Louvers
            </p>
          </div>
        </Link>

        {/* Stat 2: Projects */}
        <Link
          href="/admin/projects"
          className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-lime-500/50 dark:border-slate-800 dark:bg-slate-900/90"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Portfolio Projects
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FolderKanban className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {projects.length} Works
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Colombo, Kandy, Villas & Towers
            </p>
          </div>
        </Link>

        {/* Stat 3: Inquiries */}
        <Link
          href="/admin/leads"
          className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-lime-500/50 dark:border-slate-800 dark:bg-slate-900/90"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Customer Leads
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {leads.length} Inquiries
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-lime-600 dark:text-lime-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-lime-500"></span>
              <span>{newLeadsCount} Pending Action</span>
            </div>
          </div>
        </Link>

        {/* Stat 4: Showroom */}
        <Link
          href="/admin/content"
          className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-lime-500/50 dark:border-slate-800 dark:bg-slate-900/90"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Experience Center
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {siteConfig.showroom.name.split(" ")[0]}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
              {siteConfig.showroom.location}
            </p>
          </div>
        </Link>
      </div>

      {/* 3. MAIN SECTION: RECENT INQUIRIES & QUICK ACTIONS */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Recent Inquiries Table (2 cols) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Quotation Requests & Inquiries
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct quote submissions from the public website
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-lime-600 hover:text-lime-700 dark:text-lime-400"
            >
              View All CRM →
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <tr>
                  <th className="pb-3 pl-2">Customer & Project</th>
                  <th className="pb-3">Received</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 pl-2">
                      <div className="font-bold text-slate-900 dark:text-white">{l.customerName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {l.productName || l.systemNeeded || l.vehicleName || "Aluminium System"}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{l.customerPhone}</div>
                    </td>

                    <td className="py-3.5 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{l.createdAt || "Recent"}</span>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          l.status === "New"
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                            : l.status === "Contacted"
                            ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                            : l.status === "Quoted"
                            ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30"
                            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>

                    <td className="py-3.5 pr-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${l.customerPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 hover:bg-emerald-100 text-[10px] font-semibold"
                        >
                          WhatsApp
                        </a>
                        {l.status === "New" && (
                          <button
                            onClick={() => handleStatusChange(l.id, "Contacted")}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 text-[10px] font-semibold"
                          >
                            Mark Contacted
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Action Cards & Website Status */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Website Management Tools
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update live systems, portfolio, and contact details
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link
                href="/admin/catalog"
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-center transition-colors hover:border-lime-500 hover:bg-lime-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-lime-500/40 dark:hover:bg-lime-500/10"
              >
                <Layers className="h-5 w-5 text-lime-600 dark:text-lime-400 mb-1" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Catalog Systems
                </span>
              </Link>
              <Link
                href="/admin/projects"
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-center transition-colors hover:border-lime-500 hover:bg-lime-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-lime-500/40 dark:hover:bg-lime-500/10"
              >
                <FolderKanban className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-1" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Projects Showcase
                </span>
              </Link>
              <Link
                href="/admin/content"
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-center transition-colors hover:border-lime-500 hover:bg-lime-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-lime-500/40 dark:hover:bg-lime-500/10"
              >
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-1" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Site CMS Text
                </span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 text-center transition-colors hover:border-lime-500 hover:bg-lime-50/50 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-lime-500/40 dark:hover:bg-lime-500/10"
              >
                <Building2 className="h-5 w-5 text-amber-600 dark:text-amber-400 mb-1" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Portal Settings
                </span>
              </Link>
            </div>
          </div>

          {/* Showroom & Operating Hours Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Public Showroom Status
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-lime-500/15 text-lime-700 dark:text-lime-300">
                Active Center
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-1">
              <p className="font-semibold text-slate-900 dark:text-white">{siteConfig.showroom.name}</p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                <span>{siteConfig.showroom.location}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                <span>{siteConfig.showroom.hours}: {siteConfig.showroom.time}</span>
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/admin/content"
                className="text-xs font-semibold text-lime-600 dark:text-lime-400 hover:underline"
              >
                Edit Showroom & Contact Info →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
