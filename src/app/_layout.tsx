import { Stack } from "expo-router";
import { colors } from "../constants";

/** Navigator utama. Warna latar layar disesuaikan tema di constants. */
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}