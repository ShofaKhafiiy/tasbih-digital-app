import { useEffect, useState } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import { colors, styles } from "../constants/styles";

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
  count: number;
  target: number;
  accentColor: string;
  dhikrName: string;
  arabic: string;
  started: boolean;
  disabled: boolean;
  completed: boolean;
  onTap: () => void;
}

/** Cincin tasbih: manik berputar saat diketuk dan manik
 *  menyala mengikuti progres hitungan (gaya LED digital). */
export default function TasbihRing({
  size,
  count,
  target,
  accentColor,
  dhikrName,
  arabic,
  started,
  disabled,
  completed,
  onTap,
}: TasbihRingProps) {
  // Nilai animasi putaran. Bukan ref, agar aman dibaca saat render.
  const [rotation] = useState(() => new Animated.Value(0));
  // Skala angka hitungan saat bertambah (micro-interaction "pop").
  const [countScale] = useState(() => new Animated.Value(1));

  // Setiap hitungan berubah, putar cincin selebar satu manik.
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: -(count * 360) / BEAD_COUNT,
      duration: 480,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [count, rotation]);

  // Angka melonjak kecil tiap ketukan (skip saat hitungan direset ke 0).
  useEffect(() => {
    if (count === 0) return;
    Animated.sequence([
      Animated.timing(countScale, {
        toValue: 1.12,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(countScale, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start();
  }, [count, countScale]);

  const rotateDegrees = rotation.interpolate({
    inputRange: [-10000000, 0, 10000000],
    outputRange: ["-10000000deg", "0deg", "10000000deg"],
  });

  const center = size / 2;
  const radius = size * BEAD_RADIUS_RATIO;
  const beadSize = size * BEAD_SIZE_RATIO;
  // Manik menyala mengikuti progres (manik ke-0 selalu copper = kepala tasbih).
  const litBeads =
    target > 0 ? Math.ceil((count / target) * (BEAD_COUNT - 1)) : 0;

  return (
    <Pressable
      onPress={onTap}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={`Tambah hitungan ${dhikrName}`}
      accessibilityHint="Satu ketukan menambah satu hitungan"
      style={({ pressed }) => [
        styles.ringPressable,
        { width: size, height: size, borderRadius: size / 2 },
        pressed && !disabled ? { transform: [{ scale: 0.97 }] } : null,
      ]}
    >
      {/* Cincin manik yang berputar */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ringRotator,
          { width: size, height: size, transform: [{ rotate: rotateDegrees }] },
        ]}
      >
        {Array.from({ length: BEAD_COUNT }, (_, index) => {
          const angle = (index * 360) / BEAD_COUNT - 90;
          const radians = (angle * Math.PI) / 180;
          const isMarker = index === 0;
          const isLit = isMarker || (index > 0 && index <= litBeads);

          return (
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
                  backgroundColor: isMarker
                    ? colors.accent
                    : isLit
                      ? accentColor
                      : colors.beadUnlit,
                  borderColor: isLit ? "#F3E7D2" : colors.beadUnlitBorder,
                  shadowColor: isLit ? colors.accent : "#2B231C",
                  shadowOpacity: isLit ? 0.6 : 0.18,
                  shadowRadius: isLit ? 6 : 2,
                  elevation: isLit ? 4 : 1,
                },
              ]}
            />
          );
        })}
      </Animated.View>

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
          {arabic}
        </Text>
        <Animated.View style={{ transform: [{ scale: countScale }] }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
            style={[
              styles.ringCount,
              { fontSize: Math.min(Math.round(size * COUNT_FONT_RATIO), 62) },
            ]}
          >
            {count}
          </Text>
        </Animated.View>
        <Text style={styles.ringTarget}>/ {target}</Text>
        <Text
          style={[styles.ringStatus, completed && { color: colors.accent }]}
        >
          {completed
            ? "Target tercapai"
            : !started
              ? "Tekan Mulai dulu"
              : disabled
                ? "Sebentar lagi..."
                : "Ketuk untuk menghitung"}
        </Text>
      </View>
    </Pressable>
  );
}