import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VehiclePartFinder from "@/components/VehiclePartFinder";
import AboutSection from "@/components/AboutSection";
import TrendingItems from "@/components/TrendingItems";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VehiclePartFinder />
        <AboutSection />
        <TrendingItems />
        <FeaturedProducts />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
