/**
 * @file Kontrak tipe data untuk artikel panduan penggunaan aplikasi.
 * @layer Types
 */

/** Satu topik panduan penggunaan yang ditampilkan di halaman Panduan. */
export interface Guide {
  slug: string;
  title: string;
  body: string;
}
