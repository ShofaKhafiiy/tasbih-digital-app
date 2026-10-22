import { Link } from "expo-router";
import { Text, View } from "react-native";
import { globalStyles } from "@/styles";

export default function NotFound() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerTitle}>404</Text>
      <Text style={globalStyles.headerSubtitle}>Halaman tidak ditemukan</Text>
      <Link href="/">Kembali ke Beranda</Link>
    </View>
  );
}
