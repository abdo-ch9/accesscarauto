import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";
import { getProductById } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cartEvents } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = id ? getProductById(id) : undefined;

  const add = () => {
    if (!product) return;
    toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
    cartEvents.emit({ type: "cart:add", delta: 1 });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="card-automotive p-8 text-center">
            <p className="text-muted-foreground">Product not found.</p>
            <Button asChild className="mt-4">
              <Link to="/shop"><ArrowLeft className="h-4 w-4 mr-2"/>Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-automotive overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-[420px] object-cover" />
          </div>
          <div className="card-automotive p-6">
            <div className="flex items-center justify-between">
              <Badge>{product.badge}</Badge>
              <span className="text-3xl font-bold text-primary">${product.price}</span>
            </div>
            <p className="text-muted-foreground mt-4">{product.description}</p>
            <Button className="w-full mt-6 btn-racing" onClick={add}>
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
            <Button asChild variant="outline" className="w-full mt-3">
              <Link to="/shop"><ArrowLeft className="h-4 w-4 mr-2"/>Back to Shop</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;


