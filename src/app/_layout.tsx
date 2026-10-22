import { Stack } from "expo-router";
import { colors } from "@/constants";
import { SettingsProvider } from "@/context/SettingsContext";
import { SessionsProvider } from "@/context/SessionsContext";

/** Navigator utama. Warna latar layar disesuaikan tema di constants. */
export default function RootLayout() {
  return (
    <SettingsProvider>
      <SessionsProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ title: "Tasbih Digital" }} />
          <Stack.Screen name="counting" options={{ title: "Tasbih Berjalan" }} />
          <Stack.Screen name="recap" options={{ title: "Hasil Tasbih" }} />
          <Stack.Screen name="dzikir/[id]" options={{ title: "Detail Dzikir" }} />
          <Stack.Screen name="panduan" options={{ title: "Panduan" }} />
        </Stack>
      </SessionsProvider>
    </SettingsProvider>
  );
}
