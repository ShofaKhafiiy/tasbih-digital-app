import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { colors } from "@/constants";
import { globalStyles } from "@/styles";

interface StartButtonProps {
  onPress: () => void;
  label?: string;
  disabled?: boolean;
}

export default function StartButton({
  onPress,
  label = "Mulai",
  disabled = false,
}: StartButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        globalStyles.primaryButton,
        pressed && !disabled && globalStyles.primaryButtonPressed,
        disabled && { opacity: 0.5 },
      ]}
    >
      <Ionicons name="play" size={18} color={colors.white} />
      <Text style={globalStyles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}
