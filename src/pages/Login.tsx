import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    const safetyTimeout = setTimeout(() => setIsSubmitting(false), 15000);
    
    try {
      const success = await login(email, password);
      if (success) navigate(from, { replace: true });
    } finally {
      clearTimeout(safetyTimeout);
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@aero.com");
    setPassword("demo123");
    setIsSubmitting(true);
    const safetyTimeout = setTimeout(() => setIsSubmitting(false), 15000);
    
    try {
      const success = await login("demo@aero.com", "demo123");
      if (success) navigate(from, { replace: true });
    } finally {
      clearTimeout(safetyTimeout);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <div className="text-center mt-2">
          <div className="text-4xl font-bold text-gradient-red mb-2">AERO</div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card className="card-automotive mt-6">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-input border-input-border" autoComplete="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-input border-input-border pr-10" autoComplete="current-password" required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input id="remember" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-input-border rounded" />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-hover transition-colors">Forgot password?</Link>
              </div>

              <Button type="submit" className="w-full btn-racing" disabled={isSubmitting || !email || !password}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full btn-outline-racing" onClick={handleDemoLogin} disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Demo Account"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:text-primary-hover font-medium transition-colors">Sign up</Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
