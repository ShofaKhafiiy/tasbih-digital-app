/**
 * @file Utilitas penentuan waktu salat terdekat berikutnya dari daftar jadwal harian.
 * @layer Utils
 */

import type { NextPrayer, PrayerSchedule } from "@/types/prayer";
import { parsePrayerTimeForDate } from "@/utils/dateFormat";

/**
 * Menentukan waktu salat berikutnya berdasarkan daftar jadwal dan timestamp saat ini.
 * Jika seluruh jadwal hari ini telah lewat, waktu Subuh esok hari dikembalikan.
 *
 * @param schedules - Daftar jadwal salat wajib hari ini secara berurutan.
 * @param nowMs - Timestamp saat ini dalam milidetik.
 * @returns Informasi salat berikutnya, atau `null` apabila `schedules` kosong.
 */
export function getNextPrayer(
  schedules: PrayerSchedule[],
  nowMs: number,
): NextPrayer | null {
  if (schedules.length === 0) {
    return null;
  }

  const nowDate = new Date(nowMs);
  for (const schedule of schedules) {
    const date = parsePrayerTimeForDate(schedule.time, nowDate);
    if (date.getTime() > nowMs) {
      return { schedule, date, isTomorrow: false };
    }
  }

  // Semua waktu hari ini sudah lewat — berikutnya Subuh esok hari.
  const tomorrow = new Date(nowMs);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const firstSchedule = schedules[0];
  return {
    schedule: firstSchedule,
    date: parsePrayerTimeForDate(firstSchedule.time, tomorrow),
    isTomorrow: true,
  };
}
