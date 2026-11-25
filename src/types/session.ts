/**
 * @file Kontrak tipe data untuk sesi tasbih (tersimpan, aktif, dan ringkasan harian).
 * @layer Types
 */

/** Riwayat satu sesi tasbih yang telah selesai dan disimpan ke perangkat. */
export interface Session {
  id: string;
  dhikrId: string;
  count: number;
  target: number;
  startedAt: number;
  finishedAt: number;
}

/** State sesi tasbih yang sedang berlangsung. */
export interface ActiveSession {
  dhikrId: string;
  target: number;
  count: number;
  startedAt: number;
  completed: boolean;
}

/** Rekap total hitungan dan jumlah sesi yang diselesaikan pada hari berjalan. */
export interface TodaySessionStats {
  count: number;
  sessions: number;
}
