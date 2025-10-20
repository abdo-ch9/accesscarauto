import { Search, ShoppingCart, Heart, User, Menu, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { cartEvents } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
=======
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
>>>>>>> cebc43e9628578d619083cf6f15d56a385f403e7

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
<<<<<<< HEAD
  useEffect(() => {
    const off = cartEvents.on((e) => {
      if (e.type === "cart:add" || e.type === "cart:remove") {
        setCartItems((c) => Math.max(0, c + e.delta));
      } else if (e.type === "wishlist:set") {
        setWishlistItems(e.count);
      }
    });
    return off;
  }, []);
=======
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
>>>>>>> cebc43e9628578d619083cf6f15d56a385f403e7

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <>
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
              <Link to="/" className="text-2xl font-bold text-gradient-red">AERO</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</Link>
<<<<<<< HEAD
              <Link to="/shop" className="text-foreground hover:text-primary transition-colors font-medium">Shop</Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">Services</Link>
              <Link to="/location" className="text-foreground hover:text-primary transition-colors font-medium">Location</Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</Link>
=======
              <a href="#shop" className="text-foreground hover:text-primary transition-colors font-medium">Shop</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">About</a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">Services</a>
              <a href="#location" className="text-foreground hover:text-primary transition-colors font-medium">Location</a>
              <a href="#pages" className="text-foreground hover:text-primary transition-colors font-medium">Pages</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</a>
>>>>>>> cebc43e9628578d619083cf6f15d56a385f403e7
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center bg-surface border rounded-full px-2 py-1 shadow-sm">
                <Input
                  type="text"
                  placeholder="Search parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-56 bg-transparent border-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                />
                <Button variant="ghost" size="icon" onClick={handleSearch} className="hover:bg-secondary rounded-full">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-surface" onClick={handleSearch}>
                <Search className="h-5 w-5" />
              </Button>
<<<<<<< HEAD
              <div className="hidden md:flex items-center bg-surface border rounded-full px-1.5 py-1 shadow-sm">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                        <Link to="/cart" className="relative">
                          <ShoppingCart className="h-5 w-5" />
                          {cartItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                              {cartItems}
                            </span>
                          )}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Cart</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                        <Link to="/wishlist" className="relative">
                          <Heart className="h-5 w-5" />
                          {wishlistItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                              {wishlistItems}
                            </span>
                          )}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Wishlist</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                        <Link to="/login">
                          <User className="h-5 w-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Account</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
=======
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
              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-surface">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="btn-racing" size="sm">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
>>>>>>> cebc43e9628578d619083cf6f15d56a385f403e7
              
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    {/* Spacer to offset fixed header height */}
    <div aria-hidden className="h-[104px]" />
    </>
  );
};

export default Header;