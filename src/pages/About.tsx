import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-cars-sunset.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <section className="page-hero grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="uppercase tracking-wider">Our Story</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Since 1892, we've engineered and curated high-performance automotive parts for enthusiasts and professionals.
              Our mission is to deliver uncompromising quality, innovation, and service.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src={heroImage} alt="Aero performance vehicles" className="w-full h-72 object-cover" />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card-automotive p-6 text-center">
            <p className="text-4xl font-bold text-primary">+10k</p>
            <p className="text-muted-foreground mt-1">Products in catalog</p>
          </div>
          <div className="card-automotive p-6 text-center">
            <p className="text-4xl font-bold text-primary">133</p>
            <p className="text-muted-foreground mt-1">Years of expertise</p>
          </div>
          <div className="card-automotive p-6 text-center">
            <p className="text-4xl font-bold text-primary">4.9/5</p>
            <p className="text-muted-foreground mt-1">Customer satisfaction</p>
          </div>
        </section>

        <section className="card-automotive p-6">
          <h2 className="text-2xl font-bold text-foreground">What We Do</h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            We specialize in performance upgrades, precision braking systems, exhausts, aero kits, and tailored accessories.
            Our team provides expert guidance from selection to installation.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;


