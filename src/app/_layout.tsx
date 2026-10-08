import { Stack } from "expo-router";
import { colors } from "../constants/styles";

/** Navigator utama. Warna latar layar disesuaikan tema di styles.ts. */
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
