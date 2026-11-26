# Sub-Sprint Paralel (2 Anggota) — Sprint Modul 4

Dokumen ini memecah [sprint-modul-4.md](./sprint-modul-4.md) menjadi **dua sub-sprint paralel** untuk tim beranggotakan **2 orang (Anggota A & Anggota B)** agar:
1. **Nol konflik file (*zero merge conflict*)** saat dikerjakan bersamaan di branch masing-masing.
2. **Porsi beban & konsep Modul 4 seimbang** antara kedua anggota.
3. **Keduanya paham total 100% sistem** sebelum demo individu & *live coding* 5 menit bersama asisten lab.

---

## Peta Kerja Paralel (3 Fase)

```text
Fase 0 (15 mnt — Bareng)
  Setup package, .env, & kontrak src/types/auth.ts + stub AuthContext
          │
          ├──────────────────────────────────┐
          ▼                                  ▼
Fase 1–2 (2 jam — Paralel)         Fase 1–2 (2 jam — Paralel)
Anggota A: Auth Engine & Session   Anggota B: Auth UI, Validation & Guard
Branch: feat/modul4-auth-engine    Branch: feat/modul4-auth-guard-ui
          │                                  │
          └──────────────┬───────────────────┘
                         ▼
Fase 3 (45 mnt — Integrasi & Tukar Pemahaman)
  Merge, uji 4 skenario rubrik, Cross-Drill silang, & Simulasi Asprak
```

---

## Fase 0 — Kesepakatan Kontrak Bersama (Wajib Sebelum Pisah Branch)

Kerjakan singkat di 1 branch dasar (misal `feat/modul4-base`) lalu jadikan titik awal kedua branch anggota:

- [ ] Instalasi dependensi bersama: `expo-secure-store` dan `@supabase/supabase-js`.
- [ ] Siapkan `.env` (berisi `EXPO_PUBLIC_SUPABASE_URL` & `EXPO_PUBLIC_SUPABASE_ANON_KEY`) dan pastikan `.env` tercantum di `.gitignore`. *(Keduanya menyalin nilai kunci proyek Supabase yang sama ke `.env` lokal masing-masing).*
- [ ] Buat `src/types/auth.ts` dan ekspor di `src/types/index.ts` berisi kontrak tipe bersama:
  - `AuthCredentials` (email, password)
  - `SignUpPayload` (email, password, nama/callsign opsional)
  - `AuthUser` (id, email, metadata yang relevan)
  - `AuthContextValue` (`user`, `session`, `isLoading`, `signIn`, `signUp`, `signOut`)
- [ ] Buat kerangka awal (*stub*) `src/context/AuthContext.tsx` yang hanya mengekspor `AuthProvider` dan `useAuth()` sesuai kontrak `AuthContextValue` (mengembalikan nilai default sementara).
  > **Tujuan stub ini:** Anggota B dapat langsung membangun UI login dan *Route Protection Guard* secara paralel sambil menguji skenario `user === null`, `user !== null`, dan `isLoading === true` tanpa harus menunggu Anggota A selesai menghubungkan Supabase.

---

## Sub-Sprint Anggota A — *Secure Storage, Supabase Bridge, & Global Session Engine*

- **Branch Kerja:** `feat/modul4-auth-engine`
- **Fokus Rubrik Utama:**
  - Secure Token Storage (5%)
  - Global AuthContext & Real-time Session Subscription (5%)
  - Supabase Auth Flow — Lapisan Service & Sign Out (bagian dari 10%)

### Kepemilikan File Eksklusif (Hanya Diedit Anggota A)
| Layer (`ARCHITECTURE.md`) | File Target | Tanggung Jawab |
| :--- | :--- | :--- |
| `src/services/` | `src/services/supabaseClient.ts` | Membuat `ExpoSecureStoreAdapter` (`getItem`, `setItem`, `removeItem` via `expo-secure-store`) dan *singleton* `supabase` client dari `EXPO_PUBLIC_*`. |
| `src/services/` | `src/services/authService.ts` | Membungkus `signUp`, `signInWithPassword`, `signOut`, `getCurrentSession`, dan `subscribeAuthState` dengan error logging `[authService.*]`. |
| `src/context/` | `src/context/AuthContext.tsx` | Mengganti *stub* menjadi implementasi penuh: *auto-rehydration* sesi saat mount, menyimpan `user`/`session`/`isLoading`, dan berlangganan `onAuthStateChange` + cleanup. |
| `src/app/(tabs)/` | `src/app/(tabs)/settings.tsx` | Menambahkan kartu status akun aktif (email/nama dari `useAuth()`) serta tombol **Keluar (Sign Out)** lengkap dengan konfirmasi `Alert` dan *loading state*. |

