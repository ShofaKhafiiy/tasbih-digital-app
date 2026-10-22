import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { globalStyles } from "@/styles";
import { colors, fontSize } from "@/constants";
import Header from "@/components/ui/Header";

const CONTENT: Record<string, string> = {
  memulai: "Ketuk ring untuk menghitung. Setiap ketukan menambah hitungan.",
  target: "Isi kolom target lalu tekan Atur, atau langsung tekan Mulai.",
  riwayat: "Buka tab Riwayat untuk melihat sesi yang sudah selesai.",
};

export default function PanduanDetail() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();
  const key = (slug ?? [])[0] ?? "";
  const body = CONTENT[key] ?? "Panduan belum tersedia untuk bagian ini.";

  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header subtitle={`Panduan / ${(slug ?? []).join("/")}`} />
      <Text style={{ fontSize: fontSize.xxl, color: colors.ink, lineHeight: 24 }}>
        {body}
      </Text>
    </ScrollView>
  );
}
