"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

interface Props {
  defaultService: string;
}

export default function ServiceInquiryForm({ defaultService }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          phone: phone,
          serviceType: defaultService,
          destination: city,
          message: details,
        }),
      }).catch((err) => console.error("Error saving inquiry:", err));
    } catch (err) {
      console.error("Error in inquiry submit:", err);
    }

    const text = `Hello Moeez Gujjar Rent A Car,%0A%0A*Service Inquiry:* ${encodeURIComponent(defaultService)}%0A- *Name:* ${encodeURIComponent(name)}%0A- *Phone:* ${encodeURIComponent(phone)}%0A- *Destination/City:* ${encodeURIComponent(city)}%0A- *Details:* ${encodeURIComponent(details)}`;
    
    window.open(`https://wa.me/923200494141?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 border border-slate-300 p-6 rounded-none space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Book / Inquire This Service
        </h3>
        <p className="text-slate-500 text-xs mt-0.5">
          Get fast quote &amp; advice directly from our consultant.
        </p>
      </div>

      {submitted ? (
        <div className="py-6 text-center space-y-2">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-none flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-900">Inquiry Sent to WhatsApp!</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-[11px] text-[#dc2626] underline font-semibold mt-1"
          >
            Submit another query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Ali"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-none text-xs text-slate-900 focus:border-[#dc2626] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              required
              placeholder="0300-1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-none text-xs text-slate-900 focus:border-[#dc2626] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Destination / Travel City
            </label>
            <input
              type="text"
              placeholder="e.g. Dubai, UK, Turkey, Makkah"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-none text-xs text-slate-900 focus:border-[#dc2626] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Travel Requirements / Dates
            </label>
            <textarea
              rows={2}
              placeholder="Travel dates, passengers or specific queries..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-none text-xs text-slate-900 focus:border-[#dc2626] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 border-none outline-none cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send WhatsApp Inquiry</span>
          </button>
        </form>
      )}
    </div>
  );
}
