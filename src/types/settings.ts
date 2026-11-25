/**
 * @file Kontrak tipe data untuk pengaturan preferensi aplikasi.
 * @layer Types
 */

/** Mode tema tampilan yang dapat dipilih pengguna. */
export type ThemeMode = "system" | "light" | "dark";

/** Struktur lengkap preferensi aplikasi yang disimpan secara lokal. */
export interface AppSettings {
  hapticsEnabled: boolean;
  autoReset: boolean;
  ambient3D: boolean;
  themeMode: ThemeMode;
}
