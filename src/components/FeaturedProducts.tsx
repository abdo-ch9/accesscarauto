import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cartEvents } from "@/lib/utils";
import brakeDiscImage from "@/assets/brake-disc-set.jpg";
import brakeCaliperImage from "@/assets/brake-caliper-red.jpg";

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const addToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
    });
    cartEvents.emit({ type: "cart:add", delta: 1 });
  };

  const toggleWishlist = (productId: number, productName: string) => {
    const isInWishlist = wishlist.includes(productId);
    if (isInWishlist) {
      const next = wishlist.filter(id => id !== productId);
      setWishlist(next);
      toast({
        title: "Removed from wishlist",
        description: `${productName} removed from your wishlist`,
      });
      cartEvents.emit({ type: "wishlist:set", count: next.length });
    } else {
      const next = [...wishlist, productId];
      setWishlist(next);
      toast({
        title: "Added to wishlist",
        description: `${productName} added to your wishlist`,
      });
      cartEvents.emit({ type: "wishlist:set", count: next.length });
    }
  };
  const featuredProducts = [
    {
      id: 1,
      name: "High-Performance Brake Disc Set",
      description: "Premium carbon-ceramic brake rotors designed for extreme performance. Heat-resistant and lightweight construction for superior stopping power.",
      price: "$1,299",
      originalPrice: "$1,599",
      image: brakeDiscImage,
      features: ["Carbon-Ceramic Construction", "Heat Resistant", "20% Weight Reduction", "Track Tested"]
    },
    {
      id: 2,
      name: "Racing Brake Caliper Set",
      description: "Professional-grade 6-piston brake calipers with drilled rotors. Engineered for racing applications with maximum heat dissipation.",
      price: "$2,499",
      originalPrice: "$2,899",
      image: brakeCaliperImage,
      features: ["6-Piston Design", "Drilled Rotors", "Racing Grade", "Red Anodized Finish"]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 uppercase tracking-wider">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg">
            Premium performance parts for serious enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`card-automotive overflow-hidden animate-slide-in-${index === 0 ? 'left' : 'right'}`}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                >
                  <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-primary text-primary' : ''}`} />
                </Button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wider">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-2 gap-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <span className="text-lg text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  
                  <Button 
                    className="btn-racing group"
                    onClick={() => addToCart(product.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-engine-rev" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;