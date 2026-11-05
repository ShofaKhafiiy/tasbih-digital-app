import { globalStyles } from "@/styles";
import { router } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";

export default function Demo() {
  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        onPress={() => router.replace("/")}
        style={globalStyles.primaryButton}
      >
        <Text style={globalStyles.primaryButtonText}>Kembali ke Beranda</Text>
      </Pressable>
    </ScrollView>
  );
}
