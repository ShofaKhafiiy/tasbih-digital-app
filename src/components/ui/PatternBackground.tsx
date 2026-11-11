import { useId } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, Pattern, Path, Rect } from "react-native-svg";

import { useTheme } from "@/context/ThemeContext";

interface PatternBackgroundProps {
  opacity?: number;
}

export default function PatternBackground({
  opacity = 0.55,
}: PatternBackgroundProps) {
  const { colors } = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <View style={[StyleSheet.absoluteFill, { opacity, pointerEvents: "none" }]}>
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern
            id={`girih-${id}`}
            width={64}
            height={64}
            patternUnits="userSpaceOnUse"
          >
            <Path
              d="M32 0 L64 32 L32 64 L0 32 Z"
              stroke={colors.hairline}
              strokeWidth={0.8}
              fill="none"
            />
            <Circle
              cx={32}
              cy={32}
              r={7}
              stroke={colors.hairline}
              strokeWidth={0.8}
              fill="none"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#girih-${id})`} />
      </Svg>
    </View>
  );
}
