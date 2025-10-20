import Header from "@/components/Header";
import Footer from "@/components/Footer";
import garageImage from "@/assets/garage-workshop.jpg";
import { MapPin, Clock, Phone } from "lucide-react";

const Location = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="page-hero">
          <h1>Location</h1>
          <p>Find our showroom and service center.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-automotive overflow-hidden">
            <img src={garageImage} alt="Aero garage" className="w-full h-80 object-cover" />
          </div>
          <div className="card-automotive p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Visit Us</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 123 Racing Street, Performance City, PC 12345</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> (555) 123-AERO</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Mon–Sat: 9:00–18:00, Sun: Closed</p>
            </div>
            <div className="mt-6">
              <iframe
                title="map"
                className="w-full h-64 rounded-md"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24183.3306!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Location;


