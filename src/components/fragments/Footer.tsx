import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { MdOutlineMailOutline } from "react-icons/md";

const footerVariants = cva(
  "border-t transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-slate-50 dark:bg-background-dark border-border-light dark:border-border-dark pt-16 pb-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const footerColumnVariants = cva(
  "font-semibold mb-4",
  {
    variants: {
      title: {
        true: "text-slate-900 dark:text-white",
        false: "text-slate-600 dark:text-[#888]",
      },
    },
    defaultVariants: {
      title: false,
    },
  }
);

const footerLinkVariants = cva(
  "text-sm transition-colors hover:text-primary",
  {
    variants: {
      color: {
        default: "text-slate-600 dark:text-[#888]",
        muted: "text-slate-400",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

interface FooterProps extends VariantProps<typeof footerVariants> {
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export const Footer = ({ variant, className }: FooterProps) => {
  return (
    <footer className={twMerge(footerVariants({ variant, className }))}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg font-bold shadow-md">
                <img src="/logo.svg" alt="Lotion Logo" className="h-5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Lotion
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-[#666] max-w-xs">
              The all-in-one workspace for your notes, tasks, wikis, and
              databases.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-[#666]">
            © 2026 Lotion Labs, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              className={footerLinkVariants({ color: "muted" })}
              href="#"
            >
              <HiOutlineGlobeAlt size={20} />
            </a>
            <a
              className={footerLinkVariants({ color: "muted" })}
              href="#"
            >
              <MdOutlineMailOutline size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

