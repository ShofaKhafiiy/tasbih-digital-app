/**
 * @file Utilitas agregasi statistik sesi tasbih untuk hari berjalan.
 * @layer Utils
 */

import type { Session, TodaySessionStats } from "@/types/session";

/**
 * Menghitung total hitungan dan jumlah sesi yang selesai sejak pukul 00:00 hari ini.
 *
 * @param sessions - Daftar seluruh riwayat sesi tersimpan.
 * @param now - Tanggal referensi hari ini (default: waktu saat ini).
 * @returns Objek rekap `count` dan `sessions` untuk hari ini.
 */
export function getTodaySessionStats(
  sessions: Session[],
  now = new Date(),
): TodaySessionStats {
  const startOfDay = new Date(now.getTime());
  startOfDay.setHours(0, 0, 0, 0);
  const startMs = startOfDay.getTime();

  let count = 0;
  let sessionCount = 0;

  for (const session of sessions) {
    if (session.finishedAt >= startMs) {
      sessionCount += 1;
      count += session.count;
    }
  }

  return { count, sessions: sessionCount };
}
