import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-muted-foreground mt-2">The rules and guidelines for using our services.</p>

        <div className="prose-policy mt-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Use of Services</h2>
          <p className="text-muted-foreground">By accessing our site, you agree to comply with these terms.</p>
          <h2 className="text-xl font-bold text-foreground">Purchases</h2>
          <p className="text-muted-foreground">All orders are subject to availability and confirmation.</p>
          <h2 className="text-xl font-bold text-foreground">Liability</h2>
          <p className="text-muted-foreground">We are not liable for indirect or consequential losses.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;


