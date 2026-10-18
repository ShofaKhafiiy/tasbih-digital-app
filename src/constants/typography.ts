// ============================================================
// TIPOGRAFI — font sizes, weights, line heights
// ============================================================

export const fontSize = {
  xs: 10,
  sm: 11,
  md: 12,
  lg: 13,
  xl: 14,
  xxl: 15,
  xxxl: 16,
  heading: 20,
} as const;

export const fontWeight = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
} as const;

export const letterSpacing = {
  tight: 0.3,
  normal: 0,
  wide: 0.6,
} as const;