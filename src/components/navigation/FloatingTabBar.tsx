import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { spacing } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_META: Record<
  string,
  { label: string; icon: IconName; activeIcon: IconName }
> = {
  index: { label: "Tasbih", icon: "ellipse-outline", activeIcon: "ellipse" },
  history: { label: "Riwayat", icon: "time-outline", activeIcon: "time" },
  settings: {
    label: "Pengaturan",
    icon: "settings-outline",
    activeIcon: "settings",
  },
};

export default function FloatingTabBar({
  emitter,
  state,
  descriptors,
  navigateToTab,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { component } = useAppStyles();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        component.tabBarWrap,
        {
          paddingBottom: Math.max(insets.bottom, spacing.lg),
          pointerEvents: "box-none",
        },
      ]}
    >
      <View style={component.tabBar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const meta = TAB_META[route.name] ?? {
            label: descriptors[route.key]?.options.title ?? route.name,
            icon: "ellipse-outline" as IconName,
            activeIcon: "ellipse" as IconName,
          };

          function handlePress() {
            const event = emitter.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigateToTab(route.key);
            }
          }

          return (
            <Pressable
              key={route.key}
              onPress={handlePress}
              onLongPress={() =>
                emitter.emit({
                  type: "tabLongPress",
                  target: route.key,
                })
              }
              accessibilityRole="tab"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={meta.label}
              style={component.tabItem}
            >
              {focused && <View style={component.tabIndicator} />}
              <View
                style={[
                  component.tabIconWrap,
                  focused && component.tabIconWrapActive,
                ]}
              >
                <Ionicons
                  name={focused ? meta.activeIcon : meta.icon}
                  size={20}
                  color={focused ? colors.ink : colors.muted}
                />
              </View>
              <Text
                style={[
                  component.tabLabel,
                  focused && component.tabLabelActive,
                ]}
              >
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
