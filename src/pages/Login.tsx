import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/AuthForm";
import FormInput from "@/components/FormInput";
import { useFormValidation, commonValidationRules } from "@/hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";
  
  const { errors, validateForm, validateField } = useFormValidation({
    email: commonValidationRules.email,
    password: commonValidationRules.password
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm({ email, password })) return;
    
    setIsSubmitting(true);
    const safetyTimeout = setTimeout(() => setIsSubmitting(false), 15000);
    
    try {
      const success = await login(email, password, rememberMe);
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
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
      const success = await login("demo@aero.com", "demo123", true);
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      clearTimeout(safetyTimeout);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Sign in"
      description="Enter your email and password to sign in to your account"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Sign up"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            validateField('email', value);
          }}
          error={errors.email}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />
        
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            validateField('password', value);
          }}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-destructive hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        
        <Button
          type="submit"
          className="w-full btn-racing"
          disabled={isSubmitting}
        >
          {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
        </Button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>
      </div>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={handleDemoLogin}
        disabled={isSubmitting}
      >
        {isSubmitting ? "SIGNING IN..." : "DEMO LOGIN"}
      </Button>
    </AuthForm>
  );
};

export default Login;
