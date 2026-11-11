import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/ui/Header";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

const GUIDES = [
  { slug: "memulai", title: "Memulai Tasbih" },
  { slug: "target", title: "Mengatur Target" },
  { slug: "riwayat", title: "Melihat Riwayat" },
];

export default function PanduanIndex() {
  const { colors } = useTheme();
  const { global, component } = useAppStyles();

  return (
    <SafeAreaView style={global.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={global.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header subtitle="Panduan penggunaan" />
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/panduan/${guide.slug}`}
            asChild
          >
            <Pressable
              style={component.guideRow}
              accessibilityRole="link"
              accessibilityLabel={guide.title}
            >
              <Text style={component.guideTitle}>{guide.title}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.muted}
              />
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
