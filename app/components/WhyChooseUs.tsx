import { ShieldCheck, MapPin, Headphones, Clock } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#dc2626]" strokeWidth={1.5} />,
      title: "Reliable & Insured",
      description: "All our vehicles are fully insured, regularly serviced, and driven by experienced professionals.",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#e61c24]" strokeWidth={1.5} />,
      title: "24/7 Availability",
      description: "Our dedicated support and booking team is available around the clock for emergency rentals and roadside assistance.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#dc2626]" strokeWidth={1.5} />,
      title: "Anywhere in Pakistan",
      description: "From the deserts of Cholistan to the peaks of Khunjerab, our vehicles are ready for any destination.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#e61c24]" strokeWidth={1.5} />,
      title: "Premium Support",
      description: "Dedicated account managers for corporate clients and VIPs ensuring seamless transport solutions.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Why Rent From Us?
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
          We deliver more than just a car. We deliver comfort, safety, and an exceptional travel experience across Pakistan.
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, idx) => (
            <div key={idx} className="relative group text-center px-4">
              <div className="w-20 h-20 mx-auto bg-slate-50 border border-slate-200 rounded-none flex items-center justify-center mb-6 group-hover:bg-[#991b1b] group-hover:border-[#991b1b] transition-colors duration-500">
                <div className="group-hover:scale-110 group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
