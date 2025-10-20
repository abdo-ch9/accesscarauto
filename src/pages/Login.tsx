import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <p className="text-sm text-muted-foreground"><Link to="/" className="hover:underline">← Back to Home</Link></p>
        <h1 className="text-center text-4xl font-bold text-gradient-red mt-2">AERO</h1>
        <p className="text-center text-muted-foreground">Sign in to your account</p>

        <div className="card-automotive p-6 mt-6">
          <h2 className="text-2xl font-bold text-foreground text-center">Welcome back</h2>
          <p className="text-center text-muted-foreground mb-6">Enter your credentials to access your account</p>

          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@aero.com" className="bg-input border-input-border mt-1" />
            </div>
            <div>
              <Label className="text-muted-foreground">Password</Label>
              <div className="relative mt-1">
                <Input value={pw} onChange={(e) => setPw(e.target.value)} type={show ? "text" : "password"} placeholder="••••••" className="bg-input border-input-border pr-9" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
              </div>
              <Link to="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>

            <Button className="w-full btn-racing">Sign In</Button>

            <div className="relative my-4 text-center text-xs text-muted-foreground">
              <span className="px-2 bg-background">OR CONTINUE WITH</span>
              <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
            </div>

            <Button variant="outline" className="w-full">Demo Account</Button>
          </div>
        </div>

        <div className="card-automotive p-4 mt-6 text-center text-sm">
          <p className="font-semibold">Demo Credentials</p>
          <p className="text-muted-foreground">Email: demo@aero.com</p>
          <p className="text-muted-foreground">Password: demo123</p>
        </div>

        <div className="text-center mt-4 text-sm text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;


