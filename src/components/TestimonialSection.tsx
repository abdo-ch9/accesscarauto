import { Star, Quote } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-automotive p-8 relative">
            {/* Quote Icon */}
            <Quote className="h-16 w-16 text-primary absolute top-4 left-4 opacity-20" />
            
            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-accent-gold fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed italic">
                "Aero Car Store transformed my BMW M3 into an absolute beast. The quality of their 
                performance parts is unmatched, and their expertise helped me achieve the perfect 
                balance of power and reliability. Five stars all the way!"
              </blockquote>
              
              {/* Customer Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">MR</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground text-lg">Marcus Rodriguez</div>
                  <div className="text-muted-foreground">BMW M3 Owner</div>
                  <div className="text-sm text-muted-foreground">Verified Customer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2,547</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;