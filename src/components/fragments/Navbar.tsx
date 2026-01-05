"use client"
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/Button";
import { HiOutlineBars3 } from "react-icons/hi2";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navbarVariants = cva(
  "sticky top-0 z-50 w-full border-b transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "border-border-light dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const navLinkVariants = cva(
  "text-sm font-medium transition-colors",
  {
    variants: {
      active: {
        true: "text-slate-900 dark:text-white",
        false: "text-slate-600 dark:text-[#888] hover:text-primary dark:hover:text-primary",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface NavbarProps extends VariantProps<typeof navbarVariants> {
  className?: string;
}

export const Navbar = ({ variant, className }: NavbarProps) => {
  const router = useRouter()
  return (
    <nav className={twMerge(navbarVariants({ variant, className }))}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="size-8 rounded-lg bg-white text-white dark:text-slate-900 flex items-center justify-center text-lg font-bold shadow-md">
              <img src="/logo.svg" alt="Lotion Logo" className="h-5" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Lotion
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="h-4 w-px bg-border-light dark:bg-border-dark"></div>
            <Link className={navLinkVariants({ active: true })} href="/auth/login">
              Log in
            </Link>
            <Button onClick={()=>router.push('/dashboard')} variant="primary" size="md">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-slate-500 dark:text-slate-400 cursor-pointer">
            <HiOutlineBars3 size={24} />
          </div>
        </div>
      </div>
    </nav>
  );
};

