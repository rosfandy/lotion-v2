"use client";

import { useState } from "react";
import { Form } from "@/components/ui/Form";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { MdKey, MdMail, MdPerson } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../hook/useAuth";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface SignupFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const SignupForm = ({ onSuccess, onError }: SignupFormProps) => {
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    const success = await register(formData);

    if (success) {
      onSuccess?.();
    } else {
      onError?.(error || "Registration failed");
    }
  };

  const handleInputChange = (field: keyof Omit<SignupFormData, 'terms'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear password error when user starts typing
    if (field === 'password' || field === 'confirmPassword') {
      setPasswordError("");
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      terms: event.target.checked
    }));
  };

  const socialButtons = [
    {
      icon: <FaGoogle />,
      text: "Continue with Google",
      onClick: () => {
        // Handle Google signup
        console.log("Google signup clicked");
      },
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <Form
      title="Create your account"
      subtitle="Start your journey with Lotion"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? "Creating account..." : "Create account"}
      isLoading={isLoading}
      socialButtons={socialButtons}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/auth/login"
    >
      {(error || passwordError) && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error || passwordError}</p>
        </div>
      )}

      <FormField label="Full name" htmlFor="name">
        <Input
          id="name"
          placeholder="Enter your full name"
          type="text"
          icon={<MdPerson />}
          value={formData.name}
          onChange={handleInputChange("name")}
          required
          disabled={isLoading}
        />
      </FormField>

      <FormField label="Email" htmlFor="email">
        <Input
          id="email"
          placeholder="Enter your email"
          type="email"
          icon={<MdMail />}
          value={formData.email}
          onChange={handleInputChange("email")}
          required
          disabled={isLoading}
        />
      </FormField>

      <FormField label="Password" htmlFor="password">
        <Input
          id="password"
          placeholder="Create a password"
          type="password"
          icon={<MdKey />}
          value={formData.password}
          onChange={handleInputChange("password")}
          required
          disabled={isLoading}
        />
      </FormField>

      <FormField label="Confirm password" htmlFor="confirmPassword">
        <Input
          id="confirmPassword"
          placeholder="Confirm your password"
          type="password"
          icon={<MdKey />}
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          required
          disabled={isLoading}
          error={passwordError}
        />
      </FormField>

      {/* Terms & Conditions */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          required
          checked={formData.terms}
          onChange={handleCheckboxChange}
          disabled={isLoading}
          className="h-4 w-4 text-primary focus:ring-primary border-border-light dark:border-border-dark rounded mt-0.5"
        />
        <label
          htmlFor="terms"
          className="text-xs text-slate-600 dark:text-[#888] leading-relaxed"
        >
          I agree to the{" "}
          <a
            href="/terms"
            className="text-primary hover:text-blue-600 transition-colors underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-primary hover:text-blue-600 transition-colors underline"
          >
            Privacy Policy
          </a>
        </label>
      </div>
    </Form>
  );
};