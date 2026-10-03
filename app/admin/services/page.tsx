"use client";

import React, { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import CloudinaryUploader from "../components/CloudinaryUploader";
import Link from "next/link";
import {
  Layers,
  Edit2,
  Search,
  Check,
  X,
  Loader2,
  Plus,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  image: string;
  benefits?: string[];
  iconName?: string;
  order: number;
  featured: boolean;
  subServices?: any[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<ServiceItem> | null>(null);
  const [benefitsStr, setBenefitsStr] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openNewModal = () => {
    setEditingItem({
      name: "",
      slug: "",
      tagline: "Premier Travel Solution",
      description: "Complete professional assistance tailored to your travel requirements.",
      image: "/destinations/azerbaijan.jpg",
      benefits: [
        "Govt. Licensed Consultancy",
        "Transparent Processing & Fast Approvals",
        "Dedicated Travel Desk Support"
      ],
      iconName: "Globe",
      order: services.length + 1,
      featured: true,
    });
    setBenefitsStr("Govt. Licensed Consultancy\nTransparent Processing & Fast Approvals\nDedicated Travel Desk Support");
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    const raw: any = s;
    const mapped: Partial<ServiceItem> = {
      ...s,
      name: raw.name || raw.title || "",
      slug: raw.slug || "",
      tagline: raw.tagline || "Premier Travel Solution",
      description: raw.description || raw.shortDesc || raw.overview || "",
      image: raw.image || raw.heroImage || "/destinations/azerbaijan.jpg",
      benefits: Array.isArray(raw.benefits) ? raw.benefits : [],
    };
    setEditingItem(mapped);
    setBenefitsStr(
      mapped.benefits && mapped.benefits.length > 0
        ? mapped.benefits.join("\n")
        : "Govt. Licensed Consultancy\nTransparent Processing & Fast Approvals\nDedicated Travel Desk Support"
    );
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.slug) {
      setError("Please fill in Service Name and Slug.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...editingItem,
      benefits: benefitsStr.split("\n").map((b) => b.trim()).filter(Boolean),
    };

    try {
      const method = editingItem.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save service");
      }

      setIsModalOpen(false);
      setEditingItem(null);
      await loadServices();
    } catch (err: any) {
      setError(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell title="Main Services">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Core Services ({services.length})
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Main navigation pillars (Visas, Ticketing, Tours, Umrah, Corporate, Insurance)
            </p>
          </div>

          <button
            onClick={openNewModal}
            className="flex items-center justify-center space-x-1.5 bg-[#991b1b] hover:bg-[#dc2626] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Main Service</span>
          </button>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 p-12 text-center text-slate-400 shadow-2xs">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#dc2626]" />
            <p className="text-xs font-semibold">Loading services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {services.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 p-4 sm:p-5 flex flex-col justify-between hover:border-[#dc2626] transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Order #{item.order}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-[#991b1b] uppercase">
                        {item.name}
                      </h4>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-100 flex items-center justify-center text-[#991b1b] border border-slate-200 flex-shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {item.description || item.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-semibold flex items-center space-x-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-[#dc2626]" />
                      <span>{item.subServices?.length || 0} Sub-items</span>
                    </span>
                    <Link
                      href={`/admin/sub-services?service=${item.slug}`}
                      className="text-[#dc2626] hover:underline font-bold uppercase text-[11px] flex items-center space-x-1"
                    >
                      <span>Manage Visas</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 bg-slate-100 hover:bg-[#dc2626] hover:text-white text-slate-700 transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white border border-slate-300 w-full max-w-lg my-2 sm:my-8 p-4 sm:p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 sticky top-0 bg-white z-10">
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#991b1b]">
                  {editingItem.id ? "Edit Core Service" : "Add Core Service"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-2.5 bg-red-50 border-l-4 border-red-600 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.name || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingItem({
                          ...editingItem,
                          name: val,
                          slug: editingItem.id
                            ? editingItem.slug
                            : val.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                        });
                      }}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="e.g. Visa Consultancy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.slug || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, slug: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] font-mono"
                      placeholder="visa-consultancy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={editingItem.tagline || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, tagline: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                    placeholder="e.g. Hassle-Free Global Travel Visas"
                  />
                </div>

                {/* Cloudinary Image Uploader */}
                <div>
                  <CloudinaryUploader
                    label="Service Header Image (Cloudinary CDN)"
                    value={editingItem.image}
                    onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                    folder="flysky/services"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Description & Overview
                  </label>
                  <textarea
                    rows={3}
                    value={editingItem.description || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                    placeholder="Short description displayed on services cards..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Key Features / Benefits (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={benefitsStr}
                    onChange={(e) => setBenefitsStr(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                    placeholder="Govt. Licensed Consultancy&#10;Embassy Appointment Schedule&#10;Verifiable Hotel & Ticket Vouchers"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-[#991b1b] hover:bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-2xs"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Service</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
