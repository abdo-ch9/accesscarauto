import { useState } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    if (rule.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be no more than ${rule.maxLength} characters`;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      return `Invalid ${name}`;
    }

    if (value && rule.custom) {
      return rule.custom(value);
    }

    return null;
  };

  const validateForm = (data: Record<string, string>): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(rules).forEach(field => {
      const error = validateField(field, data[field] || '');
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFieldAndSetError = (name: string, value: string) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
    return !error;
  };

  const clearErrors = () => setErrors({});

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validateForm,
    validateField: validateFieldAndSetError,
    clearErrors,
    clearFieldError
  };
};

// Common validation rules
export const commonValidationRules = {
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/
  },
  password: {
    required: true,
    minLength: 6
  },
  firstName: {
    required: true,
    minLength: 1
  },
  lastName: {
    required: true,
    minLength: 1
  },
  name: {
    required: true,
    minLength: 1
  },
  message: {
    required: true,
    minLength: 10
  }
};
