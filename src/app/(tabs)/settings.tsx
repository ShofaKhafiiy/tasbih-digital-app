import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/ui/Header";
import { useSessions } from "@/context/SessionsContext";
import {
  useSettings,
  type ThemeMode,
} from "@/context/SettingsContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "Sistem" },
  { value: "light", label: "Terang" },
  { value: "dark", label: "Gelap" },
];

export default function Settings() {
  const { colors } = useTheme();
  const { global, component } = useAppStyles();
  const { clearSessions } = useSessions();
  const {
    themeMode,
    setThemeMode,
    hapticsEnabled,
    toggleHaptics,
    autoReset,
    toggleAutoReset,
    ambient3D,
    toggleAmbient3D,
  } = useSettings();

  function confirmClear() {
    Alert.alert(
      "Hapus semua riwayat?",
      "Seluruh sesi yang tersimpan akan dihapus permanen.",
      [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: clearSessions },
      ],
    );
  }

  const switchColors = {
    trackColor: { false: colors.hairline, true: colors.primary },
    thumbColor: colors.surface,
    ios_backgroundColor: colors.hairline,
  };

  return (
    <SafeAreaView style={global.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={global.tabScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header subtitle="Sesuaikan pengalaman Anda" />

        <Text style={global.sectionEyebrow}>Tampilan</Text>
        <View
          style={[
            component.settingRow,
            { flexDirection: "column", alignItems: "stretch" },
          ]}
        >
          <View style={component.settingInfo}>
            <Text style={component.settingLabel}>Tema</Text>
            <Text style={component.settingHint}>
              Ikuti sistem atau pilih tampilan sendiri.
            </Text>
          </View>
          <View style={component.segmented}>
            {THEME_OPTIONS.map((option) => {
              const active = themeMode === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => setThemeMode(option.value)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={[
                    component.segment,
                    active && component.segmentActive,
                  ]}
                >
                  <Text
                    style={[
                      component.segmentText,
                      active && component.segmentTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={[global.sectionEyebrow, { marginTop: 24 }]}>
          Getaran
        </Text>
        <View style={component.settingRow}>
          <View style={component.settingInfo}>
            <Text style={component.settingLabel}>Getaran</Text>
            <Text style={component.settingHint}>
              Umpan balik halus setiap kali menghitung.
            </Text>
          </View>
          <Switch
            value={hapticsEnabled}
            onValueChange={toggleHaptics}
            {...switchColors}
          />
        </View>

        <Text style={[global.sectionEyebrow, { marginTop: 24 }]}>
          Hitungan
        </Text>
        <View style={component.settingRow}>
          <View style={component.settingInfo}>
            <Text style={component.settingLabel}>Reset otomatis</Text>
            <Text style={component.settingHint}>
              Mulai putaran baru setelah target tercapai.
            </Text>
          </View>
          <Switch
            value={autoReset}
            onValueChange={toggleAutoReset}
            {...switchColors}
          />
        </View>
        <View style={component.settingRow}>
          <View style={component.settingInfo}>
            <Text style={component.settingLabel}>Ambient 3D</Text>
            <Text style={component.settingHint}>
              Efek manik 3D halus di beranda. Matikan jika perangkat terasa
              berat.
            </Text>
          </View>
          <Switch
            value={ambient3D}
            onValueChange={toggleAmbient3D}
            {...switchColors}
          />
        </View>

        <Text style={[global.sectionEyebrow, { marginTop: 24 }]}>Data</Text>
        <Pressable
          onPress={confirmClear}
          style={component.dangerButton}
          accessibilityRole="button"
        >
          <Text style={component.dangerText}>Hapus semua riwayat</Text>
        </Pressable>

        <Text
          style={[
            component.settingHint,
            { textAlign: "center", marginTop: 20 },
          ]}
        >
          Pengaturan tersimpan otomatis di perangkat.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
