import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/ui/Header";
import { useSessions } from "@/context/SessionsContext";
import { useTheme } from "@/context/ThemeContext";
import { DHIKR_LIST } from "@/data/dhikr";
import { useAppStyles } from "@/styles";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${date.getDate()} ${MONTHS[date.getMonth()]} · ${hours}.${minutes}`;
}

export default function History() {
  const { colors } = useTheme();
  const { global, component } = useAppStyles();
  const { sessions, clearSessions } = useSessions();

  function confirmClear() {
    Alert.alert(
      "Hapus semua riwayat?",
      "Seluruh sesi yang tersimpan akan dihapus permanen.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: clearSessions,
        },
      ],
    );
  }

  return (
    <SafeAreaView style={global.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={global.tabScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header subtitle="Sesi yang sudah selesai" />

        {sessions.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 32 }}>
            <Ionicons
              name="time-outline"
              size={32}
              color={colors.muted}
              style={{ marginBottom: 12 }}
            />
            <Text style={component.historyEmpty}>
              Belum ada sesi. Selesaikan satu target dulu.
            </Text>
          </View>
        ) : (
          sessions.map((session) => {
            const dhikr =
              DHIKR_LIST.find((item) => item.id === session.dhikrId) ??
              DHIKR_LIST[0];

            return (
              <View key={session.id} style={component.historyRow}>
                <View
                  style={[
                    component.historyDot,
                    { backgroundColor: dhikr.color },
                  ]}
                />
                <View style={{ flex: 1 }}>
                  <Text style={component.historyName}>{dhikr.name}</Text>
                  <Text style={component.historyMeta}>
                    {session.count}/{session.target} kali ·{" "}
                    {formatDate(session.finishedAt)}
                  </Text>
                </View>
              </View>
            );
          })
        )}

        {sessions.length > 0 && (
          <Pressable
            onPress={confirmClear}
            style={component.dangerButton}
            accessibilityRole="button"
          >
            <Text style={component.dangerText}>Hapus semua riwayat</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
