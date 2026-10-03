"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Car } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  imageSrc: string;
  visaType: string;
  processingTime: string;
  highlight: string;
  link: string;
}

const destinations: Destination[] = [
  {
    id: "weddings",
    name: "Luxury Weddings",
    country: "Pakistan",
    imageSrc: "/fleet/audi-a6.jpg",
    visaType: "Chauffeur Driven",
    processingTime: "Instant Booking",
    highlight: "Premium sedans for special days",
    link: "/services/luxury-cars",
  },
  {
    id: "northern-tours",
    name: "Northern Tours",
    country: "Pakistan",
    imageSrc: "/fleet/prado-tx.jpg",
    visaType: "SUV & 4x4",
    processingTime: "Advance Booking",
    highlight: "Robust vehicles for mountains",
    link: "/services/suv-rentals",
  },
  {
    id: "city-travel",
    name: "City Commute",
    country: "Pakistan",
    imageSrc: "/fleet/honda-civic-rs.jpg",
    visaType: "Self Drive / Chauffeur",
    processingTime: "Instant Booking",
    highlight: "Comfortable sedans",
    link: "/services/economy-cars",
  },
  {
    id: "family-trips",
    name: "Family Vacations",
    country: "Pakistan",
    imageSrc: "/fleet/fortuner-legender.jpg",
    visaType: "7 Seater",
    processingTime: "Advance Booking",
    highlight: "Spacious SUVs for families",
    link: "/services/suv-rentals",
  }
];

export default function PopularDestinations() {
  const [list, setList] = useState<Destination[]>(destinations);

  useEffect(() => {
    fetch("/api/admin/destinations")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: Destination[] = data.data.map((d: any) => ({
            id: d.id,
            name: d.name,
            country: d.country,
            imageSrc: d.imageSrc || d.image || "/fleet/mercedes-s-class.jpg",
            visaType: d.visaType || "Rental Service",
            processingTime: d.processingTime || "Instant Booking",
            highlight: d.highlight || d.description || `${d.name} rentals`,
            link: d.link || `/services`,
          }));
          setList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="destinations" className="w-full py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Popular Rental Uses
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2.5 font-normal">
            Discover the best vehicles for your specific travel requirements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {list.map((dest) => (
            <Link
              key={dest.id}
              href={dest.link}
              className="group relative aspect-square overflow-hidden cursor-pointer bg-slate-900 select-none transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={dest.imageSrc}
                alt={`${dest.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2.5 py-1 bg-[#e61c24] text-white text-[11px] font-semibold rounded-none uppercase tracking-wide flex items-center gap-1.5 shadow-none">
                  <Car className="w-3 h-3" />
                  View Cars
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex items-end justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl text-white tracking-normal leading-tight font-bold">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                    {dest.visaType}
                  </p>
                </div>

                <div className="w-7 h-7 rounded-none bg-white/20 backdrop-blur-sm group-hover:bg-[#dc2626] text-white flex items-center justify-center transition-all duration-300 shrink-0 mb-0.5">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
