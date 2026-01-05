import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { forwardRef, ReactNode } from "react";

const inputVariants = cva(
  "block w-full rounded-lg border bg-gray-50 dark:bg-[#151515] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#555] py-2.5 sm:text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 shadow-sm focus:shadow-md",
  {
    variants: {
      variant: {
        default: "border-gray-200 dark:border-[#333] focus:border-primary focus:bg-white dark:focus:bg-[#1a1a1a]",
        error: "border-red-300 dark:border-red-600 focus:border-red-500 focus:bg-white dark:focus:bg-[#1a1a1a]",
      },
      size: {
        default: "pl-10 pr-3",
        noIcon: "pl-3 pr-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const inputIconVariants = cva(
  "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-slate-400 dark:text-[#555] group-focus-within:text-primary transition-colors",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  icon?: ReactNode;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, icon, error, helperText, ...props }, ref) => {
    const hasIcon = !!icon;
    const effectiveSize = hasIcon ? size : "noIcon";

    return (
      <div className="space-y-1">
        <div className="relative group">
          {hasIcon && (
            <div className={inputIconVariants()}>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(inputVariants({ variant: error ? "error" : variant, size: effectiveSize, className }))}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <p className={twMerge(
            "text-xs ml-0.5",
            error ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-[#666]"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };