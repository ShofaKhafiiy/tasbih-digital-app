import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles";
import { colors } from "../../constants";

const logoTasbih = require("../../../assets/images/logo-tasbih.png");

interface HeaderProps {
  subtitle?: string;
}

export default function Header({ subtitle = "Dekat dengan Allah, setiap hari" }: HeaderProps) {
  return (
    <View style={globalStyles.header}>
      <Image
        source={logoTasbih}
        style={globalStyles.headerLogo}
        accessibilityLabel="Logo Tasbih Digital"
      />
      <Text style={globalStyles.headerTitle}>Tasbih Digital</Text>
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