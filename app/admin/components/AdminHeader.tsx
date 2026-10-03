"use client";

import React, { useEffect, useState } from "react";
import { User, Bell, Menu } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  onToggleSidebar?: () => void;
}

export default function AdminHeader({
  title,
  onToggleSidebar = () => {},
}: AdminHeaderProps) {
  const [adminEmail, setAdminEmail] = useState<string>("Admin");
  const [inquiryCount, setInquiryCount] = useState<number>(0);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setAdminEmail(data.user.email);
        }
      })
      .catch(() => {});

    fetch("/api/inquiries?status=NEW")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setInquiryCount(data.data.length);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onToggleSidebar}
          type="button"
          className="lg:hidden p-2 -ml-1 text-slate-700 hover:text-[#dc2626] hover:bg-slate-100 rounded transition-colors focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h2 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-[#991b1b] truncate">
          {title}
        </h2>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        {inquiryCount > 0 && (
          <Link
            href="/admin/inquiries"
            className="flex items-center space-x-1.5 bg-amber-50 text-amber-800 border border-amber-300 px-2 sm:px-2.5 py-1 text-xs font-semibold hover:bg-amber-100 transition-colors"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600 animate-bounce flex-shrink-0" />
            <span className="hidden xs:inline">{inquiryCount} New Leads</span>
            <span className="xs:hidden inline font-bold">{inquiryCount}</span>
          </Link>
        )}

        <div className="flex items-center space-x-2 border-l border-slate-200 pl-2 sm:pl-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 border border-slate-300 flex items-center justify-center text-[#991b1b] rounded-xs">
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-left hidden md:block max-w-[140px] truncate">
            <p className="text-xs font-bold text-slate-800 truncate">{adminEmail}</p>
            <span className="text-[10px] text-emerald-600 font-mono flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

