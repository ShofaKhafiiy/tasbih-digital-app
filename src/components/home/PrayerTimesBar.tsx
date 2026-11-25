/**
 * @file Banner jadwal salat harian lengkap dengan hitung mundur waktu salat berikutnya dan teks berjalan.
 * @layer Components / Home
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";
import type { PrayerSchedule } from "@/types/prayer";
import { formatCountdown } from "@/utils/dateFormat";
import { getNextPrayer } from "@/utils/prayerTime";

function MarqueeRow({ text }: { text: string }) {
  const { component } = useAppStyles();
  const translateX = useSharedValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const isLooping = viewportWidth > 0 && contentWidth > viewportWidth;

  useEffect(() => {
    if (!isLooping) {
      // eslint-disable-next-line react-hooks/immutability -- Reanimated SharedValue memang mutabel
      translateX.value = 0;
      return;
    }
    // Kecepatan konstan ~40px/detik, minimal 12 detik per putaran.
    const duration = Math.max(12000, contentWidth * 25);
    translateX.value = withRepeat(
      withTiming(-contentWidth, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, [isLooping, contentWidth, translateX]);

  return (
    <View
      style={styles.tickerViewport}
      onLayout={(event) => setViewportWidth(event.nativeEvent.layout.width)}
    >
      {isLooping ? (
        <Animated.View style={[component.prayerTickerRow, animatedStyle]}>
          <View
            style={component.prayerTickerCopy}
            onLayout={(event) =>
              setContentWidth(event.nativeEvent.layout.width)
            }
          >
            <Text style={component.prayerTickerText} numberOfLines={1}>
              {text}
            </Text>
          </View>
          <View style={component.prayerTickerCopy}>
            <Text style={component.prayerTickerText} numberOfLines={1}>
              {text}
            </Text>
          </View>
        </Animated.View>
      ) : (
        <Text
          style={component.prayerTickerText}
          numberOfLines={1}
          onLayout={(event) => setContentWidth(event.nativeEvent.layout.width)}
        >
          {text}
        </Text>
      )}
    </View>
  );
}

interface PrayerTimesBarProps {
  schedules: PrayerSchedule[];
}

/**
 * Menampilkan countdown menuju waktu salat terdekat dan ticker seluruh jadwal salat hari ini.
 */
export default function PrayerTimesBar({ schedules }: PrayerTimesBarProps) {
  const { colors } = useTheme();
  const { component } = useAppStyles();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const next = useMemo(() => getNextPrayer(schedules, now), [schedules, now]);

  if (schedules.length === 0) {
    return null;
  }

  const tickerText = schedules
    .map((schedule) => `${schedule.label} ${schedule.time}`)
    .join("  •  ");

  const countdownLabel = next?.isTomorrow
    ? "Menuju Subuh besok"
    : `Menuju ${next?.schedule.label ?? ""}`;

  return (
    <View
      style={component.prayerBar}
      accessibilityLabel={`${countdownLabel}, ${formatCountdown(next ? next.date.getTime() - now : 0)}`}
    >
      <View style={component.prayerCountRow}>
        <Ionicons name="time-outline" size={13} color={colors.onPrimary} />
        <Text style={component.prayerCountLabel}>{countdownLabel}</Text>
        <Text style={component.prayerCountValue}>
          {formatCountdown(next ? next.date.getTime() - now : 0)}
        </Text>
      </View>
      <MarqueeRow text={tickerText} />
    </View>
  );
}

const styles = StyleSheet.create({
  tickerViewport: {
    overflow: "hidden",
  },
});
