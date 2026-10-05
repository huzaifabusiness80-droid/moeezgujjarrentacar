import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import prisma from "@/lib/prisma";
import { 
  Award, 
  ChevronRight, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Clock,
  DollarSign,
  Plane
} from "lucide-react";
import PriceDisplay from "../../components/PriceDisplay";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tour & Packages | Moeez Gujjar Rent A Car",
  description: "Explore the beauty of Pakistan with our meticulously planned northern areas and city tour packages.",
};

export default async function TourPackagesPage() {
  let packages: any[] = [];

  try {
    packages = await prisma.package.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("DB error in tour packages page:", error);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white antialiased font-sans">
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative bg-[#991b1b] text-white py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-200 uppercase tracking-wider mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Tour Packages</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-none">
                <Plane className="w-4 h-4" />
                <span>Explore Pakistan</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Premium Tour & Travel Packages
              </h1>

              <p className="text-sky-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Discover the breathtaking landscapes of Northern Pakistan (Hunza, Skardu, Naran) or enjoy comprehensive city tours in absolute comfort and safety with our experienced drivers.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/923200494141?text=${encodeURIComponent(`Assalam-o-Alaikum! I want to inquire about Tour Packages.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat On WhatsApp</span>
                </a>

                <a
                  href="tel:03200494141"
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#dc2626]" />
                  <span>Call 0320-0494141</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Packages Grid Section */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Choose Your Destination
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 font-normal">
                Browse our carefully curated packages. All packages include comfortable transport and experienced drivers.
              </p>
            </div>

            {packages.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Plane className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>No tour packages available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className="bg-white border border-slate-300 rounded-none overflow-hidden flex flex-col justify-between hover:border-[#dc2626] transition-all group"
                  >
                    <div>
                      {/* Image with Tag */}
                      <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                        <Image
                          src={pkg.imageSrc || "/fleet/land-cruiser-v8.jpg"}
                          alt={pkg.title}
                          fill
                          unoptimized={pkg.imageSrc?.startsWith("http")}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {pkg.isSale && (
                          <div className="absolute top-3 right-3 bg-[#dc2626] text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-3">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors leading-snug">
                          {pkg.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {pkg.category}
                        </p>

                        {/* Quick Meta Row */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 font-bold text-[#e61c24]">
                            <DollarSign className="w-3.5 h-3.5 shrink-0" />
                            <span><PriceDisplay priceStr={pkg.price} priceUsd={pkg.priceUsd} /></span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{pkg.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="p-6 pt-0 flex items-center gap-2">
                      <Link
                        href={pkg.link || `/services/tour-packages/${pkg.slug}`}
                        className="flex-1 py-3 px-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-1.5 text-center"
                      >
                        <Plane className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </Link>
                      <a
                        href={`https://wa.me/923200494141?text=${encodeURIComponent(`Assalam-o-Alaikum! I want to book the "${pkg.title}" package.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-2 bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-1.5 text-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* 3. Bottom Quick Helpline Strip */}
        <section className="bg-white py-12 border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
              Need a Custom Itinerary?
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              We can plan a custom trip for you. Contact us for personalized advice.
            </p>
            <div className="pt-2 flex justify-center items-center gap-3">
              <a
                href="https://wa.me/923200494141"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs uppercase tracking-wider rounded-none flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Helpline</span>
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
