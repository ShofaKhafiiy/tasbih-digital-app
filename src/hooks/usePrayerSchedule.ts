import { useEffect, useState } from "react";

import {
    getPrayerSchedule,
    type PrayerSchedule,
} from "@/services/prayerService";

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
      .catch(() => {
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
