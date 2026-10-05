"use client";

import React, { useEffect, useState, useMemo } from "react";
import AdminShell from "../components/AdminShell";
import CloudinaryUploader from "../components/CloudinaryUploader";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  Check,
  X,
  Loader2,
  Plane,
  Filter,
  Sparkles,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
} from "lucide-react";

export interface ItineraryDay {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TourPackageItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  duration: string;
  price: string;
  priceUsd?: string;
  originalPrice?: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  isSale: boolean;
  link?: string;
  overview: string;
  requirements: string[];
  inclusions: string[];
  itinerary: ItineraryDay[];
  faqs?: FaqItem[];
  order: number;
}

const TOUR_CATEGORIES = [
  "Northern Areas Tour",
  "Hunza & Skardu Expedition",
  "Swat, Kalam & Malam Jabba",
  "Murree & Galyat Trips",
  "Family Vacation Package",
  "Honeymoon Tour Package",
  "Corporate & Group Tours",
  "Customized Private Tour",
];

const DEFAULT_ITINERARY_DAYS: ItineraryDay[] = [
  {
    title: "Day 1: Departure & Journey to Destination",
    description: "Pickup from Lahore/Islamabad in luxury vehicle, scenic highway travel, photo stops, and overnight hotel check-in.",
  },
  {
    title: "Day 2: Sightseeing & Local Attractions",
    description: "Breakfast at hotel, full-day excursion visiting local valleys, cultural heritage sites, and scenic viewpoints.",
  },
  {
    title: "Day 3: Adventure & Return Journey",
    description: "Morning activities, local shopping, departure back to base location with unforgettable memories.",
  },
];

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Is vehicle fuel and toll taxes included?",
    answer: "Yes, fully dedicated vehicle with seasoned driver, fuel, and all national highway tolls are included in the package.",
  },
  {
    question: "Can we customize this tour package?",
    answer: "Absolutely! We can modify the days, vehicle choice (Prado, Land Cruiser, Hiace, Coaster), and hotel categories as per your budget.",
  },
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<TourPackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editing state
  const [editingItem, setEditingItem] = useState<Partial<TourPackageItem> | null>(null);
  const [reqsStr, setReqsStr] = useState("");
  const [inclusionsStr, setInclusionsStr] = useState("");
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPackages(data.data);
      } else {
        setPackages([]);
      }
    } catch (err) {
      console.error("Failed to load packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const openNewModal = () => {
    setEditingItem({
      title: "",
      slug: "",
      subtitle: "Comfortable guided tour with professional chauffeurs & luxury vehicles",
      badge: "Popular",
      category: "Northern Areas Tour",
      duration: "5 Days / 4 Nights",
      price: "PKR 45,000 / Person",
      priceUsd: "$160",
      originalPrice: "PKR 55,000",
      imageSrc: "/fleet/land-cruiser-v8.jpg",
      rating: 5,
      reviewsCount: 24,
      isSale: true,
      link: "",
      overview: "Explore scenic landscapes, serene mountain valleys, and historical sights with complete peace of mind. Includes dedicated private 4x4 or luxury transport.",
      order: packages.length,
    });
    setReqsStr("Original CNIC / Passport copies\nAdvance booking confirmation voucher\nAppropriate seasonal clothing");
    setInclusionsStr("Dedicated Luxury Vehicle with Fuel\nProfessional Licensed Chauffeur\nAll Highway Tolls & Parking Fees\nHotel Pick & Drop Service");
    setItineraryDays([...DEFAULT_ITINERARY_DAYS]);
    setFaqs([...DEFAULT_FAQS]);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: TourPackageItem) => {
    setEditingItem(item);
    setReqsStr(Array.isArray(item.requirements) ? item.requirements.join("\n") : "");
    setInclusionsStr(Array.isArray(item.inclusions) ? item.inclusions.join("\n") : "");

    // Itinerary days
    let days: ItineraryDay[] = [];
    if (Array.isArray(item.itinerary)) {
      days = item.itinerary;
    } else if (typeof item.itinerary === "string") {
      try {
        days = JSON.parse(item.itinerary);
      } catch (e) {
        days = [];
      }
    }
    setItineraryDays(days.length > 0 ? days : [...DEFAULT_ITINERARY_DAYS]);

    // FAQs
    let fList: FaqItem[] = [];
    if (Array.isArray(item.faqs)) {
      fList = item.faqs;
    } else if (typeof item.faqs === "string") {
      try {
        fList = JSON.parse(item.faqs);
      } catch (e) {
        fList = [];
      }
    }
    setFaqs(fList);

    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete tour package "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/packages?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        loadPackages();
      } else {
        alert(data.error || "Failed to delete package");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete package");
    }
  };

  // Day handlers
  const addDay = () => {
    const nextDayNum = itineraryDays.length + 1;
    setItineraryDays([
      ...itineraryDays,
      {
        title: `Day ${nextDayNum}: Excursion & Activities`,
        description: "Explore local landmarks, scenic valleys, and enjoy regional dining.",
      },
    ]);
  };

  const updateDay = (index: number, field: "title" | "description", val: string) => {
    const next = [...itineraryDays];
    next[index][field] = val;
    setItineraryDays(next);
  };

  const removeDay = (index: number) => {
    setItineraryDays(itineraryDays.filter((_, idx) => idx !== index));
  };

  // FAQ handlers
  const addFaq = () => {
    setFaqs([
      ...faqs,
      {
        question: "Can we choose our preferred vehicle model?",
        answer: "Yes, you can choose from Toyota Prado, Land Cruiser V8, Grand Cabin Hiace, or luxury sedans.",
      },
    ]);
  };

  const updateFaq = (index: number, field: "question" | "answer", val: string) => {
    const next = [...faqs];
    next[index][field] = val;
    setFaqs(next);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, idx) => idx !== index));
  };

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.price) {
      setError("Title and Price are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const generatedSlug = (editingItem.slug || editingItem.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const payload = {
      ...editingItem,
      slug: generatedSlug,
      requirements: reqsStr.split("\n").map((s) => s.trim()).filter(Boolean),
      inclusions: inclusionsStr.split("\n").map((s) => s.trim()).filter(Boolean),
      itinerary: itineraryDays,
      faqs: faqs,
      link: `/services/tour-packages/${generatedSlug}`,
    };

    try {
      const isEdit = Boolean(editingItem.id);
      const url = "/api/admin/packages";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Failed to save tour package.");
      }

      setIsModalOpen(false);
      setEditingItem(null);
      await loadPackages();
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save package.");
    } finally {
      setSaving(false);
    }
  };

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const q = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        (pkg.title && pkg.title.toLowerCase().includes(q)) ||
        (pkg.category && pkg.category.toLowerCase().includes(q)) ||
        (pkg.slug && pkg.slug.toLowerCase().includes(q)) ||
        (pkg.overview && pkg.overview.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === "ALL" || pkg.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [packages, search, selectedCategory]);

  const featuredCount = useMemo(() => {
    return packages.filter((p) => p.isSale).length;
  }, [packages]);

  return (
    <AdminShell title="Tour & Travel Packages">
      <div className="space-y-4 sm:space-y-6">
        {/* Top Summary Banner */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-[#991b1b] text-white flex-shrink-0 shadow-xs">
              <Plane className="w-6 h-6 text-[#dc2626]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#991b1b]">
                  Tour &amp; Travel Packages
                </h2>
                <span className="text-[10px] bg-[#dc2626]/10 text-[#dc2626] font-bold px-2 py-0.5 border border-[#dc2626]/30 uppercase tracking-widest">
                  {packages.length} Active {packages.length === 1 ? "Package" : "Packages"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage tour packages, day-by-day itineraries, pricing, inclusions, and FAQs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={openNewModal}
              className="flex items-center justify-center space-x-1.5 bg-[#991b1b] hover:bg-[#dc2626] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tour Package</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tour packages by title, category, destination, or details..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#991b1b]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] bg-white font-semibold"
              >
                <option value="ALL">All Categories ({packages.length})</option>
                {TOUR_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-3 self-end sm:self-auto">
            <span>Showing: <strong className="text-slate-800">{filteredPackages.length}</strong></span>
            <span>Featured: <strong className="text-[#dc2626]">{featuredCount}</strong></span>
          </div>
        </div>

        {/* Packages Data Table */}
        <div className="bg-white border border-slate-200 shadow-2xs">
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#dc2626]" />
              <p className="text-xs font-semibold">Loading tour packages from database...</p>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <Plane className="w-12 h-12 mx-auto text-slate-300" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-700">No tour packages found</p>
                <p className="text-xs text-slate-500">
                  {search ? "Try refining your search query." : "Get started by adding your first tour package."}
                </p>
              </div>
              <button
                onClick={openNewModal}
                className="inline-flex items-center space-x-1.5 bg-[#991b1b] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#dc2626] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tour Package Now</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 sm:px-4">Image</th>
                    <th className="py-3 px-3 sm:px-4">Tour Title / Slug</th>
                    <th className="py-3 px-3 sm:px-4">Category</th>
                    <th className="py-3 px-3 sm:px-4">Price (PKR / USD)</th>
                    <th className="py-3 px-3 sm:px-4">Duration</th>
                    <th className="py-3 px-3 sm:px-4">Details &amp; Days</th>
                    <th className="py-3 px-3 sm:px-4">Status</th>
                    <th className="py-3 px-3 sm:px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPackages.map((item) => {
                    const reqCount = item.requirements?.length || 0;
                    const dayCount = (item.itinerary as any[])?.length || 0;
                    const faqCount = (item.faqs as any[])?.length || 0;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        {/* Image Thumbnail */}
                        <td className="py-3 px-3 sm:px-4">
                          <div className="w-14 h-10 bg-slate-100 border border-slate-200 overflow-hidden relative shadow-2xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.imageSrc || "/fleet/land-cruiser-v8.jpg"}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        {/* Title & Slug */}
                        <td className="py-3 px-3 sm:px-4">
                          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="text-[9px] bg-amber-500/10 text-amber-700 border border-amber-500/30 px-1 py-0.2 font-bold uppercase">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            /services/tour-packages/{item.slug}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-3 sm:px-4">
                          <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 font-bold text-[#991b1b] text-[10px] uppercase">
                            {item.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-3 sm:px-4 font-bold text-[#991b1b]">
                          <div>{item.price}</div>
                          {item.priceUsd && (
                            <div className="text-[10px] text-slate-400 font-normal">
                              USD: {item.priceUsd}
                            </div>
                          )}
                        </td>

                        {/* Duration */}
                        <td className="py-3 px-3 sm:px-4 text-slate-600 font-medium">
                          {item.duration}
                        </td>

                        {/* Counts */}
                        <td className="py-3 px-3 sm:px-4 text-slate-600">
                          <div className="text-[11px] font-medium text-slate-700">
                            {dayCount} {dayCount === 1 ? "Day Itinerary" : "Days Itinerary"}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {reqCount} Reqs • {faqCount} FAQs
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3 sm:px-4">
                          {item.isSale ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                              <Check className="w-3 h-3 text-emerald-600" />
                              Featured
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5">
                              Standard
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 sm:px-4 text-right space-x-1.5">
                          <a
                            href={`/services/tour-packages/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 inline-block bg-slate-100 hover:bg-[#dc2626] hover:text-white text-slate-700 transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 bg-slate-100 hover:bg-[#dc2626] hover:text-white text-slate-700 transition-colors"
                            title="Edit Tour Package"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
                            title="Delete Tour Package"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal for Add / Edit Tour Package */}
        {isModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white border border-slate-300 w-full max-w-4xl my-2 sm:my-6 p-4 sm:p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 mb-4 sm:mb-6 sticky top-0 bg-white z-20">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-[#991b1b] text-white">
                    <Plane className="w-4 h-4 text-[#dc2626]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#991b1b]">
                      {editingItem.id ? "Edit Tour Package" : "Create New Tour Package"}
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Configure comprehensive tour details, day-by-day roadmap, pricing, and documents
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-600 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4 sm:space-y-5">
                {/* 1. Category and Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Tour Category *
                    </label>
                    <select
                      required
                      value={editingItem.category || "Northern Areas Tour"}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, category: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] bg-white font-semibold"
                    >
                      {TOUR_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Tour Package Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingItem({
                          ...editingItem,
                          title: val,
                          slug: editingItem.id
                            ? editingItem.slug
                            : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                        });
                      }}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] font-semibold"
                      placeholder="e.g. 7 Days Luxury Hunza &amp; Attabad Lake Tour"
                    />
                  </div>
                </div>

                {/* 2. URL Slug, Subtitle, Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.slug || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                        })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] font-mono text-slate-800"
                      placeholder="e.g. hunza-luxury-tour"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Tagline / Subtitle
                    </label>
                    <input
                      type="text"
                      value={editingItem.subtitle || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, subtitle: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="e.g. 5-Star Hotel Stay, 4x4 Prado, Guided Excursions"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={editingItem.badge || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, badge: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="e.g. Best Seller, Luxury, 5-Star"
                    />
                  </div>
                </div>

                {/* 3. Pricing, Duration, Original Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-200 pt-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Price / Fee (PKR) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.price || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, price: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b] font-semibold text-[#991b1b]"
                      placeholder="e.g. PKR 55,000 / Person"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Price (USD) - Optional
                    </label>
                    <input
                      type="text"
                      value={editingItem.priceUsd || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, priceUsd: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="e.g. $199"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Tour Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.duration || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, duration: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="e.g. 7 Days / 6 Nights"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Original / Cut Price (PKR)
                    </label>
                    <input
                      type="text"
                      value={editingItem.originalPrice || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, originalPrice: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="e.g. PKR 70,000"
                    />
                  </div>
                </div>

                {/* Feature on Website Checkbox */}
                <div className="flex items-center pt-2">
                  <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.isSale || false}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, isSale: e.target.checked })
                      }
                      className="w-4 h-4 text-[#dc2626] border-slate-300 rounded focus:ring-[#dc2626]"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Feature this package on homepage / Top Deals
                    </span>
                  </label>
                </div>

                {/* 4. Cover Image using CloudinaryUploader (Supports File Upload & URL input) */}
                <div className="border-t border-slate-200 pt-4">
                  <CloudinaryUploader
                    label="Tour Cover Image (Upload File or Enter Direct URL)"
                    value={editingItem.imageSrc || "/fleet/land-cruiser-v8.jpg"}
                    onChange={(url) => setEditingItem({ ...editingItem, imageSrc: url })}
                    folder="flysky/tours"
                  />
                </div>

                {/* 5. Overview & Detailed Description */}
                <div className="border-t border-slate-200 pt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Description &amp; Tour Highlights Overview
                  </label>
                  <textarea
                    rows={3}
                    value={editingItem.overview || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, overview: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                    placeholder="Provide an enticing summary of the tour, valleys visited, vehicle comforts, and key experiences..."
                  />
                </div>

                {/* 6. Requirements & Inclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-slate-200 pt-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Required Documents (1 item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={reqsStr}
                      onChange={(e) => setReqsStr(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="Original CNIC / Passport copies&#10;Booking confirmation voucher&#10;Warm clothing &amp; hiking shoes"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      What&apos;s Included In Package (1 item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={inclusionsStr}
                      onChange={(e) => setInclusionsStr(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#991b1b]"
                      placeholder="Dedicated 4x4 Prado or Grand Cabin with Chauffeur&#10;Fuel, Tolls and Highway taxes included&#10;Standard / Deluxe Hotel Stays&#10;24/7 Tour Coordinator Support"
                    />
                  </div>
                </div>

                {/* 7. Day-by-Day Tour Itinerary (Dynamic Builder - NO RAW JSON!) */}
                <div className="border-t border-slate-200 pt-4 sm:pt-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#dc2626]" />
                        <span>Day-by-Day Tour Itinerary</span>
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        Add each day with its title and activities. These appear dynamically on the frontend detail page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addDay}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-300 transition-colors self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#dc2626]" />
                      <span>Add Day</span>
                    </button>
                  </div>

                  {itineraryDays.length === 0 ? (
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-xs text-center">
                      No days added to itinerary yet. Click &quot;Add Day&quot; above to build the schedule.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {itineraryDays.map((day, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-300 relative space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626] bg-[#dc2626]/10 px-2 py-0.5 border border-[#dc2626]/20">
                              Day #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDay(idx)}
                              className="text-red-600 hover:text-red-800 p-1 transition-colors"
                              title="Delete Day"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                              Day Title
                            </label>
                            <input
                              type="text"
                              placeholder={`e.g. Day ${idx + 1}: Arrival, Scenic Stops & Hotel Check-in`}
                              value={day.title}
                              onChange={(e) => updateDay(idx, "title", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#991b1b] font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                              Activities &amp; Details
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Detail the places visited, travel hours, hotel stay, and inclusions for this day..."
                              value={day.description}
                              onChange={(e) => updateDay(idx, "description", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#991b1b]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 8. Frequently Asked Questions (Dynamic Builder) */}
                <div className="border-t border-slate-200 pt-4 sm:pt-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-[#dc2626]" />
                        <span>Frequently Asked Questions (FAQs)</span>
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        Help travelers with answers about vehicles, bookings, cancellation, and baggage.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-300 transition-colors self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#dc2626]" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-xs text-center">
                      No FAQs added yet. Click &quot;Add FAQ&quot; above to answer common traveler inquiries.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-300 relative space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                              Question #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFaq(idx)}
                              className="text-red-600 hover:text-red-800 p-1 transition-colors"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="e.g. Is fuel and driver allowance included?"
                              value={faq.question}
                              onChange={(e) => updateFaq(idx, "question", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#991b1b] font-semibold"
                            />
                          </div>
                          <div>
                            <textarea
                              rows={2}
                              placeholder="e.g. Yes, all fuel costs, tolls, and chauffeur daily allowance are fully covered."
                              value={faq.answer}
                              onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                              className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#991b1b]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="pt-4 sm:pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center space-x-1.5 bg-[#991b1b] hover:bg-[#dc2626] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{editingItem.id ? "Update Tour Package" : "Publish Tour Package"}</span>
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
