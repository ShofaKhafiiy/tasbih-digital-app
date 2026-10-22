// ============================================================
// DATA ZIKIR
// Ubah / tambah daftar zikir di sini. Setiap item wajib
// mengikuti tipe `Dhikr` di bawah (Type & Array of Objects).
// ============================================================

import type { Dhikr } from "@/types/dhikr";
export const DHIKR_LIST: Dhikr[] = [
  {
    id: "subhanallah",
    name: "Subhanallah",
    arabic: "سُبْحَانَ اللهِ",
    description: "Maha Suci Allah",
    target: 33,
    color: "#347B50",
    softColor: "#E6F0E5",
  },
  {
    id: "alhamdulillah",
    name: "Alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    description: "Segala puji bagi Allah",
    target: 33,
    color: "#D9A642",
    softColor: "#F8EFD9",
  },
  {
    id: "allahu-akbar",
    name: "Allahu Akbar",
    arabic: "اَللّٰهُ اَكْبَرُ",
    description: "Allah Maha Besar",
    target: 33,
    color: "#3979BD",
    softColor: "#E4EDF8",
  },
  {
    id: "astaghfirullah",
    name: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللهَ",
    description: "Aku memohon ampun",
    target: 100,
    color: "#8B4593",
    softColor: "#F0E4F2",
  },
];

export { type Dhikr } from "@/types/dhikr";