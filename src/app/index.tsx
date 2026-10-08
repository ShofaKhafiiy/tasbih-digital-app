import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DhikrSelector from "../components/DhikrSelector";
import TasbihRing from "../components/TasbihRing";
import { colors, bgGradient, styles } from "../constants/styles";
import { DHIKR_LIST, type Dhikr } from "../data/dhikr";

// Logo aplikasi (aset PNG). Ganti file ini untuk mengganti logo.
const logoTasbih = require("../../assets/images/logo-tasbih.png");

// Jeda minimal antar ketukan (mencegah hitungan terlewat dobel).
const TAP_COOLDOWN_MS = 400;

// Batas target kustom (dipakai saat validasi input).
const TARGET_MIN = 1;
const TARGET_MAX = 9999;

// Ruang napas ring terhadap kotak area (agar tidak menempel pinggir).
const RING_PADDING_X = 24;
const RING_PADDING_Y = 12;

// ============================================================
// INDEKS MATERI MODUL 1 (dipakai saat demo / menjawab pertanyaan)
// - Custom Function & Loop : handler handle* di file ini + loop
//   Array.from() di TasbihRing.tsx (render 33 manik).
// - Type & Array of Objects : interface Dhikr + DHIKR_LIST (dhikr.ts).
// - Inline & External Styles : file styles.ts (external) + warna
//   zikir/ukuran ring di sini (inline).
// - Komponen dasar : View, Text, Image, TextInput, Button,
//   Pressable, ScrollView (wrapper), FlatList (DhikrSelector).
// ============================================================
export default function Index() {
  // ── STATE ─────────────────────────────────────────────────
  const [selected, setSelected] = useState<Dhikr>(DHIKR_LIST[0]);
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState<number>(DHIKR_LIST[0].target);
  const [targetInput, setTargetInput] = useState("");
  // Alur kontrol bawah: idle (Mulai) → running (progress bar) →
  // completed (Putaran Baru). false = idle, true = aktif menghitung.
  const [started, setStarted] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  // Ukuran area cincin hasil onLayout (agar ring muat satu layar).
  const [ringBox, setRingBox] = useState({ width: 0, height: 0 });

  // Ref hanya untuk menjaga jeda ketukan (dipakai di handler, bukan render).
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── NILAI TURUNAN (dihitung saat render) ──────────────────
  const progress = Math.min((count / target) * 100, 100);
  const completed = started && count >= target;
  // Ukuran cincin = sisi terpendek area, dikurangi ruang napas.
  const ringSize =
    ringBox.width > 0 && ringBox.height > 0
      ? Math.min(
          ringBox.width - RING_PADDING_X,
          ringBox.height - RING_PADDING_Y,
        )
      : 0;

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  // ── HANDLER ───────────────────────────────────────────────
  function clearCooldown() {
    cooldownRef.current = false;
    setIsCoolingDown(false);
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
  }

  function onRingAreaLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setRingBox({ width, height });
  }

  function handleStart() {
    Haptics.selectionAsync();
    setStarted(true);
  }

  function handleTap() {
    if (!started || cooldownRef.current || completed) return;

    cooldownRef.current = true;
    setIsCoolingDown(true);
    const nextCount = count + 1;
    setCount(nextCount);

    if (nextCount >= target) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    cooldownTimerRef.current = setTimeout(() => {
      cooldownRef.current = false;
      setIsCoolingDown(false);
      cooldownTimerRef.current = null;
    }, TAP_COOLDOWN_MS);
  }

  function handleSelectDhikr(item: Dhikr) {
    if (item.id === selected.id) return;
    clearCooldown();
    setSelected(item);
    setCount(0);
    setRound(1);
    setTarget(item.target);
    setTargetInput("");
    // Ganti bacaan = kembali ke tombol Mulai (idle).
    setStarted(false);
    Haptics.selectionAsync();
  }

  function handleReset() {
    clearCooldown();
    setCount(0);
    setRound(1);
    setTarget(selected.target);
    setTargetInput("");
    Haptics.selectionAsync();
  }

  function handleNewRound() {
    clearCooldown();
    setCount(0);
    setRound((previous) => previous + 1);
    Haptics.selectionAsync();
  }

  function handleApplyTarget() {
    const value = Number(targetInput);
    if (!Number.isInteger(value) || value < TARGET_MIN || value > TARGET_MAX) {
      Alert.alert(
        "Target tidak valid",
        `Masukkan angka bulat antara ${TARGET_MIN} sampai ${TARGET_MAX}.`,
      );
      return;
    }
    clearCooldown();
    setTarget(value);
    setCount(0);
    setRound(1);
    setTargetInput("");
    setStarted(false);
    Haptics.selectionAsync();
  }

  // ── TAMPILAN ──────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {/* Gradient hangat di belakang layar (kartu glass mengambang di atasnya). */}
      <LinearGradient
        colors={bgGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bgFill}
      />
      {/* ScrollView hanya pembungkus (konten selalu muat satu layar). */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── HEADER (bulan sabit + judul) ── */}
        <View style={styles.header}>
          <Image
            source={logoTasbih}
            style={styles.headerLogo}
            accessibilityLabel="Logo Tasbih Digital"
          />
          <Text style={styles.headerTitle}>Tasbih Digital</Text>
          <Text style={styles.headerSubtitle}>
            Dekat dengan Allah, setiap hari
          </Text>
          {/* Ornamen Islami tipis: garis ─ lambang ─ garis */}
          <View style={styles.arabesque}>
            <View style={styles.arabesqueLine} />
            <Ionicons name="diamond" size={10} color={colors.accent} />
            <View style={styles.arabesqueLine} />
          </View>
        </View>

        {/* ── CINCIN TASBIH (menempati sisa ruang layar) ── */}
        <View style={styles.ringArea} onLayout={onRingAreaLayout}>
          {ringSize > 0 ? (
            <TasbihRing
              size={ringSize}
              count={count}
              target={target}
              accentColor={selected.color}
              dhikrName={selected.name}
              arabic={selected.arabic}
              started={started}
              disabled={isCoolingDown || completed}
              completed={completed}
              onTap={handleTap}
            />
          ) : null}
        </View>

        {completed ? (
          <Text style={[styles.hint, { color: colors.accent }]}>
            Alhamdulillah, target tercapai. Siapkan putaran berikutnya.
          </Text>
        ) : null}

        {/* ── NAVBAR DZIKIR (1 tampilan + panah ‹ ›) ── */}
        <DhikrSelector
          data={DHIKR_LIST}
          selectedId={selected.id}
          onSelect={handleSelectDhikr}
        />

        {/* ── KONTROL BAWAH (Mulai → progress bar → Putaran Baru) ── */}
        {!started ? (
          <Pressable
            onPress={handleStart}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Ionicons name="play" size={18} color={colors.white} />
            <Text style={styles.primaryButtonText}>Mulai</Text>
          </Pressable>
        ) : (
          <View style={styles.controlCard}>
            <View style={styles.controlLabels}>
              <Text style={styles.controlRatio}>
                {count} / {target} kali
              </Text>
              <Text style={styles.controlRound}>Putaran {round}</Text>
              {!completed ? (
                <Pressable
                  onPress={handleReset}
                  accessibilityRole="button"
                  accessibilityLabel="Ulangi hitungan"
                  style={({ pressed }) => [
                    styles.resetBtn,
                    pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] },
                  ]}
                >
                  <Ionicons
                    name="refresh"
                    size={18}
                    color={colors.primary}
                  />
                </Pressable>
              ) : null}
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                    backgroundColor: selected.color,
                  },
                ]}
              />
            </View>
            {completed ? (
              <Pressable
                onPress={handleNewRound}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.primaryButtonPressed,
                ]}
              >
                <Ionicons name="play" size={18} color={colors.white} />
                <Text style={styles.primaryButtonText}>Putaran Baru</Text>
              </Pressable>
            ) : null}
          </View>
        )}

        {/* ── TARGET KUSTOM (TextInput + Button) ── */}
        <View style={styles.targetRow}>
          <Text style={styles.targetLabel}>Target</Text>
          <TextInput
            style={styles.targetInput}
            value={targetInput}
            onChangeText={setTargetInput}
            keyboardType="number-pad"
            placeholder={`cth. ${selected.target}`}
            placeholderTextColor={colors.muted}
            maxLength={4}
            accessibilityLabel="Masukkan target kustom"
          />
          <Button
            title="Atur"
            color={colors.primary}
            onPress={handleApplyTarget}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}