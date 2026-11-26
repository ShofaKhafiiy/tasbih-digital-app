# Sprint Modul 4: Autentikasi Supabase, Secure Token Storage, & Route Protection Guards

- **Status:** Draft (`sprint-generator`)
- **Track:** `B` (*Manual Feature — Modul 4: Database & Autentikasi*)
- **Estimasi Durasi:** `4h`
- **Prasyarat Wajib:** Baca `../ARCHITECTURE.md` agar seluruh implementasi mematuhi 5 prinsip inti (SoC, SRP, Strict Types, Fail Fast Logging, KISS & POLA).

---

## 1. Tujuan & Cakupan Sprint

Membangun sistem autentikasi *end-to-end* pada `tasbih-digital-app` yang memenuhi 4 kriteria rubrik penilaian Modul 4:

| Kriteria Rubrik Penilaian | Bobot | Target Implementasi di Proyek |
| :--- | :---: | :--- |
| **Secure Token Storage** | 5% | `ExpoSecureStoreAdapter` berbasis `expo-secure-store` sebagai *storage engine* sesi Supabase |
| **Supabase Auth Flow** (Sign Up, Sign In, Sign Out, Loading States) | 10% | Layar `(auth)/login.tsx`, integrasi `authService.ts`, validasi input, & fitur Sign Out di `settings.tsx` |
| **Global AuthContext & Real-time Session Subscription** | 5% | `AuthContext.tsx` dengan *auto-rehydration* saat startup & *listener* `onAuthStateChange` |
| **Route Protection Guards** | 5% | Guard berbasis `useSegments()` + *anti-flicker loading shield* di `src/app/_layout.tsx` |

> **Catatan Cakupan:** Sprint ini berfokus penuh pada 4 kriteria rubrik di atas. Materi Cloud CRUD & Row Level Security (RLS) dipisahkan ke sprint berikutnya agar durasi dan fokus tetap optimal.

---

## 2. Target Konsep (`CONCEPT_CHECKLIST.md`)

- [ ] `expo-secure-store` (`setItemAsync`, `getItemAsync`, `deleteItemAsync`) & Custom Storage Adapter (`ExpoSecureStoreAdapter`)
- [ ] Environment Variables (`.env`, `EXPO_PUBLIC_*`) & Singleton Supabase Client (`@supabase/supabase-js`)
- [ ] `supabase.auth.signUp()` & User Metadata, `supabase.auth.signInWithPassword()`, `supabase.auth.signOut()`
- [ ] Form Validation & UX (`.trim()`, `keyboardType`, `autoCapitalize`, `autoCorrect`, `<ActivityIndicator />`)
- [ ] `AuthContext` & Auto Rehydration saat Startup + `supabase.auth.onAuthStateChange()`
- [ ] Navigation Guards & Protected Routes (`useSegments()` & Anti-Flicker Loading Shield)

---

## 3. Peta Layer & File Target (`ARCHITECTURE.md`)

Alur dependensi tetap **satu arah** dari atas ke bawah:

```text
src/app/ (Screens & Guards)
  ├──► src/components/auth/ (UI Form Auth Modular - opsional bila butuh SRP)
  ├──► src/context/AuthContext.tsx (Global Auth State & Subscription)
  │      └──► src/services/authService.ts (Sign Up, Sign In, Sign Out, Get Session)
  │             └──► src/services/supabaseClient.ts (Singleton Client + ExpoSecureStoreAdapter)
  └──► src/types/auth.ts + src/styles/components/screens.ts
```

### Daftar File Target per Layer

| Layer | File Target | Peran & Batasan |
| :--- | :--- | :--- |
| **Root & Config** | `tasbih-digital-app/.env` | Menyimpan `EXPO_PUBLIC_SUPABASE_URL` dan `EXPO_PUBLIC_SUPABASE_ANON_KEY` (pastikan `.env` masuk `.gitignore`). |
| | `tasbih-digital-app/package.json` | Menambah dependensi `expo-secure-store` dan `@supabase/supabase-js`. |
| **`src/types/`** | `src/types/auth.ts` | Kontrak tipe data `AuthCredentials`, `SignUpPayload`, `AuthState`, dan hasil operasi auth. |
| | `src/types/index.ts` | Re-export tipe dari `auth.ts` (barrel file). |
| **`src/services/`** | `src/services/supabaseClient.ts` | Membentuk `ExpoSecureStoreAdapter` dan mengekspor *singleton* `supabase` client. Tidak boleh bergantung pada UI/Context. |
| | `src/services/authService.ts` | Membungkus operasi `signUp`, `signInWithPassword`, `signOut`, `getCurrentSession`, dan `subscribeAuthState` dengan error logging `[authService.*]`. |
| **`src/context/`** | `src/context/AuthContext.tsx` | Menyediakan `AuthProvider` dan hook `useAuth()` (`user`, `session`, `isLoading`, `signIn`, `signUp`, `signOut`), melakukan *auto-rehydration* saat mount, dan berlangganan `onAuthStateChange`. |
| **`src/app/`** | `src/app/(auth)/_layout.tsx` | Layout grup rute autentikasi (Stack tanpa header). |
| | `src/app/(auth)/login.tsx` | Layar Sign In & Sign Up (toggle mode), validasi `.trim()`, `keyboardType="email-address"`, `autoCapitalize="none"`, `autoCorrect={false}`, error feedback, dan `<ActivityIndicator />` saat *loading*. |
| | `src/app/_layout.tsx` | Membungkus aplikasi dengan `AuthProvider` dan memasang *Route Protection Guard* (`useSegments()`) + *anti-flicker loading shield* sebelum konten utama dirender. |
| | `src/app/(tabs)/settings.tsx` | Menampilkan identitas akun aktif (email/metadata) dan tombol **Keluar (Sign Out)** dengan konfirmasi `Alert`. |
| **`src/styles/` & `src/components/`** | `src/styles/components/screens.ts` | Style untuk layar auth dan kartu akun di pengaturan menggunakan token `src/constants/`. |
| | `src/components/auth/` *(opsional)* | Jika form di `(auth)/login.tsx` mulai panjang, pecah bagian form ke komponen presentasional agar tetap patuh SRP. |

