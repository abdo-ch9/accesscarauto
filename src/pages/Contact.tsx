import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="page-hero">
          <h1>Contact</h1>
          <p>We'd love to hear from you.</p>
        </div>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!name || !email || !message) {
      toast({ title: "Missing fields", variant: "destructive", description: "Please fill out all fields." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "Invalid email", variant: "destructive", description: "Enter a valid email address." });
      return;
    }
    toast({ title: "Message sent", description: "We'll get back to you soon." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="card-automotive p-6 mt-8 space-y-4">
      <div>
        <label className="text-sm text-muted-foreground">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="bg-input border-input-border" />
      </div>
      <div>
        <label className="text-sm text-muted-foreground">Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" className="bg-input border-input-border" />
      </div>
      <div>
        <label className="text-sm text-muted-foreground">Message</label>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" className="bg-input border-input-border min-h-[140px]" />
      </div>
      <Button onClick={submit} className="btn-racing">Send</Button>
    </div>
  );
};


