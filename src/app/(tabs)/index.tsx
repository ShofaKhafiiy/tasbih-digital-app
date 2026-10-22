import { Dimensions, ScrollView, View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { globalStyles } from "@/styles";
import { colors } from "@/constants";
import { DHIKR_LIST } from "@/data/dhikr";
import Header from "@/components/ui/Header";
import StartButton from "@/components/ui/StartButton";
import TargetInputRow from "@/components/ui/TargetInputRow";
import TasbihRing from "@/components/TasbihRing";
import DhikrSelector from "@/components/DhikrSelector";

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
  const [activeDhikr, setActiveDhikr] = useState(DHIKR_LIST[0]);
  const [targetText, setTargetText] = useState("");

  function handleRingTap() {
    Alert.alert(
      activeDhikr.name,
      `${activeDhikr.description} — target ${activeDhikr.target} kali.`
    );
  }

  function handleSelectDhikr(dhikr: typeof activeDhikr) {
    setActiveDhikr(dhikr);
    Alert.alert(dhikr.name, `${dhikr.description} — target ${dhikr.target} kali.`);
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
      Alert.alert(
        "Target tidak valid",
        `Masukkan angka bulat antara ${TARGET_MIN} sampai ${TARGET_MAX}.`
      );
      return;
    }
    Alert.alert("Target diatur", `Target baru: ${value} kali.`);
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

        {/* ── CINCIN TASBIH ── */}
        <View style={globalStyles.ringArea}>
          <TasbihRing
            size={RING_SIZE}
            dhikr={activeDhikr}
            onTap={handleRingTap}
            count={0}
          />
        </View>

        {/* ── NAVBAR DZIKIR (kartu geser) ── */}
        <DhikrSelector
          data={DHIKR_LIST}
          selectedId={activeDhikr.id}
          onSelect={handleSelectDhikr}
        />

        {/* ── TOMBOL MULAI ── */}
        <StartButton onPress={handleStart} />

        {/* ── TARGET KUSTOM (TextInput + Button) ── */}
        <TargetInputRow
          targetText={targetText}
          onChangeText={setTargetText}
          onApply={handleApplyTarget}
          placeholder={`cth. ${activeDhikr.target}`}
        />
      </ScrollView>
    </View>
  );
}