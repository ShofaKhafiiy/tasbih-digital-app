import { ScrollView, Switch, Text, View } from "react-native";
import { globalStyles, componentStyles } from "@/styles";
import { useSettings } from "@/context/SettingsContext";
import Header from "@/components/ui/Header";

export default function Settings() {
  const {
    soundEnabled,
    hapticsEnabled,
    autoReset,
    toggleSound,
    toggleHaptics,
    toggleAutoReset,
  } = useSettings();

  return (
    <ScrollView
      contentContainerStyle={globalStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header subtitle="Pengaturan aplikasi" />

      <View style={componentStyles.settingRow}>
        <Text style={componentStyles.settingLabel}>Suara</Text>
        <Switch value={soundEnabled} onValueChange={toggleSound} />
      </View>

      <View style={componentStyles.settingRow}>
        <Text style={componentStyles.settingLabel}>Getaran (haptik)</Text>
        <Switch value={hapticsEnabled} onValueChange={toggleHaptics} />
      </View>

      <View style={componentStyles.settingRow}>
        <Text style={componentStyles.settingLabel}>Reset otomatis</Text>
        <Switch value={autoReset} onValueChange={toggleAutoReset} />
      </View>
    </ScrollView>
  );
}
