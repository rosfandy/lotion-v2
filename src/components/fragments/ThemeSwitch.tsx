"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Debug component to show theme state (remove in production)
const ThemeDebug = () => {
  const { theme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 left-4 bg-black text-white p-2 rounded text-xs font-mono z-50">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>System: {systemTheme}</div>
      <div>Class: {typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</div>
    </div>
  );
};

const themeToggleVariants = cva(
  "fixed bottom-6 right-6 p-3 rounded-full shadow-xl border z-50 group hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-[#202020] border-border-light dark:border-border-dark text-slate-500 dark:text-[#9b9b9b] hover:text-primary dark:hover:text-primary transition-colors",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const themeIconVariants = cva(
  "transition-all duration-300 ease-in-out",
  {
    variants: {
      mode: {
        light: "block dark:hidden group-hover:rotate-12",
        dark: "hidden dark:block group-hover:-rotate-12",
      },
    },
  }
);

interface ThemeSwitchProps extends VariantProps<typeof themeToggleVariants> {
  className?: string;
}

export const ThemeSwitch = ({ variant, className }: ThemeSwitchProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggle = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={handleToggle}
      className={twMerge(themeToggleVariants({ variant, className }))}
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <MdLightMode size={24} />
      ) : (
        <MdDarkMode size={24} />
      )}
    </button>
  );
};

