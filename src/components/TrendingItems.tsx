import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import carbonFiberSpoiler from "@/assets/carbon-fiber-spoiler.jpg";
import performanceExhaust from "@/assets/performance-exhaust.jpg";
import racingSeats from "@/assets/racing-seats.jpg";
import turboKit from "@/assets/turbo-kit.jpg";

const TrendingItems = () => {
  const addToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
    });
  };
  const products = [
    {
      id: 1,
      name: "Carbon Fiber Spoiler",
      price: "$899",
      image: carbonFiberSpoiler,
      badge: "NEW ARRIVAL",
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      name: "Performance Exhaust System",
      price: "$1,299",
      image: performanceExhaust,
      badge: "BEST SELLER",
      rating: 4.9,
      reviews: 156
    },
    {
      id: 3,
      name: "Racing Seats Set",
      price: "$2,499",
      image: racingSeats,
      badge: "HOT DEALS",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      name: "Turbo Upgrade Kit",
      price: "$3,999",
      image: turboKit,
      badge: "NEW ARRIVAL",
      rating: 5.0,
      reviews: 12
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "NEW ARRIVAL":
        return "bg-accent-gold text-black";
      case "BEST SELLER":
        return "bg-primary text-primary-foreground";
      case "HOT DEALS":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-wider">
            New Trending 2024
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover the latest high-performance parts and accessories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`product-card group animate-fade-in-up-delay-${index * 100}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge 
                  className={`absolute top-3 left-3 ${getBadgeVariant(product.badge)} font-bold text-xs`}
                >
                  {product.badge}
                </Badge>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-accent-gold fill-current' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <Button 
                    size="sm" 
                    className="btn-racing"
                    onClick={() => addToCart(product.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-outline-racing">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingItems;