import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const TrackOrder = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-md">
        <div className="page-hero">
          <h1>Track Order</h1>
          <p>Check the current status of your order.</p>
        </div>
        <TrackForm />
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;


const TrackForm = () => {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<null | { stage: string; eta: string }>(null);

  const track = () => {
    if (!id.trim()) return setStatus(null);
    // simple mocked status based on last digit
    const last = id.trim().slice(-1);
    if (parseInt(last) % 3 === 0) setStatus({ stage: "Shipped", eta: "2–4 days" });
    else if (parseInt(last) % 3 === 1) setStatus({ stage: "Processing", eta: "1–2 days" });
    else setStatus({ stage: "Delivered", eta: "—" });
  };

  return (
    <div className="card-automotive p-6 mt-6">
      <div className="space-y-4">
        <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="Order number (e.g. A1001)" className="bg-input border-input-border" />
        <Button className="w-full" onClick={track}>Track</Button>
      </div>
      {status && (
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">Current status</p>
          <div className="flex items-center gap-3 mt-2">
            <Badge>{status.stage}</Badge>
            <span className="text-sm text-muted-foreground">ETA: {status.eta}</span>
          </div>
        </div>
      )}
    </div>
  );
};

