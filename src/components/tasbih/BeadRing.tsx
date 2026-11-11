import { useEffect, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { duration, fontFamily, fontSize, spring } from "@/constants";
import { useTheme } from "@/context/ThemeContext";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const BEAD_COUNT = 33;

const absoluteFill = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export interface BeadRingProps {
  size: number;
  count: number;
  target: number;
  onTap: () => void;
  disabled?: boolean;
}

export default function BeadRing({
  size,
  count,
  target,
  onTap,
  disabled = false,
}: BeadRingProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();

  const center = size / 2;
  const ringRadius = size * 0.37;
  const beadRadius = Math.max(3.2, size * 0.021);
  const strokeWidth = Math.max(2, size * 0.012);
  const circumference = 2 * Math.PI * ringRadius;

  const progressValue = Math.min(1, target > 0 ? count / target : 0);
  const litCount = Math.round(progressValue * BEAD_COUNT);

  const progress = useSharedValue(progressValue);
  const countScale = useSharedValue(1);
  const ripple = useSharedValue(1);

  useEffect(() => {
    if (reducedMotion) {
      progress.value = progressValue;
      return;
    }
    progress.value = withTiming(progressValue, { duration: duration.base });
  }, [progress, progressValue, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || count === 0) return;
    countScale.value = withSequence(
      withTiming(1.06, { duration: 80 }),
      withSpring(1, spring.snap),
    );
    ripple.value = 0;
    ripple.value = withTiming(1, { duration: 460 });
  }, [count, countScale, reducedMotion, ripple]);

  const animatedProgressProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const countStyle = useAnimatedStyle(() => ({
    transform: [{ scale: countScale.value }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    opacity: (1 - ripple.value) * 0.22,
    transform: [{ scale: 0.92 + ripple.value * 0.16 }],
  }));

  const beads = useMemo(() => {
    return Array.from({ length: BEAD_COUNT }, (_, index) => {
      const angle = (index / BEAD_COUNT) * Math.PI * 2 - Math.PI / 2;
      const x = center + ringRadius * Math.cos(angle);
      const y = center + ringRadius * Math.sin(angle);
      const isMarker = index === 0;
      const isLit = count > 0 && index < litCount;
      const isCurrent =
        !disabled && count > 0 && index === litCount % BEAD_COUNT;

      return (
        <Circle
          key={index}
          cx={x}
          cy={y}
          r={isMarker ? beadRadius * 1.35 : beadRadius}
          fill={
            isMarker || isLit
              ? colors.beadLit
              : isCurrent
                ? colors.accent
                : colors.beadUnlit
          }
          opacity={isLit || isMarker ? 1 : 0.85}
        />
      );
    });
  }, [
    center,
    ringRadius,
    beadRadius,
    count,
    litCount,
    disabled,
    colors.accent,
    colors.beadLit,
    colors.beadUnlit,
  ]);

  const countSize = Math.min(64, Math.round(size * 0.19));

  return (
    <Pressable
      onPress={onTap}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={`Hitung, ${count} dari ${target}`}
      accessibilityHint="Ketuk untuk menambah hitungan"
      style={({ pressed }) => [
        styles.pressable,
        { width: size, height: size },
        pressed && !disabled && { opacity: 0.94 },
      ]}
    >
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={center}
          cy={center}
          r={ringRadius}
          stroke={colors.hairline}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={center}
          cy={center}
          r={ringRadius}
          stroke={colors.accent}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProgressProps}
          transform={`rotate(-90 ${center} ${center})`}
        />
        {beads}
      </Svg>

      {!reducedMotion && (
        <Animated.View
          style={[
            styles.ripple,
            { pointerEvents: "none" },
            {
              width: size * 0.72,
              height: size * 0.72,
              borderRadius: size,
              borderColor: colors.accent,
            },
            rippleStyle,
          ]}
        />
      )}

      <View style={[styles.center, { pointerEvents: "none" }]}>
        <Animated.Text
          style={[
            styles.count,
            { color: colors.ink, fontSize: countSize },
            countStyle,
          ]}
        >
          {count}
        </Animated.Text>
        <Text style={[styles.target, { color: colors.muted }]}>
          dari {target}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    ...absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    fontFamily: fontFamily.display,
    fontVariant: ["tabular-nums"],
    textAlign: "center",
  },
  target: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.caption,
    letterSpacing: 0.6,
    marginTop: 0,
  },
  ripple: {
    position: "absolute",
    borderWidth: 1.5,
  },
});
