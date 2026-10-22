import { useEffect, useRef, useState } from "react";
import { Pressable, View, Text, Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { globalStyles, componentStyles } from "@/styles";
import { DHIKR_LIST } from "@/data/dhikr";
import type { Dhikr } from "@/types/dhikr";
import { useSessions } from "@/context/SessionsContext";
import { useSettings } from "@/context/SettingsContext";
import { useTapCooldown } from "@/hooks/useTapCooldown";
import Header from "@/components/ui/Header";
import TasbihRing from "@/components/TasbihRing";

const { width } = Dimensions.get("window");
const RING_SIZE = Math.min(width - 60, 340);
const TARGET_MIN = 1;
const TARGET_MAX = 9999;

export default function Counting() {
  const params = useLocalSearchParams<{ id?: string; target?: string }>();
  const { addSession } = useSessions();
  const { hapticsEnabled } = useSettings();
  const canTap = useTapCooldown();

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
  const startedAtRef = useRef(0);
  const completed = count >= effectiveTarget && effectiveTarget > 0;

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (completedRef.current) return;
    if (effectiveTarget <= 0 || count < effectiveTarget) return;

    completedRef.current = true;

    addSession({
      id: `${activeDhikr.id}-${Date.now()}`,
      dhikrId: activeDhikr.id,
      count,
      target: effectiveTarget,
      startedAt: startedAtRef.current,
      finishedAt: Date.now(),
    });

    if (hapticsEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [count, effectiveTarget, activeDhikr, addSession, hapticsEnabled]);

  function handleRingTap() {
    if (completedRef.current) return;
    if (!canTap()) return;
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setCount((c) => c + 1);
  }

  function handleViewResult() {
    router.replace({
      pathname: "/recap",
      params: {
        id: activeDhikr.id,
        target: String(effectiveTarget),
        count: String(count),
      },
    });
  }

  function handleCloseCompletion() {
    router.replace("/");
  }

  function handleReset() {
    completedRef.current = false;
    setCount(0);
  }

  return (
    <View style={globalStyles.container}>
      {completed && (
        <View style={componentStyles.completionOverlay}>
          <View style={componentStyles.completionCard}>
            <Text style={componentStyles.completionTitle}>Target Tercapai</Text>
            <Text style={componentStyles.completionText}>
              {effectiveTarget} kali {activeDhikr.name} selesai.
            </Text>
            <View style={componentStyles.completionButtonRow}>
              <Pressable
                onPress={handleCloseCompletion}
                style={componentStyles.completionGhostButton}
              >
                <Text style={componentStyles.completionGhostText}>Kembali</Text>
              </Pressable>
              <Pressable
                onPress={handleViewResult}
                style={[globalStyles.primaryButton, { flex: 1, marginTop: 0 }]}
              >
                <Text style={globalStyles.primaryButtonText}>Lihat Hasil</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <View style={globalStyles.scrollContent}>
        <Header compact subtitle={activeDhikr.name} />

        <View style={globalStyles.ringArea}>
          <TasbihRing
            size={RING_SIZE}
            dhikr={activeDhikr}
            onTap={handleRingTap}
            count={count}
          />
          <Text style={componentStyles.ringStatus}>
            Target {effectiveTarget} kali
          </Text>
        </View>

        <View style={componentStyles.countingActions}>
          <Pressable onPress={handleReset} style={componentStyles.countingGhostButton}>
            <Text style={componentStyles.countingGhostText}>Reset</Text>
          </Pressable>
          <Pressable onPress={() => router.back()} style={globalStyles.primaryButton}>
            <Text style={globalStyles.primaryButtonText}>Selesai</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
