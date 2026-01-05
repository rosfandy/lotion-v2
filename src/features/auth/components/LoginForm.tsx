"use client";

import { useState } from "react";
import { Form } from "@/components/ui/Form";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { MdKey, MdMail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../hook/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await login(formData);

    if (success) {
      onSuccess?.();
    } else {
      onError?.(error || "Login failed");
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const socialButtons = [
    {
      icon: <FaGoogle />,
      text: "Continue with Google",
      onClick: () => {
        // Handle Google login
        console.log("Google login clicked");
      },
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <Form
      title="Welcome back"
      subtitle="Sign in to your Lotion account"
      onSubmit={handleFormSubmit}
      submitText={isLoading ? "Signing in..." : "Log In"}
      isLoading={isLoading}
      socialButtons={socialButtons}
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/auth/signup"
    >
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <FormField
        label="Email"
        htmlFor="email"
        rightElement={
          <Link
            href="/auth/forgot-password"
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        }
      >
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
          placeholder="••••••••"
          type="password"
          icon={<MdKey />}
          value={formData.password}
          onChange={handleInputChange("password")}
          required
          disabled={isLoading}
        />
      </FormField>
    </Form>
  );
};