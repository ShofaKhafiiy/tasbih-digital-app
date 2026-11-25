/**
 * @file Token tipografi aplikasi (keluarga font, skala ukuran, line-height, dan ketebalan).
 * @layer Constants
 */

/** Nama font terdaftar yang dimuat pada RootLayout. */
export const fontFamily = {
  display: "Fraunces_600SemiBold",
  arabic: "Amiri_400Regular",
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
} as const;

/** Skala ukuran huruf semantik. */
export const fontSize = {
  display: 64,
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  bodySm: 14,
  caption: 12,
  micro: 10,
} as const;

/** Tinggi baris (line-height) pasangan skala `fontSize`. */
export const lineHeight = {
  display: 68,
  h1: 38,
  h2: 30,
  h3: 26,
  body: 24,
  bodySm: 21,
  caption: 18,
  micro: 14,
} as const;

/** Bobot ketebalan huruf standar React Native. */
export const fontWeight = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};
