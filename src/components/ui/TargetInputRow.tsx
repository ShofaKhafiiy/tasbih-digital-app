import { Button, Text, TextInput, View } from "react-native";
import { colors } from "@/constants";
import { globalStyles } from "@/styles";

interface TargetInputRowProps {
  targetText: string;
  onChangeText: (text: string) => void;
  onApply: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TargetInputRow({
  targetText,
  onChangeText,
  onApply,
  placeholder = "cth. 33",
  disabled = false,
}: TargetInputRowProps) {
  return (
    <View style={globalStyles.targetRow}>
      <Text style={globalStyles.targetLabel}>Target</Text>
      <TextInput
        style={globalStyles.targetInput}
        value={targetText}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        maxLength={4}
        accessibilityLabel="Masukkan target kustom"
        editable={!disabled}
      />
      <Button
        title="Atur"
        color={colors.primary}
        onPress={onApply}
        disabled={disabled}
      />
    </View>
  );
}
