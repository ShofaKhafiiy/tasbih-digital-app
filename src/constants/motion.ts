/**
 * @file Konstanta durasi dan konfigurasi pegas animasi aplikasi.
 * @layer Constants
 */

/** Standar durasi transisi animasi dalam milidetik. */
export const duration = {
  fast: 140,
  base: 220,
  slow: 380,
  reveal: 900,
} as const;

/** Preset konfigurasi animasi spring Reanimated. */
export const spring = {
  snap: { damping: 18, stiffness: 220, mass: 0.8 },
  soft: { damping: 22, stiffness: 150, mass: 0.9 },
  gentle: { damping: 26, stiffness: 120, mass: 1 },
} as const;
