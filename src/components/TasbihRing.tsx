import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { colors } from "@/constants";
import { componentStyles } from "@/styles";
import type { Dhikr } from "@/types/dhikr";

const BEAD_COUNT = 33;

const BEAD_RADIUS_RATIO = 0.365;
const BEAD_SIZE_RATIO = 0.057;
const ARABIC_FONT_RATIO = 0.1;
const COUNT_FONT_RATIO = 0.2;

export interface TasbihRingProps {
  size: number;
  dhikr: Dhikr;
  onTap: () => void;
  count: number;
}

export default function TasbihRing({
  size,
  dhikr,
  onTap,
  count,
}: TasbihRingProps) {
  const center = size / 2;
  const radius = size * BEAD_RADIUS_RATIO;
  const beadSize = size * BEAD_SIZE_RATIO;

  // Berapa manik yang "terisi" berdasarkan progres terhadap target.
  const progress = dhikr.target > 0 ? (count % dhikr.target) / dhikr.target : 0;
  const litCount = Math.round(progress * BEAD_COUNT);

  const beads: ReactNode[] = [];
  for (let index = 0; index < BEAD_COUNT; index++) {
    const angle = (index * 360) / BEAD_COUNT - 90;
    const radians = (angle * Math.PI) / 180;
    const isMarker = index === 0;
    const isLit = count > 0 && index <= litCount;

    let beadColor: string = colors.beadUnlit;
    if (isMarker) beadColor = colors.accent;
    else if (isLit) beadColor = dhikr.color;

    beads.push(
      <View
        key={index}
        style={[
          componentStyles.bead,
          {
            width: beadSize,
            height: beadSize,
            borderRadius: beadSize / 2,
            left: center + radius * Math.cos(radians) - beadSize / 2,
            top: center + radius * Math.sin(radians) - beadSize / 2,
            backgroundColor: beadColor,
            shadowColor: isMarker || isLit ? beadColor : "#2B231C",
            shadowOpacity: isMarker ? 0.6 : isLit ? 0.35 : 0.18,
            shadowRadius: isMarker ? 6 : 2,
            elevation: isMarker ? 4 : 1,
          },
        ]}
      />,
    );
  }

  return (
    <Pressable
      onPress={onTap}
      accessibilityRole="button"
      accessibilityLabel={`Info ${dhikr.name}`}
      accessibilityHint="Satu ketukan untuk menghitung"
      style={({ pressed }) => [
        componentStyles.ringPressable,
        { width: size, height: size, borderRadius: size / 2 },
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
    >
      {/* Cincin manik */}
      <View
        pointerEvents="none"
        style={[componentStyles.ringBeads, { width: size, height: size }]}
      >
        {beads}
      </View>

      {/* Angka hitungan di tengah cincin */}
      <View
        pointerEvents="none"
        style={[componentStyles.ringCenter, { paddingHorizontal: size * 0.2 }]}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            componentStyles.ringDhikrName,
            { fontSize: Math.round(size * ARABIC_FONT_RATIO) },
          ]}
        >
          {dhikr.arabic}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
          style={[
            componentStyles.ringCount,
            { fontSize: Math.min(Math.round(size * COUNT_FONT_RATIO), 62) },
          ]}
        >
          {count}
        </Text>
        <Text style={componentStyles.ringTarget}>/ {dhikr.target}</Text>
        <Text style={componentStyles.ringStatus}>Ketuk ring untuk menghitung</Text>
      </View>
    </Pressable>
  );
}
