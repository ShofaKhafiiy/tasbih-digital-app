import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

import type { Session } from "@/types/session";

interface SessionsContextValue {
  sessions: Session[];
  hydrated: boolean;
  addSession: (session: Session) => void;
  clearSessions: () => void;
}

const STORAGE_KEY = "@tasbih/sessions/v1";

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

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!alive || !raw) return;
        try {
          const parsed: unknown = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setSessions(parsed.filter(isSession));
          }
        } catch {
          // Data rusak: mulai dari kosong.
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)).catch(
      () => undefined,
    );
  }, [sessions, hydrated]);

  const addSession = useCallback((session: Session) => {
    setSessions((prev) => [session, ...prev].slice(0, 500));
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

export function useSessions() {
  const ctx = useContext(SessionsContext);
  if (!ctx) {
    throw new Error("useSessions harus dipakai di dalam SessionsProvider");
  }
  return ctx;
}
