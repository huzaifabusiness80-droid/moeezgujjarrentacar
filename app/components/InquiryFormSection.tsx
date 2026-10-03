"use client";

import { useState } from "react";
import { Send, MapPin, Phone, MessageSquare } from "lucide-react";

export default function InquiryFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    serviceType: "Luxury Car Rental",
    destination: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const text = `Hello Moeez Gujjar Rent A Car,%0A%0A*New Inquiry Details:*%0A- *Name:* ${encodeURIComponent(formData.fullName)}%0A- *Phone:* ${encodeURIComponent(formData.phone)}%0A- *Service Required:* ${encodeURIComponent(formData.serviceType)}%0A- *Route:* ${encodeURIComponent(formData.destination)}%0A- *Message:* ${encodeURIComponent(formData.message)}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/923200494141?text=${text}`, '_blank');
      setIsSubmitting(false);
      setFormData({
        fullName: "",
        phone: "",
        serviceType: "Luxury Car Rental",
        destination: "",
        message: ""
      });
    }, 800);
  };

  return (
    <section className="py-20 sm:py-28 bg-slate-900 border-t border-slate-800 text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-4">
              <span className="text-[#dc2626] font-bold text-xs sm:text-sm tracking-widest uppercase">
                Ready to Book?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
                Book Your Car Today
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
                Visit our office in Lahore or send us your rental inquiry for immediate assistance and customized quotes.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#e61c24]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Head Office Location</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Ehsan Road, Faiz Bagh, Naulakha Park, Lahore</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#dc2626]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">24/7 Booking Helpline</h4>
                  <p className="text-slate-400 text-sm"><a href="tel:03200494141" className="hover:text-white transition-colors">0320-0494141</a></p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[250px] bg-slate-800 border border-slate-700">
              <iframe
                title="Moeez Gujjar Rent A Car Location"
                src="https://maps.google.com/maps?q=31.5815625,74.3359375+(Moeez+Gujjar+Rent+A+Car)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 lg:p-12 text-slate-900 border border-slate-300 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#dc2626]"></div>
            
            <h3 className="text-2xl font-bold mb-8 tracking-tight">Quick Inquiry</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="iq_fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name *</label>
                  <input
                    type="text" id="iq_fullName" name="fullName" required
                    value={formData.fullName} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="iq_phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Phone / WhatsApp *</label>
                  <input
                    type="tel" id="iq_phone" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="iq_service" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Service Required</label>
                <select
                  id="iq_service" name="serviceType"
                  value={formData.serviceType} onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-colors text-sm cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="Luxury Car Rental">Luxury Car Rental</option>
                  <option value="SUV & 4x4 Rental">SUV & 4x4 Rental</option>
                  <option value="Economy Car Rental">Economy Car Rental</option>
                  <option value="Wedding Package">Wedding Package</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="iq_dest" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Route / Required City</label>
                <input
                  type="text" id="iq_dest" name="destination"
                  value={formData.destination} onChange={handleChange}
                  placeholder="e.g. Lahore, Islamabad, Local Lahore"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="iq_message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Your Message / Dates *</label>
                <textarea
                  id="iq_message" name="message" required rows={4}
                  value={formData.message} onChange={handleChange}
                  placeholder="Dates and specific vehicle requirements..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-colors text-sm resize-y"
                ></textarea>
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full px-6 py-4 bg-[#e61c24] hover:bg-[#cc141b] disabled:bg-slate-300 text-white font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
