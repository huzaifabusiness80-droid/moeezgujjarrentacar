import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactPageForm from "./ContactPageForm";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Moeez Gujjar Rent A Car Lahore",
  description: "Contact Moeez Gujjar Rent A Car in Lahore. Rent luxury cars, SUVs, and economy sedans at the best rates. Get a quick quote today.",
  keywords: ["Contact Rent a car Lahore", "Rent a car number Lahore", "Car rental Lahore contact", "Book rent a car Lahore"],
  openGraph: {
    title: "Contact Us | Moeez Gujjar Rent A Car Lahore",
    description: "Get in touch with Moeez Gujjar Rent A Car in Lahore for premium rental services. 24/7 Support.",
    url: "https://moeezgujjarrentacar.com/contact",
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white antialiased font-sans">
      <Header />

      <main className="flex-1 w-full bg-slate-50">
        
        {/* Compact Page Header */}
        <section className="bg-[#991b1b] text-white py-10 sm:py-14 border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-200 uppercase tracking-wider">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-white">Contact</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  Get In Touch
                </h1>
                <p className="text-sky-100 text-sm max-w-xl font-normal leading-relaxed">
                  Have questions about our rental fleet, corporate rates, or wedding packages? We are here to help you 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Contact Form */}
              <div className="lg:col-span-7 xl:col-span-8 h-full">
                <ContactPageForm />
              </div>

              {/* Right Column: Contact Details & Map */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-8">
                
                {/* Contact Info Card */}
                <div className="bg-white border border-slate-300 p-6 sm:p-8 rounded-none h-full">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[#dc2626]"></div>
                    Contact Moeez Gujjar Rent A Car
                  </h2>

                  <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    Visit our Lahore office or reach out to our representatives via phone or WhatsApp for prompt car rental assistance.
                  </p>

                  <div className="space-y-6">
                    {/* Office Location */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#e61c24]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Head Office</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Ehsan Road, Faiz Bagh, Naulakha Park, Lahore
                        </p>
                      </div>
                    </div>

                    {/* Phone Numbers */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#dc2626]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Helpline (24/7)</h4>
                        <div className="flex flex-col gap-1 text-sm text-slate-600">
                          <a href="tel:03200494141" className="hover:text-[#dc2626] transition-colors font-semibold">0320-0494141</a>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-[#25D366]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">WhatsApp Chat</h4>
                        <a 
                          href="https://wa.me/923200494141" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-[#25D366] text-sm transition-colors font-semibold"
                        >
                          +92 320 0494141
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Email Support</h4>
                        <a href="mailto:Mueezgujjar85@gmail.com" className="text-slate-600 hover:text-[#991b1b] text-sm transition-colors">
                          Mueezgujjar85@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <hr className="my-8 border-slate-200" />

                  {/* Office Timings */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Business Hours</h4>
                      <div className="space-y-1 text-sm text-slate-600">
                        <p className="flex justify-between gap-4"><span>Monday - Saturday:</span> <span className="font-medium text-slate-900">09:00 AM - 09:00 PM</span></p>
                        <p className="flex justify-between gap-4"><span>Sunday:</span> <span className="font-medium text-slate-500">Closed (Available on Phone)</span></p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
