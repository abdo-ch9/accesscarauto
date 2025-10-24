import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import VehiclePartFinder from "@/components/VehiclePartFinder";
import AboutSection from "@/components/AboutSection";
import TrendingItems from "@/components/TrendingItems";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialSection from "@/components/TestimonialSection";

const Index = () => {
  return (
    <PageLayout>
      <main>
        <HeroSection />
        <VehiclePartFinder />
        <AboutSection />
        <TrendingItems />
        <FeaturedProducts />
        <TestimonialSection />
      </main>
    </PageLayout>
  );
};

export default Index;
