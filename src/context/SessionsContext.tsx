import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@/types/session";

interface SessionsContextValue {
  sessions: Session[];
  addSession: (session: Session) => void;
  clearSessions: () => void;
}

const SessionsContext = createContext<SessionsContextValue | null>(null);

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);

  const addSession = useCallback((session: Session) => {
    setSessions((prev) => [session, ...prev]);
  }, []);

  const clearSessions = useCallback(() => {
    setSessions([]);
  }, []);

  return (
    <SessionsContext.Provider value={{ sessions, addSession, clearSessions }}>
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
