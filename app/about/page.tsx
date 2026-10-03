import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  Award, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  MessageSquare,
  Car
} from "lucide-react";

export const metadata = {
  title: "About Us | Moeez Gujjar Rent A Car Lahore",
  description: "Learn about Moeez Gujjar Rent A Car based in Lahore, Pakistan. We are the premier car rental agency offering luxury cars, SUVs like Prado, and economy sedans with professional drivers.",
  keywords: ["About Moeez Gujjar Rent A Car", "Rent a car company Lahore", "Best rent a car agency in Lahore", "Luxury fleet Lahore"],
  openGraph: {
    title: "About Us | Moeez Gujjar Rent A Car Lahore",
    description: "Your trusted car rental partner in Lahore. Offering luxury weddings cars, SUVs, and standard sedans.",
    url: "https://moeezgujjarrentacar.com/about",
    images: ["/navbarlogo.png"],
  }
};

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#dc2626]" />,
      title: "Trusted & Reliable",
      desc: "Providing safe, verified, and well-maintained vehicles for all your travel needs with complete peace of mind.",
    },
    {
      icon: <Car className="w-6 h-6 text-[#dc2626]" />,
      title: "Premium Fleet",
      desc: "From the luxurious Mercedes S-Class to robust SUVs like the Land Cruiser V8, our fleet is diverse and top-tier.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#dc2626]" />,
      title: "24/7 Support",
      desc: "Round-the-clock roadside assistance and dedicated client support whenever you need it.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#dc2626]" />,
      title: "Professional Chauffeurs",
      desc: "Highly trained, courteous, and experienced drivers ensuring a smooth and safe journey.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white antialiased font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#991b1b] text-white py-14 sm:py-20 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-200 uppercase tracking-wider mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">About Us</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-none">
                <Award className="w-4 h-4" />
                <span>Premium Rent A Car Service</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                About Moeez Gujjar Rent A Car
              </h1>

              <p className="text-sky-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Your trusted car rental partner based in Lahore, Punjab. Specializing in luxury weddings, corporate transport, and family SUV rentals.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/923200494141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat With Our Team</span>
                </a>
                <a
                  href="tel:03200494141"
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#dc2626]" />
                  <span>Call Us Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Agency Story Section */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#dc2626] uppercase tracking-widest">
                    Who We Are
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                    Committed to Excellence & Unforgettable Journeys
                  </h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Established with a vision to redefine car rentals in South Punjab, and backed by over <strong>9 years of industry experience</strong>, <strong>Moeez Gujjar Rent A Car</strong> offers a diverse fleet of meticulously maintained vehicles. We pride ourselves on transparent pricing, exceptional customer service, and absolute reliability.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Whether you need a luxury sedan for a wedding, a rugged SUV for a trip to the Northern areas, or an economy car for daily errands, we have the perfect vehicle tailored to your needs.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                    <span>Large Fleet of Modern, Well-Maintained Vehicles</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                    <span>Professional Chauffeur Services</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                    <span>Flexible Daily, Weekly, and Monthly Rentals</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-[380px] sm:h-[480px] bg-slate-900 border border-slate-300 rounded-none overflow-hidden group">
                <Image
                  src="/fleet/mercedes-s-class.jpg"
                  alt="Moeez Gujjar Rent A Car Fleet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <div className="border-l-2 border-[#dc2626] pl-3">
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      Moeez Gujjar Rent A Car
                    </h3>
                    <p className="text-slate-300 text-xs mt-1">
                      Lahore, Punjab
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Meet Our Expert Team
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 font-normal">
                The professionals behind your seamless rental experience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Moeez Gujjar", role: "CEO & Founder", img: "/navbarlogo.png", isLogo: true },
                { name: "Abdullah", role: "Professional Driver", img: "/Team-images/DriverAbdullah.png", isLogo: false },
                { name: "Ali Malik", role: "Professional Driver", img: "/Team-images/AliMalikdriver.png", isLogo: false },
                { name: "Usman Shah", role: "Customer Support", img: "/navbarlogo.png", isLogo: true },
              ].map((member, idx) => (
                <div key={idx} className="bg-white border border-slate-200 overflow-hidden text-center hover:shadow-lg transition-shadow group">
                  <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-105 ${member.isLogo ? 'object-contain p-8' : 'object-cover'}`}
                    />
                  </div>
                  <div className="p-5 border-t border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                    <p className="text-sm text-[#dc2626] font-medium mt-1">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 Core Value Cards Grid */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Why Choose Us
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 font-normal">
                Our core pillars of professionalism, quality, and personalized client attention
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 border border-slate-300 p-6 rounded-none space-y-3 hover:border-[#dc2626] transition-colors"
                >
                  <div className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center">
                    {val.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {val.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
