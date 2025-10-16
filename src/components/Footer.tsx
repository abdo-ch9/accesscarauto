import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, RotateCcw, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Successfully subscribed!",
      description: "You'll receive the latest updates and offers",
    });
    setEmail("");
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Features Section */}
      <div className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on orders over $500</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock customer service</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-3xl font-bold text-foreground uppercase tracking-wider">
                Sign Up for Latest News
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Get the latest updates on new arrivals, exclusive deals, and automotive insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSignup()}
                className="flex-1 bg-input border-input-border"
              />
              <Button onClick={handleNewsletterSignup} className="btn-racing">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="border-border" />

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold text-gradient-red mb-4">AERO</div>
              <p className="text-muted-foreground mb-4">
                Premium automotive parts and accessories since 1892. 
                Your trusted partner for high-performance upgrades.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>123 Racing Street</p>
                <p>Performance City, PC 12345</p>
                <p>Phone: (555) 123-AERO</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shop All</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Performance Parts</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accessories</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider">My Account</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Login</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Register</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Wishlist</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Order History</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Track Order</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Return Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator className="border-border" />

      {/* Bottom Footer */}
      <div className="py-6 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Aero Car Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;