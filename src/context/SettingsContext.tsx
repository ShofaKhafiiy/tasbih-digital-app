import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

export type ThemeMode = "system" | "light" | "dark";

export interface AppSettings {
  hapticsEnabled: boolean;
  autoReset: boolean;
  ambient3D: boolean;
  themeMode: ThemeMode;
}

interface SettingsContextValue extends AppSettings {
  hydrated: boolean;
  toggleHaptics: () => void;
  toggleAutoReset: () => void;
  setAmbient3D: (enabled: boolean) => void;
  toggleAmbient3D: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = "@tasbih/settings/v1";

const DEFAULT_SETTINGS: AppSettings = {
  hapticsEnabled: true,
  autoReset: false,
  ambient3D: true,
  themeMode: "system",
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function sanitize(raw: unknown): Partial<AppSettings> {
  if (!raw || typeof raw !== "object") return {};
  const value = raw as Record<string, unknown>;
  const next: Partial<AppSettings> = {};

  if (typeof value.hapticsEnabled === "boolean") {
    next.hapticsEnabled = value.hapticsEnabled;
  }
  if (typeof value.autoReset === "boolean") {
    next.autoReset = value.autoReset;
  }
  if (typeof value.ambient3D === "boolean") {
    next.ambient3D = value.ambient3D;
  }
  if (
    value.themeMode === "system" ||
    value.themeMode === "light" ||
    value.themeMode === "dark"
  ) {
    next.themeMode = value.themeMode;
  }

  return next;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!alive || !raw) return;
        try {
          setSettings({ ...DEFAULT_SETTINGS, ...sanitize(JSON.parse(raw)) });
        } catch {
          // Data rusak: pakai default.
        }
      })
      .finally(() => {
        if (alive) setHydrated(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch(
      () => undefined,
    );
  }, [settings, hydrated]);

  const toggleHaptics = useCallback(
    () => setSettings((s) => ({ ...s, hapticsEnabled: !s.hapticsEnabled })),
    [],
  );
  const toggleAutoReset = useCallback(
    () => setSettings((s) => ({ ...s, autoReset: !s.autoReset })),
    [],
  );
  const setAmbient3D = useCallback(
    (enabled: boolean) => setSettings((s) => ({ ...s, ambient3D: enabled })),
    [],
  );
  const toggleAmbient3D = useCallback(
    () => setSettings((s) => ({ ...s, ambient3D: !s.ambient3D })),
    [],
  );
  const setThemeMode = useCallback(
    (mode: ThemeMode) => setSettings((s) => ({ ...s, themeMode: mode })),
    [],
  );

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        hydrated,
        toggleHaptics,
        toggleAutoReset,
        setAmbient3D,
        toggleAmbient3D,
        setThemeMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings harus dipakai di dalam SettingsProvider");
  }
  return ctx;
}
