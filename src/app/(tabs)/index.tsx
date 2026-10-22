import { Dimensions, ScrollView, View, StyleSheet, Pressable, Text } from "react-native";
import { useMemo, useState } from "react";
import { router, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles, componentStyles } from "@/styles";
import { colors } from "@/constants";
import { DHIKR_LIST } from "@/data/dhikr";
import type { Dhikr } from "@/types/dhikr";
import { useSessions } from "@/context/SessionsContext";
import Header from "@/components/ui/Header";
import StartButton from "@/components/ui/StartButton";
import TargetInputRow from "@/components/ui/TargetInputRow";
import TasbihRing from "@/components/TasbihRing";
import DhikrSelector from "@/components/DhikrSelector";
import InfoBanner from "@/components/ui/InfoBanner";

const { width } = Dimensions.get("window");
const RING_SIZE = Math.min(width - 80, 320);

const TARGET_MIN = 1;
const TARGET_MAX = 9999;

const gradientStyle = StyleSheet.create({
  bgFill: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
});

export default function Index() {
  const [activeDhikr, setActiveDhikr] = useState<Dhikr>(DHIKR_LIST[0]);
  const [targetText, setTargetText] = useState("");
  const [banner, setBanner] = useState<{
    title: string;
    message: string;
    tone: "info" | "error" | "success";
  } | null>(null);
  const { sessions } = useSessions();

  // Statistik hari ini, dihitung dari sessions (loop + filter).
  const todayStats = useMemo(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    let todayCount = 0;
    let todaySessions = 0;
    for (const s of sessions) {
      if (s.finishedAt >= startOfDay.getTime()) {
        todaySessions += 1;
        todayCount += s.count;
      }
    }
    return { todaySessions, todayCount };
  }, [sessions]);

  function handleRingTap() {
    setBanner({
      title: activeDhikr.name,
      message: `${activeDhikr.description} — target ${activeDhikr.target} kali.`,
      tone: "info",
    });
  }

  function handleSelectDhikr(dhikr: Dhikr) {
    setActiveDhikr(dhikr);
    setBanner({
      title: dhikr.name,
      message: `${dhikr.description} — target ${dhikr.target} kali.`,
      tone: "info",
    });
  }

  function handleStart() {
    const value = Number(targetText);
    const hasValidCustom =
      targetText.trim() !== "" &&
      Number.isInteger(value) &&
      value >= TARGET_MIN &&
      value <= TARGET_MAX;

    router.push({
      pathname: "/counting",
      params: {
        id: activeDhikr.id,
        ...(hasValidCustom ? { target: String(value) } : {}),
      },
    });
  }

  function handleApplyTarget() {
    const value = Number(targetText);
    if (!Number.isInteger(value) || value < TARGET_MIN || value > TARGET_MAX) {
      setBanner({
        title: "Target tidak valid",
        message: `Masukkan angka bulat antara ${TARGET_MIN} sampai ${TARGET_MAX}.`,
        tone: "error",
      });
      return;
    }
    setBanner({ title: "Target diatur", message: `Target baru: ${value} kali.`, tone: "success" });
    setTargetText("");
  }

  return (
    <View style={globalStyles.container}>
      <View style={gradientStyle.bgFill} />
      <ScrollView
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />

        <InfoBanner
          visible={banner !== null}
          title={banner?.title ?? ""}
          message={banner?.message ?? ""}
          tone={banner?.tone ?? "info"}
          onClose={() => setBanner(null)}
        />

        <View style={globalStyles.ringArea}>
          <TasbihRing
            size={RING_SIZE}
            dhikr={activeDhikr}
            onTap={handleRingTap}
            count={0}
          />
        </View>

        {/* ── KARTU STATISTIK HARI INI ── */}
        <View style={componentStyles.dashboardRow}>
          <View style={componentStyles.dashboardCard}>
            <Ionicons name="repeat" size={18} color={colors.primary} />
            <Text style={componentStyles.dashboardValue}>{todayStats.todayCount}</Text>
            <Text style={componentStyles.dashboardLabel}>Hitungan hari ini</Text>
          </View>
          <View style={componentStyles.dashboardCard}>
            <Ionicons name="albums" size={18} color={colors.accent} />
            <Text style={componentStyles.dashboardValue}>{todayStats.todaySessions}</Text>
            <Text style={componentStyles.dashboardLabel}>Sesi terselesaikan</Text>
          </View>
        </View>

        {/* ── NAVBAR DZIKIR (kartu geser) ── */}
        <DhikrSelector
          data={DHIKR_LIST}
          selectedId={activeDhikr.id}
          onSelect={handleSelectDhikr}
        />

        {/* ── TARGET KUSTOM (TextInput + Button) ── */}
        <TargetInputRow
          targetText={targetText}
          onChangeText={setTargetText}
          onApply={handleApplyTarget}
          placeholder={`cth. ${activeDhikr.target}`}
        />

        {/* ── TOMBOL MULAI ── */}
        <StartButton onPress={handleStart} />

        {/* ── SHORTCUT ── */}
        <View style={componentStyles.shortcutRow}>
          <Link href="/history" asChild>
            <Pressable style={componentStyles.shortcutButton}>
              <Ionicons name="time-outline" size={16} color={colors.inkSoft} />
              <Text style={componentStyles.shortcutText}>Riwayat</Text>
            </Pressable>
          </Link>
          <Link href="/panduan" asChild>
            <Pressable style={componentStyles.shortcutButton}>
              <Ionicons name="book-outline" size={16} color={colors.inkSoft} />
              <Text style={componentStyles.shortcutText}>Panduan</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
