import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants";
import { componentStyles } from "@/styles";

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
  if (!visible) return null;

  const isError = tone === "error";
  const isSuccess = tone === "success";

  return (
    <View
      style={[
        componentStyles.infoBanner,
        isError && componentStyles.infoBannerError,
        isSuccess && componentStyles.infoBannerSuccess,
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
        color={isError ? colors.accent : colors.primary}
      />
      <View style={componentStyles.infoBannerBody}>
        <Text style={componentStyles.infoBannerTitle}>{title}</Text>
        <Text style={componentStyles.infoBannerText}>{message}</Text>
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
