import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">How we handle your data.</p>

        <div className="prose-policy mt-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Information We Collect</h2>
          <p className="text-muted-foreground">Contact details, order history, and device information.</p>
          <h2 className="text-xl font-bold text-foreground">How We Use It</h2>
          <p className="text-muted-foreground">To process orders, provide support, and improve services.</p>
          <h2 className="text-xl font-bold text-foreground">Your Rights</h2>
          <p className="text-muted-foreground">Access, correction, deletion, and data portability.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;


