import { Stack } from "expo-router";
import { colors } from "@/constants";

/** Navigator utama. Warna latar layar disesuaikan tema di constants. */
export default function RootLayout() {
  return (
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
  );
}
