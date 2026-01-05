import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

const textareaVariants = cva(
  "block w-full rounded-lg border bg-gray-50 dark:bg-[#151515] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#555] py-2.5 sm:text-sm pl-3 pr-3 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 resize-none shadow-sm focus:shadow-md",
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

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  error?: string;
  helperText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <textarea
          ref={ref}
          className={twMerge(textareaVariants({ variant: error ? "error" : variant, className }))}
          {...props}
        />
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

TextArea.displayName = "TextArea";

export { TextArea };