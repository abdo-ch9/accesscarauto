import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
        <div className="card-automotive p-8 mt-6 text-center">
          <p className="text-muted-foreground">Your cart is currently empty.</p>
          <Button asChild className="mt-4 btn-racing"><Link to="/shop">Browse products</Link></Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;


