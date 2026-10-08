import { StyleSheet } from "react-native";

// ============================================================
// PALET WARNA — ubah tema aplikasi cukup di bagian ini.
// Arah desain: Neo-Minimal Warm (parchment hangat + emerald
// + copper, kartu glass transparan, satu layar tanpa scroll).
// ============================================================

export const colors = {
  background: "#EFE9DE", // parchment hangat (latar aplikasi)
  surface: "#FBF7EF", // kartu solid
  primary: "#1E6B4F", // emerald utama
  primaryDark: "#125339", // emerald gelap (tekan)
  primarySoft: "#DCEDE2", // emerald sangat muda
  accent: "#BF7B47", // aksen copper (pengganti emas)
  ink: "#2B231C", // teks utama (espresso)
  inkSoft: "#6D6055", // teks sekunder
  muted: "#9C8E7F", // teks teredam
  hairline: "rgba(43,34,27,0.08)", // garis tipis kartu glass/kartu
  glass: "rgba(255,253,248,0.66)", // isi kartu glass (translucent)
  track: "#E7DFCE", // jalur progres / manik kosong
  beadUnlit: "#55432F", // manik belum menyala (espresso)
  beadUnlitBorder: "#3F2F20",
  white: "#FFFFFF",
};

// Gradient lembut untuk latar — kartu glass mengambang di atasnya.
export const bgGradient = ["#F3EDE3", "#E6EEE8", "#E2D7C5"] as const;

// Bayangan hangat lembut untuk kartu-kartu kecil.
const cardShadow = {
  shadowColor: "#3A2E20",
  shadowOpacity: 0.1,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};

// ============================================================
// STYLE APLIKASI (external styling)
// Semua style statis dikumpulkan di sini. Style dinamis
// (warna zikir terpilih, ukuran cincin) ditulis inline
// langsung di komponennya.
// ============================================================
export const styles = StyleSheet.create({
  // ── KONTAINER ──
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bgFill: {
    ...StyleSheet.absoluteFill,
  },
  // flexGrow:1 agar konten mengisi layar (ring menyesuaikan via flex).
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },

  // ── HEADER (di tengah) ──
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.ink,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
    textAlign: "center",
  },
  // Ornamen Islami tipis di bawah header (garis-lambang-garis).
  arabesque: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  arabesqueLine: {
    width: 28,
    height: 1,
    backgroundColor: colors.hairline,
  },

  // ── AREA CINCIN (mengisi sisa ruang, muat satu layar) ──
  ringArea: {
    flex: 1,
    minHeight: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ringPressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  ringRotator: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  bead: {
    position: "absolute",
  },
  ringCenter: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  ringDhikrName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.inkSoft,
    letterSpacing: 0.6,
    textAlign: "center",
  },
  ringCount: {
    fontWeight: "800",
    color: colors.ink,
    textAlign: "center",
  },
  ringTarget: {
    fontSize: 14,
    color: colors.inkSoft,
    marginTop: 2,
  },
  ringStatus: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 8,
    textAlign: "center",
  },

  // ── HINT (muncul saat target tercapai) ──
  hint: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    color: colors.inkSoft,
  },

  // ── NAVBAR DZIKIR (1 tampilan + panah ‹ ›) ──
  navbarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 2,
  },
  navArrow: {
    width: 40,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.glass,
    alignItems: "center",
    justifyContent: "center",
  },
  navArrowPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.95 }],
  },
  navCard: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.glass,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  navCardName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.ink,
    textAlign: "center",
  },
  navCardTarget: {
    fontSize: 10,
    color: colors.muted,
    marginTop: 2,
  },
  navCardTargetPill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  navCardTargetPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
  },

  // ── BARIS TARGET KUSTOM (TextInput + Button) ──
  targetRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 14,
    padding: 6,
  },
  targetLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
    marginRight: 2,
  },
  targetInput: {
    flex: 1,
    height: 38,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.ink,
  },

  // ── BANTAL KONTROL BAWAH ──
  controlCard: {
    marginTop: 10,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 18,
    padding: 12,
    ...cardShadow,
  },
  controlLabels: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  controlRatio: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: colors.ink,
  },
  controlRound: {
    fontSize: 12,
    color: colors.inkSoft,
  },
  resetBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrack: {
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.track,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },

  // ── TOMBOL PRIMER ──
  primaryButton: {
    minHeight: 50,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 24,
    backgroundColor: colors.primary,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});