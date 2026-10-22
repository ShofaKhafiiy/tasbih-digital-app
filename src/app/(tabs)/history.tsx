import Header from "@/components/ui/Header";
import { useSessions } from "@/context/SessionsContext";
import { DHIKR_LIST } from "@/data/dhikr";
import { componentStyles, globalStyles } from "@/styles";
import { FlatList, Pressable, Text, View } from "react-native";

export default function History() {
  const { sessions, clearSessions } = useSessions();

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.scrollContent}>
        <Header subtitle="Riwayat sesi" />

        {sessions.length === 0 ? (
          <Text style={componentStyles.historyEmpty}>
            Belum ada sesi. Selesaikan satu target dulu.
          </Text>
        ) : (
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const dhikr =
                DHIKR_LIST.find((d) => d.id === item.dhikrId) ?? DHIKR_LIST[0];
              const time = new Date(item.finishedAt).toLocaleTimeString();
              return (
                <View style={componentStyles.historyRow}>
                  <View
                    style={[
                      componentStyles.historyDot,
                      { backgroundColor: dhikr.color },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={componentStyles.historyName}>
                      {dhikr.name}
                    </Text>
                    <Text style={componentStyles.historyMeta}>
                      {item.count}/{item.target} kali — {time}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}

        {sessions.length > 0 && (
          <Pressable
            onPress={clearSessions}
            style={componentStyles.countingGhostButton}
          >
            <Text style={componentStyles.countingGhostText}>
              Bersihkan Riwayat
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
