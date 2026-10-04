import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { servicesData, ServiceDetail } from "../../data/servicesData";
import { subServicesData, SubServiceDetail } from "../../data/subServicesData";
import { 
  Award, 
  ChevronRight, 
  Phone, 
  MessageSquare,
  ArrowRight,
  Clock,
  DollarSign
} from "lucide-react";

import prisma from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let title = "Car Categories";
  if (slug === "luxury-cars") title = "Luxury Cars for Rent in Lahore";
  if (slug === "economy-cars") title = "Economy Cars for Rent in Lahore";
  if (slug === "suv-rentals") title = "SUV & 4x4 for Rent in Lahore";

  return {
    title: `${title} | Moeez Gujjar Rent A Car`,
    description: `Rent ${title.toLowerCase()} from Moeez Gujjar Rent A Car. We offer the best rates, well-maintained vehicles, and professional drivers in Lahore.`,
    keywords: [title, "Rent a car in Lahore", "Best rent a car agency"],
    openGraph: {
      title: `${title} | Moeez Gujjar Rent A Car`,
      description: `Book your ${title.toLowerCase()} today with Moeez Gujjar Rent A Car in Lahore.`,
      url: `https://moeezgujjarrentacar.com/services/${slug}`,
    }
  };
}

export default async function ServiceCatalogPage({ params }: PageProps) {
  const { slug } = await params;
  let service: any = null;
  let categorySubServices: any[] = [];

  try {
    service = await prisma.service.findUnique({
      where: { slug },
    });
    categorySubServices = await prisma.subService.findMany({
      where: { parentSlug: slug },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("DB error in service detail page:", error);
  }

  // Fallback to static data if not in DB yet
  if (!service) {
    service = servicesData[slug];
  }

  if (!service) {
    notFound();
  }

  if (categorySubServices.length === 0) {
    categorySubServices = Object.values(subServicesData).filter(
      (item) => item.parentSlug === slug
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white antialiased font-sans">
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section (Clean, Bold, Corporate) */}
        <section className="relative bg-[#991b1b] text-white py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-200 uppercase tracking-wider mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">{service.title}</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-none">
                <Award className="w-4 h-4" />
                <span>Govt. License # LHR 10981</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-sky-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {service.tagline} • {service.shortDesc}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/923200494141?text=${encodeURIComponent(`Assalam-o-Alaikum Moeez Gujjar Rent A Car! I want to inquire about "${service.title}".`)}`}
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

        {/* 2. Sub-Services / Country Packages Grid Section */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Choose Your Package / Destination
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 font-normal">
                Click on any option below to view complete day-by-day itinerary, requirements, and direct booking details.
              </p>
            </div>

            {/* Grid of Sub-Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categorySubServices.map((sub) => (
                <div 
                  key={sub.slug}
                  className="bg-white border border-slate-300 rounded-none overflow-hidden flex flex-col justify-between hover:border-[#dc2626] transition-all group"
                >
                  <div>
                    {/* Image with Tag */}
                    <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                      <Image
                        src={sub.image}
                        alt={sub.title}
                        fill
                        unoptimized={sub.image?.startsWith("http")}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-[#dc2626] text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
                        {sub.badge}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors leading-snug">
                        {sub.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {sub.subtitle}
                      </p>

                      {/* Quick Meta Row */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 font-bold text-[#e61c24]">
                          <DollarSign className="w-3.5 h-3.5 shrink-0" />
                          <span>{sub.priceOrFee}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{sub.durationOrProcessing}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 pt-0 flex items-center gap-2">
                    <Link
                      href={`/services/${slug}/${sub.slug}`}
                      className="flex-1 py-3 px-4 bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 text-center"
                    >
                      <span>View Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/923200494141?text=${encodeURIComponent(`Assalam-o-Alaikum Moeez Gujjar Rent A Car! I want to inquire about "${sub.title}".`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3.5 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs rounded-none transition-colors flex items-center justify-center"
                      title="Direct WhatsApp Chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. Bottom Quick Helpline Strip */}
        <section className="bg-white py-12 border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
              Need a Custom Itinerary or Have Specific Inquiries?
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              Our travel consultants in Lahore are available on WhatsApp and call for instant personalized advice.
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
