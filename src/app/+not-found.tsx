import { Link } from "expo-router";
import { Text, View } from "react-native";

import { fontFamily } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

export default function NotFound() {
  const { colors } = useTheme();
  const { global } = useAppStyles();

  return (
    <View
      style={[
        global.container,
        { justifyContent: "center", alignItems: "center", padding: 24 },
      ]}
    >
      <Text
        style={{
          fontFamily: fontFamily.display,
          fontSize: 64,
          color: colors.accent,
        }}
      >
        404
      </Text>
      <Text style={global.headerSubtitle}>Halaman tidak ditemukan</Text>
      <Link
        href="/"
        style={{
          marginTop: 16,
          fontFamily: fontFamily.semibold,
          fontSize: 16,
          color: colors.primary,
        }}
      >
        Kembali ke Beranda
      </Link>
    </View>
  );
}
