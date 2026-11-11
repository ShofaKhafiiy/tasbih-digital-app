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

const absoluteFill = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

// ============================================================
// STYLE KOMPONEN
// ============================================================

export function makeComponentStyles(colors: AppColors) {
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

    // ── FLOATING TAB BAR ──
    tabBarWrap: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: spacing.xxl,
      paddingBottom: spacing.lg,
    },
    tabBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      height: componentSizes.tabBarHeight,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.backgroundElevated,
      paddingHorizontal: spacing.md,
      boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.12)",
    },
    tabItem: {
      flex: 1,
      minHeight: componentSizes.minTouch,
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
    },
    tabIconWrap: {
      width: 28,
      height: 28,
      borderRadius: borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
    },
    tabIconWrapActive: {
      backgroundColor: colors.accentSoft,
    },
    tabLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.micro,
      color: colors.muted,
    },
    tabLabelActive: {
      fontFamily: fontFamily.semibold,
      color: colors.ink,
    },
    tabIndicator: {
      position: "absolute",
      top: spacing.sm,
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.accent,
    },

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

    //Bar jadwal sholat
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

export type ComponentStyles = ReturnType<typeof makeComponentStyles>;
