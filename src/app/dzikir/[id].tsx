import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { globalStyles } from "@/styles";

export default function DzikirDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerTitle}>Detail Dzikir</Text>
      <Text style={globalStyles.headerSubtitle}>{id}</Text>
    </View>
  );
}
