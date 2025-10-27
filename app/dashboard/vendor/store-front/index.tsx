"use client"

import { ProductAPI } from "@/apis/product-api"
import { StoreAPI } from "@/apis/store-api"
import type { Store } from "@/types/auth"
import { Picker } from "@react-native-picker/picker"
import { useMutation } from "@tanstack/react-query"
import * as ImagePicker from "expo-image-picker"
import React, { useCallback, useMemo, useState } from "react"
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
interface FileData {
  preview?: string
  uri: string
  name: string
}

interface BrandingState {
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  fonts: {
    heading: string
    body: string
  }
}

function ColorPickerModal({
  visible,
  currentColor,
  onClose,
  onSelectColor,
  colorName,
}: {
  visible: boolean
  currentColor: string
  onClose: () => void
  onSelectColor: (color: string) => void
  colorName: string
}) {
  const [tempColor, setTempColor] = useState(currentColor)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [brightness, setBrightness] = useState(100)

  // Convert HSB to RGB
  const hsbToRgb = (h: number, s: number, b: number) => {
    const c = (b / 100) * (s / 100)
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = b / 100 - c
    let r = 0,
      g = 0,
      bl = 0

    if (h >= 0 && h < 60) {
      r = c
      g = x
      bl = 0
    } else if (h >= 60 && h < 120) {
      r = x
      g = c
      bl = 0
    } else if (h >= 120 && h < 180) {
      r = 0
      g = c
      bl = x
    } else if (h >= 180 && h < 240) {
      r = 0
      g = x
      bl = c
    } else if (h >= 240 && h < 300) {
      r = x
      g = 0
      bl = c
    } else if (h >= 300 && h < 360) {
      r = c
      g = 0
      bl = x
    }

    const toHex = (val: number) => {
      const hex = Math.round((val + m) * 255).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(bl)}`.toUpperCase()
  }

  // Convert RGB hex to HSB
  const hexToHsb = (hex: string) => {
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    let h = 0
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
      else if (max === g) h = ((b - r) / delta + 2) * 60
      else h = ((r - g) / delta + 4) * 60
    }

    const s = max === 0 ? 0 : (delta / max) * 100
    const br = max * 100

    return { h: Math.round(h), s: Math.round(s), b: Math.round(br) }
  }

  // Initialize HSB from current color
  React.useEffect(() => {
    if (tempColor.startsWith("#")) {
      const { h, s, b } = hexToHsb(tempColor)
      setHue(h)
      setSaturation(s)
      setBrightness(b)
    }
  }, [visible])

  // Update color when HSB changes
  React.useEffect(() => {
    const newColor = hsbToRgb(hue, saturation, brightness)
    setTempColor(newColor)
  }, [hue, saturation, brightness])

  const handleGradientPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent
    const width = 280
    const height = 200

    const newSaturation = Math.max(0, Math.min(100, (locationX / width) * 100))
    const newBrightness = Math.max(0, Math.min(100, 100 - (locationY / height) * 100))

    setSaturation(newSaturation)
    setBrightness(newBrightness)
  }

  const handleHueChange = (event: any) => {
    const { locationX } = event.nativeEvent
    const width = 280
    const newHue = Math.max(0, Math.min(360, (locationX / width) * 360))
    setHue(newHue)
  }

  const presetColors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#A52A2A",
  ]

  const handleConfirm = () => {
    onSelectColor(tempColor)
    onClose()
  }

  const hueColor = hsbToRgb(hue, 100, 100)

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select {colorName} Color</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Color Preview */}
          <View style={styles.colorPreviewSection}>
            <View
              style={[
                styles.largeColorPreview,
                {
                  backgroundColor: tempColor,
                },
              ]}
            />
            <Text style={styles.colorHexText}>{tempColor}</Text>
          </View>

          {/* Gradient Picker */}
          <View style={styles.pickerSection}>
            <Text style={styles.pickerLabel}>Saturation & Brightness</Text>
            <TouchableOpacity
              style={[
                styles.gradientPicker,
                {
                  backgroundColor: hueColor,
                },
              ]}
              onPress={handleGradientPress}
              activeOpacity={1}
            >
              {/* White to color gradient overlay */}
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    background: `linear-gradient(to right, white, ${hueColor})`,
                  },
                ]}
              />
              {/* Dark overlay */}
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    background: "linear-gradient(to bottom, transparent, black)",
                  },
                ]}
              />
              {/* Selector circle */}
              <View
                style={[
                  styles.selectorCircle,
                  {
                    left: `${saturation}%`,
                    top: `${100 - brightness}%`,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Hue Slider */}
          <View style={styles.hueSection}>
            <Text style={styles.pickerLabel}>Hue</Text>
            <TouchableOpacity style={styles.hueSlider} onPress={handleHueChange} activeOpacity={1}>
              <View style={styles.hueGradient} />
              {/* Hue indicator */}
              <View
                style={[
                  styles.hueIndicator,
                  {
                    left: `${(hue / 360) * 100}%`,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Hex Input */}
          <View style={styles.hexInputSection}>
            <Text style={styles.hexLabel}>Hex Color Code</Text>
            <TextInput
              style={styles.hexInput}
              value={tempColor}
              onChangeText={(value) => {
                if (value.startsWith("#") && value.length === 7) {
                  setTempColor(value)
                  const { h, s, b } = hexToHsb(value)
                  setHue(h)
                  setSaturation(s)
                  setBrightness(b)
                }
              }}
              placeholder="#000000"
              placeholderTextColor="#999"
            />
          </View>

          {/* Preset Colors */}
          <View style={styles.presetsSection}>
            <Text style={styles.presetsLabel}>Preset Colors</Text>
            <View style={styles.presetsGrid}>
              {presetColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.presetColor,
                    {
                      backgroundColor: color,
                      borderWidth: tempColor === color ? 3 : 1,
                      borderColor: tempColor === color ? "#000" : "#ddd",
                    },
                  ]}
                  onPress={() => {
                    setTempColor(color)
                    const { h, s, b } = hexToHsb(color)
                    setHue(h)
                    setSaturation(s)
                    setBrightness(b)
                  }}
                />
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default function StoreFront({ store }: { store: Store }) {
  const [storeName, setStoreName] = useState<string>(store?.storeName || "")
  const [logoId, setLogoId] = useState<string>(store?.branding?.logo?.id || "")
  const [bannerId, setBannerId] = useState<string>(store?.branding?.banner?.id || "")
  const [logoUri, setLogoUri] = useState<string | null>(store?.branding?.logo?.url || null)
  const [bannerUri, setBannerUri] = useState<string | null>(store?.branding?.banner?.url || null)

  const [colorPickerVisible, setColorPickerVisible] = useState(false)
  const [selectedColorKey, setSelectedColorKey] = useState<keyof typeof colors | null>(null)

  const defaultColors = useMemo(
    () => ({
      primary: store?.branding?.colors?.primary ?? "#000000",
      secondary: store?.branding?.colors?.secondary ?? "#000000",
      accent: store?.branding?.colors?.accent ?? "#000000",
    }),
    [store],
  )

  const [colors, setColors] = useState(defaultColors)
  const [fonts, setFonts] = useState({
    heading: store?.branding?.fonts?.heading || "System",
    body: store?.branding?.fonts?.body || "System",
  })

  const fontOptions = ["System", "Courier", "Georgia", "Trebuchet MS"]
  const storeId = store?.id
  const productAPI = new ProductAPI()

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }))
  }

  const openColorPicker = (colorKey: keyof typeof colors) => {
    setSelectedColorKey(colorKey)
    setColorPickerVisible(true)
  }

  const handleColorSelect = (color: string) => {
    if (selectedColorKey) {
      handleColorChange(selectedColorKey, color)
    }
  }

  const handleFontChange = (key: keyof typeof fonts, value: string) => {
    setFonts((prev) => ({ ...prev, [key]: value }))
  }

  const pickImage = useCallback(async (type: "logo" | "banner") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "logo" ? [1, 1] : [16, 9],
      quality: 1,
    })

    if (!result.canceled) {
      const asset = result.assets[0]
      if (type === "logo") {
        setLogoUri(asset.uri)
      } else {
        setBannerUri(asset.uri)
      }
      // Upload the image
      uploadImage.mutate({
        uri: asset.uri,
        name: type,
        type: asset.type || "image/jpeg",
      })
    }
  }, [])

  const uploadImage = useMutation({
    mutationFn: async (values: {
      uri: string
      name: "logo" | "banner"
      type: string
    }) => {
      const formData = new FormData()
      formData.append("file", {
        uri: values.uri,
        name: `${values.name}.jpg`,
        type: values.type,
      } as any)

      return productAPI.uploadImage(formData)
    },
    onSuccess: (response, { name }) => {
      const imageId = response?.data?.doc?.id
      if (imageId) {
        if (name === "logo") {
          setLogoId(imageId)
        } else {
          setBannerId(imageId)
        }
        Alert.alert("Success", "Image uploaded successfully")
      }
    },
    onError: (error: any) => {
      Alert.alert("Error", error.message || "Failed to upload image")
    },
  })

  const updateBranding = useMutation({
    mutationFn: (values: Record<string, any>) => new StoreAPI().updateStoreBranding(storeId!, values),
    onSuccess: (response) => {
      Alert.alert("Success", response?.message ?? "Store branding updated successfully")
    },
    onError: (e: any) => Alert.alert("Error", e.message || "Failed to update branding"),
  })

  const handleUpdateBranding = () => {
    updateBranding.mutate({
      branding: {
        colors,
        fonts,
        banner: bannerId,
        logo: logoId,
      },
      storeName: storeName,
    })
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Customize your Brand</Text>
          <TouchableOpacity
            style={[styles.updateButton, updateBranding.isPending && styles.buttonDisabled]}
            onPress={handleUpdateBranding}
            disabled={updateBranding.isPending}
          >
            {updateBranding.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.updateButtonText}>Update Branding</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Brand Name Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Brand Name</Text>
          <TextInput
            style={styles.input}
            value={storeName}
            onChangeText={setStoreName}
            placeholder="Enter your brand name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Color Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Theme Customization</Text>
          <View style={styles.colorGrid}>
            {Object.keys(colors).map((key) => (
              <View key={key} style={styles.colorItem}>
                <Text style={styles.colorLabel}>{key.charAt(0).toUpperCase() + key.slice(1)} Color</Text>
                <View style={styles.colorInputContainer}>
                  <TouchableOpacity
                    style={[
                      styles.colorPreview,
                      {
                        backgroundColor: colors[key as keyof typeof colors],
                      },
                    ]}
                    onPress={() => openColorPicker(key as keyof typeof colors)}
                  />
                  <TextInput
                    style={styles.colorInput}
                    value={colors[key as keyof typeof colors]}
                    onChangeText={(value) => handleColorChange(key as keyof typeof colors, value)}
                    placeholder="#000000"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Font Selection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Selection</Text>

          {/* Heading Font */}
          <View style={styles.fontItem}>
            <Text style={styles.fontLabel}>Heading Font</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fonts.heading}
                onValueChange={(value) => handleFontChange("heading", value)}
                style={styles.picker}
              >
                {fontOptions.map((font) => (
                  <Picker.Item key={font} label={font} value={font} />
                ))}
              </Picker>
            </View>
            <View style={styles.fontPreview}>
              <Text style={[styles.fontPreviewHeading, { fontFamily: fonts.heading }]}>
                This is a heading in {fonts.heading}
              </Text>
              <Text style={[styles.fontPreviewSubtitle, { fontFamily: fonts.heading }]}>Product title example</Text>
            </View>
          </View>

          {/* Body Font */}
          <View style={styles.fontItem}>
            <Text style={styles.fontLabel}>Body Font</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fonts.body}
                onValueChange={(value) => handleFontChange("body", value)}
                style={styles.picker}
              >
                {fontOptions.map((font) => (
                  <Picker.Item key={font} label={font} value={font} />
                ))}
              </Picker>
            </View>
            <View style={styles.fontPreview}>
              <Text style={[styles.fontPreviewBody, { fontFamily: fonts.body }]}>
                This is body text in {fonts.body}. This is how your product descriptions and other content will appear
                throughout your store.
              </Text>
              <Text style={[styles.fontPreviewBody, { fontFamily: fonts.body }]}>
                High-quality, comfortable product with excellent durability and style.
              </Text>
            </View>
          </View>
        </View>

        {/* Logo & Banner Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logo & Banner</Text>

          {/* Logo */}
          <View style={styles.mediaItem}>
            <Text style={styles.mediaLabel}>Logo</Text>
            <TouchableOpacity style={styles.mediaContainer} onPress={() => pickImage("logo")}>
              {logoUri ? (
                <Image source={{ uri: logoUri }} style={styles.mediaImage} resizeMode="contain" />
              ) : (
                <View style={styles.mediaPlaceholder}>
                  <Text style={styles.mediaPlaceholderText}>Tap to select logo</Text>
                  <Text style={styles.mediaPlaceholderSubtext}>Recommended: Square format</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={() => pickImage("logo")}>
              <Text style={styles.mediaButtonText}>{logoUri ? "Change Logo" : "Select Logo"}</Text>
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <View style={styles.mediaItem}>
            <Text style={styles.mediaLabel}>Banner</Text>
            <TouchableOpacity style={styles.mediaContainerWide} onPress={() => pickImage("banner")}>
              {bannerUri ? (
                <Image source={{ uri: bannerUri }} style={styles.mediaImage} resizeMode="cover" />
              ) : (
                <View style={styles.mediaPlaceholder}>
                  <Text style={styles.mediaPlaceholderText}>Tap to select banner</Text>
                  <Text style={styles.mediaPlaceholderSubtext}>Recommended: 16:9 format</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={() => pickImage("banner")}>
              <Text style={styles.mediaButtonText}>{bannerUri ? "Change Banner" : "Select Banner"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {selectedColorKey && (
        <ColorPickerModal
          visible={colorPickerVisible}
          currentColor={colors[selectedColorKey]}
          onClose={() => setColorPickerVisible(false)}
          onSelectColor={handleColorSelect}
          colorName={selectedColorKey.charAt(0).toUpperCase() + selectedColorKey.slice(1)}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1D1F2C",
    flex: 1,
  },
  updateButton: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 130,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1D1F2C",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1F2C",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1D1F2C",
  },
  colorGrid: {
    gap: 16,
  },
  colorItem: {
    marginBottom: 8,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1F2C",
    marginBottom: 8,
  },
  colorInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  colorInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1D1F2C",
  },
  fontItem: {
    marginBottom: 24,
  },
  fontLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1F2C",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  fontPreview: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  fontPreviewHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1D1F2C",
  },
  fontPreviewSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1D1F2C",
  },
  fontPreviewBody: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginBottom: 8,
  },
  mediaItem: {
    marginBottom: 24,
  },
  mediaLabel: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  mediaContainer: {
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaContainerWide: {
    aspectRatio: 16 / 9,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  mediaPlaceholderText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  mediaPlaceholderSubtext: {
    fontSize: 12,
    color: "#999",
  },
  mediaButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  mediaButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1F2C",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1F2C",
  },
  modalCloseButton: {
    fontSize: 24,
    color: "#999",
  },
  colorPreviewSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  largeColorPreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  colorHexText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1F2C",
  },
  pickerSection: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1F2C",
    marginBottom: 8,
  },
  gradientPicker: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    position: "relative",
  },
  selectorCircle: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "transparent",
    marginLeft: -10,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  hueSection: {
    marginBottom: 20,
  },
  hueSlider: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  hueGradient: {
    flex: 1,
    background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
  },
  hueIndicator: {
    position: "absolute",
    width: 3,
    height: "100%",
    backgroundColor: "#fff",
    marginLeft: -1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  hexInputSection: {
    marginBottom: 20,
  },
  hexLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1F2C",
    marginBottom: 8,
  },
  hexInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1D1F2C",
  },
  presetsSection: {
    marginBottom: 20,
  },
  presetsLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D1F2C",
    marginBottom: 12,
  },
  presetsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  presetColor: {
    width: "23%",
    aspectRatio: 1,
    borderRadius: 8,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D1F2C",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
})
