/**
 * @file Hook pengelola state pengambilan jadwal salat harian dari prayerService.
 * @layer Hooks
 */

import { useEffect, useState } from "react";

import { getPrayerSchedule } from "@/services/prayerService";
import type { PrayerSchedule } from "@/types/prayer";

/**
 * Mengambil jadwal salat harian saat komponen dipasang dan mengekspos status loading/error.
 *
 * @returns Objek berisi `schedules`, `loading`, dan `error`.
 */
export function usePrayerSchedule() {
  const [schedules, setSchedules] = useState<PrayerSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getPrayerSchedule()
      .then((result) => {
        if (!cancelled) setSchedules(result);
      })
      .catch((err) => {
        console.error("[usePrayerSchedule]", err);
        if (!cancelled) setError("Jadwal Sholat tidak dapat dimuat");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { schedules, loading, error };
}
