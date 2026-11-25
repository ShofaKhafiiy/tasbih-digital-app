# Arsitektur Proyek — Tasbih Digital App

Dokumen ini adalah peta kerja bersama untuk tim (2 orang) agar kode **mudah dipahami**, **jelas letak penambahannya**, dan **mudah dilacak saat ada bug**.

---

## 1. Lima Prinsip Inti

1. **Separation of Concerns (SoC) — *Satu Folder, Satu Peran***
   Setiap lapisan punya tugas spesifik dan alur dependensi **satu arah** dari atas ke bawah:

   ```text
   src/app/ (Screens & Routes)
       │
       ├──► src/components/ (UI Components)
       │
       ├──► src/hooks/ & src/context/ (State, Side Effects & Flow)
       │        │
       │        └──► src/services/ (API, Storage, Notifications)
       │
       └──► src/utils/ + src/data/ + src/types/ + src/constants/ + src/styles/
   ```

   **Aturan Keras:**
   - File di `src/app/` **dilarang** memanggil `fetch()`, `AsyncStorage`, atau `expo-notifications` langsung. Gunakan `hooks/`, `context/`, atau `services/`.
   - File di `src/utils/` adalah **fungsi murni** (tanpa React hook, tanpa I/O, tanpa side effect).
   - File di `src/services/` **tidak** bergantung pada UI atau React Context.

2. **Single Responsibility Principle (SRP) — *1 File = 1 Tugas Jelas***
   - Jika halaman di `src/app/` mulai panjang karena logika kalkulasi, formatting, atau section UI yang gemuk, pecah:
     - Logika murni → `src/utils/`
     - State/side-effect → `src/hooks/`
     - Potongan UI → `src/components/<fitur>/`

3. **Explicit Contracts via `src/types/` — *Kontrak Data Terpusat***
   - Semua model data domain (`Dhikr`, `Session`, `ActiveSession`, `PrayerSchedule`, `AppSettings`, `Guide`) didefinisikan di `src/types/` dan diimpor oleh seluruh lapisan.
   - Hindari `any`; biarkan TypeScript menangkap ketidakcocokan data sejak *compile time*.

4. **Fail Fast & Explicit Error Logging — *Jangan Telan Error Diam-Diam***
   - Dilarang menulis `catch {}` atau `.catch(() => undefined)` kosong pada operasi I/O (API, storage, notifikasi, haptics, splash).
   - Setiap `catch` wajib mencatat sumber modulnya dengan format konsisten:
     ```ts
     console.error("[namaModul.namaFungsi]", error);
     // atau console.warn("[namaModul.namaFungsi]", error) untuk error non-fatal
     ```

5. **KISS & Principle of Least Astonishment (POLA)**
   - Pilih solusi paling sederhana, pakai *early return* daripada `if/else` bersarang dalam.
   - Penamaan file harus jujur dan konsisten:
     - `use...ts` → wajib di `src/hooks/`
     - `...Service.ts` → wajib di `src/services/`
     - `...Context.tsx` → wajib di `src/context/`
     - Tipe data domain → wajib di `src/types/`

---

## 2. Peta Folder `src/`

| Folder | Tanggung Jawab | Contoh Isi |
| :--- | :--- | :--- |
| `src/app/` | Routing (Expo Router), komposisi halaman, navigasi, konfirmasi user (`Alert`). | `(tabs)/index.tsx`, `counting.tsx`, `recap.tsx`, `panduan/` |
| `src/components/` | Komponen UI presentasional per area fitur (`brand/`, `home/`, `navigation/`, `tasbih/`, `ui/`). | `TasbihHeroCard.tsx`, `PrayerTimesBar.tsx`, `BeadRing.tsx` |
| `src/hooks/` | Custom React hooks untuk state/side-effect yang reusable atau memisahkan efek dari screen. | `usePrayerSchedule.ts`, `usePrayerReminders.ts`, `useTapCooldown.ts` |
| `src/context/` | Global state aplikasi dan sinkronisasi dengan storage. | `ActiveSessionContext.tsx`, `SessionsContext.tsx`, `SettingsContext.tsx`, `ThemeContext.tsx` |
| `src/services/` | Komunikasi eksternal: HTTP API, `AsyncStorage` wrapper, dan notifikasi lokal. | `prayerService.ts`, `prayerNotificationService.ts`, `storageService.ts` |
| `src/utils/` | Fungsi pembantu murni (format tanggal, statistik sesi, validasi target, hitung jadwal sholat berikutnya). | `dateFormat.ts`, `dhikr.ts`, `prayerTime.ts`, `sessionStats.ts` |
| `src/types/` | Definisi interface & type TypeScript bersama. | `dhikr.ts`, `session.ts`, `prayer.ts`, `settings.ts`, `guide.ts`, `index.ts` |
| `src/data/` | Data statis aplikasi (daftar dzikir, konten panduan). | `dhikr.ts`, `guides.ts` |
| `src/constants/` | Token desain & konfigurasi terpusat (warna, spasi, tipografi, animasi, aset, batas/API config). | `colors.ts`, `config.ts`, `spacing.ts`, `typography.ts`, `motion.ts`, `assets.ts` |
| `src/styles/` | StyleSheet terpusat berbasis tema (`useAppStyles`), terpecah per area fitur. | `global.ts`, `components.ts`, `components/`, `index.ts` |

---

## 3. Panduan Cepat Tim

### "Mau Nambah / Ubah Sesuatu → Buka Mana?"

| Kebutuhan | Lokasi Target |
| :--- | :--- |
| Tambah halaman atau rute baru | `src/app/` |
| Tambah/ubah kartu, modal, atau elemen tampilan | `src/components/<kategori>/` |
| Tambah daftar dzikir atau artikel panduan | `src/data/dhikr.ts` atau `src/data/guides.ts` |
| Ubah warna, font, atau jarak | `src/constants/` dan `src/styles/` |
| Tambah field pengaturan atau data sesi | `src/types/` lalu update `src/context/` |
| Tambah logika hitungan/format/validasi | `src/utils/` |
| Integrasi API baru atau penyimpanan baru | `src/services/` (lalu bungkus dengan hook di `src/hooks/` bila dipakai UI) |

### "Ada Bug → Lacak di Mana?"

| Gejala Bug | Lapisan yang Dicek Pertama |
| :--- | :--- |
| Tampilan berantakan, tombol tidak merespons, teks terpotong | `src/components/` → `src/styles/` → `src/app/` |
| Hitungan tidak bertambah, reset salah, tema tidak berubah | `src/context/` → `src/hooks/` |
| Data hilang setelah aplikasi ditutup | `src/services/storageService.ts` → `src/context/` |
| Jadwal sholat gagal muncul atau notifikasi tidak masuk | `src/services/prayerService.ts` / `prayerNotificationService.ts` → `src/hooks/` |
| Salah format jam/tanggal atau salah hitung countdown | `src/utils/` |
| Error merah saat compile / prop tidak cocok | `src/types/` |

---

## 4. Checklist Sebelum Commit

- [ ] `npx tsc --noEmit` lulus tanpa error.
- [ ] Tidak ada `fetch()` atau `AsyncStorage` langsung di dalam `src/app/` maupun `src/components/`.
- [ ] Semua tipe data baru diletakkan di `src/types/` (bukan tersebar di banyak file).
- [ ] Tidak ada `catch` kosong tanpa log `[NamaModul.namaFungsi]`.
- [ ] Tidak mengubah/memindahkan nama file rute di `src/app/` secara sembarangan (Expo Router bergantung pada nama file).
