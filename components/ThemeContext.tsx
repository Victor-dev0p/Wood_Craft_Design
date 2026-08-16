"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  themePalettes,
  cssVariableMap,
  ThemeMode,
  ThemePalette,
} from "./styles";

interface ThemeContextType {
  mode: ThemeMode;
  theme: ThemePalette;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initializer reads localStorage + matchMedia ONCE on mount
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("wood_craft_theme_mode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return saved === "dark" || (!saved && prefersDark) ? "dark" : "light";
  });

  const theme = themePalettes[mode];

  // This effect only updates DOM + localStorage — NO setState inside
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    Object.entries(cssVariableMap[mode]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.style.colorScheme = mode;
    body.style.backgroundColor = theme.bgPage;
    body.style.color = theme.textMain;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("wood_craft_theme_mode", mode);
    } catch {
      // localStorage not available
    }
  }, [mode, theme]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
