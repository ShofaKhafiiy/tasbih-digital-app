import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { colors } from "@/constants";
import { globalStyles } from "@/styles";

const logoTasbih = require("../../../assets/images/logo-tasbih.png");

interface HeaderProps {
  subtitle?: string;
  title?: string;
  /** Varian ringkas: logo kecil, tanpa ornamen (untuk layar immersive). */
  compact?: boolean;
}

export default function Header({
  subtitle = "Dekat dengan Allah, setiap hari",
  title = "Tasbih Digital",
  compact = false,
}: HeaderProps) {
  if (compact) {
    return (
      <View style={globalStyles.headerCompact}>
        <Image
          source={logoTasbih}
          style={globalStyles.headerLogoCompact}
          accessibilityLabel="Logo Tasbih Digital"
        />
        <Text style={globalStyles.headerTitleCompact}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.header}>
      <Image
        source={logoTasbih}
        style={globalStyles.headerLogo}
        accessibilityLabel="Logo Tasbih Digital"
      />
      <Text style={globalStyles.headerTitle}>{title}</Text>
      <Text style={globalStyles.headerSubtitle}>{subtitle}</Text>
      {/* Ornamen Islami tipis: garis ─ lambang ─ garis */}
      <View style={globalStyles.arabesque}>
        <View style={globalStyles.arabesqueLine} />
        <Ionicons name="diamond" size={10} color={colors.accent} />
        <View style={globalStyles.arabesqueLine} />
      </View>
    </View>
  );
}
