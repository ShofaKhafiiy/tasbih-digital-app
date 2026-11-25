/**
 * @file Style komponen umum dan layar sekunder (banner, riwayat, pengaturan, detail dzikir, panduan).
 * @layer Styles
 */

import { StyleSheet } from "react-native";

import {
  borderRadius,
  componentSizes,
  fontFamily,
  fontSize,
  lineHeight,
  spacing,
} from "@/constants";
import type { AppColors } from "@/constants/colors";

/**
 * Menghasilkan kumpulan style untuk banner dan layar sekunder.
 *
 * @param colors - Palet warna tema aktif (terang/gelap).
 * @returns Objek StyleSheet untuk komponen dan layar sekunder.
 */
export function makeScreenStyles(colors: AppColors) {
  return StyleSheet.create({
    // ── INFO BANNER ──
    infoBanner: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.md,
      marginBottom: spacing.lg,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
    },
    infoBannerError: {
      borderColor: colors.danger,
    },
    infoBannerSuccess: {
      borderColor: colors.success,
    },
    infoBannerBody: {
      flex: 1,
      gap: spacing.xs,
    },
    infoBannerTitle: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.bodySm,
      color: colors.ink,
    },
    infoBannerText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.caption,
      lineHeight: lineHeight.caption,
      color: colors.inkSoft,
    },

    // ── HISTORY ──
    historyEmpty: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.bodySm,
      lineHeight: lineHeight.bodySm,
      color: colors.muted,
      textAlign: "center",
      marginTop: spacing.xxxl,
    },
    historyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.lg,
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
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.body,
      color: colors.ink,
    },
    historyMeta: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.caption,
      color: colors.muted,
      marginTop: 2,
    },

    // ── SETTINGS ──
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.lg,
      paddingVertical: spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: colors.hairline,
    },
    settingInfo: {
      flex: 1,
      gap: 2,
    },
    settingLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.body,
      color: colors.ink,
    },
    settingHint: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.caption,
      lineHeight: lineHeight.caption,
      color: colors.muted,
    },
    segmented: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      padding: 3,
      borderRadius: borderRadius.full,
      backgroundColor: colors.surfaceMuted,
    },
    segment: {
      flex: 1,
      minHeight: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius.full,
    },
    segmentActive: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.hairline,
    },
    segmentText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.caption,
      color: colors.inkSoft,
    },
    segmentTextActive: {
      fontFamily: fontFamily.semibold,
      color: colors.ink,
    },
    dangerButton: {
      alignSelf: "stretch",
      minHeight: componentSizes.primaryButtonHeight,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: colors.danger,
      marginTop: spacing.xl,
    },
    dangerText: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.bodySm,
      color: colors.danger,
    },

    // ── DETAIL DZIKIR ──
    detailName: {
      fontFamily: fontFamily.display,
      fontSize: fontSize.h2,
      color: colors.ink,
      textAlign: "center",
      marginTop: spacing.xl,
    },
    detailArabic: {
      fontFamily: fontFamily.arabic,
      fontSize: 30,
      lineHeight: 44,
      color: colors.inkSoft,
      textAlign: "center",
      marginTop: spacing.md,
    },
    detailDesc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.bodySm,
      lineHeight: lineHeight.bodySm,
      color: colors.muted,
      textAlign: "center",
      marginTop: spacing.md,
      marginBottom: spacing.md,
    },

    // ── PANDUAN ──
    guideRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: componentSizes.minTouch,
      paddingVertical: spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: colors.hairline,
    },
    guideTitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.body,
      color: colors.ink,
    },
  });
}
