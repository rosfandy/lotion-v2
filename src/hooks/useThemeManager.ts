"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

/**
 * Hook untuk mengakses theme state dan fungsi
 * @returns Object dengan theme, setTheme, themes, systemTheme, resolvedTheme
 */
export function useThemeManager() {
  const { theme, setTheme, themes, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme,
    setTheme,
    themes,
    systemTheme,
    resolvedTheme,
    mounted,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  };
}

/**
 * Hook untuk mengecek apakah component sudah mounted (untuk hydration safety)
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

