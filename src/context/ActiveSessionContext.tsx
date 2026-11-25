/**
 * @file Context pengelola state sesi tasbih yang sedang berjalan (hitungan, target, undo, reset, auto-save).
 * @layer Context
 */

import * as Haptics from "expo-haptics";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import { SESSION_CONFIG, STORAGE_KEYS } from "@/constants/config";
import { useSessions } from "@/context/SessionsContext";
import { useSettings } from "@/context/SettingsContext";
import { DHIKR_LIST } from "@/data/dhikr";
import { useTapCooldown } from "@/hooks/useTapCooldown";
import { getStorageJson, setStorageJson } from "@/services/storageService";
import type { Dhikr } from "@/types/dhikr";
import type { ActiveSession } from "@/types/session";
import { clampTarget, getDhikrById } from "@/utils/dhikr";

interface ActiveSessionContextValue {
  hydrated: boolean;
  dhikr: Dhikr;
  count: number;
  target: number;
  completed: boolean;
  startedAt: number;
  increment: () => void;
  undo: () => void;
  reset: () => void;
  finish: () => void;
  selectDhikr: (dhikrId: string) => void;
  setTarget: (target: number) => void;
}

const defaultDhikr = DHIKR_LIST[0];

const DEFAULT_ACTIVE: ActiveSession = {
  dhikrId: defaultDhikr.id,
  target: defaultDhikr.target,
  count: 0,
  startedAt: Date.now(),
  completed: false,
};

const ActiveSessionContext = createContext<ActiveSessionContextValue | null>(
  null,
);

function triggerHaptic(task: Promise<void>) {
  task.catch((error) => {
    console.warn("[ActiveSessionContext.haptics]", error);
  });
}

function sanitize(raw: unknown): ActiveSession | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;
  const dhikr = DHIKR_LIST.find((d) => d.id === value.dhikrId);
  if (!dhikr) return null;
  if (typeof value.count !== "number" || value.count < 0) return null;

  return {
    dhikrId: dhikr.id,
    target:
      typeof value.target === "number"
        ? clampTarget(value.target)
        : dhikr.target,
    count: Math.floor(value.count),
    startedAt:
      typeof value.startedAt === "number" ? value.startedAt : Date.now(),
    completed: value.completed === true,
  };
}

/** Provider state sesi tasbih aktif beserta persistensi ter-debounce ke AsyncStorage. */
export function ActiveSessionProvider({ children }: { children: ReactNode }) {
  const { addSession } = useSessions();
  const { hapticsEnabled, autoReset } = useSettings();
  const canTap = useTapCooldown();

  const [active, setActive] = useState<ActiveSession>(DEFAULT_ACTIVE);
  const [hydrated, setHydrated] = useState(false);
  const sessionSavedRef = useRef(false);

  useEffect(() => {
    let alive = true;

    getStorageJson(STORAGE_KEYS.ACTIVE_SESSION, sanitize)
      .then((parsed) => {
        if (!alive || !parsed) return;
        sessionSavedRef.current = parsed.completed;
        setActive(parsed);
      })
      .finally(() => {
        if (alive) setHydrated(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  // Debounce agar tap cepat tidak menulis ke storage setiap ketukan.
  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(() => {
      void setStorageJson(STORAGE_KEYS.ACTIVE_SESSION, active);
    }, SESSION_CONFIG.SAVE_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [active, hydrated]);

  const dhikr = getDhikrById(active.dhikrId);

  const increment = useCallback(() => {
    if (!canTap()) return;
    if (hapticsEnabled) {
      triggerHaptic(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
    }
    setActive((prev) => {
      if (prev.completed) return prev;
      const count = prev.count + 1;
      return { ...prev, count, completed: count >= prev.target };
    });
  }, [canTap, hapticsEnabled]);

  const undo = useCallback(() => {
    setActive((prev) => {
      if (prev.completed || prev.count === 0) return prev;
      return { ...prev, count: prev.count - 1 };
    });
  }, []);

  const reset = useCallback(() => {
    sessionSavedRef.current = false;
    setActive((prev) => ({
      ...prev,
      count: 0,
      startedAt: Date.now(),
      completed: false,
    }));
  }, []);

  const selectDhikr = useCallback(
    (dhikrId: string) => {
      const next = DHIKR_LIST.find((d) => d.id === dhikrId);
      if (!next) return;
      if (next.id === active.dhikrId) return;

      if (hapticsEnabled) {
        triggerHaptic(Haptics.selectionAsync());
      }
      sessionSavedRef.current = false;
      setActive({
        dhikrId: next.id,
        target: next.target,
        count: 0,
        startedAt: Date.now(),
        completed: false,
      });
    },
    [active.dhikrId, hapticsEnabled],
  );

  const setTarget = useCallback((value: number) => {
    const target = clampTarget(value);
    setActive((prev) => ({
      ...prev,
      target,
      completed: prev.count >= target,
    }));
  }, []);

  const finish = useCallback(() => {
    if (active.count > 0 && !sessionSavedRef.current) {
      sessionSavedRef.current = true;
      addSession({
        id: `${active.dhikrId}-${Date.now()}`,
        dhikrId: active.dhikrId,
        count: active.count,
        target: active.target,
        startedAt: active.startedAt,
        finishedAt: Date.now(),
      });
    }
    reset();
  }, [active, addSession, reset]);

  // Simpan sesi sekali saat target tercapai.
  useEffect(() => {
    if (!active.completed || sessionSavedRef.current) return;
    sessionSavedRef.current = true;
    addSession({
      id: `${active.dhikrId}-${Date.now()}`,
      dhikrId: active.dhikrId,
      count: active.count,
      target: active.target,
      startedAt: active.startedAt,
      finishedAt: Date.now(),
    });
    if (hapticsEnabled) {
      triggerHaptic(
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
      );
    }
    if (autoReset) {
      const timer = setTimeout(reset, SESSION_CONFIG.AUTO_RESET_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [
    active.completed,
    active.count,
    active.dhikrId,
    active.target,
    active.startedAt,
    addSession,
    hapticsEnabled,
    autoReset,
    reset,
  ]);

  return (
    <ActiveSessionContext.Provider
      value={{
        hydrated,
        dhikr,
        count: active.count,
        target: active.target,
        completed: active.completed,
        startedAt: active.startedAt,
        increment,
        undo,
        reset,
        finish,
        selectDhikr,
        setTarget,
      }}
    >
      {children}
    </ActiveSessionContext.Provider>
  );
}

/**
 * Hook untuk mengakses state dan aksi sesi tasbih aktif.
 *
 * @returns Nilai context sesi aktif.
 * @throws Error bila dipanggil di luar `ActiveSessionProvider`.
 */
export function useActiveSession() {
  const ctx = useContext(ActiveSessionContext);
  if (!ctx) {
    throw new Error(
      "useActiveSession harus dipakai di dalam ActiveSessionProvider",
    );
  }
  return ctx;
}
