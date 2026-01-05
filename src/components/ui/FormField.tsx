import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

const labelVariants = cva(
  "text-xs font-semibold uppercase tracking-wide ml-0.5",
  {
    variants: {
      variant: {
        default: "text-slate-700 dark:text-[#d4d4d4]",
        error: "text-red-600 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface FormFieldProps extends VariantProps<typeof labelVariants> {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
  rightElement?: ReactNode;
  error?: string;
}

export const FormField = ({
  label,
  htmlFor,
  children,
  className,
  rightElement,
  error,
  variant,
}: FormFieldProps) => {
  return (
    <div className={twMerge("space-y-1.5", className)}>
      <div className="flex items-center justify-between ml-0.5">
        <label
          htmlFor={htmlFor}
          className={labelVariants({ variant: error ? "error" : variant })}
        >
          {label}
        </label>
        {rightElement}
      </div>
      {children}
    </div>
  );
};