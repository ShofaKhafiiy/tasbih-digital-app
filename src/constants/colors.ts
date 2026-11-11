// ============================================================
// PALET — Modern Islamic Minimalism
// Light: warm parchment · Dark: emerald night
// ============================================================

export type AppColors = {
  background: string;
  backgroundElevated: string;
  surface: string;
  surfaceMuted: string;
  ink: string;
  inkSoft: string;
  muted: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  accent: string;
  accentSoft: string;
  sage: string;
  hairline: string;
  overlay: string;
  beadUnlit: string;
  beadLit: string;
  danger: string;
  success: string;
  white: string;
  black: string;
};

export const lightColors: AppColors = {
  background: "#F7F1E7",
  backgroundElevated: "#FBF8F2",
  surface: "#FFFDF8",
  surfaceMuted: "#F0E8DA",
  ink: "#14211C",
  inkSoft: "#4C5B54",
  muted: "#8A9891",
  primary: "#164A38",
  primaryPressed: "#0F3A2C",
  onPrimary: "#F7F1E7",
  accent: "#C19A5B",
  accentSoft: "#EADCC2",
  sage: "#7C9788",
  hairline: "rgba(20, 33, 28, 0.12)",
  overlay: "rgba(20, 33, 28, 0.45)",
  beadUnlit: "#CDBFAA",
  beadLit: "#C19A5B",
  danger: "#B5654F",
  success: "#3F7A5E",
  white: "#FFFFFF",
  black: "#000000",
};

export const darkColors: AppColors = {
  background: "#0B1512",
  backgroundElevated: "#0F1D18",
  surface: "#12241D",
  surfaceMuted: "#173029",
  ink: "#EAF0EA",
  inkSoft: "#A9B8B0",
  muted: "#7E9188",
  primary: "#2E7A5E",
  primaryPressed: "#256951",
  onPrimary: "#F2F7F3",
  accent: "#D8B26A",
  accentSoft: "#3A3221",
  sage: "#7C9788",
  hairline: "rgba(234, 240, 234, 0.12)",
  overlay: "rgba(0, 0, 0, 0.55)",
  beadUnlit: "#2A3A33",
  beadLit: "#D8B26A",
  danger: "#D98A76",
  success: "#6DBB93",
  white: "#FFFFFF",
  black: "#000000",
};

export type ColorScheme = "light" | "dark";

export const palettes: Record<ColorScheme, AppColors> = {
  light: lightColors,
  dark: darkColors,
};
