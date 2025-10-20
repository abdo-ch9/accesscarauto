import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Return Policy</h1>
        <p className="text-muted-foreground mt-2">Information on returns and exchanges.</p>

        <div className="card-automotive p-6 mt-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Eligibility</h2>
          <p className="text-muted-foreground">Returns accepted within 30 days in original packaging.</p>
          <h2 className="text-xl font-bold text-foreground">Process</h2>
          <ol className="list-decimal pl-5 text-muted-foreground space-y-1">
            <li>Request RMA number via Contact page</li>
            <li>Ship items with RMA included</li>
            <li>Refund processed within 5–7 business days</li>
          </ol>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;


