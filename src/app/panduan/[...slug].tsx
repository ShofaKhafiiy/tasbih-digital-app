import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/ui/Header";
import { fontFamily, fontSize } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

const CONTENT: Record<string, string> = {
  memulai:
    "Ketuk cincin untuk menghitung. Setiap ketukan menambah hitungan dan bisa dibatalkan lewat tombol undo.",
  target:
    "Buka pengaturan target untuk menentukan jumlah hitungan per putaran. Target bisa diubah kapan saja.",
  riwayat:
    "Buka tab Riwayat untuk melihat sesi yang sudah selesai. Riwayat tersimpan otomatis di perangkat.",
};

export default function PanduanDetail() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();
  const { colors } = useTheme();
  const { global } = useAppStyles();
  const key = (slug ?? [])[0] ?? "";
  const body = CONTENT[key] ?? "Panduan belum tersedia untuk bagian ini.";

  return (
    <SafeAreaView style={global.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={global.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header subtitle={`Panduan / ${(slug ?? []).join("/")}`} />
        <Text
          style={{
            fontFamily: fontFamily.regular,
            fontSize: fontSize.body,
            lineHeight: 26,
            color: colors.ink,
          }}
        >
          {body}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
