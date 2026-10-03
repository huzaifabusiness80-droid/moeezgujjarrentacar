import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Car, ShieldCheck, Gem } from "lucide-react";

export default function ServicesSection() {
  const categories = [
    {
      slug: "luxury-cars",
      title: "Luxury Cars",
      desc: "Premium sedans like Mercedes S-Class & Audi A6 for VIP transport and weddings.",
      icon: <Gem className="w-8 h-8 text-[#dc2626]" strokeWidth={1.5} />,
      image: "/fleet/mercedes-s-class.jpg",
    },
    {
      slug: "suv-rentals",
      title: "SUV & 4x4 Rentals",
      desc: "Robust vehicles including Land Cruiser V8 and Prado for Northern tours and families.",
      icon: <ShieldCheck className="w-8 h-8 text-[#dc2626]" strokeWidth={1.5} />,
      image: "/fleet/land-cruiser-v8.jpg",
    },
    {
      slug: "economy-cars",
      title: "Economy & Daily Rentals",
      desc: "Affordable, reliable cars like Honda Civic and Hyundai Sonata for daily commute.",
      icon: <Car className="w-8 h-8 text-[#dc2626]" strokeWidth={1.5} />,
      image: "/fleet/honda-civic-rs.jpg",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200" id="services">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Vehicles for Every Need
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
          Explore our complete range of premium luxury cars, rugged SUVs, and reliable economy vehicles available for rent.
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="group bg-white border border-slate-300 rounded-none overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-100">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur flex items-center justify-center rounded-none shadow-sm">
                  {category.icon}
                </div>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#dc2626] transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                  {category.desc}
                </p>
                <Link
                  href={`/services/${category.slug}`}
                  className="inline-flex items-center gap-2 text-[#e61c24] font-bold text-xs uppercase tracking-wider group/link mt-auto"
                >
                  <span>Explore Cars</span>
                  <div className="w-6 h-px bg-[#e61c24] group-hover/link:w-10 transition-all duration-300" />
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
