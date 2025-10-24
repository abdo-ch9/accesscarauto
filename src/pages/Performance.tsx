import PageLayout from "@/components/PageLayout";
import { products } from "@/lib/products";
import { toast } from "@/hooks/use-toast";
import { cartEvents } from "@/lib/utils";
import { useMemo, useCallback } from "react";
import ProductCard from "@/components/ProductCard";

const Performance = () => {
  const items = useMemo(() => products.filter(p => p.category === "Performance"), []);

  const add = useCallback((n: string) => {
    toast({ title: "Added to cart", description: `${n} added to your cart.` });
    cartEvents.emit({ type: "cart:add", delta: 1 });
  }, []);

  return (
    <PageLayout>
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <h1>Performance Parts</h1>
          <p>Turbo kits, exhausts, intakes and more.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={add} 
            />
          ))}
        </div>
      </main>
    </PageLayout>
  );
};

export default Performance;


