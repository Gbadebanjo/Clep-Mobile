import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Modal, TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { ColorPickerStyles } from "./style";

export default function ColorPickerModal({
  visible,
  currentColor,
  onClose,
  onSelectColor,
  colorName,
}: {
  visible: boolean;
  currentColor: string;
  onClose: () => void;
  onSelectColor: (color: string) => void;
  colorName: string;
}) {
  const [tempColor, setTempColor] = useState(currentColor);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);

  // Convert HSB to RGB
  const hsbToRgb = (h: number, s: number, b: number) => {
    const c = (b / 100) * (s / 100);
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = b / 100 - c;
    let r = 0,
      g = 0,
      bl = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      bl = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      bl = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      bl = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      bl = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      bl = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      bl = x;
    }

    const toHex = (val: number) => {
      const hex = Math.round((val + m) * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(bl)}`.toUpperCase();
  };

  // Convert RGB hex to HSB
  const hexToHsb = (hex: string) => {
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
      else if (max === g) h = ((b - r) / delta + 2) * 60;
      else h = ((r - g) / delta + 4) * 60;
    }

    const s = max === 0 ? 0 : (delta / max) * 100;
    const br = max * 100;

    return { h: Math.round(h), s: Math.round(s), b: Math.round(br) };
  };

  // Initialize HSB from current color
  React.useEffect(() => {
    if (tempColor.startsWith("#")) {
      const { h, s, b } = hexToHsb(tempColor);
      setHue(h);
      setSaturation(s);
      setBrightness(b);
    }
  }, [visible]);

  // Update color when HSB changes
  React.useEffect(() => {
    const newColor = hsbToRgb(hue, saturation, brightness);
    setTempColor(newColor);
  }, [hue, saturation, brightness]);

  const handleGradientPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const width = 280;
    const height = 200;

    const newSaturation = Math.max(0, Math.min(100, (locationX / width) * 100));
    const newBrightness = Math.max(
      0,
      Math.min(100, 100 - (locationY / height) * 100)
    );

    setSaturation(newSaturation);
    setBrightness(newBrightness);
  };

  const handleHueChange = (event: any) => {
    const { locationX } = event.nativeEvent;
    const width = 280;
    const newHue = Math.max(0, Math.min(360, (locationX / width) * 360));
    setHue(newHue);
  };

  const handleConfirm = () => {
    onSelectColor(tempColor);
    requestAnimationFrame(onClose);
  };

  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = ColorPickerStyles(colorScheme);

  const hueColor = hsbToRgb(hue, 100, 100);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <ThemedView style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedView style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>
              Select {colorName} Color
            </ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={styles.modalCloseButton}>✕</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Gradient Picker */}
          <ThemedView style={styles.pickerSection}>
            <ThemedText style={styles.pickerLabel}>
              Saturation & Brightness
            </ThemedText>
            <TouchableOpacity
              style={[styles.gradientPicker, { backgroundColor: hueColor }]}
              onPress={handleGradientPress}
              activeOpacity={1}
            >
              {/* Horizontal white → hue gradient */}
              <LinearGradient
                colors={["#FFFFFF", hueColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />

              {/* Vertical transparent → black overlay */}
              <LinearGradient
                colors={["transparent", "black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
              />

              {/* Selector circle */}
              <ThemedView
                style={[
                  styles.selectorCircle,
                  {
                    left: `${saturation}%`,
                    top: `${100 - brightness}%`,
                  },
                ]}
              />
            </TouchableOpacity>
          </ThemedView>

          {/* Hue Slider */}
          <ThemedView style={styles.hueSection}>
            <ThemedText style={styles.pickerLabel}>Hue</ThemedText>
            <TouchableOpacity
              style={styles.hueSlider}
              onPress={handleHueChange}
              activeOpacity={1}
            >
              <LinearGradient
                colors={[
                  "#FF0000",
                  "#FFFF00",
                  "#00FF00",
                  "#00FFFF",
                  "#0000FF",
                  "#FF00FF",
                  "#FF0000",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
              <ThemedView
                style={[
                  styles.hueIndicator,
                  {
                    left: `${(hue / 360) * 100}%`,
                  },
                ]}
              />
            </TouchableOpacity>
          </ThemedView>

          {/* Hex Input */}
          <ThemedView style={styles.hexInputSection}>
            <ThemedText style={styles.hexLabel}>Hex Color Code</ThemedText>
            <TextInput
              style={styles.hexInput}
              value={tempColor}
              onChangeText={(value) => {
                if (value.startsWith("#") && value.length === 7) {
                  setTempColor(value);
                  const { h, s, b } = hexToHsb(value);
                  setHue(h);
                  setSaturation(s);
                  setBrightness(b);
                }
              }}
              placeholder="#000000"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Action Buttons */}
          <ThemedView style={styles.modalActions}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <ThemedText style={styles.confirmButtonText}>Confirm</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}