### Langkah Kerja Anggota A
- [ ] **A1 — Brankas Token & Cloud Bridge:** Bangun `ExpoSecureStoreAdapter` di `src/services/supabaseClient.ts` menggunakan `getItemAsync`, `setItemAsync`, dan `deleteItemAsync`, lalu inisialisasi *singleton* `createClient` dengan opsi `persistSession: true` dan `detectSessionInUrl: false`.
- [ ] **A2 — Layanan Autentikasi Terisolasi:** Implementasikan seluruh operasi auth di `src/services/authService.ts` tanpa menyentuh React/UI. Pastikan setiap error tercatat dengan format `[authService.namaFungsi]` dan kembalikan hasil yang aman untuk UI.
- [ ] **A3 — Global `AuthContext` & Subscription:** Di `src/context/AuthContext.tsx`, lakukan *auto-rehydration* awal agar `isLoading` bernilai `true` selama sesi dibaca dari `SecureStore`, lalu pasang `onAuthStateChange` untuk memperbarui state saat `SIGNED_IN`, `SIGNED_OUT`, atau `TOKEN_REFRESHED` (jangan lupa `.unsubscribe()` saat unmount).
- [ ] **A4 — Fitur Sign Out di Pengaturan:** Tambahkan section Akun & tombol Sign Out pada `src/app/(tabs)/settings.tsx` dengan `Alert` konfirmasi dan proteksi klik ganda saat proses keluar berjalan.
- [ ] **A5 — Cek Mandiri A:** Pastikan `npx tsc --noEmit` lulus dan verifikasi *console log* bahwa sesi berhasil terbaca ulang serta tidak ada *memory leak* subscription.

---

## Sub-Sprint Anggota B — *Auth Flow UI, Validasi UX, & Route Protection Guards*

- **Branch Kerja:** `feat/modul4-auth-guard-ui`
- **Fokus Rubrik Utama:**
  - Supabase Auth Flow — Alur Sign Up, Sign In, Form Validation, & Loading States (bagian dari 10%)
  - Route Protection Guards & Anti-Flicker Shield (5%)
  - Integrasi Konsumen `AuthContext` pada Root Layout & Auth Screens (bagian dari 5%)

### Kepemilikan File Eksklusif (Hanya Diedit Anggota B)
| Layer (`ARCHITECTURE.md`) | File Target | Tanggung Jawab |
| :--- | :--- | :--- |
| `src/utils/` | `src/utils/authValidation.ts` | Fungsi murni untuk membersihkan spasi (`.trim()`), memvalidasi email, dan mengecek panjang password minimal 6 karakter. |
| `src/components/` | `src/components/auth/AuthFormCard.tsx` | Komponen form presentasional (input email, password, nama/callsign saat daftar, pesan error, dan tombol submit dengan `<ActivityIndicator />`). |
| `src/app/(auth)/` | `src/app/(auth)/_layout.tsx` & `login.tsx` | Grup rute autentikasi dan layar login/register (toggle mode Sign In vs Sign Up) yang memanggil `signIn`/`signUp` dari `useAuth()`. |
| `src/hooks/` & `src/app/` | `src/hooks/useRouteGuard.ts` & `src/app/_layout.tsx` | Hook proteksi rute berbasis `useSegments()` + `useRouter()` serta pemasangan `AuthProvider` dan *anti-flicker loading shield* di `RootLayout`/`AppShell`. |
| `src/styles/` | `src/styles/components/screens.ts` | Style layar login/register, input field, badge error, dan indikator loading menggunakan token dari `src/constants/`. |

### Langkah Kerja Anggota B
- [ ] **B1 — Validasi Murni (SRP):** Buat `src/utils/authValidation.ts` berisi fungsi murni (tanpa React hook/I/O) untuk sanitasi `.trim()` dan validasi input Sign In / Sign Up.
- [ ] **B2 — Komponen Form UX-First:** Bangun `src/components/auth/AuthFormCard.tsx` dengan konfigurasi keyboard seluler yang tepat (`keyboardType="email-address"`, `autoCapitalize="none"`, `autoCorrect={false}`, `secureTextEntry`), pesan error inline, serta menonaktifkan input/tombol + menampilkan `<ActivityIndicator />` saat `isSubmitting` bernilai `true`.
- [ ] **B3 — Layar `(auth)/login.tsx`:** Buat `src/app/(auth)/_layout.tsx` dan `src/app/(auth)/login.tsx` untuk mengelola mode ganda (**Masuk** & **Daftar Akun**), menyambungkan form ke `useAuth()`, dan mereset pesan error saat berpindah mode.
- [ ] **B4 — Route Protection Guard & Anti-Flicker:** Buat `src/hooks/useRouteGuard.ts` menggunakan `useSegments()`, lalu pasang `AuthProvider` dan guard tersebut di `src/app/_layout.tsx`. Pastikan *loading shield* (`SplashScreen` / `<ActivityIndicator />`) menahan render rute privat selama `authLoading === true` agar tidak terjadi *flicker*.
- [ ] **B5 — Cek Mandiri B:** Uji kondisi *stub* (`user = null`, `user = dummy`, `isLoading = true`) untuk memastikan guard mengarahkan ke `/(auth)/login` atau `/(tabs)` dengan mulus, serta `npx tsc --noEmit` lulus tanpa error.

---

## Perbandingan Porsi & Konsep Modul 4

