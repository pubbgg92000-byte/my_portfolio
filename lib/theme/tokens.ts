export const themeTokens = {
  background: "8 10 14",
  surface: "15 18 24",
  elevated: "24 29 38",
  border: "58 68 84",
  textPrimary: "244 247 250",
  textSecondary: "171 183 197",
  textMuted: "112 126 142",
  accent: "79 209 197",
  highlight: "245 177 91",
  frame: "31 37 48",
  glow: "79 209 197",
} as const;

export type ThemeTokenName = keyof typeof themeTokens;
