/**
 * @file Kontrak tipe data untuk jadwal salat dan perhitungan waktu salat berikutnya.
 * @layer Types
 */

/** Lima waktu salat wajib sesuai nama key dari API Aladhan. */
export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

/** Satu item jadwal salat yang siap ditampilkan pada UI maupun notifikasi. */
export interface PrayerSchedule {
  name: PrayerName;
  label: string;
  time: string;
}

/** Informasi waktu salat berikutnya beserta penanda apakah jatuh pada hari esok. */
export interface NextPrayer {
  schedule: PrayerSchedule;
  date: Date;
  isTomorrow: boolean;
}
