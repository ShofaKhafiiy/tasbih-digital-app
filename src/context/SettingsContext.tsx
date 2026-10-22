import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SettingsContextValue {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  autoReset: boolean;
  toggleSound: () => void;
  toggleHaptics: () => void;
  toggleAutoReset: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [autoReset, setAutoReset] = useState(false);

  const toggleSound = useCallback(() => setSoundEnabled((v) => !v), []);
  const toggleHaptics = useCallback(() => setHapticsEnabled((v) => !v), []);
  const toggleAutoReset = useCallback(() => setAutoReset((v) => !v), []);

  return (
    <SettingsContext.Provider
      value={{
        soundEnabled,
        hapticsEnabled,
        autoReset,
        toggleSound,
        toggleHaptics,
        toggleAutoReset,
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
