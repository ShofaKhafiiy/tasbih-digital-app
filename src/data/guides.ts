/**
 * @file Data statis artikel panduan penggunaan aplikasi.
 * @layer Data
 */

import type { Guide } from "@/types/guide";

/** Daftar topik panduan yang ditampilkan pada indeks dan detail panduan. */
export const GUIDES: Guide[] = [
  {
    slug: "memulai",
    title: "Memulai Tasbih",
    body: "Ketuk cincin untuk menghitung. Setiap ketukan menambah hitungan dan bisa dibatalkan lewat tombol undo.",
  },
  {
    slug: "target",
    title: "Mengatur Target",
    body: "Buka pengaturan target untuk menentukan jumlah hitungan per putaran. Target bisa diubah kapan saja.",
  },
  {
    slug: "riwayat",
    title: "Melihat Riwayat",
    body: "Buka tab Riwayat untuk melihat sesi yang sudah selesai. Riwayat tersimpan otomatis di perangkat.",
  },
];

/**
 * Mencari artikel panduan berdasarkan slug URL.
 *
 * @param slug - Slug halaman panduan.
 * @returns Objek `Guide` jika ditemukan, atau `undefined`.
 */
export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
