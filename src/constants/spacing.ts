/**
 * @file Konstanta jarak, radius sudut, ukuran komponen, dan padding layar.
 * @layer Constants
 */

/** Skala spasi konsisten berbasis kelipatan piksel. */
export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  huge: 32,
} as const;

/** Token kelengkungan sudut (border radius) komponen. */
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

/** Dimensi standar komponen interaktif dan area sentuh minimum. */
export const componentSizes = {
  headerLogo: 40,
  headerLogoCompact: 28,
  navCardHeight: 56,
  primaryButtonHeight: 54,
  targetInputHeight: 46,
  tabBarHeight: 62,
  tabBarSpace: 108,
  minTouch: 48,
} as const;

/** Padding standar pembungkus halaman. */
export const screenPadding = {
  horizontal: 22,
  top: 8,
  bottom: 24,
} as const;

/** Objek style untuk mengisi penuh container induk secara absolut. */
export const absoluteFill = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
