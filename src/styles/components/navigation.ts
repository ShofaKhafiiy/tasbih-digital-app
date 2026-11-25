/**
 * @file Style komponen navigasi tab mengambang (FloatingTabBar).
 * @layer Styles
 */

import { StyleSheet } from "react-native";

import {
  borderRadius,
  componentSizes,
  fontFamily,
  fontSize,
  spacing,
} from "@/constants";
import type { AppColors } from "@/constants/colors";

/**
 * Menghasilkan kumpulan style untuk tab bar mengambang.
 *
 * @param colors - Palet warna tema aktif (terang/gelap).
 * @returns Objek StyleSheet untuk navigasi tab.
 */
export function makeNavigationStyles(colors: AppColors) {
  return StyleSheet.create({
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
  });
}
