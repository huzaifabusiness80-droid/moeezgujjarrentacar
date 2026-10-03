import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import CarMarquee from "./components/CarMarquee";
import FeaturedPackages from "./components/FeaturedPackages";
import WhyChooseUs from "./components/WhyChooseUs";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import InquiryFormSection from "./components/InquiryFormSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white antialiased font-sans">
      <Header />

      <main className="flex-1 w-full">
        {/* 1. Hero Banner Auto Carousel Slider */}
        <HeroCarousel />

        {/* 2. Animated Car Marquee */}
        <CarMarquee />

        {/* 3. Featured Rental Packages */}
        <FeaturedPackages />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. Core Car Rental Categories */}
        <ServicesSection />

        {/* 6. About Moeez Gujjar Rent A Car */}
        <AboutSection />

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. FAQs */}
        <FAQSection />

        {/* 9. Quick Booking & Inquiry Form */}
        <InquiryFormSection />
      </main>

      <Footer />
    </div>
  );
}
