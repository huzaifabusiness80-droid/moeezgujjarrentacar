"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Award, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#7f1d1d] text-white border-t border-slate-800">
      {/* Main Footer Body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Logo & License */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-none inline-block">
              <div className="text-xl font-black text-[#dc2626] uppercase tracking-tighter flex flex-col leading-none">
                <span>Moeez Gujjar</span>
                <span className="text-slate-900 text-[10px] tracking-[0.2em] mt-0.5">Rent A Car</span>
              </div>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Your trusted partner for luxury cars, SUVs, and economy car rentals. Experience comfort and style with our premium fleet.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dc2626]/20 text-[#dc2626] font-bold text-xs rounded-md border border-[#dc2626]/30">
              <Award className="w-3.5 h-3.5 text-[#dc2626]" />
              <span>Premium Car Rental</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#dc2626] border-b border-slate-700/60 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/" className="hover:text-[#dc2626] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#dc2626] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#dc2626] transition-colors">All Services</Link>
              </li>
              <li>
                <Link href="/services/tour-packages" className="hover:text-[#dc2626] transition-colors">Tour Packages</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#dc2626] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#dc2626] border-b border-slate-700/60 pb-2">
              Our Core Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/services/luxury-cars" className="hover:text-[#dc2626] transition-colors">Luxury Car Rentals</Link>
              </li>
              <li>
                <Link href="/services/suv-rentals" className="hover:text-[#dc2626] transition-colors">SUV & 4x4 Rentals</Link>
              </li>
              <li>
                <Link href="/services/economy-cars" className="hover:text-[#dc2626] transition-colors">Economy & Daily Rentals</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#dc2626] transition-colors">View All Fleet</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#e61c24] border-b border-slate-700/60 pb-2">
              Lahore Head Office
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e61c24] shrink-0 mt-0.5" />
                <span className="leading-normal">
                  Ehsan Road, Faiz Bagh, Naulakha Park, Lahore
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p><a href="tel:03200494141" className="hover:text-[#dc2626]">0320-0494141</a></p>
                  <p><a href="tel:03200494141" className="hover:text-[#dc2626]">0320-0494141</a></p>
                  <p><a href="tel:03200494141" className="hover:text-[#dc2626]">0320-0494141</a></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-[#450a0a] bg-[#450a0a] py-5 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Moeez Gujjar Rent A Car. All Rights Reserved.</p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 bg-[#dc2626] hover:bg-[#0090c7] text-white rounded-md transition-colors shadow-none border-none outline-none flex items-center gap-1.5 font-bold text-xs"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
