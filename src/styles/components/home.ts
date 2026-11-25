/**
 * @file Style komponen area Beranda (hero card, carousel dzikir, ribbon, target sheet, dan bar salat).
 * @layer Styles
 */

import { StyleSheet } from "react-native";

import {
  absoluteFill,
  borderRadius,
  fontFamily,
  fontSize,
  lineHeight,
  spacing,
} from "@/constants";
import type { AppColors } from "@/constants/colors";

/**
 * Menghasilkan kumpulan style untuk seluruh komponen pada tab Beranda.
 *
 * @param colors - Palet warna tema aktif (terang/gelap).
 * @returns Objek StyleSheet untuk komponen Beranda.
 */
export function makeHomeStyles(colors: AppColors) {
  return StyleSheet.create({
    // ── HERO BERANDA ──
    hero: {
      borderRadius: borderRadius.xxl,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xl,
      overflow: "hidden",
    },
    heroPattern: {
      ...absoluteFill,
    },
    heroTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    heroHintRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    heroPulseDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.accent,
    },
    heroHintText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.micro,
      color: colors.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    heroUndo: {
      width: 40,
      height: 40,
      borderRadius: borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.backgroundElevated,
    },
    heroArabic: {
      fontFamily: fontFamily.arabic,
      fontSize: 40,
      lineHeight: 58,
      color: colors.ink,
      textAlign: "center",
      marginTop: spacing.md,
    },
    heroName: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.caption,
      color: colors.inkSoft,
      letterSpacing: 2,
      textTransform: "uppercase",
      textAlign: "center",
      marginTop: spacing.xs,
    },

    // ── CAROUSEL DZIKIR ──
    carouselWrap: {
      marginTop: spacing.xl,
    },
    carouselContent: {
      gap: spacing.md,
      paddingHorizontal: spacing.xs,
    },
    carouselItem: {
      width: 148,
      minHeight: 96,
      borderRadius: borderRadius.xl,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      alignItems: "center",
      justifyContent: "center",
    },
    carouselItemActive: {
      backgroundColor: colors.surfaceMuted,
      borderColor: colors.accent,
    },
    carouselArabic: {
      fontFamily: fontFamily.arabic,
      fontSize: 22,
      lineHeight: 32,
      color: colors.ink,
      textAlign: "center",
    },
    carouselName: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.caption,
      color: colors.ink,
      textAlign: "center",
      marginTop: spacing.xs,
    },
    carouselMeta: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.micro,
      color: colors.muted,
      textAlign: "center",
      marginTop: 2,
    },
    carouselPill: {
      alignSelf: "center",
      marginTop: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingVertical: 2,
      borderRadius: borderRadius.full,
      backgroundColor: colors.accentSoft,
    },
    carouselPillText: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.micro,
      color: colors.ink,
    },
    dotsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.hairline,
    },
    dotActive: {
      width: 18,
      backgroundColor: colors.accent,
    },

    // ── RIBBON STATISTIK ──
    ribbon: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: borderRadius.xl,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      marginTop: spacing.xl,
    },
    ribbonMetric: {
      flex: 1,
      alignItems: "center",
      gap: 2,
    },
    ribbonValue: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.h3,
      color: colors.ink,
      fontVariant: ["tabular-nums"],
    },
    ribbonLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.micro,
      color: colors.muted,
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    ribbonDivider: {
      width: 1,
      height: 28,
      backgroundColor: colors.hairline,
    },

    // ── CTA ROW ──
    ctaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      marginTop: spacing.xl,
    },
    ctaPrimary: {
      flex: 1.5,
      marginTop: 0,
    },
    ctaSecondary: {
      flex: 1,
    },

    // ── TARGET SHEET ──
    sheetBackdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.overlay,
    },
    sheet: {
      backgroundColor: colors.backgroundElevated,
      borderTopLeftRadius: borderRadius.xxl,
      borderTopRightRadius: borderRadius.xxl,
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.xl,
      paddingBottom: 40,
      gap: spacing.lg,
    },
    sheetHandle: {
      alignSelf: "center",
      width: 44,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.hairline,
      marginBottom: spacing.md,
    },
    sheetTitle: {
      fontFamily: fontFamily.display,
      fontSize: fontSize.h2,
      color: colors.ink,
    },
    sheetText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.bodySm,
      lineHeight: lineHeight.bodySm,
      color: colors.inkSoft,
    },
    sheetInput: {
      height: 56,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.lg,
      fontFamily: fontFamily.display,
      fontSize: fontSize.h1,
      color: colors.ink,
      textAlign: "center",
      fontVariant: ["tabular-nums"],
    },
    sheetQuickRow: {
      flexDirection: "row",
      gap: spacing.sm,
      flexWrap: "wrap",
    },
    sheetQuickChip: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
    },
    sheetQuickChipText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.bodySm,
      color: colors.ink,
    },
    sheetRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      marginTop: spacing.sm,
    },
    sheetCancel: {
      flex: 1,
    },
    sheetApply: {
      flex: 1.4,
      marginTop: 0,
    },

    // ── BAR JADWAL SHOLAT ──
    prayerBar: {
      borderRadius: borderRadius.lg,
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      marginBottom: spacing.xl,
      gap: spacing.sm,
      overflow: "hidden",
    },
    prayerCountRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    prayerCountLabel: {
      flex: 1,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.micro,
      color: colors.onPrimary,
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    prayerCountValue: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.bodySm,
      color: colors.onPrimary,
      fontVariant: ["tabular-nums"],
    },
    prayerTickerRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    prayerTickerCopy: {
      paddingRight: spacing.xxl,
    },
    prayerTickerText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.caption,
      color: colors.onPrimary,
    },
  });
}
