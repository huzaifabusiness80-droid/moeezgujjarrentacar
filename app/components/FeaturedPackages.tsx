"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PriceDisplay from "./PriceDisplay";

interface FleetItem {
  id: string;
  slug: string;
  parentSlug: string;
  title: string;
  badge: string;
  image: string;
  priceOrFee: string;
  priceUsd?: string | null;
  overview: string;
  isFeatured: boolean;
  inclusions: string[];
}

export default function FeaturedPackages() {
  const [list, setList] = useState<FleetItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/sub-services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          // Filter to featured or just take the first 6
          const featured = data.data.filter((item: any) => item.isFeatured || item.featured).slice(0, 6);
          setList(featured.length > 0 ? featured : data.data.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  if (list.length === 0) return null;

  return (
    <section id="featured-fleet" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Featured Vehicles
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
          Browse a selection of our most popular rental vehicles available right now.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((car) => (
            <div 
              key={car.slug}
              className="bg-white border border-slate-200 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300 rounded-none"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                <Image
                  src={car.image || "/fleet/mercedes-s-class.jpg"}
                  alt={car.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {car.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] sm:text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-sm">
                      {car.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#991b1b] transition-colors leading-tight">
                      {car.title}
                    </h3>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="text-[#991b1b] font-bold text-lg">
                      <PriceDisplay priceStr={car.priceOrFee} priceUsd={car.priceUsd} />
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-5">
                  {car.overview}
                </p>

                {/* Features (limit to 2) */}
                <div className="mt-auto space-y-2 mb-6">
                  {Array.isArray(car.inclusions) && car.inclusions.slice(0, 2).map((inc: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600 font-medium">{inc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Link 
                    href={`/services/${car.parentSlug}/${car.slug}`}
                    className="flex-1 py-3 px-4 bg-[#991b1b] hover:bg-[#7f1d1d] text-white text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link 
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Browse Full Fleet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
