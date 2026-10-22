import { Link } from "expo-router";
import { Text, View } from "react-native";
import { globalStyles } from "@/styles";
import { colors, fontSize, fontWeight } from "@/constants";

export default function NotFound() {
  return (
    <View style={[globalStyles.container, { justifyContent: "center", alignItems: "center" }]}>
      <Text style={{ fontSize: 48, fontWeight: fontWeight.extrabold, color: colors.accent }}>
        404
      </Text>
      <Text style={globalStyles.headerSubtitle}>Halaman tidak ditemukan</Text>
      <Link href="/" style={{ marginTop: 16, fontSize: fontSize.xxl, color: colors.primary }}>
        Kembali ke Beranda
      </Link>
    </View>
  );
}
