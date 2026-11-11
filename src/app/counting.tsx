import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Alert,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BeadRing from "@/components/tasbih/BeadRing";
import BeadRing3D from "@/components/tasbih/BeadRing3D";
import CompletionOverlay from "@/components/tasbih/CompletionOverlay";
import { screenPadding, spacing } from "@/constants";
import { useActiveSession } from "@/context/ActiveSessionContext";
import { useSettings } from "@/context/SettingsContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

const TARGET_MIN = 1;
const TARGET_MAX = 9999;

export default function Counting() {
  const params = useLocalSearchParams<{ id?: string; target?: string }>();
  const { colors } = useTheme();
  const { global, component } = useAppStyles();
  const { ambient3D } = useSettings();
  const {
    dhikr,
    count,
    target,
    completed,
    increment,
    undo,
    reset,
    finish,
    selectDhikr,
    setTarget,
  } = useActiveSession();

  const { width } = useWindowDimensions();
  const ringSize = Math.max(160, Math.min(width - 96, 332));
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (params.id) selectDhikr(params.id);

    const nextTarget = Number(params.target);
    if (
      Number.isInteger(nextTarget) &&
      nextTarget >= TARGET_MIN &&
      nextTarget <= TARGET_MAX
    ) {
      setTarget(nextTarget);
    }
  }, [params.id, params.target, selectDhikr, setTarget]);

  function goHome() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/");
  }

  function handleClose() {
    if (count > 0 && !completed) {
      Alert.alert(
        "Keluar dari sesi?",
        "Hitungan saat ini akan disimpan ke riwayat.",
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Keluar",
            style: "destructive",
            onPress: () => {
              finish();
              goHome();
            },
          },
        ],
      );
      return;
    }

    finish();
    goHome();
  }

  function handleFinish() {
    finish();
    goHome();
  }

  function handleReset() {
    if (count === 0) return;
    Alert.alert("Reset hitungan?", "Hitungan saat ini akan dikembalikan ke 0.", [
      { text: "Batal", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: reset },
    ]);
  }

  function handleViewResult() {
    router.replace({
      pathname: "/recap",
      params: {
        id: dhikr.id,
        target: String(target),
        count: String(count),
      },
    });
    reset();
  }

  return (
    <SafeAreaView style={global.container} edges={["top", "bottom"]}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: screenPadding.horizontal,
          paddingTop: spacing.md,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: spacing.xl,
          }}
        >
          <Pressable
            onPress={handleClose}
            style={global.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Keluar dari mode fokus"
          >
            <Ionicons name="chevron-back" size={22} color={colors.inkSoft} />
          </Pressable>

          <View style={{ alignItems: "center" }}>
            <Text style={global.sectionEyebrow}>Mode fokus</Text>
            <Text style={global.headerTitleCompact}>{dhikr.name}</Text>
          </View>

          <Pressable
            onPress={undo}
            disabled={count === 0 || completed}
            style={({ pressed }) => [
              global.iconButton,
              pressed && { opacity: 0.7 },
              (count === 0 || completed) && { opacity: 0.35 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Batalkan satu hitungan"
            accessibilityState={{ disabled: count === 0 || completed }}
          >
            <Ionicons name="arrow-undo" size={18} color={colors.inkSoft} />
          </Pressable>
        </View>

        <View style={[global.ringArea, { flex: 1 }]}>
          <View
            style={{
              width: ringSize,
              height: ringSize,
              alignSelf: "center",
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
              ? "Target tercapai. Lanjutkan atau selesaikan sesi."
              : `Target ${target} kali — ketuk cincin untuk menghitung`}
          </Text>
        </View>

        <View style={component.countingActions}>
          <Pressable
            onPress={handleReset}
            style={component.countingGhostButton}
            accessibilityRole="button"
          >
            <Text style={component.countingGhostText}>Reset</Text>
          </Pressable>
          <Pressable
            onPress={handleFinish}
            style={global.primaryButton}
            accessibilityRole="button"
          >
            <Text style={global.primaryButtonText}>Selesai</Text>
          </Pressable>
        </View>
      </View>

      <CompletionOverlay
        visible={completed}
        dhikrName={dhikr.name}
        target={target}
        onClose={handleFinish}
        onViewResult={handleViewResult}
      />
    </SafeAreaView>
  );
}
