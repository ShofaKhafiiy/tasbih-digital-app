import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { globalStyles } from "@/styles";
import { colors, fontSize } from "@/constants";
import Header from "@/components/ui/Header";

const GUIDES = [
  { slug: "memulai", title: "Memulai Tasbih" },
  { slug: "target", title: "Mengatur Target" },
  { slug: "riwayat", title: "Melihat Riwayat" },
];

export default function PanduanIndex() {
  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header subtitle="Panduan penggunaan" />
      {GUIDES.map((g) => (
        <Link
          key={g.slug}
          href={`/panduan/${g.slug}`}
          style={{ paddingVertical: 16, fontSize: fontSize.xxxl, color: colors.primary }}
        >
          {g.title}
        </Link>
      ))}
    </ScrollView>
  );
}
