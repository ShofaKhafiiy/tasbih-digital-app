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

import { spacing } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/styles";

const QUICK_TARGETS = [33, 99, 100, 1000];
const TARGET_MIN = 1;
const TARGET_MAX = 9999;

interface TargetSheetProps {
  visible: boolean;
  target: number;
  onClose: () => void;
  onApply: (target: number) => void;
}

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
  const valid =
    text.trim() !== "" &&
    Number.isInteger(value) &&
    value >= TARGET_MIN &&
    value <= TARGET_MAX;

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
              {QUICK_TARGETS.map((quick) => (
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
