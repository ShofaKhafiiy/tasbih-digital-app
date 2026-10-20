import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { globalStyles } from "@/styles";

export default function PanduanDetail() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerTitle}>Panduan</Text>
      <Text style={globalStyles.headerSubtitle}>{(slug ?? []).join("/")}</Text>
    </View>
  );
}
