import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cartEvents } from "@/lib/utils";

const Performance = () => {
  const items = products.filter(p => p.category === "Performance");

  const add = (n: string) => {
    toast({ title: "Added to cart", description: `${n} added to your cart.` });
    cartEvents.emit({ type: "cart:add", delta: 1 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <h1>Performance Parts</h1>
          <p>Turbo kits, exhausts, intakes and more.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="product-card group">
              <div className="relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                <Badge className="absolute top-3 left-3">{p.badge}</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${p.price}</span>
                  <Button size="sm" className="btn-racing" onClick={(e) => { e.preventDefault(); add(p.name); }}>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Performance;


