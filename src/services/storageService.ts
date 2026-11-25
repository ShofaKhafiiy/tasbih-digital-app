/**
 * @file Wrapper AsyncStorage terstandar untuk baca/tulis JSON dengan validasi dan logging error.
 * @layer Services
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Membaca data JSON dari AsyncStorage dan memvalidasi strukturnya lewat `sanitize`.
 *
 * @typeParam T - Tipe hasil data yang sudah tervalidasi.
 * @param key - Kunci AsyncStorage yang dibaca.
 * @param sanitize - Fungsi pemvalidasi/penormalisasi hasil parse JSON.
 * @returns Data hasil sanitasi, atau `null` jika kosong, rusak, atau gagal dibaca.
 */
export async function getStorageJson<T>(
  key: string,
  sanitize: (raw: unknown) => T | null,
): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return sanitize(parsed);
  } catch (error) {
    console.error("[storageService.getStorageJson]", key, error);
    return null;
  }
}

/**
 * Menyimpan nilai sebagai string JSON ke AsyncStorage dengan pencatatan error eksplisit.
 *
 * @param key - Kunci AsyncStorage tujuan.
 * @param value - Nilai yang akan diserialisasi ke JSON.
 */
export async function setStorageJson(
  key: string,
  value: unknown,
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("[storageService.setStorageJson]", key, error);
  }
}
