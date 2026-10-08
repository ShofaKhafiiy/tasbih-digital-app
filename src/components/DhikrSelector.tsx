import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { colors, styles } from "../constants/styles";
import type { Dhikr } from "../data/dhikr";

export interface DhikrSelectorProps {
  data: Dhikr[];
  selectedId: string;
  onSelect: (dhikr: Dhikr) => void;
}

// Lebar tombol panah + jaraknya dari daftar (harus sama dengan style navbarRow).
const ARROW_WIDTH = 40;
const ARROW_GAP = 8;
// paddingHorizontal layar kiri + kanan (20 + 20).
const SCREEN_PADDING = 40;

/** Navbar dzikir: menampilkan SATU bacaan + panah ‹ › untuk
 *  berpindah ke bacaan lain (digerakkan lewat FlatList carousel). */
export default function DhikrSelector({
  data,
  selectedId,
  onSelect,
}: DhikrSelectorProps) {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Dhikr>>(null);

  const itemWidth = Math.floor(
    width - SCREEN_PADDING - ARROW_WIDTH * 2 - ARROW_GAP * 2,
  );
  const currentIndex = Math.max(
    data.findIndex((item) => item.id === selectedId),
    0,
  );

  // Pindah ke bacaan tetangga (melingkar: dari yang terakhir → pertama).
  function moveTo(nextIndex: number) {
    const index = (nextIndex + data.length) % data.length;
    if (index === currentIndex) return;
    onSelect(data[index]);
    listRef.current?.scrollToIndex({ index, animated: true });
  }

  // Saat digeser manual, ikuti bacaan yang sedang ditampilkan.
  function onScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
    if (data[index] && data[index].id !== selectedId) {
      onSelect(data[index]);
    }
  }

  // Satu item = satu kartu bacaan.
  function renderDhikrItem({ item }: { item: Dhikr }) {
    const active = item.id === selectedId;

    return (
      <View
        style={[
          styles.navCard,
          { width: itemWidth },
          active && {
            backgroundColor: item.softColor,
            borderColor: item.color,
          },
        ]}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          style={[styles.navCardName, active && { color: item.color }]}
        >
          {item.name}
        </Text>
        {active ? (
          <View
            style={[
              styles.navCardTargetPill,
              { backgroundColor: item.color },
            ]}
          >
            <Text style={styles.navCardTargetPillText}>
              {item.target} kali
            </Text>
          </View>
        ) : (
          <Text style={styles.navCardTarget}>{item.target} kali</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.navbarRow}>
      <Pressable
        onPress={() => moveTo(currentIndex - 1)}
        accessibilityRole="button"
        accessibilityLabel="Bacaan sebelumnya"
        style={({ pressed }) => [
          styles.navArrow,
          pressed && styles.navArrowPressed,
        ]}
      >
        <Ionicons name="chevron-back" size={22} color={colors.primary} />
      </Pressable>

      <FlatList
        ref={listRef}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderDhikrItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={(_data, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
        onMomentumScrollEnd={onScrollEnd}
      />

      <Pressable
        onPress={() => moveTo(currentIndex + 1)}
        accessibilityRole="button"
        accessibilityLabel="Bacaan berikutnya"
        style={({ pressed }) => [
          styles.navArrow,
          pressed && styles.navArrowPressed,
        ]}
      >
        <Ionicons name="chevron-forward" size={22} color={colors.primary} />
      </Pressable>
    </View>
  );
}