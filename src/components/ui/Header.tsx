import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

import BrandMark from "@/components/brand/BrandMark";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

interface HeaderProps {
  subtitle?: string;
  title?: string;
  /** Varian ringkas: logo kecil, tanpa ornamen. */
  compact?: boolean;
}

export default function Header({
  subtitle = "Dekat dengan Allah, setiap hari",
  title = "Tasbih Digital",
  compact = false,
}: HeaderProps) {
  const { global } = useAppStyles();
  const { colors } = useTheme();

  if (compact) {
    return (
      <View style={global.headerCompact}>
        <BrandMark size={28} />
        <Text style={global.headerTitleCompact}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={global.header}>
      <BrandMark size={40} style={{ marginBottom: 8 }} />
      <Text style={global.headerTitle}>{title}</Text>
      <Text style={global.headerSubtitle}>{subtitle}</Text>
      <View style={global.arabesque}>
        <View style={global.arabesqueLine} />
        <Ionicons name="diamond" size={10} color={colors.accent} />
        <View style={global.arabesqueLine} />
      </View>
    </View>
  );
}
