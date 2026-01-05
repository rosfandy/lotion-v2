import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import React from "react";

const buttonVariants = cva(
  "px-8 py-3 text-base font-semibold rounded-lg transition-all inline-block text-center cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-primary hover:bg-blue-600 shadow-lg shadow-primary/20 hover:scale-105",
        secondary:
          "text-slate-700 dark:text-white bg-white dark:bg-sidebar-dark border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-[#2a2a2a]",
        ghost: "text-slate-600 dark:text-[#888] hover:text-primary dark:hover:text-primary",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-8 py-3 text-base",
        lg: "px-8 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={twMerge(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Button.displayName = "Button";
