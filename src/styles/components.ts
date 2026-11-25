/**
 * @file Agregator style komponen per fitur agar pemakaian lewat `useAppStyles()` tetap seragam.
 * @layer Styles
 */

import type { AppColors } from "@/constants/colors";
import { makeHomeStyles } from "./components/home";
import { makeNavigationStyles } from "./components/navigation";
import { makeScreenStyles } from "./components/screens";
import { makeTasbihStyles } from "./components/tasbih";

/**
 * Menggabungkan seluruh style komponen berdasarkan area fitur untuk tema aktif.
 *
 * @param colors - Palet warna tema aktif (terang/gelap).
 * @returns Objek gabungan style komponen di seluruh aplikasi.
 */
export function makeComponentStyles(colors: AppColors) {
  return {
    ...makeHomeStyles(colors),
    ...makeTasbihStyles(colors),
    ...makeNavigationStyles(colors),
    ...makeScreenStyles(colors),
  };
}

/** Tipe hasil gabungan seluruh style komponen. */
export type ComponentStyles = ReturnType<typeof makeComponentStyles>;
