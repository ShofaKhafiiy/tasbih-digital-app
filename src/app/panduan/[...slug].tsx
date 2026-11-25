/**
 * @file Halaman detail panduan dinamis (`/panduan/[...slug]`) untuk menampilkan isi artikel panduan.
 * @layer App / Screens
 */

import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/ui/Header";
import { fontFamily, fontSize } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { getGuideBySlug } from "@/data/guides";
import { useAppStyles } from "@/styles";

/** Layar detail satu topik panduan berdasarkan parameter `slug`. */
export default function PanduanDetail() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();
  const { colors } = useTheme();
  const { global } = useAppStyles();
  const key = (slug ?? [])[0] ?? "";
  const guide = getGuideBySlug(key);
  const body = guide?.body ?? "Panduan belum tersedia untuk bagian ini.";

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
