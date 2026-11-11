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
  huge: 32,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

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

export const screenPadding = {
  horizontal: 22,
  top: 8,
  bottom: 24,
} as const;
