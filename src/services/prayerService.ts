/**
 * @file Service untuk mengambil jadwal salat harian dari API Aladhan.
 * @layer Services
 */

import { PRAYER_CONFIG } from "@/constants/config";
import type { PrayerName, PrayerSchedule } from "@/types/prayer";

export type { PrayerName, PrayerSchedule };

type AladhanResponse = {
  code: number;
  status: string;
  data?: {
    timings?: Record<string, string>;
    date?: {
      readable: string;
      hijri: {
        date: string;
        month: {
          en: string;
        };
        year: string;
      };
    };
  };
};

const PRAYERS: {
  name: PrayerName;
  label: string;
}[] = [
  { name: "Fajr", label: "Subuh" },
  { name: "Dhuhr", label: "Zuhur" },
  { name: "Asr", label: "Asar" },
  { name: "Maghrib", label: "Magrib" },
  { name: "Isha", label: "Isya" },
];

/**
 * Mengambil daftar waktu salat wajib untuk kota konfigurasi default hari ini.
 *
 * @returns Array jadwal salat 5 waktu yang sudah dinormalisasi ke format `"HH:MM"`.
 * @throws Error apabila jaringan gagal, status HTTP tidak OK, atau data waktu tidak lengkap.
 */
export async function getPrayerSchedule(): Promise<PrayerSchedule[]> {
  try {
    const params = new URLSearchParams({
      city: PRAYER_CONFIG.DEFAULT_CITY,
      country: PRAYER_CONFIG.DEFAULT_COUNTRY,
    });

    const response = await fetch(`${PRAYER_CONFIG.API_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Gagal mengambil jadwal salat (HTTP ${response.status})`);
    }

    const result: AladhanResponse = await response.json();
    const timings = result.data?.timings;

    if (result.code !== 200 || !timings) {
      throw new Error("Data jadwal salat tidak tersedia");
    }

    return PRAYERS.map((prayer) => {
      const rawTime = timings[prayer.name];
      if (typeof rawTime !== "string" || !rawTime.trim()) {
        throw new Error(`Waktu salat untuk ${prayer.name} tidak ditemukan`);
      }

      return {
        name: prayer.name,
        label: prayer.label,
        time: rawTime.split(" ")[0],
      };
    });
  } catch (error) {
    console.error("[prayerService.getPrayerSchedule]", error);
    throw error;
  }
}
