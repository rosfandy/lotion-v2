# Theme Switch Implementation Guide

## Overview
ThemeSwitch adalah komponen yang menyediakan toggle antara light dan dark mode dengan persistent storage menggunakan `next-themes`.

## Dependencies
- `next-themes` - Theme management library untuk Next.js
- `react-icons` - Icon library
- `class-variance-authority` - Component variants
- `tailwind-merge` - Merge Tailwind classes

## Setup

### 1. ThemeProvider di Layout
File: `src/app/layout.tsx`

```typescript
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Props ThemeProvider:**
- `attribute="class"` - Menambahkan class "dark" ke HTML element
- `defaultTheme="system"` - Default menggunakan system preference
- `enableSystem={true}` - Detect system dark mode preference
- `storageKey="theme"` - Key untuk localStorage (default)

### 2. ThemeSwitch Component
File: `src/components/fragments/ThemeSwitch.tsx`

```typescript
"use client"; // Client component untuk event handling

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Prevent hydration mismatch
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};
```

## Features

### ✅ Automatic Theme Detection
```typescript
// System preference automatically applied on first load
const { theme } = useTheme();
// theme: "light" | "dark" | "system"
```

### ✅ Persistent Storage
```typescript
// Theme preference saved to localStorage
// Automatically restored on page reload
const { setTheme } = useTheme();
setTheme("dark"); // Saved ke localStorage
```

### ✅ Hydration Safety
```typescript
// Prevent hydration mismatch with useEffect
const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
```

### ✅ Tailwind Dark Mode
```css
/* Automatic dark class application */
.dark {
  @apply dark:bg-black dark:text-white;
}
```

## Usage Examples

### Basic Usage
```typescript
import { ThemeSwitch } from "@/components/fragments/ThemeSwitch";

export default function App() {
  return (
    <div>
      <ThemeSwitch />
    </div>
  );
}
```

### Access Theme in Other Components
```typescript
"use client";
import { useTheme } from "next-themes";

export function MyComponent() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <p>Available themes: {themes.join(", ")}</p>
    </div>
  );
}
```

### useTheme Hook API
```typescript
const {
  theme,           // Current theme: "light" | "dark" | "system"
  setTheme,        // Function to change theme
  themes,          // Array of available themes
  systemTheme,     // System preference theme
  resolvedTheme,   // Resolved theme (handles "system" theme)
} = useTheme();
```

## Tailwind Configuration

Pastikan `tailwind.config.ts` memiliki:

```typescript
export default {
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      // Custom dark mode colors
    },
  },
};
```

## HTML Class Application

Ketika theme diubah, next-themes otomatis menambahkan class:

```html
<!-- Light mode -->
<html class="light">

<!-- Dark mode -->
<html class="dark">
```

## LocalStorage

Theme disimpan di localStorage dengan key "theme":

```javascript
// Light mode
localStorage.getItem("theme"); // "light"

// Dark mode
localStorage.getItem("theme"); // "dark"

// Clear preference (kembali ke system)
localStorage.removeItem("theme");
```

## CSS Styling dengan Dark Mode

```css
/* Default (light) */
.bg-white {
  @apply bg-white;
}

/* Dark mode */
.dark .bg-white {
  @apply dark:bg-slate-900;
}

/* Shorthand */
.background {
  @apply bg-white dark:bg-slate-900;
}
```

## TypeScript Support

```typescript
import { useTheme } from "next-themes";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const { theme }: { theme?: Theme } = useTheme();
const { resolvedTheme }: { resolvedTheme?: ResolvedTheme } = useTheme();
```

## Browser Support

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers
- ✅ localStorage support required

## Common Issues

### 1. Hydration Mismatch
**Problem:** Warning about server/client mismatch
**Solution:** Gunakan `mounted` state dan return null sebelum mounted:
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

### 2. Theme tidak persist
**Problem:** Theme tidak tersimpan saat reload
**Solution:** Pastikan ThemeProvider di layout dan `suppressHydrationWarning` di HTML tag

### 3. Flash of unstyled content
**Problem:** Melihat flash light/dark mode saat page load
**Solution:** Gunakan `defaultTheme="system"` dan minimal CSS inline

## Performance Tips

1. **Lazy load theme switcher**
   ```typescript
   const ThemeSwitch = dynamic(
     () => import("@/components/fragments/ThemeSwitch"),
     { ssr: false }
   );
   ```

2. **Memoize component**
   ```typescript
   export const ThemeSwitch = memo(() => { ... });
   ```

3. **Use resolvedTheme untuk rendering**
   ```typescript
   const { resolvedTheme } = useTheme();
   // Render berdasarkan resolvedTheme, bukan theme
   ```

## Troubleshooting

```bash
# Clear cache jika ada masalah
rm -rf .next
npm run build

# Check localStorage
console.log(localStorage.getItem("theme"));

# Check HTML class
console.log(document.documentElement.className);
```
