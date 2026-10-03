"use client";
import React from "react";
import Image from "next/image";

const cars = [
  { src: "/fleet/mercedes-s-class.jpg", alt: "Mercedes S-Class" },
  { src: "/fleet/land-cruiser-v8.jpg", alt: "Land Cruiser V8" },
  { src: "/fleet/honda-civic-rs.jpg", alt: "Honda Civic RS" },
  { src: "/fleet/audi-a6.jpg", alt: "Audi A6" },
  { src: "/fleet/prado-tx.jpg", alt: "Prado TX" },
  { src: "/fleet/fortuner-legender.jpg", alt: "Fortuner Legender" },
];

export default function CarMarquee() {
  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Explore Our Premium Fleet
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
          Discover our wide selection of high-end luxury cars, rugged SUVs, and reliable economy sedans.
        </p>
      </div>

      <div className="flex whitespace-nowrap relative w-full">
        <div className="flex animate-marquee gap-6 sm:gap-10 px-4">
          {[...cars, ...cars, ...cars, ...cars].map((car, idx) => (
            <div key={idx} className="flex flex-col items-center shrink-0 w-[300px] sm:w-[400px] group cursor-pointer">
              <div className="relative w-full h-[200px] sm:h-[260px] bg-slate-50 overflow-hidden mb-5">
                <Image
                  src={car.src}
                  alt={car.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{car.alt}</h3>
            </div>
          ))}
        </div>
        <style jsx>{`
          .animate-marquee {
            animation: marquee 35s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