---

## 4. High-Level Milestones (Rencana Langkah Eksekusi)

### Langkah 1 — Setup Dependensi, Environment, & Kontrak Tipe
- [ ] Instal `expo-secure-store` dan `@supabase/supabase-js` melalui `npx expo install`.
- [ ] Buat `.env` di root `tasbih-digital-app/` berisi `EXPO_PUBLIC_SUPABASE_URL` dan `EXPO_PUBLIC_SUPABASE_ANON_KEY`, serta pastikan `.env` tercantum di `.gitignore`.
- [ ] Definisikan kontrak tipe autentikasi di `src/types/auth.ts` dan ekspor ulang di `src/types/index.ts`.

### Langkah 2 — Secure Token Storage & Layanan Autentikasi (`src/services/`)
- [ ] Buat `src/services/supabaseClient.ts` berisi `ExpoSecureStoreAdapter` (`getItem`, `setItem`, `removeItem`) yang memanggil `expo-secure-store`, lalu inisialisasi *singleton* Supabase client dengan `detectSessionInUrl: false` dan `persistSession: true`.
- [ ] Buat `src/services/authService.ts` untuk membungkus `signUp` (dengan `options.data` metadata), `signInWithPassword`, `signOut`, `getSession`, dan `onAuthStateChange` lengkap dengan log `[authService.namaFungsi]` pada setiap error.

### Langkah 3 — Global `AuthContext` & Real-Time Subscription (`src/context/`)
- [ ] Buat `src/context/AuthContext.tsx` yang mengelola state `user`, `session`, dan `isLoading`.
- [ ] Pada `useEffect` awal, lakukan *auto-rehydration* dengan mengambil sesi yang tersimpan di brankas `SecureStore` via `authService`.
- [ ] Daftarkan *listener* `onAuthStateChange` untuk memperbarui state global secara *real-time* saat terjadi `SIGNED_IN`, `SIGNED_OUT`, atau `TOKEN_REFRESHED`, lalu bersihkan *subscription* pada *cleanup* `useEffect`.

### Langkah 4 — Route Protection Guards & Anti-Flicker Shield (`src/app/_layout.tsx`)
- [ ] Bungkus `AppShell` dengan `AuthProvider` di `src/app/_layout.tsx`.
- [ ] Gunakan `useSegments()` dan `useRouter()` untuk memeriksa apakah pengguna berada di grup rute `(auth)` atau rute terproteksi:
  - Belum login & di luar `(auth)` → redirect ke `/(auth)/login`.
  - Sudah login & masih di `(auth)` → redirect ke `/(tabs)` (`/`).
- [ ] Pastikan `isLoading` dari `AuthContext` terhubung ke *anti-flicker loading shield* (`SplashScreen` atau `<ActivityIndicator />`) sehingga layar login tidak berkedip saat token sedang didekripsi pada *cold start*.

### Langkah 5 — Layar Auth & Integrasi Sign Out (`src/app/`)
- [ ] Buat `src/app/(auth)/_layout.tsx` dan `src/app/(auth)/login.tsx` untuk mode **Sign In** dan **Sign Up**.
- [ ] Terapkan praktik UX wajib: `.trim()` pada email & nama/callsign, `keyboardType="email-address"`, `autoCapitalize="none"`, `autoCorrect={false}`, nonaktifkan tombol saat `isLoading`, serta tampilkan `<ActivityIndicator />` dan pesan error yang ramah.
- [ ] Tambahkan bagian informasi akun aktif dan tombol **Sign Out** di `src/app/(tabs)/settings.tsx`.

### Langkah 6 — Verifikasi Rubrik & Quality Gate
- [ ] **Uji Cold Start:** Buka aplikasi tanpa sesi → otomatis diarahkan ke `/(auth)/login` tanpa *flicker*.
- [ ] **Uji Sign Up & Error Handling:** Daftar akun baru dan uji kredensial salah → pesan error tampil jelas tanpa *crash*.
- [ ] **Uji Sign In & Session Persistence:** Masuk dengan akun valid → otomatis masuk ke beranda; muat ulang (*reload*) aplikasi → tetap masuk karena token tersimpan aman di `SecureStore`.
- [ ] **Uji Sign Out:** Klik Sign Out di Pengaturan → sesi terhapus dan rute otomatis terkunci kembali ke `/(auth)/login`.
- [ ] **Cek Statis:** Jalankan `npx tsc --noEmit` dan `npm run lint` hingga nol error.

---

## 5. Checklist Sebelum Commit (`ARCHITECTURE.md`)

- [ ] `npx tsc --noEmit` lulus tanpa error.
- [ ] `npm run lint` lulus tanpa error.
- [ ] Tidak ada panggilan langsung ke `supabase` atau `SecureStore` dari `src/app/` maupun `src/components/`.
- [ ] Tidak ada `catch` kosong tanpa log `[NamaModul.namaFungsi]`.
- [ ] File `.env` tidak ikut ter-commit ke Git.
