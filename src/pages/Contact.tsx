import PageLayout from "@/components/PageLayout";
import FormInput from "@/components/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast, useFormValidation, commonValidationRules } from "@/hooks";

const Contact = () => {
  return (
    <PageLayout>
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="page-hero">
          <h1>Contact</h1>
          <p>We'd love to hear from you.</p>
        </div>

        <ContactForm />
      </main>
    </PageLayout>
  );
};

export default Contact;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { errors, validateForm, validateField } = useFormValidation({
    name: commonValidationRules.name,
    email: commonValidationRules.email,
    message: commonValidationRules.message
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const submit = () => {
    if (!validateForm(formData)) return;
    
    toast({ title: "Message sent", description: "We'll get back to you soon." });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="card-automotive p-6 mt-8 space-y-4">
      <FormInput
        id="name"
        label="Name"
        value={formData.name}
        onChange={(value) => handleInputChange("name", value)}
        error={errors.name}
        placeholder="Your name"
        required
      />
      
      <FormInput
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => handleInputChange("email", value)}
        error={errors.email}
        placeholder="you@example.com"
        required
      />
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Message <span className="text-destructive">*</span>
        </label>
        <Textarea 
          value={formData.message} 
          onChange={(e) => handleInputChange("message", e.target.value)} 
          placeholder="How can we help?" 
          className={`bg-input border-input-border min-h-[140px] ${errors.message ? 'border-destructive' : ''}`}
          required
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message}</p>
        )}
      </div>
      
      <Button onClick={submit} className="btn-racing">Send</Button>
    </div>
  );
};


