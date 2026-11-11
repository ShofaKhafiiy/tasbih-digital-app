import { Pressable, Text, View } from "react-native";

import { useAppStyles } from "@/styles";

interface CompletionOverlayProps {
  visible: boolean;
  dhikrName: string;
  target: number;
  onClose: () => void;
  onViewResult: () => void;
}

export default function CompletionOverlay({
  visible,
  dhikrName,
  target,
  onClose,
  onViewResult,
}: CompletionOverlayProps) {
  const { global, component } = useAppStyles();

  if (!visible) return null;

  return (
    <View style={component.completionOverlay}>
      <View style={component.completionCard}>
        <Text style={component.completionTitle}>Target Tercapai</Text>
        <Text style={component.completionText}>
          {target} kali {dhikrName} selesai. Semoga menjadi amal kebaikan.
        </Text>
        <View style={component.completionButtonRow}>
          <Pressable
            onPress={onClose}
            style={component.completionGhostButton}
            accessibilityRole="button"
          >
            <Text style={component.completionGhostText}>Kembali</Text>
          </Pressable>
          <Pressable
            onPress={onViewResult}
            style={[global.primaryButton, { flex: 1, marginTop: 0 }]}
            accessibilityRole="button"
          >
            <Text style={global.primaryButtonText}>Lihat Hasil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
