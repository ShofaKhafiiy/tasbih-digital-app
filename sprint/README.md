# Indeks Sprint & Pembagian Tugas Praktikum (`sprint/`)

Folder ini berisi panduan sprint per modul praktikum dan pembagian tugas paralel untuk tim 2 orang (**Anggota A** & **Anggota B**).

---

## Status & Checklist Modul

| Modul | Status | File Sprint Utama | File Pembagian Tugas | Konteks Singkat |
| :--- | :--- | :--- | :--- | :--- |
| **Modul 1–3** | `[x]` Selesai | *(Sudah terintegrasi di codebase)* | — | UI dasar, navigasi Expo Router, state/context, jadwal salat, dan refactor arsitektur (`ARCHITECTURE.md`). |
| **Modul 4** | `[ ]` **AKTIF (Siap Dikerjakan)** | [`sprint-modul-4.md`](./sprint-modul-4.md) | [`pembagian-modul-4.md`](./pembagian-modul-4.md) | Autentikasi Supabase, `expo-secure-store`, `AuthContext` real-time, form login/register, dan *Route Protection Guard*. |
| **Modul 5+** | `[ ]` Belum Tersedia | `sprint-modul-5.md` *(menyusul)* | `pembagian-modul-5.md` *(menyusul)* | Akan ditambahkan menggunakan template & format yang sama saat modul berikutnya dimulai. |

---

## Konvensi Penamaan & Template

Untuk modul-modul berikutnya, setiap sprint baru mengikuti format standar berikut:
- **`sprint-modul-<N>.md`**: Ringkasan konsep modul, target fitur, skenario rubrik, dan checklist verifikasi.
- **`pembagian-modul-<N>.md`**: Pemecahan sub-sprint paralel untuk **Anggota A** dan **Anggota B** (*zero merge conflict*, kepemilikan file eksklusif, checklist langkah kerja, dan bagian saran aktivasi skill pembimbing `.agents/skills/mobile-mental-mentor`).

---

## Instruksi untuk AI Agent

1. **Identifikasi Sprint Aktif:** Cek tabel **Status & Checklist Modul** di atas untuk mengetahui modul mana yang berstatus **AKTIF (`[ ]`)** dan mana yang sudah selesai (`[x]`).
2. **Buka File Pembagian Aktif:** Saat ini sprint yang aktif adalah **`sprint/pembagian-modul-4.md`** (merujuk ke `sprint/sprint-modul-4.md`).
3. **Tawarkan Mode Pembimbing:** Saat pertama kali membahas atau memulai sprint aktif, ikuti instruksi di bagian *"Saran Penggunaan Mode Pembimbing AI"* pada file `pembagian-modul-<N>.md` (tanyakan kepada user apakah ingin mengaktifkan `.agents/skills/mobile-mental-mentor` dan memilih peran **Anggota A** atau **Anggota B**).
4. **Update Status:** Setelah seluruh target modul selesai diverifikasi dan di-merge, ubah status modul pada tabel di atas menjadi `[x] Selesai`.
