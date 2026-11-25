/**
 * @file Fungsi pemformatan tanggal, countdown, dan parsing string waktu salat.
 * @layer Utils
 */

const DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const MONTHS_FULL = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

/**
 * Memformat tanggal beranda, misalnya `"Rabu, 25 November"`.
 *
 * @param date - Objek tanggal referensi (default: waktu saat ini).
 * @returns String tanggal berbahasa Indonesia.
 */
export function formatHomeDate(date = new Date()): string {
  return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS_FULL[date.getMonth()]}`;
}

/**
 * Memformat timestamp selesai sesi untuk tampilan riwayat, misalnya `"25 Nov · 21.35"`.
 *
 * @param timestamp - Waktu selesai sesi dalam milidetik (epoch ms).
 * @returns String tanggal dan jam ringkas.
 */
export function formatSessionDate(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} · ${hours}.${minutes}`;
}

/**
 * Memformat sisa durasi menjadi string hitung mundur `"HH:MM:SS"`.
 *
 * @param remainingMs - Sisa waktu dalam milidetik.
 * @returns String countdown berformat dua digit per satuan.
 */
export function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

/**
 * Mengubah string waktu salat `"HH:MM"` menjadi objek `Date` pada tanggal referensi.
 *
 * @param time - String jam berformat 24 jam `"HH:MM"`.
 * @param baseDate - Tanggal referensi yang dipakai sebagai tahun/bulan/hari.
 * @returns Objek `Date` dengan jam dan menit sesuai parameter `time`.
 * @throws Error apabila format jam atau menit tidak valid.
 */
export function parsePrayerTimeForDate(
  time: string,
  baseDate = new Date(),
): Date {
  const [hoursStr, minutesStr] = time.split(":");
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(`Format waktu salat tidak valid: "${time}"`);
  }

  const date = new Date(baseDate.getTime());
  date.setHours(hours, minutes, 0, 0);
  return date;
}
