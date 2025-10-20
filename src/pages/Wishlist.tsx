import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="page-hero">
          <h1>Wishlist</h1>
          <p>Your saved items.</p>
        </div>

        <div className="card-automotive p-8 mt-2 text-center">
          <p className="text-muted-foreground">Your wishlist is empty.</p>
          <Button asChild className="mt-4 btn-racing">
            <Link to="/shop">Start shopping</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;


