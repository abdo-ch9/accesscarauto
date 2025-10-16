import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(2);
  const [wishlistItems, setWishlistItems] = useState(0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Notification Bar */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="animate-text-slide whitespace-nowrap">
          <span className="text-sm font-bold uppercase tracking-wider">
            NEW ARRIVALS! GET 10% OFF. USE CODE 'GEAR10'. SHOP NOW ➤
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gradient-red">AERO</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Shop</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">About</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Services</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Location</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Pages</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Contact</a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-48 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground"
                />
                <Button variant="ghost" size="icon" onClick={handleSearch} className="hover:bg-surface">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-surface">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-surface relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-surface relative">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-surface">
                <User className="h-5 w-5" />
              </Button>
              
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;