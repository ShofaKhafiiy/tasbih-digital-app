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

  // ── INFO BANNER (pesan in-app pengganti Alert) ──
  infoBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  infoBannerError: {
    borderColor: colors.accent,
  },
  infoBannerSuccess: {
    borderColor: colors.primary,
  },
  infoBannerBody: {
    flex: 1,
    gap: spacing.xs,
  },
  infoBannerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.ink,
  },
  infoBannerText: {
    fontSize: fontSize.lg,
    color: colors.inkSoft,
    lineHeight: 18,
  },

  // ── OVERLAY TARGET TERCAPAI (momen kritis, kartu tengah) ──
  completionOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    backgroundColor: "rgba(43,34,27,0.55)",
  },
  completionCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: spacing.xxxl,
    alignItems: "center",
    gap: spacing.md,
  },
  completionTitle: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.extrabold,
    color: colors.ink,
    textAlign: "center",
  },
  completionText: {
    fontSize: fontSize.xl,
    color: colors.inkSoft,
    textAlign: "center",
    lineHeight: 20,
  },
  completionButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginTop: spacing.lg,
    alignSelf: "stretch",
  },
  completionGhostButton: {
    flex: 1,
    minHeight: componentSizes.primaryButtonHeight,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.glass,
  },
  completionGhostText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.inkSoft,
  },

  // ── DASHBOARD (Home) ──
  dashboardRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  dashboardCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.glass,
    gap: spacing.xs,
  },
  dashboardValue: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.extrabold,
    color: colors.ink,
  },
  dashboardLabel: {
    fontSize: fontSize.xs,
    color: colors.muted,
    textAlign: "center",
  },

  // ── SHORTCUT (Home) ──
  shortcutRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  shortcutButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.surface,
  },
  shortcutText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.inkSoft,
  },

  // ── COUNTING (layar immersive) ──
  countingActions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
    alignItems: "center",
  },
  countingGhostButton: {
    flex: 1,
    minHeight: componentSizes.primaryButtonHeight,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.glass,
  },
  countingGhostText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.inkSoft,
  },

  // ── HISTORY ──
  historyEmpty: {
    fontSize: fontSize.md,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.xxxl,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  historyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  historyName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.ink,
  },
  historyMeta: {
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: spacing.xs,
  },

  // ── SETTINGS ──
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  settingLabel: {
    fontSize: fontSize.lg,
    color: colors.ink,
  },
});
