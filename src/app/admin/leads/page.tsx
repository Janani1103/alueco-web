"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  FileText,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  Building2,
  Mail,
  MapPin,
} from "lucide-react";
import { LeadItem } from "@/lib/types";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeads = () => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeads();
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

  const filtered = leads.filter((l) => {
    const matchesType =
      filterType === "All" ||
      (filterType === "Quotations" && l.type === "quotation") ||
      (filterType === "Inquiries" && l.type === "contact") ||
      (filterType === "New" && l.status === "New");

    const matchesSearch =
      l.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.customerPhone.includes(searchTerm) ||
      (l.productName && l.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.systemNeeded && l.systemNeeded.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.vehicleName && l.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.location && l.location.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesType && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-wider">
            Lead Management Hub
          </span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Customer Inquiries & Architectural Quotations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time management for all quotation downloads, BOQ requests, and contact inquiries from the website.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-500/20">
            {leads.length} Total Inquiries
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["All", "Quotations", "Inquiries", "New"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filterType === type
                  ? "bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer, phone, system, site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-lime-500"
          />
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Customer & Contact</th>
                <th className="py-3.5 px-4">Requested System / Requirements</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading inquiries...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No leads or inquiries match your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr
                    key={l.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-slate-900 dark:text-white">{l.customerName}</div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{l.customerPhone}</span>
                      </div>
                      {l.location && (
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{l.location}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="text-slate-800 dark:text-slate-200 font-semibold">
                        {l.productName || l.systemNeeded || l.vehicleName || "Aluminium System"}
                      </div>
                      {l.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{l.notes}</p>
                      )}
                    </td>

                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{l.createdAt || "Recent"}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          l.type === "quotation"
                            ? "bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-500/30"
                            : "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30"
                        }`}
                      >
                        {l.type === "quotation" ? (
                          <>
                            <FileText className="w-3 h-3" /> Quotation
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-3 h-3" /> Inquiry
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={l.status}
                        onChange={(e) =>
                          handleStatusChange(l.id, e.target.value as LeadItem["status"])
                        }
                        className={`p-1.5 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                          l.status === "New"
                            ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                            : l.status === "Contacted"
                            ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800"
                            : l.status === "Quoted"
                            ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800"
                            : l.status === "Won"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${l.customerPhone}`}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${l.customerPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition"
                          title="WhatsApp Customer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
