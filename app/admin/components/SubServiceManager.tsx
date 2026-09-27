"use client";

import React, { useEffect, useState, useMemo } from "react";
import AdminShell from "./AdminShell";
import CloudinaryUploader from "./CloudinaryUploader";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  Check,
  X,
  Loader2,
  FileCheck2,
  Layers,
  Filter,
  Plane,
  Building2,
  ShieldCheck,
  Moon,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";

export interface StepItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SubServiceItem {
  id: string;
  parentSlug: string;
  parentTitle: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  priceOrFee: string;
  durationOrProcessing: string;
  validity: string;
  stayDuration?: string;
  entryType?: string;
  overview: string;
  requirements: string[];
  inclusions: string[];
  stepsOrItinerary?: StepItem[];
  faqs?: FaqItem[];
  isFeatured: boolean;
  name?: string;
  description?: string;
  priceStarting?: string;
  currency?: string;
  processingTime?: string;
  includes?: string[];
  featured?: boolean;
  serviceId?: string;
  service?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ServiceCategory {
  slug: string;
  title: string;
  icon?: any;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  { slug: "visa-processing", title: "Visa Processing & Consultancy", icon: FileCheck2 },
  { slug: "tour-packages", title: "Worldwide Tour Packages", icon: Plane },
  { slug: "air-ticketing", title: "Air Ticketing & Flights", icon: Plane },
  { slug: "umrah-services", title: "Executive Umrah & Hajj", icon: Moon },
  { slug: "hotel-bookings", title: "Worldwide & Domestic Hotels", icon: Building2 },
  { slug: "travel-insurance", title: "Travel Health Insurance", icon: ShieldCheck },
];

const CATEGORY_DEFAULTS: Record<string, {
  titlePlaceholder: string;
  taglinePlaceholder: string;
  badgeDefault: string;
  priceDefault: string;
  durationDefault: string;
  validityDefault: string;
  overviewDefault: string;
  defaultReqs: string[];
  defaultIncs: string[];
  defaultSteps: StepItem[];
  defaultFaqs: FaqItem[];
  defaultImage: string;
}> = {
  "visa-processing": {
    titlePlaceholder: "e.g. Schengen / UK / USA Visit Visa",
    taglinePlaceholder: "Certified Visa File Preparation & High Approval Advisory",
    badgeDefault: "High Approval Rate",
    priceDefault: "PKR 25,000",
    durationDefault: "15 to 30 Working Days",
    validityDefault: "Up to 90 Days (Single / Multiple)",
    overviewDefault: "Complete visa file preparation, embassy cover letter, biometric appointment scheduling, and documentation verification.",
    defaultReqs: [
      "Original Passport valid for at least 6 months",
      "CNIC copy & 2 Passport-size photographs (white background)",
      "Bank Statement (Last 6 months with Account Maintenance Certificate)",
      "Employment Letter / Salary Slips OR Business NTN & Tax Returns",
      "FRC (Family Registration Certificate) if travelling with family"
    ],
    defaultIncs: [
      "Embassy Form Filing & VFS/Gerry's Appointment Booking",
      "Customized Day-by-Day Travel Itinerary",
      "Verifiable Flight Reservation & Hotel Vouchers",
      "Schengen-Approved €30,000 Travel Health Insurance",
      "Professional Cover Letter & Sponsorship Auditing"
    ],
    defaultSteps: [
      { title: "Step 1: Document Auditing", description: "Audit bank statements, income proof, and travel history to build a strong case." },
      { title: "Step 2: Appointment & Form Submission", description: "Book biometric submission slot at Embassy / VFS / Gerry's." },
      { title: "Step 3: Cover Letter & Travel Vouchers", description: "Draft embassy-compliant cover letter and confirmed reservations." },
      { title: "Step 4: Submission & Visa Collection", description: "Appear for biometrics with the file and collect your approved visa." }
    ],
    defaultFaqs: [
      { question: "How long does the visa processing take?", answer: "Standard processing takes 15 to 30 working days depending on embassy workload." },
      { question: "What is the recommended bank balance?", answer: "A healthy closing balance reflecting your legitimate declared income is recommended." }
    ],
    defaultImage: "/destinations/paris.jpg"
  },
  "tour-packages": {
    titlePlaceholder: "e.g. Dubai Deluxe Explorer (5 Days / 4 Nights)",
    taglinePlaceholder: "All-inclusive guided tour with luxury hotels, transfers & sightseeing",
    badgeDefault: "Best Seller Tour",
    priceDefault: "PKR 145,000 / Person",
    durationDefault: "5 Days / 4 Nights",
    validityDefault: "Year-Round Departures",
    overviewDefault: "Experience the best of the destination with verified 4-star central accommodation, daily breakfast, airport transfers, and guided sightseeing excursions.",
    defaultReqs: [
      "Passport copy valid for 6 months",
      "Valid Tourist Visa (included in package)",
      "Passport size photographs"
    ],
    defaultIncs: [
      "4 Nights accommodation in 4-Star Central Hotel with Daily Breakfast",
      "Return Airport Transfers in AC Private/Shared Vehicle",
      "Guided City Tour with Professional Local Guide",
      "Major Attraction Entry Tickets Included",
      "24/7 On-ground Emergency Customer Assistance"
    ],
    defaultSteps: [
      { title: "Day 1: Arrival & Welcome Dinner", description: "Airport pickup, hotel check-in, and evening welcome cruise / dinner." },
      { title: "Day 2: Iconic Landmarks City Tour", description: "Guided tour of top attractions, heritage areas, and photography spots." },
      { title: "Day 3: Scenic Excursion & Adventure", description: "Full-day outdoor excursion with scenic views and entertainment." },
      { title: "Day 4: Free Day for Shopping / Leisure", description: "Explore local markets, shopping malls, or optional day excursions." },
      { title: "Day 5: Departure", description: "Breakfast at hotel and transfer to airport for return flight." }
    ],
    defaultFaqs: [
      { question: "Are flights and visas included in this tour package?", answer: "We offer both all-inclusive packages (visa + hotel + transfers + tours) and land-only options." },
      { question: "Can this package be customized for families or couples?", answer: "Yes, all itineraries can be tailored to your preferred dates, hotel level, and private transport." }
    ],
    defaultImage: "/destinations/dubai.jpg"
  },
  "air-ticketing": {
    titlePlaceholder: "e.g. International Direct & Connecting Flights",
    taglinePlaceholder: "Discounted IATA airfares on top world airlines with 24/7 booking support",
    badgeDefault: "Direct IATA Fares",
    priceDefault: "Best Market Rates",
    durationDefault: "Instant Confirmation",
    validityDefault: "Official E-Ticket with Live PNR",
    overviewDefault: "Direct booking on Emirates, Qatar Airways, Turkish Airlines, Saudia, PIA, and domestic carriers with instant ticketing, baggage upgrades, and date change flexibility.",
    defaultReqs: [
      "Passport copy of all passengers",
      "Destination and preferred travel dates",
      "Visa copy for destination country"
    ],
    defaultIncs: [
      "Instant official electronic ticket (e-ticket) issuance",
      "Baggage allowance verification (20kg to 46kg depending on route)",
      "Advance seat selection & special meal requests",
      "24/7 flight rescheduling, cancellation & refund assistance"
    ],
    defaultSteps: [
      { title: "Step 1: Inquire Routes & Dates", description: "Share your departure city, destination, and travel dates." },
      { title: "Step 2: Compare Airline Rates", description: "We provide top airline options with direct and connecting flight timings." },
      { title: "Step 3: Instant Ticket Issuance", description: "Confirm booking and receive live airline PNR and e-ticket instantly." }
    ],
    defaultFaqs: [
      { question: "Can I hold a seat before making payment?", answer: "Yes, we can hold confirmed seats for 12 to 24 hours depending on airline ticketing time limit." },
      { question: "Do you offer student discounts or extra luggage?", answer: "Yes, special student baggage allowances are available on selected partner airlines." }
    ],
    defaultImage: "/flight_service.jpg"
  },
  "umrah-services": {
    titlePlaceholder: "e.g. 5-Star Luxury VIP Umrah (10 Days)",
    taglinePlaceholder: "Front-row Haram view hotels, private VIP transfers & Nusuk e-visa",
    badgeDefault: "5-Star Haram Front",
    priceDefault: "Starting from PKR 390,000",
    durationDefault: "10 to 14 Days",
    validityDefault: "Available Year-Round",
    overviewDefault: "Complete executive pilgrimage arrangements featuring verified hotels within walking distance of Masjid al-Haram and Masjid an-Nabawi, instant electronic Umrah visas, and VIP transportation.",
    defaultReqs: [
      "Original Passport valid for 6 months",
      "Digital passport photograph with white background",
      "Vaccination proof as per Saudi regulations"
    ],
    defaultIncs: [
      "Luxury Clock Tower / Haram Front Hotel Stay with Breakfast",
      "Instant Digital Umrah E-Visa (Nusuk Platform)",
      "Private VIP GMC Yukon / HiAce Vehicle Transfers",
      "Haramain High-Speed Train Tickets between Makkah & Madinah",
      "Historical Ziyarat Tours in Makkah and Madinah with Guide"
    ],
    defaultSteps: [
      { title: "Step 1: Package Selection & Dates", description: "Choose room configuration, departure date, and duration." },
      { title: "Step 2: Instant E-Visa & Hotel Vouchers", description: "Digital Umrah visa issued within 24-48 hours with hotel confirmation." },
      { title: "Step 3: Makkah Stay & Umrah Rituals", description: "Perform Umrah with complete peace of mind steps away from the Holy Kaaba." },
      { title: "Step 4: Madinah Stay & Historical Ziyarat", description: "Prayers in Riyazul Jannah and guided Ziyarat to Mount Uhud & Masjid Quba." }
    ],
    defaultFaqs: [
      { question: "Can females travel for Umrah without a Mahram?", answer: "Yes, under current Saudi regulations, females of all ages can travel for Umrah without a Mahram." },
      { question: "Are high-speed train tickets included?", answer: "Yes, executive packages include high-speed train tickets between Makkah and Madinah." }
    ],
    defaultImage: "/destinations/dubai.jpg"
  },
  "hotel-bookings": {
    titlePlaceholder: "e.g. Worldwide 4-Star & 5-Star Hotel Bookings",
    taglinePlaceholder: "Corporate negotiated rates on 500,000+ verified hotels worldwide",
    badgeDefault: "Corporate Discount Rates",
    priceDefault: "Special B2B Tariffs",
    durationDefault: "Instant Confirmation Voucher",
    validityDefault: "Worldwide Properties",
    overviewDefault: "Verified accommodations across 100+ countries with instant embassy-verifiable vouchers, flexible cancellation, and payment options in Pakistani Rupees (PKR).",
    defaultReqs: [
      "Guest name and passport details",
      "Check-in and check-out dates",
      "Room category (Single, Double, Twin, Family Suite)"
    ],
    defaultIncs: [
      "Official confirmed hotel voucher with reservation booking code",
      "Complimentary breakfast & WiFi on selected properties",
      "Verifiable voucher valid for embassy visa applications",
      "Flexible date change and pay-in-PKR options"
    ],
    defaultSteps: [
      { title: "Step 1: Share City & Stay Dates", description: "Tell us your destination city, check-in date, and number of guests." },
      { title: "Step 2: Review Curated Options", description: "Choose from central, highly-rated hotels at discounted corporate rates." },
      { title: "Step 3: Instant Voucher Delivery", description: "Receive official PDF voucher for visa filing and hotel check-in." }
    ],
    defaultFaqs: [
      { question: "Are these hotel vouchers valid for visa applications?", answer: "Yes, all our hotel reservations are 100% verified and accepted by embassies worldwide." },
      { question: "Can I pay in PKR for hotels in Europe or USA?", answer: "Yes, you can pay 100% in Pakistani Rupees via bank transfer or at our office." }
    ],
    defaultImage: "/destinations/bahrain.jpg"
  },
  "travel-insurance": {
    titlePlaceholder: "e.g. Schengen Embassy Approved Travel Insurance",
    taglinePlaceholder: "100% embassy compliant travel health insurance with €30,000 / $50,000 medical coverage",
    badgeDefault: "100% Embassy Compliant",
    priceDefault: "Starting from PKR 4,500",
    durationDefault: "Issued in 15 Minutes",
    validityDefault: "7 Days to 1 Year Multi-Trip",
    overviewDefault: "Schengen and worldwide embassy-approved travel health insurance policies covering medical emergencies, hospital stays, flight delays, and baggage loss with instant QR-coded verification.",
    defaultReqs: [
      "Passport scan and CNIC copy",
      "Travel start date and return date",
      "Destination country (Schengen, USA, UK, Worldwide)"
    ],
    defaultIncs: [
      "Emergency Medical Expenses & Hospitalization (Up to €30,000 / $50,000+)",
      "Medical Repatriation & Evacuation Coverage",
      "Compensation for Lost Baggage & Flight Delays",
      "Verifiable QR-coded Digital Policy PDF accepted by all embassies",
      "24/7 International Emergency Assistance Helpline"
    ],
    defaultSteps: [
      { title: "Step 1: Share Travel Dates", description: "Send your passport scan and departure/return dates via WhatsApp." },
      { title: "Step 2: Instant Policy Generation", description: "Official policy generated with unique policy number and QR code in 15 minutes." },
      { title: "Step 3: Submit with Visa File", description: "Print or attach digital PDF for embassy submission and travel protected." }
    ],
    defaultFaqs: [
      { question: "Is this insurance accepted for Schengen visa applications?", answer: "Yes, our policies meet all Schengen Article requirements with minimum €30,000 coverage and zero deductible." },
      { question: "What happens if my visa is refused?", answer: "Policies can be cancelled and refunded prior to the travel date upon presenting the embassy refusal letter." }
    ],
    defaultImage: "/destinations/turkey.jpg"
  }
};

interface SubServiceManagerProps {
  parentSlug?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  categoryName?: string;
  icon?: any;
}

export default function SubServiceManager({
  parentSlug = "ALL",
  pageTitle = "Visas & Sub-Services",
  pageSubtitle = "Manage sub-service packages, pricing, requirements, procedures, and FAQs",
  categoryName = "Service",
  icon: HeaderIcon = FileCheck2,
}: SubServiceManagerProps) {
  const [items, setItems] = useState<SubServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>(parentSlug);
  const [editingItem, setEditingItem] = useState<Partial<SubServiceItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper strings for multiline textareas
  const [reqsStr, setReqsStr] = useState("");
  const [inclusionsStr, setInclusionsStr] = useState("");
  const [steps, setSteps] = useState<StepItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const url = parentSlug !== "ALL"
        ? `/api/admin/sub-services?parentSlug=${parentSlug}`
        : "/api/admin/sub-services";

      const res = await fetch(url);
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setItems(data.data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Failed to load sub-services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentSlug]);

