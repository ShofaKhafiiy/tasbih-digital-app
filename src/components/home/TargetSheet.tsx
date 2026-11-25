/**
 * @file Bottom sheet modal untuk mengatur target jumlah hitungan tasbih.
 * @layer Components / Home
 */

import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SESSION_CONFIG, spacing } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";
import { isValidTarget } from "@/utils/dhikr";

interface TargetSheetProps {
  visible: boolean;
  target: number;
  onClose: () => void;
  onApply: (target: number) => void;
}

/**
 * Modal pengaturan target hitungan dengan pilihan cepat dan validasi input angka.
 */
export default function TargetSheet({
  visible,
  target,
  onClose,
  onApply,
}: TargetSheetProps) {
  const { colors } = useTheme();
  const { global, component } = useAppStyles();
  const [text, setText] = useState(String(target));

  const value = Number(text);
  const valid = text.trim() !== "" && isValidTarget(value);

  function handleApply() {
    if (!valid) return;
    onApply(value);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      onShow={() => setText(String(target))}
      statusBarTranslucent
    >
      <View style={component.sheetBackdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Tutup pengaturan target"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={component.sheet}>
            <View style={component.sheetHandle} />
            <Text style={component.sheetTitle}>Atur target</Text>
            <Text style={component.sheetText}>
              Tentukan jumlah hitungan untuk putaran ini. Target bisa diubah
              kapan saja.
            </Text>

            <TextInput
              value={text}
              onChangeText={setText}
              keyboardType="number-pad"
              maxLength={4}
              selectTextOnFocus
              placeholder="33"
              placeholderTextColor={colors.muted}
              style={component.sheetInput}
              accessibilityLabel="Jumlah target"
            />

            <View style={component.sheetQuickRow}>
              {SESSION_CONFIG.QUICK_TARGETS.map((quick) => (
                <Pressable
                  key={quick}
                  onPress={() => setText(String(quick))}
                  style={component.sheetQuickChip}
                  accessibilityRole="button"
                  accessibilityLabel={`Target ${quick}`}
                >
                  <Text style={component.sheetQuickChipText}>{quick}</Text>
                </Pressable>
              ))}
            </View>

            <View style={[component.sheetRow, { marginTop: spacing.xs }]}>
              <Pressable
                onPress={onClose}
                style={[global.ghostButton, component.sheetCancel]}
                accessibilityRole="button"
              >
                <Text style={global.ghostButtonText}>Batal</Text>
              </Pressable>
              <Pressable
                onPress={handleApply}
                disabled={!valid}
                style={({ pressed }) => [
                  global.primaryButton,
                  component.sheetApply,
                  pressed && valid && global.primaryButtonPressed,
                  !valid && { opacity: 0.45 },
                ]}
                accessibilityRole="button"
              >
                <Text style={global.primaryButtonText}>Simpan</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
