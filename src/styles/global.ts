import { StyleSheet } from "react-native";

import {
  borderRadius,
  componentSizes,
  fontFamily,
  fontSize,
  screenPadding,
  spacing,
} from "@/constants";
import type { AppColors } from "@/constants/colors";

// ============================================================
// STYLE GLOBAL (layout, container, header, tombol)
// ============================================================

export function makeGlobalStyles(colors: AppColors) {
  return StyleSheet.create({
    // ── KONTAINER ──
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: screenPadding.horizontal,
      paddingTop: screenPadding.top,
      paddingBottom: screenPadding.bottom,
    },
    tabScrollContent: {
      flexGrow: 1,
      paddingHorizontal: screenPadding.horizontal,
      paddingTop: screenPadding.top,
      paddingBottom: componentSizes.tabBarSpace,
    },

    // ── HEADER UTAMA ──
    appHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.xl,
    },
    brandRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.lg,
    },
    brandText: {
      gap: spacing.xs,
    },
    brandName: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.body,
      color: colors.ink,
      letterSpacing: 0.2,
    },
    brandTagline: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.caption,
      color: colors.muted,
    },
    headerMeta: {
      alignItems: "flex-end",
      gap: spacing.xs,
    },
    headerDate: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.caption,
      color: colors.inkSoft,
    },
    iconButton: {
      width: componentSizes.minTouch,
      height: componentSizes.minTouch,
      borderRadius: borderRadius.full,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.hairline,
    },

    // ── HEADER LEGACY (layar non-beranda) ──
    header: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    headerLogo: {
      width: componentSizes.headerLogo,
      height: componentSizes.headerLogo,
      borderRadius: componentSizes.headerLogo / 2,
      marginBottom: spacing.sm,
    },
    headerTitle: {
      fontFamily: fontFamily.display,
      fontSize: fontSize.h2,
      color: colors.ink,
      letterSpacing: 0.2,
    },
    headerSubtitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.bodySm,
      color: colors.inkSoft,
      marginTop: spacing.xs,
      textAlign: "center",
    },
    arabesque: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      marginTop: spacing.lg,
    },
    arabesqueLine: {
      width: 28,
      height: 1,
      backgroundColor: colors.hairline,
    },
    headerCompact: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      paddingTop: spacing.md,
      marginBottom: spacing.xl,
    },
    headerLogoCompact: {
      width: componentSizes.headerLogoCompact,
      height: componentSizes.headerLogoCompact,
      borderRadius: componentSizes.headerLogoCompact / 2,
    },
    headerTitleCompact: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.body,
      color: colors.ink,
    },

    // ── AREA CINCIN ──
    ringArea: {
      flex: 1,
      minHeight: 0,
      alignItems: "center",
      justifyContent: "center",
    },

    // ── TOMBOL PRIMER ──
    primaryButton: {
      minHeight: componentSizes.primaryButtonHeight,
      marginTop: spacing.lg,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
      borderRadius: borderRadius.full,
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.xxl,
    },
    primaryButtonPressed: {
      backgroundColor: colors.primaryPressed,
      transform: [{ scale: 0.98 }],
    },
    primaryButtonText: {
      fontFamily: fontFamily.semibold,
      color: colors.onPrimary,
      fontSize: fontSize.body,
      letterSpacing: 0.2,
    },

    // ── TOMBOL SEKUNDER ──
    ghostButton: {
      minHeight: componentSizes.primaryButtonHeight,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.xxl,
    },
    ghostButtonText: {
      fontFamily: fontFamily.semibold,
      color: colors.ink,
      fontSize: fontSize.bodySm,
    },

    // ── JUDUL SEKSI ──
    sectionTitle: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.bodySm,
      color: colors.inkSoft,
      letterSpacing: 0.4,
    },
    sectionEyebrow: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.micro,
      color: colors.muted,
      letterSpacing: 1.4,
      textTransform: "uppercase",
    },

    // ── TARGET ROW LEGACY ──
    targetRow: {
      marginTop: spacing.lg,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.hairline,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
    },
    targetLabel: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.micro,
      color: colors.muted,
      marginRight: spacing.xs,
    },
    targetInput: {
      flex: 1,
      height: componentSizes.targetInputHeight,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      fontFamily: fontFamily.medium,
      fontSize: fontSize.body,
      color: colors.ink,
    },
  });
}

export type GlobalStyles = ReturnType<typeof makeGlobalStyles>;
