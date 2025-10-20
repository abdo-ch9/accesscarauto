import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Shipping Information</h1>
        <p className="text-muted-foreground mt-2">Details about delivery times and costs.</p>

        <div className="card-automotive p-6 mt-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Delivery Times</h2>
          <ul className="list-disc pl-5 text-muted-foreground">
            <li>Standard: 3–7 business days</li>
            <li>Express: 1–3 business days</li>
            <li>Freight (oversized): 5–10 business days</li>
          </ul>
          <h2 className="text-xl font-bold text-foreground mt-4">Costs</h2>
          <ul className="list-disc pl-5 text-muted-foreground">
            <li>Orders over $500: Free standard shipping</li>
            <li>Orders under $500: Calculated at checkout</li>
            <li>International: Calculated at checkout</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;


