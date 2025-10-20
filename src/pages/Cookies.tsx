import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Cookie Policy</h1>
        <p className="text-muted-foreground mt-2">Information about cookies and tracking technologies.</p>

        <div className="prose-policy mt-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">What Are Cookies</h2>
          <p className="text-muted-foreground">Small text files used to store information on your device.</p>
          <h2 className="text-xl font-bold text-foreground">How We Use Cookies</h2>
          <p className="text-muted-foreground">For authentication, preferences, analytics, and performance.</p>
          <h2 className="text-xl font-bold text-foreground">Managing Cookies</h2>
          <p className="text-muted-foreground">You can control cookies through your browser settings.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;


