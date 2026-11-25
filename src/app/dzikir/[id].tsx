/**
 * @file Halaman detail dzikir dinamis (`/dzikir/[id]`) dengan pratinjau cincin dan tombol mulai fokus.
 * @layer App / Screens
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BeadRing from "@/components/tasbih/BeadRing";
import Header from "@/components/ui/Header";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";
import { getDhikrById } from "@/utils/dhikr";

const RING_SIZE = 232;

/** Layar detail informasi satu bacaan dzikir berdasarkan parameter rute `id`. */
export default function DzikirDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { global, component } = useAppStyles();
  const dhikr = getDhikrById(id);

  function handleStart() {
    router.push({ pathname: "/counting", params: { id: dhikr.id } });
  }

  return (
    <SafeAreaView style={global.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={global.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header subtitle={dhikr.description} />

        <View style={{ alignItems: "center", paddingVertical: 12 }}>
          <BeadRing
            size={RING_SIZE}
            count={0}
            target={dhikr.target}
            onTap={() => undefined}
            disabled
          />
        </View>

        <Text style={component.detailName}>{dhikr.name}</Text>
        <Text style={component.detailArabic} allowFontScaling={false}>
          {dhikr.arabic}
        </Text>
        <Text style={component.detailDesc}>
          {dhikr.description} — dianjurkan {dhikr.target} kali.
        </Text>

        <Pressable
          onPress={handleStart}
          style={({ pressed }) => [
            global.primaryButton,
            pressed && global.primaryButtonPressed,
          ]}
          accessibilityRole="button"
        >
          <Ionicons name="play" size={18} color={colors.onPrimary} />
          <Text style={global.primaryButtonText}>Mulai Dzikir Ini</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
