import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const validLen = pw.length >= 6;
  const match = pw && pw === pw2;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <p className="text-sm text-muted-foreground"><Link to="/" className="hover:underline">← Back to Home</Link></p>
        <h1 className="text-center text-4xl font-bold text-gradient-red mt-2">AERO</h1>
        <p className="text-center text-muted-foreground">Create your account</p>

        <div className="card-automotive p-6 mt-6">
          <h2 className="text-2xl font-bold text-foreground text-center">Join Aero Car Store</h2>
          <p className="text-center text-muted-foreground mb-6">Create your account to access premium automotive parts</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">First Name</Label>
              <Input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="John" className="bg-input border-input-border mt-1" />
            </div>
            <div>
              <Label className="text-muted-foreground">Last Name</Label>
              <Input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Doe" className="bg-input border-input-border mt-1" />
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-muted-foreground">Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@aero.com" className="bg-input border-input-border mt-1" />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Password</Label>
              <div className="relative mt-1">
                <Input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••" className="bg-input border-input-border pr-9" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Confirm Password</Label>
              <div className="relative mt-1">
                <Input type={showPw2 ? "text" : "password"} value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="••••••" className="bg-input border-input-border pr-9" />
                <button type="button" onClick={() => setShowPw2(!showPw2)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p className="font-semibold text-foreground">Password Requirements:</p>
            <div className="flex items-center gap-2">
              {validLen ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <XCircle className="h-4 w-4 text-destructive" />}
              <span className={validLen ? "text-emerald-500" : "text-destructive"}>At least 6 characters</span>
            </div>
            <div className="flex items-center gap-2">
              {match ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <XCircle className="h-4 w-4 text-destructive" />}
              <span className={match ? "text-emerald-500" : "text-destructive"}>Passwords match</span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <Checkbox id="terms" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
            <label htmlFor="terms" className="text-sm text-muted-foreground">I agree to the <Link to="/terms" className="text-primary underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary underline">Privacy Policy</Link></label>
          </div>

          <Button className="w-full mt-6 btn-racing" disabled={!first || !last || !email || !validLen || !match || !agree}>Create Account</Button>

          <div className="text-center mt-4 text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;


