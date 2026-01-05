import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ReactNode, FormEvent, useState } from "react";
import { Button } from "./Button";
import Link from "next/link";

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox';
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  rightElement?: ReactNode;
  validation?: (value: any) => string | null;
}

const authFormVariants = cva(
  "bg-white dark:bg-[#202020] rounded-xl border border-border-light dark:border-border-dark shadow-xl p-8",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const headerVariants = cva(
  "text-center mb-8",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const titleVariants = cva(
  "text-2xl font-bold text-slate-900 dark:text-white mb-2",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const subtitleVariants = cva(
  "text-slate-600 dark:text-[#888]",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dividerVariants = cva(
  "mt-8 mb-6",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const footerVariants = cva(
  "mt-8 text-center",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Overload for forms with fields array
interface FormWithFieldsProps extends VariantProps<typeof authFormVariants> {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: Record<string, any>) => void;
  submitText: string;
  isLoading?: boolean;
  socialButtons?: Array<{
    icon: ReactNode;
    text: string;
    onClick?: () => void;
  }>;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
  children?: ReactNode;
}

// Overload for forms with children (backward compatibility)
interface FormWithChildrenProps extends VariantProps<typeof authFormVariants> {
  title?: string;
  subtitle?: string;
  fields?: never;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  submitText: string;
  isLoading?: boolean;
  socialButtons?: Array<{
    icon: ReactNode;
    text: string;
    onClick?: () => void;
  }>;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
  children?: ReactNode;
}

type FormProps = FormWithFieldsProps | FormWithChildrenProps;

export const Form = (props: FormProps) => {
  const {
    title,
    subtitle,
    onSubmit,
    submitText,
    isLoading = false,
    socialButtons = [],
    footerText,
    footerLinkText,
    footerLinkHref,
    variant,
    className,
    children,
  } = props;

  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    return initialData;
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    // Clear error for this field when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    (onSubmit as (event: FormEvent<HTMLFormElement>) => void)?.(event);
  };


  return (
    <div className={twMerge(authFormVariants({ variant, className }))}>
      {/* Header */}
      <div className={headerVariants()}>
        <h1 className={titleVariants()}>
          {title}
        </h1>
        <p className={subtitleVariants()}>
          {subtitle}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {children}
        <Button
          variant="primary"
          size="md"
          className="w-full mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : submitText}
        </Button>
      </form>

      {/* Footer */}
      {(footerText || footerLinkText) && (
        <div className={footerVariants()}>
          <p className="text-sm text-slate-600 dark:text-[#888]">
            {footerText}{" "}
            {footerLinkHref && footerLinkText && (
              <Link
                href={footerLinkHref}
                className="text-primary hover:text-blue-600 transition-colors font-medium"
              >
                {footerLinkText}
              </Link>
            )}
          </p>
        </div>
      )}
    </div>
  );
};