import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/AuthForm";
import FormInput from "@/components/FormInput";
import { useFormValidation, commonValidationRules } from "@/hooks";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  
  const { errors, validateForm, validateField } = useFormValidation({
    firstName: commonValidationRules.firstName,
    lastName: commonValidationRules.lastName,
    email: commonValidationRules.email,
    password: commonValidationRules.password,
    confirmPassword: {
      required: true,
      custom: (value) => value !== formData.password ? "Passwords do not match" : null
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    setIsSubmitting(true);
    const safetyTimeout = setTimeout(() => {
      // Ensure we never get stuck in submitting state due to any hanging network
      setIsSubmitting(false);
    }, 15000);
    try {
      const success = await register(formData);
      if (success) {
        navigate("/", { replace: true });
      }
    } finally {
      clearTimeout(safetyTimeout);
      setIsSubmitting(false);
    }
  };

  const passwordRequirements = [
    { text: "At least 6 characters", met: formData.password.length >= 6 },
    { text: "Passwords match", met: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0 },
  ];

  return (
    <AuthForm
      title="Join Aero Car Store"
      description="Create your account to access premium automotive parts"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={(value) => handleInputChange("firstName", value)}
            error={errors.firstName}
            placeholder="John"
            autoComplete="given-name"
            required
          />
          
          <FormInput
            id="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={(value) => handleInputChange("lastName", value)}
            error={errors.lastName}
            placeholder="Doe"
            autoComplete="family-name"
            required
          />
        </div>

        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          error={errors.email}
          placeholder="john@example.com"
          autoComplete="email"
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          error={errors.password}
          placeholder="Create a password"
          autoComplete="new-password"
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange("confirmPassword", value)}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          autoComplete="new-password"
          showPasswordToggle
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          required
        />

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Password Requirements:</p>
          <div className="space-y-1">
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className={`h-4 w-4 ${req.met ? "text-success" : "text-muted-foreground"}`} />
                <span className={`text-sm ${req.met ? "text-success" : "text-muted-foreground"}`}>{req.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input id="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-input-border rounded" required />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the <Link to="/terms" className="text-primary hover:text-primary-hover">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:text-primary-hover">Privacy Policy</Link>
          </label>
        </div>

        <Button type="submit" className="w-full btn-racing" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthForm>
  );
};

export default Register;
