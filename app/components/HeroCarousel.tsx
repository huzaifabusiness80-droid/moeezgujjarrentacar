"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Award, MessageSquare, ArrowRight, Phone, Send } from "lucide-react";

interface BannerSlide {
  id: number;
  imageSrc: string;
  badge: string;
  title: string;
  highlightText: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  isWhatsAppSecondary?: boolean;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    imageSrc: "/fleet/mercedes-s-class.jpg",
    badge: "Premium Car Rental Service",
    title: "Travel in Style With Our",
    highlightText: "Luxury Fleet",
    description: "Experience the ultimate comfort and prestige with our premium selection of luxury cars, perfect for weddings and VIP events.",
    primaryButtonText: "View Luxury Cars",
    primaryButtonHref: "/services/luxury-cars",
    secondaryButtonText: "Book via WhatsApp",
    secondaryButtonHref: "https://wa.me/923200494141?text=Assalam-o-Alaikum%20Moeez%20Gujjar%20Rent%20A%20Car!%20I%20want%20to%20book%20a%20luxury%20car.",
    isWhatsAppSecondary: true,
  },
  {
    id: 2,
    imageSrc: "/fleet/land-cruiser-v8.jpg",
    badge: "Reliable SUV Rentals",
    title: "Explore Northern Areas In",
    highlightText: "Powerful 4x4s",
    description: "Rent robust and spacious SUVs like Land Cruiser V8 and Prado TX for your family trips and off-road adventures.",
    primaryButtonText: "View SUVs",
    primaryButtonHref: "/services/suv-rentals",
    secondaryButtonText: "Call Now",
    secondaryButtonHref: "tel:+923200494141",
    isWhatsAppSecondary: false,
  },
  {
    id: 3,
    imageSrc: "/fleet/honda-civic-rs.jpg",
    badge: "Affordable Daily Rentals",
    title: "Economy Cars For Your",
    highlightText: "Everyday Needs",
    description: "Need a car for inter-city travel or daily errands? We offer fuel-efficient and reliable economy sedans at the best rates.",
    primaryButtonText: "View Economy Cars",
    primaryButtonHref: "/services/economy-cars",
    secondaryButtonText: "Get an Instant Quote",
    secondaryButtonHref: "https://wa.me/923200494141?text=Assalam-o-Alaikum%20Moeez%20Gujjar%20Rent%20A%20Car!%20I%20want%20to%20inquire%20about%20daily%20rentals.",
    isWhatsAppSecondary: true,
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, []);

  // Automatic Carousel Interval (5.5s auto advance)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      className="relative w-full overflow-hidden select-none bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Viewport Container */}
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="w-full shrink-0 relative flex items-center min-h-[500px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[710px] xl:min-h-[680px]"
            >
              {/* Natural Bright Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.imageSrc}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover w-full h-full object-center opacity-100"
                  sizes="100vw"
                />
                {/* Light Soft Gradient only on Left for Crisp Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
              </div>

              {/* Crisp HTML/CSS Typography Overlay Content */}
              <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-24 lg:py-28 w-full">
                <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-3.5 py-1 text-xs sm:text-xs font-bold uppercase tracking-wider rounded-none">
                    <Award className="w-4 h-4" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
                    {slide.title}{" "}
                    <span className="text-[#dc2626] block sm:inline">
                      {slide.highlightText}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                    <Link
                      href={slide.primaryButtonHref}
                      className="px-6 py-3.5 bg-[#e61c24] hover:bg-[#cc141b] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
                    >
                      <span>{slide.primaryButtonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {slide.isWhatsAppSecondary ? (
                      <a
                        href={slide.secondaryButtonHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                        <span>{slide.secondaryButtonText}</span>
                      </a>
                    ) : (
                      <a
                        href={slide.secondaryButtonHref}
                        className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-none transition-colors flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-[#dc2626]" />
                        <span>{slide.secondaryButtonText}</span>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Controls - Left Arrow (Sharp Corporate Styling) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-slate-900/80 hover:bg-[#e61c24] text-white flex items-center justify-center transition-colors border border-slate-700 shadow-none outline-none focus:outline-none cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Manual Controls - Right Arrow (Sharp Corporate Styling) */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-none bg-slate-900/80 hover:bg-[#e61c24] text-white flex items-center justify-center transition-colors border border-slate-700 shadow-none outline-none focus:outline-none cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>

      {/* Bottom Bar: Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center max-w-7xl mx-auto pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-black/60 backdrop-blur-sm py-2 px-4 rounded-none border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-none transition-all duration-300 shadow-none border-none outline-none cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-[#e61c24]"
                  : "w-3 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
