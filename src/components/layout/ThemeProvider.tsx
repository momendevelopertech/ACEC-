"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ThemeColors } from "@/lib/theme-types";
import { applyThemeToDocument } from "@/lib/theme-utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

type Mode = "light" | "dark";

interface ThemeContextType {
  mode: Mode;
  toggleMode: () => void;
  switchTheme: (themeId: number) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
  switchTheme: async () => {},
  isLoading: true,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");
  const [lightColors, setLightColors] = useState<ThemeColors | null>(null);
  const [darkColors, setDarkColors] = useState<ThemeColors | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize mode from local storage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem("acec-theme-mode") as Mode;
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  // Fetch both theme configurations from the backend
  useEffect(() => {
    async function fetchThemes() {
      try {
        const res = await fetch(`${API_BASE}/api/themes/active`, {
          next: { revalidate: 60 },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            if (json.data.light) setLightColors(json.data.light);
            if (json.data.dark) setDarkColors(json.data.dark);
          }
        }
      } catch (error) {
        console.error("Failed to load themes from API");
      } finally {
        setIsLoading(false);
      }
    }
    fetchThemes();
  }, []);

  // Apply colors and classes whenever mode or colors change
  useEffect(() => {
    const root = document.documentElement;
    
    if (mode === "dark") {
      root.classList.add("dark");
      if (darkColors) applyThemeToDocument(darkColors, "dark");
    } else {
      root.classList.remove("dark");
      if (lightColors) applyThemeToDocument(lightColors, "light");
    }

    localStorage.setItem("acec-theme-mode", mode);
  }, [mode, lightColors, darkColors]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const switchTheme = useCallback(async (themeId: number) => {
    try {
      await fetch(`${API_BASE}/api/themes/${themeId}/activate`, {
        method: 'POST',
      });
      window.location.reload();
    } catch (error) {
      console.error('Failed to activate theme:', error);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, switchTheme, isLoading }}>
      {/* We apply a transition class to the body after initial load to prevent flashing */}
      <div className={`theme-wrapper ${!isLoading ? 'transition-colors duration-300' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
