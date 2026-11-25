/**
 * @file Kartu utama tasbih pada Beranda berisi status sesi, tombol undo, cincin manik 2D/3D, dan reset.
 * @layer Components / Home
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

import BeadRing from "@/components/tasbih/BeadRing";
import BeadRing3D from "@/components/tasbih/BeadRing3D";
import PatternBackground from "@/components/ui/PatternBackground";
import { spacing } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";
import type { Dhikr } from "@/types/dhikr";

interface TasbihHeroCardProps {
  dhikr: Dhikr;
  count: number;
  target: number;
  completed: boolean;
  ringSize: number;
  ambient3D: boolean;
  statusLabel: string;
  onIncrement: () => void;
  onUndo: () => void;
  onReset: () => void;
}

/** Kartu interaktif penghitung tasbih utama yang ditampilkan pada tab Beranda. */
export default function TasbihHeroCard({
  dhikr,
  count,
  target,
  completed,
  ringSize,
  ambient3D,
  statusLabel,
  onIncrement,
  onUndo,
  onReset,
}: TasbihHeroCardProps) {
  const { colors } = useTheme();
  const { global, component } = useAppStyles();

  return (
    <View style={component.hero}>
      <PatternBackground opacity={0.5} />

      <View style={component.heroTopRow}>
        <View style={component.heroHintRow}>
          <View style={component.heroPulseDot} />
          <Text style={component.heroHintText}>{statusLabel}</Text>
        </View>
        <Pressable
          onPress={onUndo}
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
          onTap={onIncrement}
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
          onPress={onReset}
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
  );
}
