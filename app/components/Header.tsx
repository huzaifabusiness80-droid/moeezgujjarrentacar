"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Award, Menu, X, Plane, MessageSquare } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Fleet", href: "/services" },
    { name: "Luxury Cars", href: "/services/luxury-cars" },
    { name: "SUV Rentals", href: "/services/suv-rentals" },
    { name: "Economy Cars", href: "/services/economy-cars" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (pathname === href) {
      return true;
    }
    if (pathname.startsWith(`${href}/`)) {
      const hasMoreSpecificMatch = navLinks.some(
        (other) =>
          other.href !== href &&
          other.href.length > href.length &&
          (pathname === other.href || pathname.startsWith(`${other.href}/`))
      );
      return !hasMoreSpecificMatch;
    }
    return false;
  };

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-white shadow-none border-b border-slate-200">
        {/* Top Info Bar (Fully Mobile Responsive) */}
        <div className="bg-[#dc2626] text-white text-xs sm:text-sm py-2 sm:py-2.5 border-b border-sky-400/30">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Left Side: Contact Numbers & License */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-white">
              <div className="flex items-center gap-1 font-bold bg-white/20 px-2 py-0.5 rounded-none text-white text-[11px] sm:text-[13px] shrink-0">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>Premium Rent A Car</span>
              </div>

              <span className="hidden sm:inline text-sky-200">|</span>

              <div className="flex items-center gap-1.5 text-[11px] sm:text-sm flex-wrap justify-center font-semibold">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
                <span>Call / WhatsApp:</span>
                <a href="tel:+923200494141" className="hover:underline transition-colors font-bold tracking-wide">
                  +92 320 0494141
                </a>
              </div>
            </div>

            {/* Right Side: Office Address */}
            <div className="hidden md:flex items-center gap-1.5 text-white font-medium text-xs">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="truncate">
                Ehsan Road, Faiz Bagh, Naulakha Park, Lahore
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex items-center">
              <div className="text-xl sm:text-2xl font-black text-[#dc2626] uppercase tracking-tighter flex flex-col leading-none">
                <span>Moeez Gujjar</span>
                <span className="text-slate-900 text-[10px] sm:text-xs tracking-[0.2em] mt-0.5">Rent A Car</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-semibold transition-colors py-1 ${
                    active
                      ? "text-[#e61c24] border-b-2 border-[#e61c24]"
                      : "text-slate-800 hover:text-[#dc2626] border-b-2 border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Inquire Now -> Opens Contact Us Page */}
            <Link
              href="/contact"
              className="px-4 py-2.5 bg-[#dc2626] hover:bg-[#0092ca] text-white font-semibold text-sm rounded-none transition-colors flex items-center gap-2 outline-none border-none shadow-none focus:ring-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire Now</span>
            </Link>

            {/* Book Car */}
            <Link
              href="/services"
              className="px-4 py-2.5 bg-[#e61c24] hover:bg-[#cc141b] text-white font-semibold text-sm rounded-none transition-colors flex items-center gap-2 outline-none border-none shadow-none focus:ring-0 cursor-pointer"
            >
              <Plane className="w-4 h-4 transform -rotate-45 hidden" />
              <span>Book a Car</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#991b1b] rounded-none focus:outline-none border border-slate-200 shadow-none bg-slate-50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-semibold rounded-none transition-colors ${
                    active
                      ? "bg-red-50 text-[#e61c24] border-l-4 border-[#e61c24]"
                      : "text-slate-800 hover:bg-slate-50 hover:text-[#dc2626]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-5 py-2.5 bg-[#dc2626] hover:bg-[#0092ca] text-white font-semibold text-center rounded-none transition-colors flex items-center justify-center gap-2 border-none shadow-none"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire Now</span>
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-5 py-2.5 bg-[#e61c24] hover:bg-[#cc141b] text-white font-semibold text-center rounded-none transition-colors flex items-center justify-center gap-2 border-none shadow-none cursor-pointer"
              >
                <span>Book a Car</span>
              </Link>
            </div>
          </div>
        )}
      </header>

    </>
  );
}
