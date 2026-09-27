"use client";

import React, { useEffect, useState } from "react";
import AdminShell from "./components/AdminShell";
import Link from "next/link";
import {
  Package,
  FileCheck2,
  MapPin,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  PhoneCall,
  Loader2,
  Plane,
  Moon,
  Building2,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";

interface Stats {
  totalPackages: number;
  totalSubServices: number;
  totalDestinations: number;
  totalInquiries: number;
  pendingInquiries: number;
  visasCount: number;
  flightsCount: number;
  toursCount: number;
  umrahCount: number;
  hotelsCount: number;
  insuranceCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalPackages: 0,
    totalSubServices: 0,
    totalDestinations: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
    visasCount: 0,
    flightsCount: 0,
    toursCount: 0,
    umrahCount: 0,
    hotelsCount: 0,
    insuranceCount: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [pkgRes, subRes, destRes, inqRes] = await Promise.all([
          fetch("/api/admin/packages"),
          fetch("/api/admin/sub-services"),
          fetch("/api/admin/destinations"),
          fetch("/api/inquiries"),
        ]);

        const pkgs = await pkgRes.json();
        const subs = await subRes.json();
        const dests = await destRes.json();
        const inqs = await inqRes.json();

        const inquiriesList = inqs.success && Array.isArray(inqs.data) ? inqs.data : [];
        const pendingCount = inquiriesList.filter((i: any) => i.status === "NEW").length;
        const subList: any[] = subs.success && Array.isArray(subs.data) ? subs.data : [];

        setStats({
          totalPackages: pkgs.success && Array.isArray(pkgs.data) ? pkgs.data.length : 0,
          totalSubServices: subList.length,
          totalDestinations: dests.success && Array.isArray(dests.data) ? dests.data.length : 0,
          totalInquiries: inquiriesList.length,
          pendingInquiries: pendingCount,
          visasCount: subList.filter((s) => s.parentSlug === "visa-processing").length,
          flightsCount: subList.filter((s) => s.parentSlug === "air-ticketing").length,
          toursCount: subList.filter((s) => s.parentSlug === "tour-packages").length,
          umrahCount: subList.filter((s) => s.parentSlug === "umrah-services").length,
          hotelsCount: subList.filter((s) => s.parentSlug === "hotel-bookings").length,
          insuranceCount: subList.filter((s) => s.parentSlug === "travel-insurance").length,
        });

        setRecentInquiries(inquiriesList.slice(0, 8));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const statCards = [
    {
      title: "Active Leads / Inquiries",
      value: stats.totalInquiries,
      subtext: `${stats.pendingInquiries} new pending response`,
      icon: MessageSquare,
      color: "bg-[#0b3663]",
      href: "/admin/inquiries",
      badge: stats.pendingInquiries > 0 ? `${stats.pendingInquiries} New` : undefined,
    },
    {
      title: "Tour Packages",
      value: stats.totalPackages,
      subtext: "Domestic & International",
      icon: Package,
      color: "bg-[#00a8e8]",
      href: "/admin/packages",
    },
    {
      title: "Visa Processing",
      value: stats.visasCount,
      subtext: "Global visa files & e-visas",
      icon: FileCheck2,
      color: "bg-emerald-600",
      href: "/admin/visas",
    },
    {
      title: "Destinations",
      value: stats.totalDestinations,
      subtext: "Featured on Homepage",
      icon: MapPin,
      color: "bg-amber-600",
      href: "/admin/destinations",
    },
  ];

  const subServiceHub = [
    {
      title: "Visa Processing",
      desc: "Schengen, UK, USA, UAE, Turkey & worldwide visit visas",
      count: stats.visasCount,
      href: "/admin/visas",
      icon: FileCheck2,
      color: "border-sky-500",
    },
    {
      title: "Tour Packages",
      desc: "Dubai, Turkey, Baku, Malaysia, Thailand holiday packages",
      count: stats.toursCount,
      href: "/admin/packages",
      icon: Plane,
      color: "border-indigo-500",
    },
    {
      title: "Flight Bookings",
      desc: "International direct flights, domestic PIA/Airblue routes",
      count: stats.flightsCount,
      href: "/admin/flights",
      icon: Plane,
      color: "border-cyan-500",
    },
    {
      title: "Umrah & Hajj",
      desc: "5-Star VIP, family, economy packages & Ziyarat tours",
      count: stats.umrahCount,
      href: "/admin/umrah",
      icon: Moon,
      color: "border-emerald-500",
    },
    {
      title: "Hotel Bookings",
      desc: "Worldwide 4/5-star hotels & domestic Northern area resorts",
      count: stats.hotelsCount,
      href: "/admin/hotels",
      icon: Building2,
      color: "border-amber-500",
    },
    {
      title: "Travel Insurance",
      desc: "Schengen & worldwide embassy approved medical policies",
      count: stats.insuranceCount,
      href: "/admin/insurance",
      icon: ShieldCheck,
      color: "border-teal-500",
    },
  ];

  return (
    <AdminShell title="System Overview">
      <div className="space-y-4 sm:space-y-6">
        {/* Top Banner */}
        <div className="bg-[#0b3663] text-white p-4 sm:p-6 border-l-4 border-[#00a8e8] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider">
              Fly Sky Management Portal
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Manage individual sub-service categories (Visas, Tours, Flights, Umrah, Hotels, Insurance), homepage destinations, and live customer inquiries.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <Link
              href="/admin/packages"
              className="flex-1 sm:flex-initial bg-[#00a8e8] hover:bg-white hover:text-[#0b3663] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 transition-colors flex items-center justify-center space-x-1.5 shadow-sm text-center"
            >
              <PlusCircle className="w-4 h-4 flex-shrink-0" />
              <span>Tour Packages</span>
            </Link>
            <Link
              href="/admin/visas"
              className="flex-1 sm:flex-initial bg-white/10 hover:bg-white hover:text-[#0b3663] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 transition-colors flex items-center justify-center space-x-1.5 border border-white/20 text-center"
            >
              <PlusCircle className="w-4 h-4 flex-shrink-0" />
              <span>Visa Services</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                href={stat.href}
                className="bg-white border border-slate-200 p-4 sm:p-5 hover:border-[#00a8e8] transition-all flex flex-col justify-between group cursor-pointer shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 ${stat.color} text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate pr-2">{stat.subtext}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#00a8e8] transition-colors flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sub-Services Individual Category Control Cards */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0b3663]">
              Sub-Services Management Hub
            </h4>
            <p className="text-[11px] text-slate-500">
              Direct access to manage each service category with full rich inputs, procedure roadmaps, FAQs, and pricing
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subServiceHub.map((hub, i) => {
              const HubIcon = hub.icon;
              return (
                <Link
                  key={i}
                  href={hub.href}
                  className="p-3.5 border border-slate-200 hover:border-[#00a8e8] hover:shadow-xs transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between group rounded-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-[#0b3663] text-white rounded-xs">
                          <HubIcon className="w-3.5 h-3.5 text-[#00a8e8]" />
                        </div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-[#00a8e8] transition-colors">
                          {hub.title}
                        </h5>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#00a8e8]/10 text-[#00a8e8] px-2 py-0.5 border border-[#00a8e8]/20">
                        {loading ? "..." : `${hub.count} items`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                      {hub.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#00a8e8]">
                    <span>Manage {hub.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Inquiries & Quick Table */}
        <div className="bg-white border border-slate-200 shadow-2xs">
          <div className="p-3.5 sm:p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Recent Customer Inquiries & Leads
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500">
                Form submissions from website header, hero carousel, contact page and package modals
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold uppercase tracking-wider text-[#00a8e8] hover:underline flex items-center space-x-1 self-start sm:self-auto"
            >
              <span>View All Leads</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#00a8e8]" />
              <p className="text-xs font-semibold">Loading inquiries...</p>
            </div>
          ) : recentInquiries.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">No inquiries submitted yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 sm:px-4">Date</th>
                    <th className="py-3 px-3 sm:px-4">Customer Name</th>
                    <th className="py-3 px-3 sm:px-4">Service / Subject</th>
                    <th className="py-3 px-3 sm:px-4">Contact</th>
                    <th className="py-3 px-3 sm:px-4">Status</th>
                    <th className="py-3 px-3 sm:px-4 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 sm:px-4 text-slate-500 font-mono text-[11px]">
                        {new Date(inq.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                      <td className="py-3 px-3 sm:px-4 font-bold text-slate-900">
                        {inq.fullName}
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[10px] uppercase">
                          {inq.serviceType}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4 font-mono text-slate-700">
                        {inq.phone}
                      </td>
                      <td className="py-3 px-3 sm:px-4">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border ${
                            inq.status === "NEW"
                              ? "bg-red-50 text-red-700 border-red-200 animate-pulse"
                              : inq.status === "CONTACTED"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-right">
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
