"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export interface ThemeData {
  id: number;
  name: string;
  name_ar: string;
  slug: string;
  is_active: boolean;
  colors: Record<string, string>;
  typography: Record<string, string>;
  layout: Record<string, string>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    async function fetchTheme() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/theme`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setTheme(json.data);
            applyTheme(json.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch theme:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTheme();
  }, [locale]);

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 0, 0";
  };

  const applyTheme = (themeData: ThemeData) => {
    const root = document.documentElement;
    const colors = themeData.colors || {};
    const typography = themeData.typography || {};
    const layout = themeData.layout || {};

    // Apply color variables with RGB support
    if (colors.background) {
      root.style.setProperty("--color-bg", colors.background);
      root.style.setProperty("--color-bg-rgb", hexToRgb(colors.background));
      root.setAttribute("data-theme", colors.background === "#ffffff" ? "light" : "dark");
    }
    if (colors.surface) {
      root.style.setProperty("--color-surface", colors.surface);
      root.style.setProperty("--color-surface-rgb", hexToRgb(colors.surface));
    }
    if (colors.surface_2) root.style.setProperty("--color-surface-2", colors.surface_2);
    if (colors.text) {
      root.style.setProperty("--color-text", colors.text);
      root.style.setProperty("--color-text-rgb", hexToRgb(colors.text));
    }
    if (colors.text_muted) {
      root.style.setProperty("--color-text-muted", colors.text_muted);
      root.style.setProperty("--color-text-muted-rgb", hexToRgb(colors.text_muted));
    }
    if (colors.primary) {
      root.style.setProperty("--color-gold", colors.primary);
      root.style.setProperty("--color-gold-rgb", hexToRgb(colors.primary));
      root.style.setProperty("--color-gold-dim", `rgba(${hexToRgb(colors.primary)}, 0.15)`);
      root.style.setProperty("--color-border-gold", `rgba(${hexToRgb(colors.primary)}, 0.25)`);
    }
    if (colors.primary_light) root.style.setProperty("--color-gold-light", colors.primary_light);
    if (colors.border) {
      root.style.setProperty("--color-border", colors.border);
      root.style.setProperty("--color-border-rgb", hexToRgb(colors.border));
    }
    if (colors.accent) {
      root.style.setProperty("--color-accent", colors.accent);
      root.style.setProperty("--color-accent-rgb", hexToRgb(colors.accent));
    }
    if (colors.card_bg) {
      root.style.setProperty("--color-card-bg", colors.card_bg);
      root.style.setProperty("--color-card-bg-rgb", hexToRgb(colors.card_bg));
    }
    if (colors.header_bg) root.style.setProperty("--color-header-bg", colors.header_bg);
    if (colors.footer_bg) root.style.setProperty("--color-footer-bg", colors.footer_bg);
    if (colors.white) {
      root.style.setProperty("--color-white", colors.white);
      root.style.setProperty("--color-white-rgb", hexToRgb(colors.white));
    }

    // Apply typography
    if (typography.font_ar) {
      root.style.setProperty("--font-arabic", typography.font_ar);
    }
    if (typography.font_en) {
      root.style.setProperty("--font-body", typography.font_en);
    }

    // Apply layout
    if (layout.border_radius) {
      const radiusMap: Record<string, string> = {
        'none': '0px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      };
      const radius = radiusMap[layout.border_radius] || '16px';
      root.style.setProperty("--radius-sm", `calc(${radius} * 0.5)`);
      root.style.setProperty("--radius-md", radius);
      root.style.setProperty("--radius-lg", `calc(${radius} * 1.5)`);
      root.style.setProperty("--radius-xl", `calc(${radius} * 2)`);
    }
  };

  return <>{children}</>;
}
