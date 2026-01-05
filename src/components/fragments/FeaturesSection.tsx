import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { FeatureCard } from "./FeatureCard";
import { MdEditNote } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdContrast } from "react-icons/md";

const featuresVariants = cva(
  "py-24 border-t transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-sidebar-dark border-border-light dark:border-border-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const featuresSectionTitleVariants = cva(
  "font-bold text-slate-900 dark:text-white tracking-tight",
  {
    variants: {
      size: {
        default: "text-3xl md:text-4xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const featuresDescriptionVariants = cva(
  "mt-4 text-lg text-slate-600 dark:text-[#888]",
  {
    variants: {
      size: {
        default: "",
      },
    },
  }
);

interface FeaturesSection {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps extends VariantProps<typeof featuresVariants> {
  className?: string;
}

const FEATURES: FeaturesSection[] = [
  {
    icon: <MdEditNote />,
    title: "Intuitive Editing",
    description:
      "A distraction-free editor that supports Markdown, slash commands, and rich media embedding effortlessly.",
  },
  {
    icon: <HiOutlineUserGroup />,
    title: "Seamless Collaboration",
    description:
      "Work together with your team in real-time. Comments, mentions, and shared workspaces keep everyone aligned.",
  },
  {
    icon: <MdContrast />,
    title: "Dynamic Themes",
    description:
      "Designed for focus, day or night. Switch between light and dark modes instantly to match your environment.",
  },
];

export const FeaturesSection = ({ variant, className }: FeaturesSectionProps) => {
  return (
    <section className={twMerge(featuresVariants({ variant, className }))}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={featuresSectionTitleVariants()}>
            Everything you need to build your knowledge base
          </h2>
          <p className={featuresDescriptionVariants()}>
            Powerful features wrapped in a simple interface that gets out of your way.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

