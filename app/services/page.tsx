import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { servicesData } from "../data/servicesData";
import { Award, ArrowRight, CheckCircle2, MessageSquare, Phone } from "lucide-react";
import PriceDisplay from "../components/PriceDisplay";

import prisma from "@/lib/prisma";

export const metadata = {
  title: "Our Fleet | Moeez Gujjar Rent A Car Lahore",
  description: "Explore our premium car rental fleet in Lahore. From luxury Mercedes to rugged Prado SUVs and reliable economy cars like Civic and Sonata.",
  keywords: ["Rent a car fleet Lahore", "Luxury cars for rent Lahore", "SUVs for rent Lahore", "Honda Civic for rent Lahore", "Mercedes for rent Lahore", "Prado for rent Lahore"],
  openGraph: {
    title: "Our Fleet | Moeez Gujjar Rent A Car Lahore",
    description: "Browse our extensive fleet of luxury sedans, 4x4 SUVs, and economy cars available for rent in Lahore with drivers.",
    url: "https://moeezgujjarrentacar.com/services",
  }
};

export const revalidate = 0;

export default async function ServicesIndexPage() {
  let fleetCars: any[] = [];
  try {
    const dbCars = await prisma.subService.findMany({
      orderBy: { parentSlug: "asc" }
    });
    if (dbCars && dbCars.length > 0) {
      fleetCars = dbCars;
    }
  } catch (error) {
    console.error("Failed to load cars from DB:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white antialiased font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#991b1b] text-white py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-none mb-4">
              <Award className="w-4 h-4" />
              <span>Govt. License # LHR 10981</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Our Travel Services
            </h1>

            <p className="text-sky-100 text-sm sm:text-base mt-3 leading-relaxed">
              Explore our complete range of premium luxury cars, rugged SUVs, and reliable economy vehicles available for rent in Lahore, Punjab.
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fleetCars.map((car) => (
                <div 
                  key={car.slug}
                  className="bg-white border border-slate-300 rounded-none overflow-hidden flex flex-col justify-between hover:border-[#dc2626] transition-all group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                      <Image
                        src={car.image}
                        alt={car.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors">
                          {car.title}
                        </h2>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 uppercase">
                          {car.parentSlug.replace("-", " ")}
                        </span>
                      </div>
                      
                      <p className="text-[#991b1b] font-bold text-lg">
                        <PriceDisplay priceStr={car.priceOrFee} priceUsd={car.priceUsd} />
                      </p>
                      
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {car.overview}
                      </p>

                      {/* Benefits preview */}
                      <div className="pt-2 space-y-1.5">
                        {Array.isArray(car.inclusions) && car.inclusions.slice(0, 3).map((benefit: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                            <span className="truncate">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <Link
                      href={`/services/${car.parentSlug}/${car.slug}`}
                      className="flex-1 py-2.5 px-4 bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 text-center"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/923200494141?text=${encodeURIComponent(`Assalam-o-Alaikum Moeez Gujjar Rent A Car! I want to inquire about renting the ${car.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs rounded-none transition-colors flex items-center justify-center"
                      title="Chat On WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-white py-14 border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Need a Custom Car Rental Quote?
            </h3>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Our fleet specialists in Lahore are available round the clock to customize rental packages, book wedding cars, and arrange inter-city tours.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href="https://wa.me/923200494141"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs uppercase tracking-wider rounded-none flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat On WhatsApp</span>
              </a>
              <a
                href="tel:03200494141"
                className="px-6 py-3 bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-bold text-xs uppercase tracking-wider rounded-none flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call 0320-0494141</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
