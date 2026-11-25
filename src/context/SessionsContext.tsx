/**
 * @file Context penyimpan riwayat sesi tasbih yang telah selesai beserta persistensinya.
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

import { SESSION_CONFIG, STORAGE_KEYS } from "@/constants/config";
import { getStorageJson, setStorageJson } from "@/services/storageService";
import type { Session } from "@/types/session";

interface SessionsContextValue {
  sessions: Session[];
  hydrated: boolean;
  addSession: (session: Session) => void;
  clearSessions: () => void;
}

const SessionsContext = createContext<SessionsContextValue | null>(null);

function isSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.id === "string" &&
    typeof s.dhikrId === "string" &&
    typeof s.count === "number" &&
    typeof s.target === "number" &&
    typeof s.startedAt === "number" &&
    typeof s.finishedAt === "number"
  );
}

function sanitizeSessions(raw: unknown): Session[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.filter(isSession);
}

/** Provider riwayat sesi tasbih yang dimuat dari dan disimpan ke AsyncStorage. */
export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;

    getStorageJson(STORAGE_KEYS.SESSIONS, sanitizeSessions)
      .then((parsed) => {
        if (!alive || !parsed) return;
        setSessions(parsed);
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
    void setStorageJson(STORAGE_KEYS.SESSIONS, sessions);
  }, [sessions, hydrated]);

  const addSession = useCallback((session: Session) => {
    setSessions((prev) =>
      [session, ...prev].slice(0, SESSION_CONFIG.MAX_SAVED_SESSIONS),
    );
  }, []);

  const clearSessions = useCallback(() => {
    setSessions([]);
  }, []);

  return (
    <SessionsContext.Provider
      value={{ sessions, hydrated, addSession, clearSessions }}
    >
      {children}
    </SessionsContext.Provider>
  );
}

/**
 * Hook untuk membaca daftar riwayat sesi serta menambah atau menghapus riwayat.
 *
 * @returns Nilai context riwayat sesi.
 * @throws Error bila dipanggil di luar `SessionsProvider`.
 */
export function useSessions() {
  const ctx = useContext(SessionsContext);
  if (!ctx) {
    throw new Error("useSessions harus dipakai di dalam SessionsProvider");
  }
  return ctx;
}
