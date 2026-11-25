/**
 * @file Halaman indeks Panduan yang menampilkan daftar topik panduan penggunaan aplikasi.
 * @layer App / Screens
 */

import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/ui/Header";
import { useTheme } from "@/context/ThemeContext";
import { GUIDES } from "@/data/guides";
import { useAppStyles } from "@/styles";

/** Layar daftar tautan menuju masing-masing topik panduan. */
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
