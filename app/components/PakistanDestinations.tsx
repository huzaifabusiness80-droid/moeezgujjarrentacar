"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Car } from "lucide-react";

const col1 = [
  { id: "faisal", src: "/destinations/faisal-mosque.jpg", title: "Faisal Mosque", tag: "Capital Landmark", location: "Islamabad", bestCar: "Mercedes S-Class" },
  { id: "shangrila", src: "/destinations/shangrila-skardu.jpg", title: "Shangrila Resort", tag: "Shangri-La", location: "Skardu", bestCar: "Land Cruiser V8" },
  { id: "saiful", src: "/destinations/lake-saiful-muluk.jpg", title: "Lake Saiful Muluk", tag: "Alpine Lake", location: "Naran Kaghan", bestCar: "Prado TX" },
];

const col2 = [
  { id: "passu", src: "/destinations/passu-cones.jpg", title: "Passu Cones", tag: "Karakoram", location: "Hunza Valley", bestCar: "Fortuner Legender" },
  { id: "badshahi", src: "/destinations/badshahi-mosque.jpg", title: "Badshahi Mosque", tag: "Mughal Heritage", location: "Lahore", bestCar: "Audi A6" },
  { id: "katpana", src: "/destinations/katpana-desert.jpg", title: "Katpana Desert", tag: "High Altitude Dunes", location: "Skardu", bestCar: "Revo / V8" },
];

const col3 = [
  { id: "attabad", src: "/destinations/attabad-lake.jpg", title: "Attabad Lake", tag: "Glacial Paradise", location: "Hunza Valley", bestCar: "Fortuner / Prado" },
  { id: "neelum", src: "/destinations/neelum-valley.jpg", title: "Neelum Valley", tag: "Heaven on Earth", location: "Kashmir", bestCar: "Prado / Hiace" },
  { id: "monument", src: "/destinations/pakistan-monument.jpg", title: "Pakistan Monument", tag: "National Heritage", location: "Islamabad", bestCar: "Civic RS" },
];

const col4 = [
  { id: "makran", src: "/destinations/makran-coastal-highway.jpg", title: "Coastal Highway", tag: "Marine Drive", location: "Balochistan", bestCar: "Land Cruiser" },
  { id: "murree", src: "/destinations/murree-hills.jpg", title: "Murree Hills", tag: "Queen of Hills", location: "Galyat", bestCar: "Prado TX" },
  { id: "swat", src: "/destinations/swat-valley.jpg", title: "Kalam Valley", tag: "Switzerland of Pak", location: "Swat", bestCar: "Fortuner / Revo" },
];

const DestinationCard = ({ item, idx }: { item: any, idx: number }) => {
  // Alternate heights for masonry feel
  const isLarge = idx % 2 === 0;
  
  return (
    <div className={`relative w-full ${isLarge ? "h-[300px] sm:h-[450px]" : "h-[220px] sm:h-[320px]"} overflow-hidden group cursor-pointer mb-4 sm:mb-6 rounded-none`}>
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </div>
  );
};

export default function PakistanDestinations() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-24 overflow-hidden border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Popular Destinations in Pakistan 
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
          From the majestic peaks of the North to the heritage of the South. Travel comfortably with our premium luxury fleet.
        </p>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-[600px] sm:h-[750px] overflow-hidden group">
        {/* Top and Bottom Fading Gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-white to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-white to-transparent z-20" />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 h-full">
          
          {/* Column 1 - Moves Up */}
          <div className="flex flex-col animate-scroll-up group-hover:[animation-play-state:paused]">
            {[...col1, ...col1].map((item, idx) => (
              <DestinationCard key={`${item.id}-${idx}`} item={item} idx={idx} />
            ))}
          </div>

          {/* Column 2 - Moves Down */}
          <div className="flex flex-col animate-scroll-down group-hover:[animation-play-state:paused]">
            {[...col2, ...col2].map((item, idx) => (
              <DestinationCard key={`${item.id}-${idx}`} item={item} idx={idx} />
            ))}
          </div>

          {/* Column 3 - Moves Up (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col animate-scroll-up group-hover:[animation-play-state:paused]">
            {[...col3, ...col3].map((item, idx) => (
              <DestinationCard key={`${item.id}-${idx}`} item={item} idx={idx} />
            ))}
          </div>

          {/* Column 4 - Moves Down (Hidden on Mobile & Tablet) */}
          <div className="hidden xl:flex flex-col animate-scroll-down group-hover:[animation-play-state:paused]">
            {[...col4, ...col4].map((item, idx) => (
              <DestinationCard key={`${item.id}-${idx}`} item={item} idx={idx} />
            ))}
          </div>
          
        </div>
      </div>
      
      <style jsx>{`
        .animate-scroll-up {
          animation: scrollUp 40s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 45s linear infinite;
          /* Start from -50% to make the loop seamless going down */
          transform: translateY(-50%);
        }
        
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
