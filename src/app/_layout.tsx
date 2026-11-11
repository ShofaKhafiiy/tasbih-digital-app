import { Amiri_400Regular } from "@expo-google-fonts/amiri/400Regular";
import { Fraunces_600SemiBold } from "@expo-google-fonts/fraunces/600SemiBold";
import { PlusJakartaSans_400Regular } from "@expo-google-fonts/plus-jakarta-sans/400Regular";
import { PlusJakartaSans_500Medium } from "@expo-google-fonts/plus-jakarta-sans/500Medium";
import { PlusJakartaSans_600SemiBold } from "@expo-google-fonts/plus-jakarta-sans/600SemiBold";
import { PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans/700Bold";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import SplashReveal from "@/components/brand/SplashReveal";
import {
  ActiveSessionProvider,
  useActiveSession,
} from "@/context/ActiveSessionContext";
import { SessionsProvider, useSessions } from "@/context/SessionsContext";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 280,
  fade: true,
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Amiri_400Regular,
    Fraunces_600SemiBold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  return (
    <SettingsProvider>
      <ThemeProvider>
        <SessionsProvider>
          <ActiveSessionProvider>
            <AppShell fontsReady={fontsLoaded || Boolean(fontError)} />
          </ActiveSessionProvider>
        </SessionsProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}

function AppShell({ fontsReady }: { fontsReady: boolean }) {
  const { hydrated: settingsHydrated } = useSettings();
  const { hydrated: sessionsHydrated } = useSessions();
  const { hydrated: activeHydrated } = useActiveSession();
  const { colors, scheme } = useTheme();

  const [showReveal, setShowReveal] = useState(true);

  const ready =
    fontsReady && settingsHydrated && sessionsHydrated && activeHydrated;

  useEffect(() => {
    if (!ready) return;
    const frame = requestAnimationFrame(() => {
      SplashScreen.hideAsync().catch(() => undefined);
    });
    return () => cancelAnimationFrame(frame);
  }, [ready]);

  const handleRevealDone = useCallback(() => setShowReveal(false), []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ title: "Tasbih Digital" }} />
        <Stack.Screen name="counting" options={{ title: "Tasbih Berjalan" }} />
        <Stack.Screen name="recap" options={{ title: "Hasil Tasbih" }} />
        <Stack.Screen name="dzikir/[id]" options={{ title: "Detail Dzikir" }} />
        <Stack.Screen name="panduan" options={{ title: "Panduan" }} />
      </Stack>
      {ready && showReveal && <SplashReveal onDone={handleRevealDone} />}
    </View>
  );
}
