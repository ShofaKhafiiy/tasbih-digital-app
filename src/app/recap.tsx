import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/ui/Header";
import { fontFamily } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { DHIKR_LIST } from "@/data/dhikr";
import { useAppStyles } from "@/styles";

export default function Recap() {
  const params = useLocalSearchParams<{
    id?: string;
    target?: string;
    count?: string;
  }>();
  const { colors } = useTheme();
  const { global, component } = useAppStyles();

  const dhikr =
    DHIKR_LIST.find((item) => item.id === params.id) ?? DHIKR_LIST[0];
  const target = Number(params.target) || dhikr.target;
  const count = Number(params.count) || 0;
  const done = count >= target;

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/");
  }

  return (
    <SafeAreaView style={global.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={global.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header subtitle="Ringkasan sesi" />

        <View style={{ alignItems: "center", paddingVertical: 24 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: done ? colors.accentSoft : colors.surfaceMuted,
              marginBottom: 16,
            }}
          >
            <Ionicons
              name={done ? "checkmark" : "hourglass-outline"}
              size={26}
              color={done ? colors.accent : colors.inkSoft}
            />
          </View>

          <Text
            style={component.detailArabic}
            allowFontScaling={false}
          >
            {dhikr.arabic}
          </Text>

          <Text
            style={{
              fontFamily: fontFamily.display,
              fontSize: 64,
              color: colors.ink,
              fontVariant: ["tabular-nums"],
            }}
          >
            {count}
          </Text>
          <Text style={component.detailDesc}>dari {target} kali</Text>

          <Text
            style={[
              component.detailName,
              { fontSize: 20, marginTop: 8 },
            ]}
          >
            {dhikr.name}
          </Text>
          <Text
            style={[
              component.detailDesc,
              { color: done ? colors.success : colors.muted },
            ]}
          >
            {done ? "Target tercapai" : "Belum mencapai target"}
          </Text>
        </View>

        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            global.primaryButton,
            pressed && global.primaryButtonPressed,
          ]}
          accessibilityRole="button"
        >
          <Text style={global.primaryButtonText}>Kembali ke Beranda</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
