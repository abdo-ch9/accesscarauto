import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/services/supabaseClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    const safety = setTimeout(() => setIsSubmitting(false), 15000);
    try {
      const redirectTo = (import.meta.env.VITE_SITE_URL as string) || undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo,
      });
      if (error) throw error;
      toast({
        title: "Check your email",
        description: "If that email exists, we sent a password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error?.message || "Unable to send reset email",
        variant: "destructive",
      });
    } finally {
      clearTimeout(safety);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>
        <div className="text-center mt-2">
          <div className="text-4xl font-bold text-gradient-red mb-2">AERO</div>
          <p className="text-muted-foreground">Reset your password</p>
        </div>

        <Card className="card-automotive mt-6">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Forgot password</CardTitle>
            <CardDescription className="text-center">Enter your account email and we'll send a reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-input border-input-border" required />
              </div>
              <Button disabled={isSubmitting || !email} className="w-full btn-racing" type="submit">
                {isSubmitting ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;




