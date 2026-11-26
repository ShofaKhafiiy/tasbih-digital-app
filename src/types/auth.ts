/**
 * @file Kontrak tipe data domain untuk autentikasi dan sesi pengguna.
 * @layer Types
 */

/** Kredensial dasar yang dibutuhkan saat proses masuk (Sign In). */
export interface AuthCredentials {
  email: string;
  password: string;
}

/** Payload pendaftaran akun baru (Sign Up) beserta nama tampilan opsional. */
export interface SignUpPayload extends AuthCredentials {
  displayName?: string;
}

/** Metadata profil ringkas yang melekat pada akun pengguna Supabase. */
export interface AuthUserMetadata {
  displayName?: string;
  callsign?: string;
}

/** Representasi pengguna terautentikasi yang aman dikonsumsi oleh UI. */
export interface AuthUser {
  id: string;
  email: string | null;
  metadata: AuthUserMetadata;
}

/** Ringkasan sesi aktif termasuk token dan waktu kedaluwarsa. */
export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number | null;
  user: AuthUser;
}

/** Hasil operasi aksi autentikasi dengan pesan error ramah pengguna bila gagal. */
export interface AuthActionResult {
  error: string | null;
}

/** Status global autentikasi yang dikelola oleh `AuthContext`. */
export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
}

/** Kontrak lengkap nilai dan aksi yang diekspos oleh `AuthProvider` dan `useAuth()`. */
export interface AuthContextValue extends AuthState {
  signIn: (credentials: AuthCredentials) => Promise<AuthActionResult>;
  signUp: (payload: SignUpPayload) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
}
