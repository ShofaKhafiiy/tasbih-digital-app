import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import { colors } from "@/constants";
import { componentStyles } from "@/styles";
import type { Dhikr } from "@/types/dhikr";

export interface DhikrSelectorProps {
  data: Dhikr[];
  selectedId: string;
  onSelect: (dhikr: Dhikr) => void;
}

/** Navbar dzikir: kartu bacaan bisa digeser (FlatList horizontal).
 *  Panah ‹ › hanya hiasan — memindah bacaan butuh state (modul berikutnya). */
export default function DhikrSelector({
  data,
  selectedId,
  onSelect,
}: DhikrSelectorProps) {
  // Satu item = satu kartu bacaan.
  function renderDhikrItem({ item }: { item: Dhikr }) {
    const active = item.id === selectedId;

    return (
      <Pressable
        onPress={() => onSelect(item)}
        accessibilityRole="button"
        accessibilityLabel={`Info ${item.name}`}
        style={({ pressed }) => [
          componentStyles.navCard,
          active && {
            backgroundColor: item.softColor,
            borderColor: item.color,
          },
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          style={[componentStyles.navCardName, active && { color: item.color }]}
        >
          {item.name}
        </Text>
        {active ? (
          <View
            style={[
              componentStyles.navCardTargetPill,
              { backgroundColor: item.color },
            ]}
          >
            <Text style={componentStyles.navCardTargetPillText}>
              {item.target} kali
            </Text>
          </View>
        ) : (
          <Text style={componentStyles.navCardTarget}>{item.target} kali</Text>
        )}
      </Pressable>
    );
  }

  return (
    <View style={componentStyles.navbarRow}>
      <View style={componentStyles.navArrow}>
        <Ionicons name="chevron-back" size={22} color={colors.primary} />
      </View>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderDhikrItem}
        showsHorizontalScrollIndicator={false}
      />

      <View style={componentStyles.navArrow}>
        <Ionicons name="chevron-forward" size={22} color={colors.primary} />
      </View>
    </View>
  );
}
