import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { colors, styles } from "../constants/styles";
import type { Dhikr } from "../data/dhikr";

// Jumlah manik pada cincin. Satu putaran penuh = 33 manik.
const BEAD_COUNT = 33;

// Proporsi geometri manik (relatif terhadap ukuran ring).
const BEAD_RADIUS_RATIO = 0.365; // radius lingkaran manik
const BEAD_SIZE_RATIO = 0.057; // diameter tiap manik
// Proporsi ukuran teks di tengah ring.
const ARABIC_FONT_RATIO = 0.1;
const COUNT_FONT_RATIO = 0.2;

export interface TasbihRingProps {
  size: number;
  dhikr: Dhikr;
  onTap: () => void;
}

/** Cincin tasbih statis: 33 manik tersusun melingkar
 *  dengan angka hitungan 0 di tengah. */
export default function TasbihRing({ size, dhikr, onTap }: TasbihRingProps) {
  const center = size / 2;
  const radius = size * BEAD_RADIUS_RATIO;
  const beadSize = size * BEAD_SIZE_RATIO;

  // Primitive loop: susun manik di luar JSX (JSX hanya menerima expression),
  // lalu render array-nya di dalam return.
  const beads: ReactNode[] = [];
  for (let index = 0; index < BEAD_COUNT; index++) {
    const angle = (index * 360) / BEAD_COUNT - 90;
    const radians = (angle * Math.PI) / 180;
    const isMarker = index === 0; // manik kepala selalu menyala

    beads.push(
      <View
        key={index}
        style={[
          styles.bead,
          {
            width: beadSize,
            height: beadSize,
            borderRadius: beadSize / 2,
            left: center + radius * Math.cos(radians) - beadSize / 2,
            top: center + radius * Math.sin(radians) - beadSize / 2,
            backgroundColor: isMarker ? colors.accent : colors.beadUnlit,
            shadowColor: isMarker ? colors.accent : "#2B231C",
            shadowOpacity: isMarker ? 0.6 : 0.18,
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
      accessibilityHint="Satu ketukan menampilkan info bacaan"
      style={({ pressed }) => [
        styles.ringPressable,
        { width: size, height: size, borderRadius: size / 2 },
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
    >
      {/* Cincin manik */}
      <View pointerEvents="none" style={[styles.ringBeads, { width: size, height: size }]}>
        {beads}
      </View>

      {/* Angka hitungan di tengah cincin */}
      <View
        pointerEvents="none"
        style={[styles.ringCenter, { paddingHorizontal: size * 0.2 }]}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            styles.ringDhikrName,
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
            styles.ringCount,
            { fontSize: Math.min(Math.round(size * COUNT_FONT_RATIO), 62) },
          ]}
        >
          0
        </Text>
        <Text style={styles.ringTarget}>/ {dhikr.target}</Text>
        <Text style={styles.ringStatus}>Ketuk ring untuk info</Text>
      </View>
    </Pressable>
  );
}
