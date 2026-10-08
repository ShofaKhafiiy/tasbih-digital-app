import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, componentSizes, screenPadding } from "../constants";
import { fontSize, fontWeight } from "../constants/typography";

// ============================================================
// STYLE GLOBAL (layout, container, scroll, header)
// ============================================================
export const globalStyles = StyleSheet.create({
  // ── KONTAINER ──
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bgFill: {
    ...StyleSheet.absoluteFill,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: screenPadding.horizontal,
    paddingTop: screenPadding.top,
    paddingBottom: screenPadding.bottom,
  },

  // ── HEADER (di tengah) ──
  header: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  headerLogo: {
    width: componentSizes.headerLogo,
    height: componentSizes.headerLogo,
    borderRadius: componentSizes.headerLogo / 2,
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.extrabold,
    color: colors.ink,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.inkSoft,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  // Ornamen Islami tipis di bawah header (garis-lambang-garis).
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

  // ── AREA CINCIN (di tengah sisa ruang) ──
  ringArea: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── TARGET ROW (TextInput + Button) ──
  targetRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: borderRadius.lg,
    padding: componentSizes.targetRowPadding,
  },
  targetLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.muted,
    marginRight: spacing.xs,
  },
  targetInput: {
    flex: 1,
    height: componentSizes.targetInputHeight,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.xl,
    color: colors.ink,
  },

  // ── TOMBOL PRIMER ──
  primaryButton: {
    minHeight: componentSizes.primaryButtonHeight,
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
  },
});