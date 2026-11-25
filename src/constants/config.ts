/**
 * @file Konfigurasi terpusat aplikasi (kunci storage, batas sesi, dan jadwal salat).
 * @layer Constants
 */

/** Kunci penyimpanan lokal AsyncStorage yang dipakai di seluruh context. */
export const STORAGE_KEYS = {
  ACTIVE_SESSION: "@tasbih/active/v1",
  SESSIONS: "@tasbih/sessions/v1",
  SETTINGS: "@tasbih/settings/v1",
} as const;

/** Batas dan parameter perilaku sesi penghitungan tasbih. */
export const SESSION_CONFIG = {
  MAX_SAVED_SESSIONS: 500,
  SAVE_DEBOUNCE_MS: 350,
  AUTO_RESET_DELAY_MS: 1600,
  DEFAULT_TAP_COOLDOWN_MS: 120,
  TARGET_MIN: 1,
  TARGET_MAX: 9999,
  QUICK_TARGETS: [33, 99, 100, 1000],
} as const;

/** Konfigurasi API jadwal salat dan pengingat notifikasi lokal. */
export const PRAYER_CONFIG = {
  API_URL: "https://api.aladhan.com/v1/timingsByCity",
  DEFAULT_CITY: "Malang",
  DEFAULT_COUNTRY: "Indonesia",
  REMINDER_LEAD_MINUTES: 15,
  NOTIFICATION_CHANNEL_ID: "prayer-reminders",
  NOTIFICATION_CHANNEL_NAME: "Pengingat Waktu Sholat",
  NOTIFICATION_TAG: "prayer-reminder",
} as const;