| Konsep Modul 4 | Dikerjakan Langsung oleh A | Dikerjakan Langsung oleh B | Dikuasai Keduanya di Fase 3 |
| :--- | :--- | :--- | :---: |
| **Secure Token Storage** | `ExpoSecureStoreAdapter` (`get`/`set`/`deleteItemAsync`) | Uji persistensi token setelah *reload* & bedah adapter | ✅ |
| **Supabase Client & `.env`** | Setup `EXPO_PUBLIC_*` & *singleton* client | Setup `.env` lokal & memahami arsitektur *singleton* | ✅ |
| **Supabase Auth Flow** | Service `signUp`, `signInWithPassword`, `signOut` + UI Sign Out | UI Sign Up (metadata), Sign In, validasi `.trim()`, `<ActivityIndicator />` | ✅ |
| **AuthContext & Real-time** | Implementasi *rehydration* & `onAuthStateChange` | Konsumsi `useAuth()` di `login.tsx` & `useRouteGuard.ts` | ✅ |
| **Route Protection Guards** | Bedah `useSegments()` & *cross-drill* guard | Implementasi `useRouteGuard.ts` & *anti-flicker shield* di `_layout.tsx` | ✅ |

---

## Fase 3 — Integrasi, Cross-Explain, & Cross-Drill (Wajib Sebelum Demo)

Agar tidak ada anggota yang hanya paham bagian kodenya sendiri, selesaikan 3 tahap ini bersama:

### 1. Merge & Verifikasi 4 Skenario Rubrik
- [ ] Merge `feat/modul4-auth-engine` dan `feat/modul4-auth-guard-ui` ke branch integrasi (`feat/modul4-auth`).
- [ ] Jalankan `npx tsc --noEmit` dan `npm run lint` hingga bersih.
- [ ] Uji 4 alur nyata ke proyek Supabase:
  1. *Cold start* tanpa sesi → tertahan di *loading shield* sebentar lalu masuk ke `/(auth)/login` tanpa *flicker*.
  2. *Sign Up* & *Sign In* → validasi jalan, `<ActivityIndicator />` muncul, pesan error tampil jika password salah, masuk otomatis ke `/(tabs)` jika berhasil.
  3. *Reload* aplikasi → tetap login karena token didekripsi otomatis dari `SecureStore`.
  4. *Sign Out* dari Settings → sesi terhapus dan guard langsung mengunci kembali ke `/(auth)/login`.

### 2. Checklist Siap Jawab Demo Individu (Bobot 20% + 30%)
Pastikan **Anggota A dan Anggota B sama-sama bisa menjawab** pertanyaan berikut tanpa melihat catatan:
- Mengapa token Supabase tidak boleh disimpan di `AsyncStorage` biasa, dan bagaimana `ExpoSecureStoreAdapter` menjembatani SDK Supabase dengan `expo-secure-store`?
- Apa perbedaan `getSession()` awal saat startup dengan `onAuthStateChange()` di `AuthContext`?
- Bagaimana cara kerja `useSegments()` mencegah user masuk ke halaman utama sebelum login, dan apa fungsi `isLoading` sebagai *anti-flicker shield*?
- Jika tombol Sign In diklik dengan email yang punya spasi di akhir atau diklik berkali-kali saat koneksi lambat, bagian kode mana yang menanganinya?
- Sesuai `ARCHITECTURE.md`, kalau ada bug *"sesi hilang setelah aplikasi ditutup"* atau *"halaman login berkedip saat startup"*, file mana yang pertama dicek?


---

## Saran Penggunaan Mode Pembimbing AI (`mobile-mental-mentor`)

> [!TIP]
> **Rekomendasi untuk User & Instruksi untuk AI Agent:**
> Untuk memaksimalkan pemahaman kode (bukan sekadar *copy-paste* hasil *vibecoding*) sebelum demo & *live coding* Modul 4, dokumen ini sangat disarankan untuk dijalankan menggunakan skill pembimbing **[`.agents/skills/mobile-mental-mentor`](../.agents/skills/mobile-mental-mentor/SKILL.md)** dengan menyuntikkan sprint **`sprint/sprint-pembagian-tugas.md`** ke dalam mode pembimbing.
>
> **Aturan Wajib untuk AI Agent saat pertama kali membaca file ini:**
> 1. **Tanyakan terlebih dahulu kepada user** (karena ini bersifat saran, bukan paksaan): *"Apakah kamu ingin mengaktifkan skill pembimbing `mobile-mental-mentor` dengan sprint `sprint-pembagian-tugas.md`?"*
> 2. **Jika user menjawab Ya**, minta user memilih peran yang ingin dikerjakan: **Anggota A** (*Auth Engine & Session*) atau **Anggota B** (*Auth UI, Validation & Guard*), lalu aktifkan `.agents/skills/mobile-mental-mentor/SKILL.md` dan mulai bimbingan sesuai sub-sprint yang dipilih (tetap mematuhi aturan `ARCHITECTURE.md` dan `AGENTS.md`).
> 3. **Jika user menjawab Tidak**, lanjutkan membantu user secara normal sesuai permintaan user.
