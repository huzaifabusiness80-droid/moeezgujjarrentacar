"use client";

import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Ali Raza",
      role: "Corporate Client",
      text: "Booked a Honda Civic for an inter-city business trip. The car was in pristine condition, very clean, and the booking process was entirely hassle-free. Highly recommended!",
      rating: 5,
    },
    {
      name: "Usman Ahmed",
      role: "Wedding Customer",
      text: "We rented a Mercedes S-Class for my brother's wedding. The car arrived decorated exactly as requested, and the driver was extremely professional and courteous. Made our day special.",
      rating: 5,
    },
    {
      name: "Dr. Farooq",
      role: "Family Tour",
      text: "Rented a Prado TX for a family trip to Hunza. The vehicle was powerful and perfectly maintained for hilly areas. The team's customer service and guidance was exceptional.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          What Our Clients Say
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
          Don't just take our word for it. Read honest feedback from our valued customers across Pakistan.
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-8 sm:p-10 flex flex-col justify-between hover:border-[#dc2626] transition-colors relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200" />
              
              <div className="mb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic z-10 relative">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto border-t border-slate-200 pt-6">
                <div className="w-10 h-10 bg-[#dc2626] text-white flex items-center justify-center font-bold text-sm uppercase">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{review.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
