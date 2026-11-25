/**
 * @file Layout navigasi tab utama (Tasbih, Riwayat, Pengaturan) dengan `FloatingTabBar`.
 * @layer App / Layout
 */

import { Tabs } from "expo-router/js-tabs";

import FloatingTabBar from "@/components/navigation/FloatingTabBar";

/** Mengonfigurasi tab utama aplikasi dengan bilah navigasi mengambang kustom. */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Tasbih" }} />
      <Tabs.Screen name="history" options={{ title: "Riwayat" }} />
      <Tabs.Screen name="settings" options={{ title: "Pengaturan" }} />
    </Tabs>
  );
}
