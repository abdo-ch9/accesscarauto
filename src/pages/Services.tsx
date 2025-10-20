import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Gauge, Zap, ShieldCheck } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <h1>Services</h1>
          <p>Professional installation and performance tuning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[{icon: Wrench, title: "Installation", desc: "Expert install of brakes, exhausts, aero kits."},
            {icon: Gauge, title: "Dyno Tuning", desc: "ECU remaps and performance optimization."},
            {icon: Zap, title: "Electrical", desc: "Lighting, sensors, and diagnostics."},
            {icon: ShieldCheck, title: "Inspection", desc: "Track prep and safety checks."}].map((s, i) => (
            <div key={i} className="card-automotive p-6 text-center">
              <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground">{s.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="card-automotive p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{name: "Basic", price: 149, features: ["Brake install", "Oil change", "Inspection"]},
              {name: "Pro", price: 399, features: ["Exhaust install", "Dyno baseline", "Diagnostics"]},
              {name: "Track", price: 899, features: ["Turbo install", "Dyno tune", "Track prep"]}].map((p) => (
              <div key={p.name} className="product-card p-6">
                <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                <p className="text-3xl font-bold text-primary mt-2">${p.price}</p>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {p.features.map((f) => (<li key={f}>• {f}</li>))}
                </ul>
                <Button className="w-full mt-6">Book now</Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;


