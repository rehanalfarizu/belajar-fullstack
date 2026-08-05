// ============================================================
// FILE: 04-latihan-state/code/02-theme-context.jsx
// MATERI: ThemeContext — Light/Dark Mode dengan localStorage
// ============================================================
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// ============================================================
// TODO: ThemeContext
// ============================================================
// Context yang menyediakan:
//   - theme: "light" | "dark"
//   - toggleTheme: function
//   - isDark: boolean
//
// Features:
//   1. Baca initial theme dari localStorage, fallback ke "light"
//   2. Toggle theme dengan functional update
//   3. Simpan preference ke localStorage
//   4. Apply className "dark" ke <html> element
//
// CATATAN:
//   - const ThemeContext = createContext(null);
//   - ThemeProvider membungkus App
//   - useEffect dengan dependency [theme] untuk apply className
//   - localStorage key: "app-theme"
// ============================================================

// TODO: ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // TODO: useState dengan lazy initialization
  // - function getInitialTheme() {
  //     try {
  //       const stored = localStorage.getItem("app-theme");
  //       return stored || "light";
  //     } catch { return "light"; }
  //   }
  // const [theme, setTheme] = useState(getInitialTheme);

  // TODO: toggleTheme function
  // const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  // TODO: useEffect untuk apply className ke <html>
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  // TODO: useEffect untuk persist ke localStorage
  // useEffect(() => {
  //   localStorage.setItem("app-theme", theme);
  // }, [theme]);

  // TODO: useMemo untuk value object
  // const value = useMemo(() => ({
  //   theme, toggleTheme, isDark: theme === "dark"
  // }), [theme]);

  // TODO: Return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// TODO: useTheme hook
// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error("useTheme must be used within ThemeProvider");
//   return context;
// }

// ============================================================
// CSS Variables (letakkan di index.css atau App.css)
// ============================================================
/*
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border: #e5e7eb;
  --accent: #3b82f6;
}

[data-theme="dark"] {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --border: #374151;
  --accent: #60a5fa;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}
*/

// ============================================================
// TODO: Components yang menggunakan useTheme
// ============================================================

export function Header() {
  // TODO: Ambil theme, toggleTheme dari useTheme()
  // TODO: Render header dengan theme toggle button
  // TODO: Button menampilkan ikon ☀️ (light) atau 🌙 (dark)
}

export function ThemedCard({ title, children }) {
  // TODO: Ambil isDark dari useTheme()
  // TODO: Render card dengan styling yang berbeda untuk dark/light mode
  // TODO: Gunakan CSS variables untuk styling
}

export function ThemeToggle() {
  // TODO: Ambil theme, toggleTheme dari useTheme()
  // TODO: Render toggle button
  // TODO: Gunakan className conditional styling
}