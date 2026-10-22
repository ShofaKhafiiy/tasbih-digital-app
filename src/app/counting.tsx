import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View, Alert, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { globalStyles } from "@/styles";
import { DHIKR_LIST } from "@/data/dhikr";
import type { Dhikr } from "@/types/dhikr";
import Header from "@/components/ui/Header";
import TasbihRing from "@/components/TasbihRing";

const { width } = Dimensions.get("window");
const RING_SIZE = Math.min(width - 80, 320);
const TARGET_MIN = 1;
const TARGET_MAX = 9999;

export default function Counting() {
  const params = useLocalSearchParams<{ id?: string; target?: string }>();

  const [activeDhikr] = useState<Dhikr>(() => {
    const found = DHIKR_LIST.find((d) => d.id === params.id);
    return found ?? DHIKR_LIST[0];
  });

  const [effectiveTarget] = useState<number>(() => {
    const t = Number(params.target);
    if (Number.isInteger(t) && t >= TARGET_MIN && t <= TARGET_MAX) return t;
    return activeDhikr.target;
  });

  const [count, setCount] = useState(0);
  const completedRef = useRef(false);

  // useEffect: dipicu saat count mencapai target (useState + useEffect)
  useEffect(() => {
    if (completedRef.current) return;
    if (effectiveTarget <= 0 || count < effectiveTarget) return;

    completedRef.current = true;
    Alert.alert(
      "Selesai",
      `Target ${effectiveTarget} kali untuk ${activeDhikr.name} tercapai.`,
      [
        {
          text: "Lihat Hasil",
          onPress: () =>
            router.replace({
              pathname: "/recap",
              params: {
                id: activeDhikr.id,
                target: String(effectiveTarget),
                count: String(count),
              },
            }),
        },
        { text: "Kembali", onPress: () => router.replace("/") },
      ],
      { cancelable: false },
    );
  }, [count, effectiveTarget, activeDhikr]);

  function handleRingTap() {
    if (completedRef.current) return;
    setCount((c) => c + 1);
  }

  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header subtitle={`Target: ${effectiveTarget} kali`} />
      <View style={globalStyles.ringArea}>
        <TasbihRing size={RING_SIZE} dhikr={activeDhikr} onTap={handleRingTap} count={count} />
      </View>
      <Pressable
        onPress={() => router.back()}
        style={[globalStyles.primaryButton, { marginTop: 16 }]}
      >
        <Text style={globalStyles.primaryButtonText}>Kembali</Text>
      </Pressable>
    </ScrollView>
  );
}
