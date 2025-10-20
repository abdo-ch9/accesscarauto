import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        {/* Fallback background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-automotive" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-wider">
          <span className="block text-white">Awesome New</span>
          <span className="block text-gradient-red">Car</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Car Accessories, Parts & Performance Gear
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild className="btn-racing glow-red">
            <Link to="/shop">Shop Now</Link>
          </Button>
          <Button asChild className="btn-outline-racing">
            <Link to="/shop">View Catalog</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;