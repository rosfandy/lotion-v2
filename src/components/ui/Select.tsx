import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { forwardRef, ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const selectVariants = cva(
  "block w-full rounded-lg border bg-gray-50 dark:bg-[#151515] text-slate-900 dark:text-white py-2.5 sm:text-sm pl-3 pr-10 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 appearance-none shadow-sm focus:shadow-md",
  {
    variants: {
      variant: {
        default: "border-gray-200 dark:border-[#333] focus:border-primary focus:bg-white dark:focus:bg-[#1a1a1a]",
        error: "border-red-300 dark:border-red-600 focus:border-red-500 focus:bg-white dark:focus:bg-[#1a1a1a] focus:ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  error?: string;
  helperText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, error, helperText, children, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="relative">
          <select
            ref={ref}
            className={twMerge(selectVariants({ variant: error ? "error" : variant, className }))}
            {...props}
          >
            {children}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <MdKeyboardArrowDown className="text-slate-400 dark:text-[#555] h-4 w-4" />
          </div>
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

Select.displayName = "Select";

export { Select };