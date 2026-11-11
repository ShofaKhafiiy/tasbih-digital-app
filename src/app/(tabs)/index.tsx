import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BrandMark from "@/components/brand/BrandMark";
import DhikrCarousel from "@/components/home/DhikrCarousel";
import PrayerTimesBar from "@/components/home/PrayerTimesBar";
import TargetSheet from "@/components/home/TargetSheet";
import TodayRibbon from "@/components/home/TodayRibbon";
import BeadRing from "@/components/tasbih/BeadRing";
import BeadRing3D from "@/components/tasbih/BeadRing3D";
import CompletionOverlay from "@/components/tasbih/CompletionOverlay";
import PatternBackground from "@/components/ui/PatternBackground";
import { spacing } from "@/constants";
import { useActiveSession } from "@/context/ActiveSessionContext";
import { useSessions } from "@/context/SessionsContext";
import { useSettings } from "@/context/SettingsContext";
import { useTheme } from "@/context/ThemeContext";
import { DHIKR_LIST } from "@/data/dhikr";
import { usePrayerSchedule } from "@/hooks/usePrayerSchedule";
import { schedulePrayerReminders } from "@/services/prayerNotificationService";
import { useAppStyles } from "@/styles";
import type { Dhikr } from "@/types/dhikr";

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function Home() {
  const { colors } = useTheme();
  const { global, component } = useAppStyles();
  const { sessions } = useSessions();
  const { ambient3D } = useSettings();
  const {
    dhikr,
    count,
    target,
    completed,
    increment,
    undo,
    reset,
    selectDhikr,
    setTarget,
  } = useActiveSession();

  const { width } = useWindowDimensions();
  const ringSize = Math.max(160, Math.min(width - 108, 296));
  const [targetOpen, setTargetOpen] = useState(false);

  const { schedules: prayerSchedules, loading: prayerLoading } =
    usePrayerSchedule();

  useEffect(() => {
    if (prayerLoading || prayerSchedules.length === 0) return;
    schedulePrayerReminders(prayerSchedules).catch((error) => {
      console.warn("Gagal mengatur pengingat salat:", error);
    });
  }, [prayerLoading, prayerSchedules]);

  const dateLabel = useMemo(() => {
    const now = new Date();
    return `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]}`;
  }, []);

  const todayStats = useMemo(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    let todayCount = 0;
    let todaySessions = 0;
    for (const session of sessions) {
      if (session.finishedAt >= startOfDay.getTime()) {
        todaySessions += 1;
        todayCount += session.count;
      }
    }
    return { count: todayCount, sessions: todaySessions };
  }, [sessions]);

  function handleSelectDhikr(next: Dhikr) {
    if (next.id === dhikr.id) return true;

    if (count > 0 && !completed) {
      Alert.alert(
        "Ganti dzikir?",
        `Hitungan ${count} untuk ${dhikr.name} akan direset.`,
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Ganti",
            style: "destructive",
            onPress: () => selectDhikr(next.id),
          },
        ],
      );
      return false;
    }

    selectDhikr(next.id);
    return true;
  }

  function handleReset() {
    if (count === 0) return;
    Alert.alert(
      "Reset hitungan?",
      "Hitungan saat ini akan dikembalikan ke 0.",
      [
        { text: "Batal", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: reset },
      ],
    );
  }

  function handleStartFocus() {
    if (completed || count === 0) reset();
    router.push("/counting");
  }

  function handleViewResult() {
    router.push({
      pathname: "/recap",
      params: {
        id: dhikr.id,
        target: String(target),
        count: String(count),
      },
    });
    reset();
  }

  const statusLabel = completed
    ? "Target tercapai"
    : count > 0
      ? "Sedang menghitung"
      : "Siap menghitung";

  return (
    <SafeAreaView style={global.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={global.tabScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={global.appHeader}>
          <View style={global.brandRow}>
            <BrandMark size={40} />
            <View style={global.brandText}>
              <Text style={global.brandName}>Tasbih Digital</Text>
              <Text style={global.brandTagline}>{dateLabel}</Text>
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/settings")}
            style={global.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Buka pengaturan"
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color={colors.inkSoft}
            />
          </Pressable>
        </View>

        <PrayerTimesBar schedules={prayerSchedules} />

        <View style={component.hero}>
          <PatternBackground opacity={0.5} />

          <View style={component.heroTopRow}>
            <View style={component.heroHintRow}>
              <View style={component.heroPulseDot} />
              <Text style={component.heroHintText}>{statusLabel}</Text>
            </View>
            <Pressable
              onPress={undo}
              disabled={count === 0 || completed}
              accessibilityRole="button"
              accessibilityLabel="Batalkan satu hitungan"
              accessibilityState={{ disabled: count === 0 || completed }}
              style={({ pressed }) => [
                component.heroUndo,
                pressed && { opacity: 0.7 },
                (count === 0 || completed) && { opacity: 0.35 },
              ]}
            >
              <Ionicons name="arrow-undo" size={18} color={colors.inkSoft} />
            </Pressable>
          </View>

          <Text style={component.heroArabic} allowFontScaling={false}>
            {dhikr.arabic}
          </Text>
          <Text style={component.heroName}>{dhikr.name}</Text>

          <View
            style={{
              width: ringSize,
              height: ringSize,
              alignSelf: "center",
              marginTop: spacing.md,
            }}
          >
            <BeadRing3D size={ringSize} enabled={ambient3D} />
            <BeadRing
              size={ringSize}
              count={count}
              target={target}
              onTap={increment}
              disabled={completed}
            />
          </View>

          <Text style={component.ringHint}>
            {completed
              ? "Putaran selesai — mulai putaran baru atau lihat hasil."
              : "Ketuk cincin untuk menghitung"}
          </Text>

          {count > 0 && !completed && (
            <Pressable
              onPress={handleReset}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Reset hitungan"
              style={{ alignSelf: "center", marginTop: spacing.md }}
            >
              <Text
                style={[
                  global.sectionTitle,
                  { color: colors.danger, fontSize: 12 },
                ]}
              >
                Reset
              </Text>
            </Pressable>
          )}
        </View>

        <View style={component.ctaRow}>
          <Pressable
            onPress={handleStartFocus}
            style={({ pressed }) => [
              global.primaryButton,
              component.ctaPrimary,
              pressed && global.primaryButtonPressed,
            ]}
            accessibilityRole="button"
          >
            <Ionicons
              name={completed ? "refresh" : "play"}
              size={18}
              color={colors.onPrimary}
            />
            <Text style={global.primaryButtonText}>
              {completed
                ? "Putaran Baru"
                : count > 0
                  ? "Lanjut Fokus"
                  : "Mulai Fokus"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTargetOpen(true)}
            style={({ pressed }) => [
              global.ghostButton,
              component.ctaSecondary,
              pressed && { opacity: 0.8 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Atur target, saat ini ${target}`}
          >
            <Ionicons name="flag-outline" size={18} color={colors.ink} />
            <Text style={global.ghostButtonText}>Target</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: spacing.xxl }}>
          <Text style={global.sectionEyebrow}>Pilih dzikir</Text>
          <View style={component.carouselWrap}>
            <DhikrCarousel
              data={DHIKR_LIST}
              selectedId={dhikr.id}
              onSelect={handleSelectDhikr}
            />
          </View>
        </View>

        <TodayRibbon count={todayStats.count} sessions={todayStats.sessions} />
      </ScrollView>

      <TargetSheet
        visible={targetOpen}
        target={target}
        onClose={() => setTargetOpen(false)}
        onApply={setTarget}
      />

      <CompletionOverlay
        visible={completed}
        dhikrName={dhikr.name}
        target={target}
        onClose={reset}
        onViewResult={handleViewResult}
      />
    </SafeAreaView>
  );
}
