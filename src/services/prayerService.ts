export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

export type PrayerSchedule = {
  name: PrayerName;
  label: string;
  time: string;
};

type AladhanResponse = {
  code: number;
  status: string;
  data: {
    timings: Record<string, string>;
    date: {
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

const API_URL = "https://api.aladhan.com/v1/timingsByCity";

const PRAYERS: {
  name: PrayerName;
  label: string;
}[] = [
  {
    name: "Fajr",
    label: "Subuh",
  },
  { name: "Dhuhr", label: "Zuhur" },
  { name: "Asr", label: "Asar" },
  { name: "Maghrib", label: "Magrib" },
  { name: "Isha", label: "Isya" },
];

export async function getPrayerSchedule(): Promise<PrayerSchedule[]> {
  const params = new URLSearchParams({
    city: "Malang",
    country: "Indonesia",
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil jadwal salat");
  }
  const result: AladhanResponse = await response.json();

  if (result.code !== 200) {
    throw new Error("Data jadwal salat tidak tersedia");
  }
  return PRAYERS.map((prayer) => ({
    name: prayer.name,
    label: prayer.label,
    time: result.data.timings[prayer.name].split(" ")[0],
  }));
}
