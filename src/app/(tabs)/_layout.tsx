import { Tabs } from "expo-router/js-tabs";

import FloatingTabBar from "@/components/navigation/FloatingTabBar";

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
