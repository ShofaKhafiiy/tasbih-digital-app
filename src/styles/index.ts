/**
 * @file Hook `useAppStyles` yang menyediakan style global dan komponen sesuai tema aktif.
 * @layer Styles
 */

import { useMemo } from "react";

import { useTheme } from "@/context/ThemeContext";
import { makeComponentStyles } from "./components";
import { makeGlobalStyles } from "./global";

export type { ComponentStyles } from "./components";
export type { GlobalStyles } from "./global";

/**
 * Menghasilkan objek style `global` dan `component` yang otomatis diperbarui saat palet tema berubah.
 *
 * @returns Kumpulan StyleSheet ter-memoisasi untuk tema aktif.
 */
export function useAppStyles() {
  const { colors } = useTheme();

  return useMemo(
    () => ({
      global: makeGlobalStyles(colors),
      component: makeComponentStyles(colors),
    }),
    [colors],
  );
}
