import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CalloutBanner from "@/components/home/CalloutBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Navbar (Provided in root layout, accessible or standalone) */}
      
      {/* 2. Hero Section (CTA "Explore Events" -> /items) */}
      <HeroSection />

      {/* 3. Features Section (4 equal-height cards) */}
      <FeaturesSection />

      {/* 4. Categories Section (6 cards linking to /items?category=<name>) */}
      <CategoriesSection />

      {/* 5. Testimonials Section (3 equal-height cards) */}
      <TestimonialsSection />

      {/* 6. Callout Banner (CTA -> /items/add) */}
      <CalloutBanner />

      {/* 7. Footer (Rendered in layout shell, anchors to #contact) */}
    </div>
  );
}
