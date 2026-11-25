/**
 * @file Fungsi utilitas murni untuk pencarian dzikir dan validasi/pembatasan nilai target.
 * @layer Utils
 */

import { SESSION_CONFIG } from "@/constants/config";
import { DHIKR_LIST } from "@/data/dhikr";
import type { Dhikr } from "@/types/dhikr";

/** Batas minimum jumlah target hitungan dalam satu sesi. */
export const TARGET_MIN = SESSION_CONFIG.TARGET_MIN;

/** Batas maksimum jumlah target hitungan dalam satu sesi. */
export const TARGET_MAX = SESSION_CONFIG.TARGET_MAX;

const defaultDhikr = DHIKR_LIST[0];

/**
 * Mengambil data dzikir berdasarkan ID.
 *
 * @param id - ID dzikir yang dicari.
 * @returns Item dzikir yang cocok, atau item pertama sebagai fallback aman.
 */
export function getDhikrById(id?: string): Dhikr {
  if (!id) return defaultDhikr;
  return DHIKR_LIST.find((item) => item.id === id) ?? defaultDhikr;
}

/**
 * Membatasi nilai target ke dalam rentang `[TARGET_MIN, TARGET_MAX]`.
 *
 * @param value - Angka target masukan.
 * @param fallback - Nilai cadangan apabila `value` bukan angka valid.
 * @returns Angka target bulat dalam rentang yang diizinkan.
 */
export function clampTarget(
  value: number,
  fallback = defaultDhikr.target,
): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(TARGET_MAX, Math.max(TARGET_MIN, Math.round(value)));
}

/**
 * Memeriksa apakah nilai target berupa bilangan bulat dalam rentang valid.
 *
 * @param value - Angka target yang diperiksa.
 * @returns `true` jika valid, `false` jika tidak.
 */
export function isValidTarget(value: number): boolean {
  return (
    Number.isInteger(value) && value >= TARGET_MIN && value <= TARGET_MAX
  );
}
