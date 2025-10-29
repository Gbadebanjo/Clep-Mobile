"use client";

import { ProductAPI } from "@/apis/product-api";
import { StoreAPI } from "@/apis/store-api";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MediaFields from "@/components/Vendor/AddProduct/media-fields";
import AdvertComponent from "@/components/Vendor/AdvertComponent";
import ColorPickerModal from "@/components/Vendor/ColorPickerModal";
import HeroSlideScreen from "@/components/Vendor/HeroSlideComponent";
import { showError, showSuccess } from "@/services/api";
import { useAuthStore } from "@/store";
import type { Store } from "@/types/auth";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    TextInput,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import { StoreFontStyles } from "./style";

export default function StoreFront({ store }: { store: Store }) {
  const { user } = useAuthStore();
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = StoreFontStyles(colorScheme);
  const [storeName, setStoreName] = useState<string>(
    user?.store?.storeName || ""
  );
  const [logoId, setLogoId] = useState<string>(
    user?.store?.branding?.logo?.id || ""
  );
  const [bannerId, setBannerId] = useState<string>(
    user?.store?.branding?.banner?.id || ""
  );
  const [logoUri, setLogoUri] = useState<string | null>(
    user?.store?.branding?.logo?.url || null
  );
  const [bannerUri, setBannerUri] = useState<string | null>(
    user?.store?.branding?.banner?.url || null
  );

  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColorKey, setSelectedColorKey] = useState<
    keyof typeof colors | null
  >(null);

  const defaultColors = useMemo(
    () => ({
      primary: user?.store?.branding?.colors?.primary ?? "#000000",
      secondary: user?.store?.branding?.colors?.secondary ?? "#000000",
      accent: user?.store?.branding?.colors?.accent ?? "#000000",
    }),
    [user?.store]
  );

  const [colors, setColors] = useState(defaultColors);
  const [fonts, setFonts] = useState({
    heading: user?.store?.branding?.fonts?.heading || "Inter",
    body: user?.store?.branding?.fonts?.body || "Inter",
  });

  const fontOptions = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat"];
  const storeId = user?.store?.id;
  const productAPI = new ProductAPI();

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const openColorPicker = (colorKey: keyof typeof colors) => {
    setSelectedColorKey(colorKey);
    setColorPickerVisible(true);
  };

  const handleColorSelect = (color: string) => {
    if (selectedColorKey) {
      handleColorChange(selectedColorKey, color);
    }
  };

  const handleFontChange = (key: keyof typeof fonts, value: string) => {
    setFonts((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = useCallback(async (type: "logo" | "banner") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === "logo" ? [1, 1] : [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      if (type === "logo") {
        setLogoUri(asset.uri);
      } else {
        setBannerUri(asset.uri);
      }
      // Upload the image
      uploadImage.mutate({
        uri: asset.uri,
        name: type,
        type: asset.type || "image/jpeg",
      });
    }
  }, []);

  const uploadImage = useMutation({
    mutationFn: async (values: {
      uri: string;
      name: "logo" | "banner";
      type: string;
    }) => {
      const formData = new FormData();
      formData.append("file", {
        uri: values.uri,
        name: `${values.name}.jpg`,
        type: values.type,
      } as any);

      return productAPI.uploadImage(formData);
    },
    onSuccess: (response, { name }) => {
      const imageId = response?.data?.doc?.id;
      if (imageId) {
        if (name === "logo") {
          setLogoId(imageId);
        } else {
          setBannerId(imageId);
        }
        showSuccess("Success", "Image uploaded successfully");
      }
    },
    onError: (error: any) => {
      showError("Error", error.message || "Failed to upload image");
    },
  });

  const updateBranding = useMutation({
    mutationFn: (values: Record<string, any>) =>
      new StoreAPI().updateStoreBranding(storeId!, values),
    onSuccess: (response) => {
      showSuccess(
        "Success",
        String(response?.message) ?? "Store branding updated successfully"
      );
    },
    onError: (e: any) =>
      Alert.alert("Error", e.message || "Failed to update branding"),
  });

  const handleUpdateBranding = () => {
    const payload = {
      branding: {
        colors,
        fonts,
        banner: bannerId,
        logo: logoId,
      },
      store_name: storeName,
    };
    updateBranding.mutate(payload);
  };

  const [logoMedia, setLogoMedia] = useState<any>(null);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const mediaRef = useRef<any>(null);

  const openGallery = () => {
    if (mediaRef.current && mediaRef.current.openPicker) {
      mediaRef.current.openPicker();
    }
  };

  const handleSelectMedia = (media: any) => {
    setLogoMedia(media);
    setIsGalleryVisible(false);
  };

  return (
    <>
      <ThemedView style={styles.head}>
        <Header title={"Customize your Brand"} />
      </ThemedView>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <TouchableOpacity
            style={[
              styles.updateButton,
              updateBranding.isPending && styles.buttonDisabled,
            ]}
            onPress={handleUpdateBranding}
            disabled={updateBranding.isPending}
          >
            {updateBranding.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.updateButtonText}>
                Update Branding
              </ThemedText>
            )}
          </TouchableOpacity>
        </ThemedView>

        {/* Brand Name Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Brand Name</ThemedText>
          <TextInput
            style={styles.input}
            value={storeName}
            onChangeText={setStoreName}
            placeholder="Enter your brand name"
            placeholderTextColor="#999"
          />
        </ThemedView>

        {/* Color Theme Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Color Theme Customization
          </ThemedText>

          <ThemedView style={styles.colorHeaderRow}>
            {Object.keys(colors).map((key) => (
              <ThemedText key={key} style={styles.colorLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)} {"\n"}Color
              </ThemedText>
            ))}
          </ThemedView>

          <ThemedView style={styles.colorRow}>
            {Object.keys(colors).map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.colorBox,
                  { backgroundColor: colors[key as keyof typeof colors] },
                ]}
                onPress={() => openColorPicker(key as keyof typeof colors)}
              />
            ))}
          </ThemedView>
        </ThemedView>

        {/* Font Selection Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Font Selection</ThemedText>

          {/* Heading Font */}
          <ThemedView style={styles.fontItem}>
            <ThemedText style={styles.fontLabel}>Heading Font</ThemedText>
            <ThemedView style={styles.pickerContainer}>
              <Picker
                selectedValue={fonts.heading}
                onValueChange={(value) => handleFontChange("heading", value)}
                style={styles.picker}
              >
                {fontOptions.map((font) => (
                  <Picker.Item key={font} label={font} value={font} />
                ))}
              </Picker>
            </ThemedView>
            <ThemedView style={styles.fontPreview}>
              <ThemedText
                style={[
                  styles.fontPreviewHeading,
                  { fontFamily: fonts.heading },
                ]}
              >
                This is a heading in {fonts.heading}
              </ThemedText>
              <ThemedText
                style={[
                  styles.fontPreviewSubtitle,
                  { fontFamily: fonts.heading },
                ]}
              >
                Product title example
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Body Font */}
          <ThemedView style={styles.fontItem}>
            <ThemedText style={styles.fontLabel}>Body Font</ThemedText>
            <ThemedView style={styles.pickerContainer}>
              <Picker
                selectedValue={fonts.body}
                onValueChange={(value) => handleFontChange("body", value)}
                style={styles.picker}
              >
                {fontOptions.map((font) => (
                  <Picker.Item key={font} label={font} value={font} />
                ))}
              </Picker>
            </ThemedView>
            <ThemedView style={styles.fontPreview}>
              <ThemedText
                style={[styles.fontPreviewBody, { fontFamily: fonts.body }]}
              >
                This is body text in {fonts.body}. This is how your product
                descriptions and other content will appear throughout your
                store.
              </ThemedText>
              <ThemedText
                style={[styles.fontPreviewBody, { fontFamily: fonts.body }]}
              >
                High-quality, comfortable product with excellent durability and
                style.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.title}>Logo & Banner</ThemedText>

          <ThemedView style={styles.row}>
            <ThemedView style={styles.column}>
              <ThemedText style={styles.label}>Logo</ThemedText>
              <ThemedView style={styles.card}>
                <MediaFields
                  keyToStore="default_images"
                  title=""
                  maxFiles={1}
                  setValues={handleSelectMedia}
                  value={logoMedia}
                  addBoxStyle={{
                    width: "100%",
                    paddingVertical: 40,
                    backgroundColor: "#f9fafb",
                  }}
                  extraText="Recommended size: 1200x600px"
                />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Spacer */}
        {/* <ThemedView style={{ height: 40 }} /> */}
        <AdvertComponent store={store} />
        <HeroSlideScreen/>
      </ScrollView>

      {selectedColorKey && (
        <ColorPickerModal
          visible={colorPickerVisible}
          currentColor={colors[selectedColorKey]}
          onClose={() => setColorPickerVisible(false)}
          onSelectColor={handleColorSelect}
          colorName={
            selectedColorKey.charAt(0).toUpperCase() + selectedColorKey.slice(1)
          }
        />
      )}
    </>
  );
}
