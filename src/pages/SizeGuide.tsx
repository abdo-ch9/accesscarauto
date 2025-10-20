import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground">Size Guide</h1>
        <p className="text-muted-foreground mt-2">Find the right fit for your vehicle.</p>

        <div className="card-automotive p-6 mt-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Measuring Tips</h2>
          <ul className="list-disc pl-5 text-muted-foreground">
            <li>Use calipers for brake rotor diameter and thickness</li>
            <li>Check wheel bolt pattern and offset before ordering</li>
            <li>Consult the vehicle manual for OEM specs</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;


