// ============================================================
// SPACING & SIZING — sistem spacing konsisten (4px base)
// ============================================================

export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const componentSizes = {
  headerLogo: 44,
  navArrow: { width: 40, height: 50 },
  navCardHeight: 50,
  primaryButtonHeight: 50,
  targetInputHeight: 38,
  targetRowPadding: 6,
} as const;

export const screenPadding = {
  horizontal: 20,
  top: 10,
  bottom: 12,
} as const;