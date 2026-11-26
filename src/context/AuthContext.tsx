/**
 * @file Context autentikasi global (kerangka awal / stub Fase 0 sebelum integrasi Supabase).
 * @layer Context
 */

import { createContext, useCallback, useContext, useMemo } from "react";
import type { ReactNode } from "react";

import type {
  AuthActionResult,
  AuthContextValue,
  AuthCredentials,
  SignUpPayload,
} from "@/types";

const AuthContext = createContext<AuthContextValue | null>(null);

/** Provider autentikasi sementara (stub Fase 0) untuk membuka pengembangan paralel UI dan guard. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const signIn = useCallback(
    async (credentials: AuthCredentials): Promise<AuthActionResult> => {
      console.warn(
        "[AuthContext.stub] signIn dipanggil sebelum implementasi Fase 1:",
        credentials.email,
      );
      return { error: "AuthContext masih dalam mode stub (Fase 0)." };
    },
    [],
  );

  const signUp = useCallback(
    async (payload: SignUpPayload): Promise<AuthActionResult> => {
      console.warn(
        "[AuthContext.stub] signUp dipanggil sebelum implementasi Fase 1:",
        payload.email,
      );
      return { error: "AuthContext masih dalam mode stub (Fase 0)." };
    },
    [],
  );

  const signOut = useCallback(async (): Promise<AuthActionResult> => {
    console.warn(
      "[AuthContext.stub] signOut dipanggil sebelum implementasi Fase 1",
    );
    return { error: "AuthContext masih dalam mode stub (Fase 0)." };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: null,
      session: null,
      isLoading: false,
      signIn,
      signUp,
      signOut,
    }),
    [signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook untuk mengakses status sesi dan aksi autentikasi global.
 *
 * @returns Objek status dan aksi autentikasi (`AuthContextValue`).
 * @throws Error bila dipanggil di luar `AuthProvider`.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return ctx;
}
