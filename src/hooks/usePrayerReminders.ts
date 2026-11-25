/**
 * @file Hook penghubung pemuatan jadwal salat dengan penjadwalan notifikasi pengingat otomatis.
 * @layer Hooks
 */

import { useEffect } from "react";

import { schedulePrayerReminders } from "@/services/prayerNotificationService";
import type { PrayerSchedule } from "@/types/prayer";

/**
 * Menjadwalkan ulang notifikasi pengingat salat segera setelah jadwal selesai dimuat.
 *
 * @param schedules - Daftar jadwal salat hasil pemanggilan API.
 * @param loading - Status apakah jadwal masih dalam proses pengambilan.
 */
export function usePrayerReminders(
  schedules: PrayerSchedule[],
  loading: boolean,
) {
  useEffect(() => {
    if (loading || schedules.length === 0) return;

    schedulePrayerReminders(schedules).catch((error) => {
      console.warn("[usePrayerReminders]", error);
    });
  }, [loading, schedules]);
}
