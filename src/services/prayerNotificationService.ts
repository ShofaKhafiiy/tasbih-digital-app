/**
 * @file Service penjadwalan notifikasi lokal pengingat waktu salat (H-15 menit & adzan).
 * @layer Services
 */

import * as Notification from "expo-notifications";
import { AndroidImportance } from "expo-notifications";
import { Platform } from "react-native";

import { PRAYER_CONFIG } from "@/constants/config";
import type { PrayerSchedule } from "@/types/prayer";
import { parsePrayerTimeForDate } from "@/utils/dateFormat";
import { getPrayerSchedule } from "./prayerService";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Memeriksa dan meminta izin notifikasi lokal kepada pengguna bila belum diberikan.
 *
 * @returns `true` jika izin notifikasi aktif.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const permission = await Notification.getPermissionsAsync();

  if (permission.granted) {
    return true;
  }

  const requested = await Notification.requestPermissionsAsync();
  return requested.granted;
}

/**
 * Menyiapkan channel notifikasi Android untuk pengingat waktu salat.
 *
 * @returns `true` jika channel berhasil disiapkan pada perangkat Android.
 */
export async function setupNotificationChannel(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return false;
  }

  try {
    await Notification.setNotificationChannelAsync(
      PRAYER_CONFIG.NOTIFICATION_CHANNEL_ID,
      {
        name: PRAYER_CONFIG.NOTIFICATION_CHANNEL_NAME,
        importance: AndroidImportance.MAX,
        sound: "default",
        vibrationPattern: [0, 250, 250, 250],
      },
    );
    return true;
  } catch (error) {
    console.warn(
      "[prayerNotificationService.setupNotificationChannel]",
      error,
    );
    return false;
  }
}

async function scheduleReminder(
  title: string,
  body: string,
  date: Date,
  prayerName: string,
  reminderType: "before" | "adhan",
  useChannel: boolean,
) {
  if (date.getTime() <= Date.now()) {
    return;
  }

  await Notification.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
      data: {
        prayerName,
        reminderType,
        tag: PRAYER_CONFIG.NOTIFICATION_TAG,
      },
    },
    trigger: {
      type: Notification.SchedulableTriggerInputTypes.DATE,
      date,
      ...(useChannel
        ? { channelId: PRAYER_CONFIG.NOTIFICATION_CHANNEL_ID }
        : {}),
    },
  });
}

/**
 * Menjadwalkan ulang notifikasi pengingat salat lima waktu untuk hari ini.
 * Pengingat sebelumnya dengan tag yang sama dibatalkan terlebih dahulu agar tidak duplikat.
 *
 * @param preloaded - Daftar jadwal salat opsional jika sudah tersedia dari state/hook.
 * @returns Jadwal yang dijadwalkan, atau `null` apabila izin notifikasi ditolak.
 */
export async function schedulePrayerReminders(
  preloaded?: PrayerSchedule[],
): Promise<PrayerSchedule[] | null> {
  try {
    const channelReady = await setupNotificationChannel();
    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
      return null;
    }

    const schedules = preloaded ?? (await getPrayerSchedule());
    const useChannel = Platform.OS === "android" && channelReady;

    const existing = await Notification.getAllScheduledNotificationsAsync();

    for (const notification of existing) {
      if (notification.content.data?.tag === PRAYER_CONFIG.NOTIFICATION_TAG) {
        await Notification.cancelScheduledNotificationAsync(
          notification.identifier,
        );
      }
    }

    const leadMs = PRAYER_CONFIG.REMINDER_LEAD_MINUTES * 60 * 1000;

    for (const prayer of schedules) {
      const prayerDate = parsePrayerTimeForDate(prayer.time);
      const beforeDate = new Date(prayerDate.getTime() - leadMs);

      await scheduleReminder(
        `${PRAYER_CONFIG.REMINDER_LEAD_MINUTES} Menit Menuju ${prayer.label}`,
        `Sebentar lagi waktu salat ${prayer.label} akan tiba.`,
        beforeDate,
        prayer.name,
        "before",
        useChannel,
      );

      await scheduleReminder(
        `Waktu ${prayer.label} Telah Tiba`,
        `Saatnya menunaikan salat ${prayer.label}.`,
        prayerDate,
        prayer.name,
        "adhan",
        useChannel,
      );
    }

    return schedules;
  } catch (error) {
    console.error("[prayerNotificationService.schedulePrayerReminders]", error);
    throw error;
  }
}
