import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { fontFamily, fontSize, spring } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import BrandMark from "@/components/brand/BrandMark";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RING_SIZE = 188;
const RING_RADIUS = 82;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const BEAD_COUNT = 33;

interface SplashRevealProps {
  onDone: () => void;
}

export default function SplashReveal({ onDone }: SplashRevealProps) {
  const { colors } = useTheme();
  const reducedMotion = useReducedMotion();
  const overlayOpacity = useSharedValue(1);
  const ringProgress = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentY = useSharedValue(14);
  const beadsOpacity = useSharedValue(0);
  const scale = useSharedValue(0.96);

  useEffect(() => {
    if (reducedMotion) {
      ringProgress.value = 1;
      contentOpacity.value = 1;
      beadsOpacity.value = 1;
      contentY.value = 0;
      scale.value = 1;
      const timer = setTimeout(onDone, 650);
      return () => clearTimeout(timer);
    }

    ringProgress.value = withTiming(1, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
    scale.value = withSpring(1, spring.soft);
    contentOpacity.value = withDelay(220, withTiming(1, { duration: 520 }));
    contentY.value = withDelay(220, withSpring(0, spring.soft));
    beadsOpacity.value = withDelay(160, withTiming(1, { duration: 900 }));

    const timer = setTimeout(() => {
      overlayOpacity.value = withTiming(
        0,
        { duration: 420, easing: Easing.in(Easing.cubic) },
        (done) => {
          if (done) runOnJS(onDone)();
        },
      );
    }, 1350);

    return () => clearTimeout(timer);
  }, [
    beadsOpacity,
    contentOpacity,
    contentY,
    onDone,
    overlayOpacity,
    reducedMotion,
    ringProgress,
    scale,
  ]);

  const ringProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - ringProgress.value),
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));
  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentY.value }],
  }));
  const beadsStyle = useAnimatedStyle(() => ({
    opacity: beadsOpacity.value,
  }));
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const beads = Array.from({ length: BEAD_COUNT }, (_, index) => {
    const angle = (index / BEAD_COUNT) * Math.PI * 2 - Math.PI / 2;
    const dot = index === 0 ? 7 : 4;
    return {
      index,
      dot,
      left: RING_SIZE / 2 + RING_RADIUS * Math.cos(angle) - dot / 2,
      top: RING_SIZE / 2 + RING_RADIUS * Math.sin(angle) - dot / 2,
    };
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.overlay,
        {
          backgroundColor: colors.background,
          pointerEvents: "none",
        },
        overlayStyle,
      ]}
    >
      <View style={styles.center}>
        <Animated.View
          style={[styles.ringWrap, { width: RING_SIZE, height: RING_SIZE }, ringStyle]}
        >
          <Svg width={RING_SIZE} height={RING_SIZE}>
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={colors.hairline}
              strokeWidth={1.5}
              fill="none"
            />
            <AnimatedCircle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={colors.accent}
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              animatedProps={ringProps}
              transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            />
          </Svg>

          <Animated.View style={[StyleSheet.absoluteFill, beadsStyle]}>
            {beads.map((bead) => (
              <View
                key={bead.index}
                style={{
                  position: "absolute",
                  left: bead.left,
                  top: bead.top,
                  width: bead.dot,
                  height: bead.dot,
                  borderRadius: bead.dot / 2,
                  backgroundColor:
                    bead.index === 0 ? colors.accent : colors.beadLit,
                }}
              />
            ))}
          </Animated.View>

          <BrandMark size={76} />
        </Animated.View>

        <Animated.View style={[styles.text, contentStyle]}>
          <Text style={[styles.bismillah, { color: colors.accent }]}>
            بِسْمِ اللّٰهِ
          </Text>
          <Text style={[styles.wordmark, { color: colors.ink }]}>
            Tasbih Digital
          </Text>
          <Text style={[styles.tagline, { color: colors.inkSoft }]}>
            Dekat dengan Allah, setiap hari
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  ringWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignItems: "center",
    marginTop: 28,
    gap: 4,
  },
  bismillah: {
    fontFamily: fontFamily.arabic,
    fontSize: 22,
    lineHeight: 32,
  },
  wordmark: {
    fontFamily: fontFamily.display,
    fontSize: 30,
    letterSpacing: 0.2,
  },
  tagline: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodySm,
    marginTop: 2,
  },
});
