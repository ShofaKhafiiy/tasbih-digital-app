import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { globalStyles } from "@/styles";
import { colors, fontSize, fontWeight } from "@/constants";
import { DHIKR_LIST } from "@/data/dhikr";
import Header from "@/components/ui/Header";
import TasbihRing from "@/components/TasbihRing";

const RING_SIZE = 240;

export default function DzikirDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dhikr = DHIKR_LIST.find((d) => d.id === id) ?? DHIKR_LIST[0];

  function handleStart() {
    router.push({ pathname: "/counting", params: { id: dhikr.id } });
  }

  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header subtitle={dhikr.description} />
      <View style={globalStyles.ringArea}>
        <TasbihRing size={RING_SIZE} dhikr={dhikr} onTap={() => {}} count={0} />
      </View>
      <Text style={detailStyles.name}>{dhikr.name}</Text>
      <Text style={detailStyles.arabic}>{dhikr.arabic}</Text>
      <Text style={detailStyles.desc}>
        {dhikr.description} — dianjurkan {dhikr.target} kali.
      </Text>
      <Pressable onPress={handleStart} style={globalStyles.primaryButton}>
        <Text style={globalStyles.primaryButtonText}>Mulai Dzikir Ini</Text>
      </Pressable>
    </ScrollView>
  );
}

const detailStyles = StyleSheet.create({
  name: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.extrabold,
    color: colors.ink,
    textAlign: "center",
    marginTop: 16,
  },
  arabic: {
    fontSize: 24,
    color: colors.inkSoft,
    textAlign: "center",
    marginTop: 8,
  },
  desc: {
    fontSize: fontSize.md,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
});
