/**
 * Global Warming Interactive Explorer - Design Tokens
 * Single source of truth for typography, color palette, spacing, and visual cues.
 */

export const tokens = {
  colors: {
    // Canvas & Surface
    bg: {
      canvas: "#070b12",
      surface: "#0f172a",
      surfaceElevated: "#162033",
      surfaceGlass: "rgba(15, 23, 42, 0.78)",
      surfaceOverlay: "rgba(7, 11, 18, 0.85)",
      border: "rgba(148, 163, 184, 0.12)",
      borderHighlight: "rgba(148, 163, 184, 0.28)",
    },
    // Typography colors
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
      muted: "#64748b",
      inverse: "#070b12",
    },
    // Scenario 1: 'carry on' (Fossil heavy, business as usual, tipping points)
    carryOn: {
      primary: "#ef4444",      // Crimson
      secondary: "#f97316",    // Flame orange
      gradientStart: "#dc2626",
      gradientEnd: "#ea580c",
      glow: "rgba(239, 68, 68, 0.35)",
      bgSubtle: "rgba(239, 68, 68, 0.10)",
      borderSubtle: "rgba(239, 68, 68, 0.28)",
      badge: "#fee2e2",
      badgeText: "#991b1b",
    },
    // Scenario 2: 'protect it' (Paris aligned, restoration, decarbonization)
    protect: {
      primary: "#10b981",      // Emerald
      secondary: "#06b6d4",    // Cyan
      gradientStart: "#059669",
      gradientEnd: "#0891b2",
      glow: "rgba(16, 185, 129, 0.35)",
      bgSubtle: "rgba(16, 185, 129, 0.10)",
      borderSubtle: "rgba(16, 185, 129, 0.28)",
      badge: "#d1fae5",
      badgeText: "#065f46",
    },
    // Data / Metric Accents
    accent: {
      ocean: "#38bdf8",
      heat: "#f59e0b",
      cryo: "#a5f3fc",
      forest: "#34d399",
      carbon: "#c084fc",
    },
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: "0.75rem",     // 12px
      sm: "0.875rem",    // 14px
      base: "1rem",      // 16px
      lg: "1.125rem",    // 18px
      xl: "1.25rem",     // 20px
      "2xl": "1.5rem",   // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem",  // 36px
      "5xl": "3rem",     // 48px
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "900",
    },
    lineHeight: {
      tight: "1.15",
      snug: "1.3",
      normal: "1.5",
      relaxed: "1.65",
    },
    letterSpacing: {
      tighter: "-0.03em",
      tight: "-0.015em",
      normal: "0em",
      wide: "0.025em",
      widest: "0.08em",
    },
  },
  spacing: {
    "2xs": "0.25rem",  // 4px
    xs: "0.5rem",      // 8px
    sm: "0.75rem",     // 12px
    md: "1rem",        // 16px
    lg: "1.5rem",      // 24px
    xl: "2rem",        // 32px
    "2xl": "3rem",     // 48px
    "3xl": "4rem",     // 64px
  },
  radii: {
    sm: "0.375rem",    // 6px
    md: "0.5rem",      // 8px
    lg: "0.75rem",     // 12px
    xl: "1rem",        // 16px
    "2xl": "1.5rem",   // 24px
    full: "9999px",
  },
  shadows: {
    glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    glowCarry: "0 0 25px -4px rgba(239, 68, 68, 0.45)",
    glowProtect: "0 0 25px -4px rgba(16, 185, 129, 0.45)",
  },
} as const;

export type DesignTokens = typeof tokens;
export default tokens;
