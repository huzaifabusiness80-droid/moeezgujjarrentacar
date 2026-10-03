"use client";

import React, { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import {
  MessageSquare,
  Search,
  Filter,
  PhoneCall,
  Mail,
  Calendar,
  User,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email?: string;
  phone: string;
  service?: string;
  destination?: string;
  travelDate?: string;
  passengers?: number;
  subject?: string;
  message: string;
  source: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";
  notes?: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const url =
        statusFilter === "ALL"
          ? "/api/inquiries"
          : `/api/inquiries?status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, [statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as any } : item
          )
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) =>
            prev ? { ...prev, status: newStatus as any } : null
          );
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete inquiry from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const term = search.toLowerCase();
    return (
      inq.name.toLowerCase().includes(term) ||
      (inq.phone && inq.phone.toLowerCase().includes(term)) ||
      (inq.email && inq.email.toLowerCase().includes(term)) ||
      (inq.service && inq.service.toLowerCase().includes(term)) ||
      (inq.destination && inq.destination.toLowerCase().includes(term))
    );
  });

  return (
    <AdminShell title="Inquiries & Leads">
      <div className="space-y-4 sm:space-y-6">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, phone, email, service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#991b1b]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] bg-white font-semibold"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New Inquiries</option>
                <option value="CONTACTED">Contacted</option>
                <option value="CONVERTED">Converted / Booked</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>

          <button
            onClick={loadInquiries}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Inquiries Table & Details split view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Incoming Inquiries ({filtered.length})
              </h4>
              <span className="text-[10px] text-slate-500 font-semibold">
                Tap lead to inspect details
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#dc2626]" />
                <p className="text-xs font-semibold">Fetching leads...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-semibold">No leads found matching query</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[650px] overflow-y-auto">
                {filtered.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  const phoneClean = inq.phone ? inq.phone.replace(/[^0-9]/g, "") : "";
                  const whatsappUrl = phoneClean
                    ? `https://wa.me/${
                        phoneClean.startsWith("0") ? "92" + phoneClean.slice(1) : phoneClean
                      }?text=${encodeURIComponent(
                        `Assalam-o-Alaikum ${inq.name}, Moeez Gujjar Rent A Car is reaching out regarding your inquiry for ${
                          inq.service || inq.destination || inq.subject || "our services"
                        }. How can we assist you?`
                      )}`
                    : null;

                  return (
                    <div
                      key={inq.id}
                      onClick={() => {
                        setSelectedInquiry(inq);
                        // On mobile scroll to details panel
                        if (window.innerWidth < 1024) {
                          setTimeout(() => {
                            document.getElementById("inquiry-details-panel")?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      }}
                      className={`p-3.5 sm:p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                        isSelected ? "bg-sky-50/80 border-l-4 border-[#dc2626]" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="font-bold text-slate-900 text-xs">
                            {inq.name}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 ${
                              inq.status === "NEW"
                                ? "bg-red-100 text-red-700"
                                : inq.status === "CONTACTED"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-[#991b1b] truncate">
                          {inq.service || inq.subject || "General Inquiry"}
                          {inq.destination && (
                            <span className="text-slate-500 font-normal">
                              {" "}
                              • {inq.destination}
                            </span>
                          )}
                        </p>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {inq.message}
                        </p>

                        <div className="text-[10px] text-slate-400 flex flex-wrap items-center gap-x-2 pt-1 font-mono">
                          <span>{inq.phone}</span>
                          <span>•</span>
                          <span>
                            {new Date(inq.createdAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase px-2 py-1 flex items-center space-x-1 shadow-2xs"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(inq.id, inq.name);
                          }}
                          className="p-1.5 text-slate-300 hover:text-red-600 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div
            id="inquiry-details-panel"
            className="bg-white border border-slate-200 p-4 sm:p-5 h-fit lg:sticky lg:top-20 shadow-2xs"
          >
            {selectedInquiry ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#991b1b]">
                    Lead Details
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {selectedInquiry.source}
                    </span>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-800 p-1 lg:hidden"
                    >
                      ✕ Close
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">
                      Customer Name
                    </label>
                    <p className="font-bold text-slate-900 text-sm">
                      {selectedInquiry.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 block">
                        Phone / Mobile
                      </label>
                      <p className="font-medium text-slate-800">
                        {selectedInquiry.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 block">
                        Email Address
                      </label>
                      <p className="font-medium text-slate-800 truncate">
                        {selectedInquiry.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">
                      Requested Service
                    </label>
                    <p className="font-bold text-[#dc2626]">
                      {selectedInquiry.service || selectedInquiry.subject || "General Inquiry"}
                    </p>
                  </div>

                  {selectedInquiry.destination && (
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 block">
                        Destination
                      </label>
                      <p className="font-medium text-slate-800">
                        {selectedInquiry.destination}
                      </p>
                    </div>
                  )}

                  {selectedInquiry.travelDate && (
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 block">
                        Expected Travel Date
                      </label>
                      <p className="font-medium text-slate-800">
                        {selectedInquiry.travelDate}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">
                      Customer Message / Requirements
                    </label>
                    <div className="p-3 bg-slate-50 border border-slate-200 mt-1 text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                      {selectedInquiry.message}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="pt-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Update Lead Status
                    </label>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) =>
                        handleUpdateStatus(selectedInquiry.id, e.target.value)
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] bg-white font-bold"
                    >
                      <option value="NEW">🔴 NEW - Pending Follow-up</option>
                      <option value="CONTACTED">🟡 CONTACTED - In Discussion</option>
                      <option value="CONVERTED">🟢 CONVERTED - Confirmed Booking</option>
                      <option value="CLOSED">⚪ CLOSED - Completed / Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 sm:py-12 text-center text-slate-400">
                <User className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-semibold">
                  Select an inquiry to view details & status
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
