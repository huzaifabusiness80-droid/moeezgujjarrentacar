"use client";

import { useState } from "react";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ContactPageForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: "Luxury Car Rental",
    destination: "", // can be used for city/route
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Construct WhatsApp message
    const text = `Hello Moeez Gujjar Rent A Car,%0A%0A*New Booking Inquiry:*%0A- *Name:* ${encodeURIComponent(formData.fullName)}%0A- *Phone:* ${encodeURIComponent(formData.phone)}%0A- *Service Required:* ${encodeURIComponent(formData.serviceType)}%0A- *Route/City:* ${encodeURIComponent(formData.destination || "N/A")}%0A- *Message:* ${encodeURIComponent(formData.message)}`;
    
    // Attempt redirect to WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/923200494141?text=${text}`, '_blank');
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        serviceType: "Luxury Car Rental",
        destination: "",
        message: ""
      });
    }, 800);
  };

  return (
    <div className="bg-white border border-slate-300 p-6 sm:p-8 md:p-10 rounded-none h-full shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Send Your Booking Inquiry
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Fill out the form below and we will get back to you with the best available quotes.
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-emerald-900">Inquiry Prepared!</h4>
            <p className="text-emerald-700 text-sm mt-1">If WhatsApp didn't open automatically, please ensure pop-ups are allowed or contact us directly.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50 focus:border-[#dc2626] transition-all text-sm text-slate-900 placeholder-slate-400"
              placeholder="e.g. Ali Ahmed"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50 focus:border-[#dc2626] transition-all text-sm text-slate-900 placeholder-slate-400"
              placeholder="0300-1234567"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Email Address <span className="text-slate-400 font-normal lowercase tracking-normal">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50 focus:border-[#dc2626] transition-all text-sm text-slate-900 placeholder-slate-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceType" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Interested In <span className="text-red-500">*</span>
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50 focus:border-[#dc2626] transition-all text-sm text-slate-900 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
            >
              <option value="Luxury Car Rental">Luxury Car Rental</option>
              <option value="SUV & 4x4 Rental">SUV & 4x4 Rental</option>
              <option value="Economy Car Rental">Economy Car Rental</option>
              <option value="Wedding Package">Wedding Package</option>
              <option value="Corporate Transport">Corporate Transport</option>
              <option value="Other Query">Other Query</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="destination" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
            Route / City Details
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50 focus:border-[#dc2626] transition-all text-sm text-slate-900 placeholder-slate-400"
            placeholder="e.g. Lahore to Islamabad, or Within Lahore"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
            Additional Details / Travel Dates <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50 focus:border-[#dc2626] transition-all text-sm text-slate-900 placeholder-slate-400 resize-y"
            placeholder="Please mention your travel dates, specific car required, or any special requests..."
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-[#e61c24] hover:bg-[#cc141b] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 border-none shadow-none focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit via WhatsApp
              </span>
            )}
          </button>
          
          <p className="flex items-center gap-1.5 mt-4 text-xs text-slate-500 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Clicking submit will redirect you to WhatsApp to complete your inquiry securely.</span>
          </p>
        </div>
      </form>
    </div>
  );
}
