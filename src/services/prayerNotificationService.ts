import * as Notification from "expo-notifications";
import { AndroidImportance } from "expo-notifications";

import { Platform } from "react-native";
import { getPrayerSchedule, PrayerSchedule } from "./prayerService";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission() {
  const permission = await Notification.getPermissionsAsync();

  if (permission.granted) {
    return true;
  }

  const requested = await Notification.requestPermissionsAsync();

  return requested.granted;
}

export async function setupNotificationChannel(): Promise<boolean> {
  if (Platform.OS !== "android") {
    return false;
  }

  try {
    await Notification.setNotificationChannelAsync("prayer-reminders", {
      name: "Pengingat Waktu Sholat",
      importance: AndroidImportance.MAX,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
    });
    return true;
  } catch (error) {
    console.warn("Channel notifikasi tidak dapat dibuat:", error);
    return false;
  }
}

function createPrayerDate(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date;
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
        tag: "prayer-reminder",
      },
    },
    trigger: {
      type: Notification.SchedulableTriggerInputTypes.DATE,
      date,
      ...(useChannel ? { channelId: "prayer-reminders" } : {}),
    },
  });
}

//menjadwalkan pengigat untuk sholat lima waktu hari ini

export async function schedulePrayerReminders(
  preloaded?: PrayerSchedule[],
): Promise<PrayerSchedule[] | null> {
  const channelReady = await setupNotificationChannel();
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    return null;
  }

  const schedules = preloaded ?? (await getPrayerSchedule());
  const useChannel = Platform.OS === "android" && channelReady;

  const existing = await Notification.getAllScheduledNotificationsAsync();

  for (const notification of existing) {
    if (notification.content.data?.tag === "prayer-reminder") {
      await Notification.cancelScheduledNotificationAsync(
        notification.identifier,
      );
    }
  }

  for (const prayer of schedules) {
    const prayerDate = createPrayerDate(prayer.time);

    const beforedate = new Date(prayerDate.getTime() - 15 * 60 * 1000);

    await scheduleReminder(
      `15 Menit Menuju ${prayer.label}`,
      `Sebentar lagi waktu salat ${prayer.label} akan tiba.`,
      beforedate,
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
}
