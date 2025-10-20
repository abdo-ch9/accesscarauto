import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cartEvents } from "@/lib/utils";
import { products as catalog } from "@/lib/products";
import { Link } from "react-router-dom";

const TrendingItems = () => {
  const addToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
    });
    cartEvents.emit({ type: "cart:add", delta: 1 });
  };
  const products = catalog.map(p => ({
    id: p.id,
    name: p.name,
    price: `$${p.price.toLocaleString()}`,
    image: p.image,
    badge: p.badge || "",
    rating: 4.8,
    reviews: 24,
  }));

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
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
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
                    onClick={(e) => { e.preventDefault(); addToCart(product.name); }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </Link>
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