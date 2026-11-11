import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useColorScheme } from "react-native";

import {
  darkColors,
  lightColors,
  type AppColors,
  type ColorScheme,
} from "@/constants/colors";
import { useSettings } from "@/context/SettingsContext";

interface ThemeContextValue {
  scheme: ColorScheme;
  colors: AppColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const { themeMode } = useSettings();

  const scheme: ColorScheme =
    themeMode === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;

  const value = useMemo<ThemeContextValue>(
    () => ({
      scheme,
      colors: scheme === "dark" ? darkColors : lightColors,
      isDark: scheme === "dark",
    }),
    [scheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme harus dipakai di dalam ThemeProvider");
  }
  return ctx;
}
