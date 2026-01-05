import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

const featureCardVariants = cva(
  "p-8 rounded-xl border transition-all duration-300 group",
  {
    variants: {
      variant: {
        default:
          "bg-slate-50 dark:bg-[#252525] border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const featureIconVariants = cva(
  "rounded-lg flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300 border",
  {
    variants: {
      size: {
        default: "size-12",
      },
      icon: {
        default:
          "bg-white dark:bg-[#333] border-slate-100 dark:border-transparent",
      },
    },
    defaultVariants: {
      size: "default",
      icon: "default",
    },
  }
);

const featureTitleVariants = cva(
  "font-bold mb-3",
  {
    variants: {
      size: {
        default: "text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const featureDescriptionVariants = cva(
  "leading-relaxed",
  {
    variants: {
      color: {
        default: "text-slate-600 dark:text-[#999]",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

interface FeatureCardProps extends VariantProps<typeof featureCardVariants> {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  variant,
  className,
}: FeatureCardProps) => {
  return (
    <div className={twMerge(featureCardVariants({ variant, className }))}>
      <div className={featureIconVariants()}>
        <div className="text-primary text-3xl">
          {icon}
        </div>
      </div>
      <h3 className={twMerge(featureTitleVariants(), "text-slate-900 dark:text-white")}>
        {title}
      </h3>
      <p className={featureDescriptionVariants()}>
        {description}
      </p>
    </div>
  );
};

