import { useCallback, useEffect, useRef } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import type { ListRenderItem } from "react-native";

import { spacing } from "@/constants";
import { useAppStyles } from "@/styles";
import type { Dhikr } from "@/types/dhikr";

const ITEM_WIDTH = 148;
const SNAP = ITEM_WIDTH + spacing.md;

interface DhikrCarouselProps {
  data: Dhikr[];
  selectedId: string;
  onSelect: (dhikr: Dhikr) => boolean;
}

export default function DhikrCarousel({
  data,
  selectedId,
  onSelect,
}: DhikrCarouselProps) {
  const { component } = useAppStyles();
  const listRef = useRef<FlatList<Dhikr>>(null);
  const selectedIndex = Math.max(
    0,
    data.findIndex((item) => item.id === selectedId),
  );

  useEffect(() => {
    listRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [selectedIndex]);

  const renderItem = useCallback<ListRenderItem<Dhikr>>(
    ({ item }) => {
      const active = item.id === selectedId;
      return (
        <Pressable
          onPress={() => onSelect(item)}
          accessibilityRole="button"
          accessibilityState={{ selected: active }}
          accessibilityLabel={`${item.name}, ${item.target} kali`}
          style={({ pressed }) => [
            component.carouselItem,
            active && component.carouselItemActive,
            pressed && { opacity: 0.86 },
          ]}
        >
          <Text
            numberOfLines={1}
            style={component.carouselArabic}
            allowFontScaling={false}
          >
            {item.arabic}
          </Text>
          <Text numberOfLines={1} style={component.carouselName}>
            {item.name}
          </Text>
          {active ? (
            <View style={component.carouselPill}>
              <Text style={component.carouselPillText}>
                {item.target} kali
              </Text>
            </View>
          ) : (
            <Text style={component.carouselMeta}>{item.description}</Text>
          )}
        </Pressable>
      );
    },
    [component, onSelect, selectedId],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<Dhikr> | null | undefined, index: number) => ({
      length: SNAP,
      offset: SNAP * index,
      index,
    }),
    [],
  );

  const handleMomentumEnd = useCallback(
    (offsetX: number) => {
      const index = Math.round(offsetX / SNAP);
      const next = data[Math.max(0, Math.min(data.length - 1, index))];
      if (!next || next.id === selectedId) return;

      const accepted = onSelect(next);
      if (!accepted) {
        listRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    },
    [data, onSelect, selectedId, selectedIndex],
  );

  return (
    <View>
      <FlatList
        ref={listRef}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP}
        decelerationRate="fast"
        contentContainerStyle={component.carouselContent}
        onMomentumScrollEnd={(event) =>
          handleMomentumEnd(event.nativeEvent.contentOffset.x)
        }
      />
      <View style={component.dotsRow}>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[
              component.dot,
              index === selectedIndex && component.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
