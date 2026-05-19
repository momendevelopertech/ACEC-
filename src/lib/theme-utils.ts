import { ThemeColors } from './theme-types';

export function generateThemeCssVars(colors: ThemeColors): string {
  return Object.entries(colors)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join(' ');
}

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

/**
 * Calculates and applies all application CSS variables derived from the 4 base colors.
 */
export function applyThemeToDocument(colors: ThemeColors, mode: 'light' | 'dark'): void {
  const root = document.documentElement;
  
  // Set the 4 base colors
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-surface', colors.surface);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-text-primary', colors.text);

  // Set RGB versions of base colors for opacity support
  root.style.setProperty('--color-background-rgb', hexToRgb(colors.background));
  root.style.setProperty('--color-surface-rgb', hexToRgb(colors.surface));
  root.style.setProperty('--color-accent-rgb', hexToRgb(colors.accent));
  root.style.setProperty('--color-text-rgb', hexToRgb(colors.text));

  // Dynamic glow opacities to prevent dirty stains in light mode
  root.style.setProperty('--glow-opacity', mode === 'dark' ? '0.15' : '0.01');
  root.style.setProperty('--glow-opacity-secondary', mode === 'dark' ? '0.08' : '0.005');

  // Derived Backgrounds
  root.style.setProperty('--color-surface-alt', `color-mix(in srgb, var(--color-background) 50%, var(--color-surface))`);
  root.style.setProperty('--color-card-bg', 'var(--color-surface)');
  root.style.setProperty('--color-header-bg', `rgba(var(--color-background-rgb), 0.85)`);
  root.style.setProperty('--color-footer-bg', mode === 'dark' ? '#080D14' : '#F1F5F9'); // Slightly harder to calculate footer, keep standard scale

  // Derived Text Colors
  root.style.setProperty('--color-text-secondary', `color-mix(in srgb, var(--color-text-primary) 70%, transparent)`);
  root.style.setProperty('--color-text-muted', `color-mix(in srgb, var(--color-text-primary) 50%, transparent)`);
  root.style.setProperty('--color-header-text', 'var(--color-text-primary)');
  root.style.setProperty('--color-footer-text', 'var(--color-text-muted)');

  // Derived Accents & Buttons
  root.style.setProperty('--color-accent-hover', `color-mix(in srgb, var(--color-accent) 80%, white)`);
  root.style.setProperty('--color-text-on-accent', '#111827');
  root.style.setProperty('--color-button-bg', 'var(--color-accent)');
  root.style.setProperty('--color-button-text', 'var(--color-text-on-accent)');
  root.style.setProperty('--color-button-hover', 'var(--color-accent-hover)');
  root.style.setProperty('--color-accent-dim', `rgba(var(--color-accent-rgb), 0.15)`);

  // Derived Borders
  root.style.setProperty('--color-border-default', `color-mix(in srgb, var(--color-text-primary) 15%, transparent)`);
  root.style.setProperty('--color-card-border', 'var(--color-border-default)');
}
