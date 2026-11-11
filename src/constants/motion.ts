// ============================================================
// MOTION — durasi & spring konsisten
// ============================================================

export const duration = {
  fast: 140,
  base: 220,
  slow: 380,
  reveal: 900,
} as const;

export const spring = {
  snap: { damping: 18, stiffness: 220, mass: 0.8 },
  soft: { damping: 22, stiffness: 150, mass: 0.9 },
  gentle: { damping: 26, stiffness: 120, mass: 1 },
} as const;
