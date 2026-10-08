import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, Button, Dimensions, Image, Pressable, ScrollView, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DhikrSelector from "../components/DhikrSelector";
import TasbihRing from "../components/TasbihRing";
import { bgGradient, colors, styles } from "../constants/styles";
import { DHIKR_LIST, type Dhikr } from "../data/dhikr";

// Logo aplikasi (aset PNG). Ganti file ini untuk mengganti logo.
const logoTasbih = require("../../assets/images/logo-tasbih.png");

// Ukuran layar sekali baca di level module (tanpa hook).
const { width } = Dimensions.get("window");
// Diameter cincin: muat di layar dengan ruang napas.
const RING_SIZE = Math.min(width - 80, 320);

// Batas target kustom (dipakai saat validasi input).
const TARGET_MIN = 1;
const TARGET_MAX = 9999;

// Isi input target disimpan di variabel biasa, bukan state
// (variabel component di-reset tiap render, jadi diletakkan di sini).
let targetText = "";

// ============================================================
// INDEKS MATERI MODUL 1 (dipakai saat demo / menjawab pertanyaan)
// - Custom Function : handleRingTap, handleStart,
//   handleSelectDhikr, handleApplyTarget.
// - Loop : primitive loop (for + push) di TasbihRing.tsx,
//   FlatList di DhikrSelector.tsx.
// - Type & Array of Objects : interface Dhikr + DHIKR_LIST
//   (data/dhikr.ts) + interface TasbihRingProps.
// - Inline & External Styles : styles.ts (external) + style
//   dinamis di komponen ini (inline).
// - Komponen dasar : View, Text, Image, TextInput, Button,
//   Pressable, ScrollView, FlatList.
// - Library : Ionicons (@expo/vector-icons).
// Catatan: belum ada state (useState) — materi modul berikutnya.
// ============================================================
export default function Index() {
  // Zikir yang tampil (statis — memilih zikir lain butuh state).
  const activeDhikr: Dhikr = DHIKR_LIST[0];

  // ── CUSTOM FUNCTIONS (memanggil function bawaan: Alert) ──
  function handleRingTap() {
    Alert.alert(
      activeDhikr.name,
      `${activeDhikr.description} — target ${activeDhikr.target} kali.`,
    );
  }

  function handleSelectDhikr(dhikr: Dhikr) {
    Alert.alert(
      dhikr.name,
      `${dhikr.description} — target ${dhikr.target} kali.`,
    );
  }

  function handleStart() {
    Alert.alert("Mulai", `Bacaan dimulai: ${activeDhikr.name}.`);
  }

  function handleApplyTarget() {
    const value = Number(targetText);
    if (!Number.isInteger(value) || value < TARGET_MIN || value > TARGET_MAX) {
      Alert.alert(
        "Target tidak valid",
        `Masukkan angka bulat antara ${TARGET_MIN} sampai ${TARGET_MAX}.`,
      );
      return;
    }
    Alert.alert("Target diatur", `Target baru: ${value} kali.`);
  }

  // ── TAMPILAN ──────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {/* Gradient hangat di belakang layar. */}
      <LinearGradient
        colors={bgGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bgFill}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── HEADER (logo + judul) ── */}
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

        {/* ── CINCIN TASBIH ── */}
        <View style={styles.ringArea}>
          <TasbihRing
            size={RING_SIZE}
            dhikr={activeDhikr}
            onTap={handleRingTap}
          />
        </View>

        {/* ── NAVBAR DZIKIR (kartu geser) ── */}
        <DhikrSelector
          data={DHIKR_LIST}
          selectedId={activeDhikr.id}
          onSelect={handleSelectDhikr}
        />

        {/* ── TOMBOL MULAI ── */}
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

        {/* ── TARGET KUSTOM (TextInput + Button) ── */}
        <View style={styles.targetRow}>
          <Text style={styles.targetLabel}>Target</Text>
          <TextInput
            style={styles.targetInput}
            onChangeText={(text) => {
              targetText = text;
            }}
            keyboardType="number-pad"
            placeholder={`cth. ${activeDhikr.target}`}
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