  const openNewModal = () => {
    const activeParentSlug = parentSlug !== "ALL" ? parentSlug : "visa-processing";
    const defaults = CATEGORY_DEFAULTS[activeParentSlug] || CATEGORY_DEFAULTS["visa-processing"];
    const parentCategoryObj = SERVICE_CATEGORIES.find((c) => c.slug === activeParentSlug);

    const fresh: Partial<SubServiceItem> = {
      parentSlug: activeParentSlug,
      parentTitle: parentCategoryObj ? parentCategoryObj.title : "Service Category",
      title: "",
      slug: "",
      subtitle: defaults.taglinePlaceholder,
      badge: defaults.badgeDefault,
      priceOrFee: defaults.priceDefault,
      durationOrProcessing: defaults.durationDefault,
      validity: defaults.validityDefault,
      stayDuration: activeParentSlug === "tour-packages" ? "5 Days / 4 Nights" : "30 Days",
      entryType: activeParentSlug === "visa-processing" ? "Single / Multiple" : "Standard",
      image: defaults.defaultImage,
      overview: defaults.overviewDefault,
      requirements: [...defaults.defaultReqs],
      inclusions: [...defaults.defaultIncs],
      isFeatured: true,
    };

    setEditingItem(fresh);
    setReqsStr(fresh.requirements?.join("\n") || "");
    setInclusionsStr(fresh.inclusions?.join("\n") || "");
    setSteps([...defaults.defaultSteps]);
    setFaqs([...defaults.defaultFaqs]);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: SubServiceItem) => {
    const raw: any = item;
    const itemParentSlug = raw.parentSlug || raw.serviceId || (parentSlug !== "ALL" ? parentSlug : "visa-processing");
    const parentCategoryObj = SERVICE_CATEGORIES.find((c) => c.slug === itemParentSlug);

    const mapped: Partial<SubServiceItem> = {
      id: raw.id,
      parentSlug: itemParentSlug,
      parentTitle: raw.parentTitle || (parentCategoryObj ? parentCategoryObj.title : "Service Category"),
      title: raw.title || raw.name || "",
      slug: raw.slug || "",
      subtitle: raw.subtitle || raw.tagline || "",
      badge: raw.badge || "Featured",
      priceOrFee: raw.priceOrFee || (raw.priceStarting ? `PKR ${raw.priceStarting}` : "Call for quote"),
      durationOrProcessing: raw.durationOrProcessing || raw.processingTime || "",
      validity: raw.validity || "",
      stayDuration: raw.stayDuration || "",
      entryType: raw.entryType || "",
      image: raw.image || "/destinations/dubai.jpg",
      overview: raw.overview || raw.description || "",
      requirements: Array.isArray(raw.requirements) ? raw.requirements : [],
      inclusions: Array.isArray(raw.inclusions) ? raw.inclusions : Array.isArray(raw.includes) ? raw.includes : [],
      isFeatured: raw.isFeatured !== undefined ? !!raw.isFeatured : (raw.featured !== undefined ? !!raw.featured : true),
    };

    setEditingItem(mapped);
    setReqsStr(mapped.requirements && mapped.requirements.length > 0 ? mapped.requirements.join("\n") : "");
    setInclusionsStr(mapped.inclusions && mapped.inclusions.length > 0 ? mapped.inclusions.join("\n") : "");
    
    setSteps(
      Array.isArray(raw.stepsOrItinerary) && raw.stepsOrItinerary.length > 0
        ? raw.stepsOrItinerary
        : [
            { title: "Step 1: Inquiry & Planning", description: "Initial consultation and customized requirement briefing." },
            { title: "Step 2: Processing & Booking", description: "Execution of file preparation, flight/hotel booking, and submissions." },
            { title: "Step 3: Confirmation & Delivery", description: "Official issuance of visa / vouchers and pre-departure briefing." }
          ]
    );

    setFaqs(
      Array.isArray(raw.faqs) && raw.faqs.length > 0
        ? raw.faqs
        : [
            { question: "How do I get started?", answer: "Contact our team via WhatsApp or phone with your travel requirements." }
          ]
    );

    setError(null);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (newParentSlug: string) => {
    if (!editingItem) return;
    const parentCategoryObj = SERVICE_CATEGORIES.find((c) => c.slug === newParentSlug);
    const defaults = CATEGORY_DEFAULTS[newParentSlug] || CATEGORY_DEFAULTS["visa-processing"];

    setEditingItem({
      ...editingItem,
      parentSlug: newParentSlug,
      parentTitle: parentCategoryObj ? parentCategoryObj.title : "Service Category",
      subtitle: editingItem.subtitle || defaults.taglinePlaceholder,
      badge: editingItem.badge || defaults.badgeDefault,
      image: editingItem.image || defaults.defaultImage,
    });
  };

  const addStep = () => {
    const isTour = editingItem?.parentSlug === "tour-packages";
    const prefix = isTour ? `Day ${steps.length + 1}: ` : `Step ${steps.length + 1}: `;
    setSteps([...steps, { title: prefix, description: "" }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, field: keyof StepItem, value: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.slug) {
      setError("Title / Name and URL Slug are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...editingItem,
      name: editingItem.title,
      requirements: reqsStr.split("\n").map((s) => s.trim()).filter(Boolean),
      inclusions: inclusionsStr.split("\n").map((s) => s.trim()).filter(Boolean),
      includes: inclusionsStr.split("\n").map((s) => s.trim()).filter(Boolean),
      stepsOrItinerary: steps.filter((s) => s.title.trim() || s.description.trim()),
      faqs: faqs.filter((f) => f.question.trim() || f.answer.trim()),
    };

    try {
      const method = editingItem.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/sub-services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save item");
      }

      setIsModalOpen(false);
      setEditingItem(null);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/sub-services?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Delete failed");
      }
      await loadData();
    } catch (err: any) {
      alert(err.message || "Failed to delete item");
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const titleMatch = (item.title || item.name || "").toLowerCase().includes(search.toLowerCase());
      const slugMatch = (item.slug || "").toLowerCase().includes(search.toLowerCase());
      const parentMatch = (item.parentTitle || item.parentSlug || "").toLowerCase().includes(search.toLowerCase());
      const overviewMatch = (item.overview || item.description || "").toLowerCase().includes(search.toLowerCase());

      const matchesSearch = search === "" || titleMatch || slugMatch || parentMatch || overviewMatch;

      const matchesCategory =
        parentSlug !== "ALL"
          ? item.parentSlug === parentSlug
          : filterCategory === "ALL" || item.parentSlug === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, parentSlug, filterCategory]);

  const featuredCount = useMemo(() => {
    return items.filter((i) => i.isFeatured || i.featured).length;
  }, [items]);

  const activeParentCategory = SERVICE_CATEGORIES.find((c) => c.slug === (editingItem?.parentSlug || parentSlug));

  return (
    <AdminShell title={pageTitle}>
      <div className="space-y-4 sm:space-y-6">
        {/* Top Summary Banner */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-[#0b3663] text-white flex-shrink-0 shadow-xs">
              <HeaderIcon className="w-6 h-6 text-[#00a8e8]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-[#0b3663]">
                  {pageTitle}
                </h2>
                <span className="text-[10px] bg-[#00a8e8]/10 text-[#00a8e8] font-bold px-2 py-0.5 border border-[#00a8e8]/30 uppercase tracking-widest">
                  {items.length} Active {items.length === 1 ? "Item" : "Items"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {pageSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={openNewModal}
              className="flex items-center justify-center space-x-1.5 bg-[#0b3663] hover:bg-[#00a8e8] text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New {categoryName}</span>
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
                placeholder={`Search ${categoryName.toLowerCase()}s by title, slug, or details...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0b3663]"
              />
            </div>

            {parentSlug === "ALL" && (
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full sm:w-auto text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663] bg-white font-semibold"
                >
                  <option value="ALL">All Categories ({items.length})</option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-3 self-end sm:self-auto">
            <span>Showing: <strong className="text-slate-800">{filteredItems.length}</strong></span>
            <span>Featured: <strong className="text-[#00a8e8]">{featuredCount}</strong></span>
          </div>
        </div>

        {/* Items Data Table */}
        <div className="bg-white border border-slate-200 shadow-2xs">
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#00a8e8]" />
              <p className="text-xs font-semibold">Loading items from database...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <FileCheck2 className="w-12 h-12 mx-auto text-slate-300" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-700">No {categoryName.toLowerCase()}s found</p>
                <p className="text-xs text-slate-500">
                  {search ? "Try refining your search query." : `Get started by adding your first ${categoryName.toLowerCase()} item.`}
                </p>
              </div>
              <button
                onClick={openNewModal}
                className="inline-flex items-center space-x-1.5 bg-[#0b3663] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#00a8e8] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add {categoryName} Now</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 sm:px-4">Image</th>
                    <th className="py-3 px-3 sm:px-4">Title / Slug</th>
                    {parentSlug === "ALL" && (
                      <th className="py-3 px-3 sm:px-4">Service Category</th>
                    )}
                    <th className="py-3 px-3 sm:px-4">Price / Fee</th>
                    <th className="py-3 px-3 sm:px-4">Processing / Duration</th>
                    <th className="py-3 px-3 sm:px-4">Requirements & Steps</th>
                    <th className="py-3 px-3 sm:px-4">Status</th>
                    <th className="py-3 px-3 sm:px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => {
                    const itemTitle = item.title || item.name || "Untitled";
                    const itemSlug = item.slug || "";
                    const itemPrice = item.priceOrFee || (item.priceStarting ? `PKR ${item.priceStarting}` : "Call for quote");
                    const itemDuration = item.durationOrProcessing || item.processingTime || "Standard";
                    const reqCount = item.requirements?.length || 0;
                    const stepCount = (item.stepsOrItinerary as any[])?.length || 0;
                    const isFeat = item.isFeatured || item.featured;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        {/* Image Thumbnail */}
                        <td className="py-3 px-3 sm:px-4">
                          <div className="w-14 h-10 bg-slate-100 border border-slate-200 overflow-hidden relative shadow-2xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image || "/destinations/dubai.jpg"}
                              alt={itemTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        {/* Title & Slug */}
                        <td className="py-3 px-3 sm:px-4">
                          <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            <span>{itemTitle}</span>
                            {item.badge && (
                              <span className="text-[9px] bg-amber-500/10 text-amber-700 border border-amber-500/30 px-1 py-0.2 font-bold uppercase">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            /{item.parentSlug}/{itemSlug}
                          </div>
                        </td>

                        {/* Category (if viewing All) */}
                        {parentSlug === "ALL" && (
                          <td className="py-3 px-3 sm:px-4">
                            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 font-bold text-[#0b3663] text-[10px] uppercase">
                              {item.parentTitle || item.parentSlug}
                            </span>
                          </td>
                        )}

                        {/* Price */}
                        <td className="py-3 px-3 sm:px-4 font-bold text-[#0b3663]">
                          {itemPrice}
                        </td>

                        {/* Duration */}
                        <td className="py-3 px-3 sm:px-4 text-slate-600">
                          <div className="font-medium">{itemDuration}</div>
                          {item.validity && (
                            <div className="text-[10px] text-slate-400">
                              Val: {item.validity}
                            </div>
                          )}
                        </td>

                        {/* Counts */}
                        <td className="py-3 px-3 sm:px-4 text-slate-600">
                          <div className="text-[11px] font-medium text-slate-700">
                            {reqCount} {reqCount === 1 ? "Req" : "Reqs"}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {stepCount} {stepCount === 1 ? "Step/Day" : "Steps/Days"}
                          </div>
                        </td>

                        {/* Featured Status */}
                        <td className="py-3 px-3 sm:px-4">
                          {isFeat ? (
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
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 bg-slate-100 hover:bg-[#00a8e8] hover:text-white text-slate-700 transition-colors"
                            title={`Edit ${categoryName}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, itemTitle)}
                            className="p-1.5 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
                            title={`Delete ${categoryName}`}
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

        {/* Modal for Add / Edit */}
        {isModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white border border-slate-300 w-full max-w-4xl my-2 sm:my-6 p-4 sm:p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 mb-4 sm:mb-6 sticky top-0 bg-white z-20">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-[#0b3663] text-white">
                    <HeaderIcon className="w-4 h-4 text-[#00a8e8]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#0b3663]">
                      {editingItem.id ? `Edit ${categoryName}` : `Create New ${categoryName}`}
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Category: {activeParentCategory ? activeParentCategory.title : "Service Item"}
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
                      Parent Service Category *
                    </label>
                    <select
                      required
                      value={editingItem.parentSlug || (parentSlug !== "ALL" ? parentSlug : "visa-processing")}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663] bg-white font-semibold"
                    >
                      {SERVICE_CATEGORIES.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Title / Country / Package Name *
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
                          name: val,
                          slug: editingItem.id
                            ? editingItem.slug
                            : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                        });
                      }}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663] font-semibold"
                      placeholder={CATEGORY_DEFAULTS[editingItem.parentSlug || "visa-processing"]?.titlePlaceholder || "e.g. Title"}
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
                        setEditingItem({ ...editingItem, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663] font-mono text-slate-800"
                      placeholder="e.g. dubai-tourist-visa"
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
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="e.g. High approval advisory & fast processing"
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
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="e.g. Express, Top Seller, 5-Star"
                    />
                  </div>
                </div>

                {/* 3. Pricing, Processing Time, Validity, Stay Duration, Entry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 border-t border-slate-200 pt-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Price / Starting Fee
                    </label>
                    <input
                      type="text"
                      value={editingItem.priceOrFee || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, priceOrFee: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="e.g. PKR 145,000 / Person or PKR 25,000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Processing Time / Duration
                    </label>
                    <input
                      type="text"
                      value={editingItem.durationOrProcessing || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, durationOrProcessing: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="e.g. 5 Days / 4 Nights, 3-5 Working Days"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Validity Period
                    </label>
                    <input
                      type="text"
                      value={editingItem.validity || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, validity: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="e.g. 30 Days from issue, Year-Round"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Stay Duration / Sector
                    </label>
                    <input
                      type="text"
                      value={editingItem.stayDuration || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, stayDuration: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="e.g. 30 Days, 5 Nights, Jeddah/Madinah"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Entry Type / Package Type
                    </label>
                    <input
                      type="text"
                      value={editingItem.entryType || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, entryType: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="e.g. Single / Multiple Entry, 5-Star Luxury"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={editingItem.isFeatured || false}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, isFeatured: e.target.checked, featured: e.target.checked })
                        }
                        className="w-4 h-4 text-[#00a8e8] border-slate-300 rounded focus:ring-[#00a8e8]"
                      />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Feature on Website / Home
                      </span>
                    </label>
                  </div>
                </div>

                {/* 4. Cloudinary Cover Image */}
                <div className="border-t border-slate-200 pt-4">
                  <CloudinaryUploader
                    label="Cover Image (Cloudinary CDN)"
                    value={editingItem.image || "/destinations/dubai.jpg"}
                    onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                    folder="flysky/services"
                  />
                </div>

                {/* 5. Overview & Detailed Description */}
                <div className="border-t border-slate-200 pt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Description & Overview
                  </label>
                  <textarea
                    rows={3}
                    value={editingItem.overview || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, overview: e.target.value, description: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                    placeholder="Provide a comprehensive summary of this service, destination, procedures, or package highlights..."
                  />
                </div>

                {/* 6. Requirements & Inclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-slate-200 pt-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Required Documents / Criteria (1 item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={reqsStr}
                      onChange={(e) => setReqsStr(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="Original Passport (6+ months validity)&#10;2 Passport size photos with white background&#10;Valid CNIC copy&#10;Last 6 months bank statement"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Included In Service / Features (1 item per line)
                    </label>
                    <textarea
                      rows={4}
                      value={inclusionsStr}
                      onChange={(e) => setInclusionsStr(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0b3663]"
                      placeholder="Embassy Form Filing & Appointment&#10;Verifiable Hotel Booking Vouchers&#10;Confirmed Return Flight Reservation&#10;24/7 Ground Coordinator Assistance"
                    />
                  </div>
                </div>

                {/* 7. Step-by-Step Procedure / Itinerary Roadmap */}
                <div className="border-t border-slate-200 pt-4 sm:pt-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        {editingItem.parentSlug === "tour-packages" ? "Day-by-Day Tour Itinerary" : "Step-by-Step Procedure & Roadmap"}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        These steps/days appear dynamically on the frontend detail page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addStep}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-300 transition-colors self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#00a8e8]" />
                      <span>{editingItem.parentSlug === "tour-packages" ? "Add Day" : "Add Step"}</span>
                    </button>
                  </div>

                  {steps.length === 0 ? (
                    <div className="p-3 bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-xs text-center">
                      No steps or itinerary added yet. Click &quot;{editingItem.parentSlug === "tour-packages" ? "Add Day" : "Add Step"}&quot; above.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {steps.map((step, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-300 relative space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#00a8e8]">
                              {editingItem.parentSlug === "tour-packages" ? `Day #${idx + 1}` : `Step #${idx + 1}`}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeStep(idx)}
                              className="text-red-600 hover:text-red-800 p-1 transition-colors"
                              title="Delete Step"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder={editingItem.parentSlug === "tour-packages" ? "Day Title (e.g. Day 1: Arrival & Dhow Cruise)" : "Step Title (e.g. Step 1: Document Auditing)"}
                            value={step.title}
                            onChange={(e) => updateStep(idx, "title", e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#0b3663] font-semibold"
                          />
                          <textarea
                            rows={2}
                            placeholder="Description / activities / requirements..."
                            value={step.description}
                            onChange={(e) => updateStep(idx, "description", e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#0b3663]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 8. FAQs */}
                <div className="border-t border-slate-200 pt-4 sm:pt-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Frequently Asked Questions (FAQs)
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        Add common customer questions & answers for this specific sub-service.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-slate-300 transition-colors self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#00a8e8]" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <div className="p-3 bg-slate-50 border border-dashed border-slate-300 text-slate-500 text-xs text-center">
                      No FAQs added. Click &quot;Add FAQ&quot; to define questions and answers.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-300 relative space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#0b3663]">
                              FAQ #{idx + 1}
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
                          <input
                            type="text"
                            placeholder="Question (e.g. How long does the visa take?)"
                            value={faq.question}
                            onChange={(e) => updateFaq(idx, "question", e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#0b3663] font-semibold"
                          />
                          <textarea
                            rows={2}
                            placeholder="Answer / response..."
                            value={faq.answer}
                            onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 bg-white focus:outline-none focus:border-[#0b3663]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Footer Buttons */}
                <div className="border-t border-slate-200 pt-4 flex items-center justify-end space-x-2 sticky bottom-0 bg-white z-20 py-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-1.5 bg-[#0b3663] hover:bg-[#00a8e8] text-white px-6 py-2 text-xs font-black uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{editingItem.id ? "Save Changes" : `Create ${categoryName}`}</span>
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
