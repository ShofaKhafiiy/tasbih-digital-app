import { Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { globalStyles, componentStyles } from "@/styles";
import { DHIKR_LIST } from "@/data/dhikr";
import Header from "@/components/ui/Header";

export default function Recap() {
  const params = useLocalSearchParams<{ id?: string; target?: string; count?: string }>();
  const dhikr = DHIKR_LIST.find((d) => d.id === params.id) ?? DHIKR_LIST[0];
  const target = Number(params.target) || dhikr.target;
  const count = Number(params.count) || 0;
  const done = count >= target;

  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header subtitle="Ringkasan Sesi" />
      <View style={globalStyles.ringArea}>
        <Text style={componentStyles.ringDhikrName}>{dhikr.arabic}</Text>
        <Text style={componentStyles.ringCount}>{count}</Text>
        <Text style={componentStyles.ringTarget}>dari {target} kali</Text>
        <Text style={[componentStyles.ringStatus, { marginTop: 12 }]}>
          {dhikr.name} — {done ? "Target tercapai" : "Belum mencapai target"}
        </Text>
      </View>
      <Pressable
        onPress={() => router.replace("/")}
        style={globalStyles.primaryButton}
      >
        <Text style={globalStyles.primaryButtonText}>Kembali ke Beranda</Text>
      </Pressable>
    </ScrollView>
  );
}
