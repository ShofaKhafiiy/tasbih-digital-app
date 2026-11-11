import { Image } from "expo-image";
import type { ImageStyle, StyleProp } from "react-native";

const logo = require("../../../assets/images/logo-tasbih.png");

interface BrandMarkProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export default function BrandMark({ size = 40, style }: BrandMarkProps) {
  return (
    <Image
      source={logo}
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      contentFit="cover"
      transition={150}
      accessibilityLabel="Logo Tasbih Digital"
    />
  );
}
