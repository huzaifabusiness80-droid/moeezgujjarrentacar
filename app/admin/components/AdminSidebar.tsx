"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Plane,
  FileCheck2,
  MapPin,
  MessageSquare,
  LogOut,
  Globe,
  X,
  Moon,
  Building2,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onClose = () => {},
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Inquiries & Leads",
      href: "/admin/inquiries",
      icon: MessageSquare,
      badge: "Live",
    },
    {
      title: "Car Categories",
      href: "/admin/services",
      icon: Layers,
    },
    {
      title: "Fleet & Cars",
      href: "/admin/sub-services",
      icon: Layers,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#ebf4fa] text-slate-800">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-[#cee4f5] bg-[#dceefa] flex items-center justify-between">
        <Link
          href="/admin"
          onClick={onClose}
          className="flex items-center space-x-2.5"
        >
          <div className="w-8 h-8 bg-[#dc2626] flex items-center justify-center font-bold text-white text-base tracking-wider shadow-xs rounded-xs">
            FS
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-[#991b1b] leading-tight">
              Rent A Car Admin
            </h1>
            <p className="text-[10px] text-[#008bbd] font-mono uppercase tracking-widest font-bold">
              Control Portal
            </p>
          </div>
        </Link>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <p className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#008bbd]">
          Management
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded-xs ${
                isActive
                  ? "bg-[#dc2626] text-white shadow-xs"
                  : "text-slate-700 hover:bg-[#d8edfa] hover:text-[#991b1b]"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? "text-white" : "text-[#008bbd]"
                  }`}
                />
                <span className="truncate">{item.title}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 font-bold uppercase tracking-wider animate-pulse flex-shrink-0 ml-2 rounded-xs">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-[#cee4f5] bg-[#e3f1fb] space-y-1">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center space-x-2 px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#991b1b] hover:bg-[#d5ebf9] transition-colors rounded-xs"
        >
          <Globe className="w-4 h-4 text-[#008bbd] flex-shrink-0" />
          <span className="truncate">View Live Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-500 hover:text-white transition-colors text-left rounded-xs"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Light Blue Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#ebf4fa] text-slate-800 flex-col min-h-screen border-r border-[#cee4f5] flex-shrink-0 sticky top-0 h-screen shadow-2xs">
        {sidebarContent}
      </aside>

      {/* Mobile Off-Canvas Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[85vw] bg-[#ebf4fa] text-slate-800 flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
