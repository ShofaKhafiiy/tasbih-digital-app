import { StyleSheet } from "react-native";
import { borderRadius, colors, componentSizes, spacing } from "@/constants";
import { fontSize, fontWeight } from "@/constants/typography";

// ============================================================
// STYLE KOMPONEN (TasbihRing, DhikrSelector, dll)
// ============================================================
export const componentStyles = StyleSheet.create({
  // ── TASIHB RING ──
  ringPressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  // Wadah manik (posisi absolut melingkar).
  ringBeads: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  bead: {
    position: "absolute",
  },
  ringCenter: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  ringDhikrName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.inkSoft,
    letterSpacing: 0.6,
    textAlign: "center",
  },
  ringCount: {
    fontWeight: fontWeight.extrabold,
    color: colors.ink,
    textAlign: "center",
  },
  ringTarget: {
    fontSize: fontSize.xl,
    color: colors.inkSoft,
    marginTop: spacing.xs,
  },
  ringStatus: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: spacing.md,
    textAlign: "center",
  },

  // ── DHIKR SELECTOR (Navbar dzikir) ──
  navbarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  navArrow: {
    width: componentSizes.navArrow.width,
    height: componentSizes.navArrow.height,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.glass,
    alignItems: "center",
    justifyContent: "center",
  },
  navCard: {
    height: componentSizes.navCardHeight,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.glass,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  navCardName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.ink,
    textAlign: "center",
  },
  navCardTarget: {
    fontSize: fontSize.xs,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  navCardTargetPill: {
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },
  navCardTargetPillText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
});
