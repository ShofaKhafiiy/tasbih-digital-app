/**
 * @file Kontrak tipe data untuk item dzikir.
 * @layer Types
 */

/** Representasi satu bacaan dzikir beserta target dan warna aksennya. */
export interface Dhikr {
  id: string;
  name: string;
  arabic: string;
  description: string;
  target: number;
  color: string;
  softColor: string;
}
