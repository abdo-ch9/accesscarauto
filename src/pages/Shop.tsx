import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cartEvents } from "@/lib/utils";
import { products as catalog } from "@/lib/products";
import { Link } from "react-router-dom";

const Shop = () => {
  const products = useMemo(() => catalog, []);

  const priceBounds = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const p of products) {
      if (p.price < min) min = p.price;
      if (p.price > max) max = p.price;
    }
    // Fallback if catalog empty
    if (!isFinite(min) || !isFinite(max)) {
      min = 0;
      max = 0;
    }
    return { min, max };
  }, [products]);

  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([priceBounds.min, priceBounds.max]);
  const [onlyNew, setOnlyNew] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const availableBadges = useMemo(() => Array.from(new Set(products.map(p => p.badge).filter(Boolean))) as string[], [products]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesSearch = searchQuery.trim().length === 0 ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBadgeSelection = selectedBadges.length === 0 || (p.badge ? selectedBadges.includes(p.badge) : false);
    const matchesNew = !onlyNew || p.badge === "NEW";
    return matchesCategory && matchesPrice && matchesSearch && matchesBadgeSelection && matchesNew;
  });

  const addToCart = (name: string) => {
    toast({ title: "Added to cart", description: `${name} added to your cart.` });
    cartEvents.emit({ type: "cart:add", delta: 1 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <div className="flex items-center justify-between">
            <div>
              <h1>Shop</h1>
              <p>Browse all products.</p>
            </div>
            <Badge className="hidden md:inline-flex">{filteredProducts.length} items</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 card-automotive p-4 h-fit sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4" />
              <h2 className="font-bold">Filters</h2>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Search</p>
              <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Badges</p>
              {availableBadges.length === 0 ? (
                <p className="text-xs text-muted-foreground">No badges available</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {availableBadges.map((b) => {
                    const checked = selectedBadges.includes(b);
                    return (
                      <div key={b} className="flex items-center gap-2">
                        <Checkbox id={`badge-${b}`} checked={checked} onCheckedChange={(v) => {
                          const next = Boolean(v)
                            ? Array.from(new Set([...selectedBadges, b]))
                            : selectedBadges.filter(x => x !== b);
                          setSelectedBadges(next);
                        }} />
                        <label htmlFor={`badge-${b}`} className="text-sm text-foreground">{b}</label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
              <Slider value={priceRange} min={priceBounds.min} max={priceBounds.max} step={50} onValueChange={(v) => setPriceRange(v as [number, number])} />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="new" checked={onlyNew} onCheckedChange={(v) => setOnlyNew(Boolean(v))} />
              <label htmlFor="new" className="text-sm text-foreground">Only new arrivals</label>
            </div>

            <div className="mt-6">
              <Button variant="secondary" className="w-full" onClick={() => {
                setCategory("all");
                setPriceRange([priceBounds.min, priceBounds.max]);
                setOnlyNew(false);
                setSearchQuery("");
                setSelectedBadges([]);
              }}>
                Clear filters
              </Button>
            </div>
          </aside>

          <section className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="card-automotive p-8 text-center">
                <p className="text-muted-foreground">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="product-card group">
                    <div className="relative overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                      <Badge className="absolute top-3 left-3">{p.badge}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">${p.price}</span>
                        <Button size="sm" className="btn-racing" onClick={(e) => { e.preventDefault(); addToCart(p.name); }}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;


