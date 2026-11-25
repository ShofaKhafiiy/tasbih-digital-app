/**
 * @file Style komponen penghitungan tasbih (cincin manik, overlay selesai, dan tombol mode fokus).
 * @layer Styles
 */

import { StyleSheet } from "react-native";

import {
  absoluteFill,
  borderRadius,
  componentSizes,
  fontFamily,
  fontSize,
  lineHeight,
  spacing,
} from "@/constants";
import type { AppColors } from "@/constants/colors";

/**
 * Menghasilkan kumpulan style untuk komponen inti penghitungan tasbih.
 *
 * @param colors - Palet warna tema aktif (terang/gelap).
 * @returns Objek StyleSheet untuk komponen tasbih.
 */
export function makeTasbihStyles(colors: AppColors) {
  return StyleSheet.create({
    // ── CINCIN MANIK ──
    ringWrap: {
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    ringPressable: {
      alignItems: "center",
      justifyContent: "center",
    },
    ringCenter: {
      ...absoluteFill,
      alignItems: "center",
      justifyContent: "center",
    },
    ringArabic: {
      fontFamily: fontFamily.arabic,
      color: colors.inkSoft,
      textAlign: "center",
    },
    ringCount: {
      fontFamily: fontFamily.display,
      color: colors.ink,
      textAlign: "center",
      fontVariant: ["tabular-nums"],
    },
    ringTarget: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.caption,
      color: colors.muted,
      marginTop: spacing.xs,
      letterSpacing: 0.6,
    },
    ringHint: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.caption,
      color: colors.muted,
      textAlign: "center",
      marginTop: spacing.lg,
    },

    // ── OVERLAY TARGET TERCAPAI ──
    completionOverlay: {
      ...absoluteFill,
      zIndex: 10,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xxl,
      backgroundColor: colors.overlay,
    },
    completionCard: {
      width: "100%",
      maxWidth: 340,
      backgroundColor: colors.backgroundElevated,
      borderRadius: borderRadius.xxl,
      borderWidth: 1,
      borderColor: colors.hairline,
      padding: spacing.xxxl,
      alignItems: "center",
      gap: spacing.md,
    },
    completionTitle: {
      fontFamily: fontFamily.display,
      fontSize: fontSize.h2,
      color: colors.ink,
      textAlign: "center",
    },
    completionText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.bodySm,
      lineHeight: lineHeight.bodySm,
      color: colors.inkSoft,
      textAlign: "center",
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
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
    },
    completionGhostText: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.bodySm,
      color: colors.inkSoft,
    },

    // ── COUNTING ACTIONS ──
    countingActions: {
      flexDirection: "row",
      gap: spacing.md,
      marginTop: spacing.xl,
      alignItems: "center",
    },
    countingGhostButton: {
      flex: 1,
      minHeight: componentSizes.primaryButtonHeight,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
    },
    countingGhostText: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.bodySm,
      color: colors.inkSoft,
    },
  });
}
