"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What documents do I need to rent a car?",
      answer: "You need a valid Original CNIC (Computerized National Identity Card), a valid Driving License, and a recent utility bill or proof of residence. For corporate clients, a company letterhead request is required.",
    },
    {
      question: "Do you offer cars with or without a driver?",
      answer: "We offer both options. You can rent a car with our professional, well-mannered drivers for complete peace of mind, or you can opt for self-drive if you meet our driving license and security requirements.",
    },
    {
      question: "Is there any security deposit required?",
      answer: "Yes, a refundable security deposit is required for self-drive rentals. The deposit amount varies depending on the car category (Luxury, SUV, or Economy) and is fully refunded upon the safe return of the vehicle.",
    },
    {
      question: "Can I rent a car for traveling outside the city or Northern Areas?",
      answer: "Absolutely! We provide powerful SUVs like Land Cruiser and Prado specifically for Northern Area tours, as well as comfortable sedans for inter-city travel. We also offer customized tour packages.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
          Everything you need to know about renting a car from Moeez Gujjar Rent A Car.
        </p>
      </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-slate-200 bg-white transition-colors ${
                openIndex === index ? "border-[#dc2626]" : "hover:border-slate-300"
              }`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-bold text-sm sm:text-base pr-4 ${openIndex === index ? "text-[#991b1b]" : "text-slate-900"}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#dc2626] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
