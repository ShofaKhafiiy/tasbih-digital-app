/**
 * @file Context pengaturan preferensi pengguna (tema, haptics, auto-reset, dan efek 3D).
 * @layer Context
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

import { STORAGE_KEYS } from "@/constants/config";
import { getStorageJson, setStorageJson } from "@/services/storageService";
import type { AppSettings, ThemeMode } from "@/types/settings";

export type { AppSettings, ThemeMode };

interface SettingsContextValue extends AppSettings {
  hydrated: boolean;
  toggleHaptics: () => void;
  toggleAutoReset: () => void;
  setAmbient3D: (enabled: boolean) => void;
  toggleAmbient3D: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  hapticsEnabled: true,
  autoReset: false,
  ambient3D: true,
  themeMode: "system",
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

function sanitize(raw: unknown): Partial<AppSettings> | null {
  if (!raw || typeof raw !== "object") return null;
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

/** Provider pengaturan aplikasi dengan sinkronisasi otomatis ke AsyncStorage. */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;

    getStorageJson(STORAGE_KEYS.SETTINGS, sanitize)
      .then((parsed) => {
        if (!alive || !parsed) return;
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
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
    void setStorageJson(STORAGE_KEYS.SETTINGS, settings);
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

/**
 * Hook untuk membaca dan mengubah pengaturan preferensi aplikasi.
 *
 * @returns Nilai context pengaturan beserta setter/toggle-nya.
 * @throws Error bila dipanggil di luar `SettingsProvider`.
 */
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings harus dipakai di dalam SettingsProvider");
  }
  return ctx;
}
