import { Text, View } from "react-native";

import { useAppStyles } from "@/styles";

interface TodayRibbonProps {
  count: number;
  sessions: number;
}

export default function TodayRibbon({ count, sessions }: TodayRibbonProps) {
  const { component } = useAppStyles();

  return (
    <View style={component.ribbon}>
      <View style={component.ribbonMetric}>
        <Text style={component.ribbonValue}>{count}</Text>
        <Text style={component.ribbonLabel}>Hitungan hari ini</Text>
      </View>
      <View style={component.ribbonDivider} />
      <View style={component.ribbonMetric}>
        <Text style={component.ribbonValue}>{sessions}</Text>
        <Text style={component.ribbonLabel}>Sesi selesai</Text>
      </View>
    </View>
  );
}
