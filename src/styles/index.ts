import { useMemo } from "react";

import { useTheme } from "@/context/ThemeContext";
import { makeComponentStyles } from "./components";
import { makeGlobalStyles } from "./global";

export type { ComponentStyles } from "./components";
export type { GlobalStyles } from "./global";

/** Style global + komponen yang otomatis mengikuti tema aktif. */
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
