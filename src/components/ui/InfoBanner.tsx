import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

type BannerTone = "info" | "error" | "success";

interface InfoBannerProps {
  visible: boolean;
  title: string;
  message: string;
  tone?: BannerTone;
  onClose: () => void;
}

export default function InfoBanner({
  visible,
  title,
  message,
  tone = "info",
  onClose,
}: InfoBannerProps) {
  const { colors } = useTheme();
  const { component } = useAppStyles();

  if (!visible) return null;

  const isError = tone === "error";
  const isSuccess = tone === "success";
  const iconColor = isError
    ? colors.danger
    : isSuccess
      ? colors.success
      : colors.primary;

  return (
    <View
      style={[
        component.infoBanner,
        isError && component.infoBannerError,
        isSuccess && component.infoBannerSuccess,
      ]}
    >
      <Ionicons
        name={
          isError
            ? "alert-circle"
            : isSuccess
              ? "checkmark-circle"
              : "information-circle"
        }
        size={18}
        color={iconColor}
      />
      <View style={component.infoBannerBody}>
        <Text style={component.infoBannerTitle}>{title}</Text>
        <Text style={component.infoBannerText}>{message}</Text>
      </View>
      <Pressable
        onPress={onClose}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Tutup pesan"
      >
        <Ionicons name="close" size={18} color={colors.muted} />
      </Pressable>
    </View>
  );
}
