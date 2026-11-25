/**
 * @file Context tema aplikasi yang menyelesaikan mode tema pengguna (`system`/`light`/`dark`) menjadi palet warna aktif.
 * @layer Context
 */

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

/** Provider tema yang menyediakan `scheme`, `colors`, dan `isDark` ke seluruh pohon UI. */
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

/**
 * Hook untuk mengakses palet warna dan status mode gelap/terang aktif.
 *
 * @returns Objek tema (`scheme`, `colors`, `isDark`).
 * @throws Error bila dipanggil di luar `ThemeProvider`.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme harus dipakai di dalam ThemeProvider");
  }
  return ctx;
}
