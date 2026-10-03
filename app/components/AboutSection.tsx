import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] group overflow-hidden">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-slate-100 -z-10 translate-x-4 -translate-y-4"></div>
            <Image
              src="/fleet/fortuner-legender.jpg"
              alt="Moeez Gujjar Rent A Car Fleet"
              fill
              className="object-cover rounded-none border border-slate-300 z-10 hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            <div className="absolute bottom-6 left-6 z-20 bg-[#991b1b] text-white p-6 border-l-4 border-[#dc2626] shadow-lg max-w-xs">
              <span className="block text-3xl font-bold text-[#dc2626]">9+</span>
              <span className="text-sm font-semibold tracking-wide uppercase mt-1 block">Years of Experience</span>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-[#dc2626] font-bold text-xs sm:text-sm tracking-widest uppercase">
                About Moeez Gujjar Rent A Car
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                Your Trusted Partner for Luxury & Economy Car Rentals
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Moeez Gujjar Rent A Car is a premier car rental agency located in Lahore, Punjab. We pride ourselves on offering a wide range of impeccably maintained vehicles, from luxury sedans for weddings to robust SUVs for Northern tours.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base">Meticulously Maintained Fleet</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Every vehicle is fully serviced, clean, and ready for your journey.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base">Professional Chauffeurs</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Experienced and courteous drivers available for all luxury rentals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-900 font-bold text-sm sm:text-base">Transparent Pricing</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">No hidden charges, offering the best rates in Lahore.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-[#e61c24] text-white font-bold text-xs uppercase tracking-widest transition-colors duration-300 group rounded-none"
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
