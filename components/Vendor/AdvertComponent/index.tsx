import { StoreAPI } from "@/apis/store-api";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMediaGallery } from "@/components/Vendor/AddProduct/use-media-gallery";
import { useAuthStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { AdvertComponentStyles } from "./style";

interface AdvertData {
  media: any | null;
  link: string;
  active: boolean;
  dimension: string;
}

const defaultAdvertsConfig = [
  { key: "advert1", dimension: "700x400" },
];

export default function AdvertComponent({ store }: { store?: any }) {
  const user = useAuthStore((s) => s.user);
  const storeId = user?.store?.id;
  const [loadingSaveId, setLoadingSaveId] = useState<string | null>(null);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = AdvertComponentStyles(colorScheme);

  const [advertData, setAdvertData] = useState<Record<string, AdvertData>>(() =>
    defaultAdvertsConfig.reduce((acc, { key, dimension }) => {
      const advert = store?.adverts?.find((ad: any) => ad.position === dimension);
      acc[key] = advert
        ? {
            media: advert.image
              ? {
                  id: advert.image.id,
                  url: advert.image.uri,
                  filename: advert.image.filename || "advert.jpg",
                }
              : null,
            link: advert.link || "",
            active: advert.active ?? true,
            dimension,
          }
        : {
            media: null,
            link: "",
            active: true,
            dimension,
          };
      return acc;
    }, {} as Record<string, AdvertData>)
  );

  const updateAdvertData = (key: string, updates: Partial<AdvertData>) => {
    setAdvertData((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...updates },
    }));
  };

  // Single advert gallery hook
  const advertGallery = useMediaGallery({
    onSelect: (media) => {
      // ✅ If it's an array, take the first item
      const selected = Array.isArray(media) ? media[0] : media;
  
      if (selected) {
        updateAdvertData("advert1", {
          media: {
            id: selected?.id || null,
            url: selected?.url || selected?.uri,
            filename: selected?.filename || selected?.name || "advert.jpg",
          },
        });
      }
    },
  });
  
  

  const addAdvert = useMutation({
    mutationFn: (values: { data: any; name: string }) =>
      new StoreAPI().addAdvert(values.data),
    onMutate: ({ name }) => setLoadingSaveId(name),
    onSettled: () => setLoadingSaveId(null),
    onSuccess: () => {
      Alert.alert("Success", "Your advert has been uploaded successfully!");
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message || "An error occurred");
    },
  });

  const handleSave = (key: string) => {
    const ad = advertData[key];
    if (!ad.media) {
      Alert.alert("Missing Image", "Please select an image before saving.");
      return;
    }
    addAdvert.mutate({
      data: {
        store: storeId!,
        image: ad.media.id,
        position: ad.dimension,
        link: ad.link,
        active: ad.active,
      },
      name: key,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.header}>Adverts (Optional)</ThemedText>

      {Object.entries(advertData).map(([key, data]) => (
  <ThemedView key={key} style={styles.card}>
    {/* Upload Box */}
    <TouchableOpacity
      style={[styles.imageBox, !data.media && styles.imagePlaceholder]}
      activeOpacity={0.8}
      onPress={() => advertGallery.openGallery()}
    >
      {data.media ? (
        <Image
          source={{ uri: data.media.url || data.media.uri }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <ThemedView style={styles.placeholderContent}>
          <Ionicons name="image-outline" size={50} color="#9ca3af" />
          <ThemedText style={styles.placeholderText}>Click to select image</ThemedText>
          <ThemedText style={styles.recommendText}>
            Recommended size: {data.dimension}
          </ThemedText>
        </ThemedView>
      )}
    </TouchableOpacity>

    {/* Remove Image Button */}
    {data.media && (
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => updateAdvertData(key, { media: null })}
      >
        <ThemedText style={styles.removeBtnText}>Remove Image</ThemedText>
      </TouchableOpacity>
    )}

    {/* Link Input */}
    <ThemedText style={styles.label}>Add link (optional):</ThemedText>
    <TextInput
      placeholder="https://example.com"
      value={data.link}
      onChangeText={(text) => updateAdvertData(key, { link: text })}
      style={styles.input}
      placeholderTextColor="#999"
    />

    {/* Active Switch */}
    <TouchableOpacity
      style={styles.checkboxRow}
      onPress={() => updateAdvertData(key, { active: !data.active })}
      activeOpacity={0.7}
    >
      <ThemedView style={[styles.checkbox, data.active && styles.checkboxChecked]}>
        {data.active && <Ionicons name="checkmark" size={14} color="#fff" />}
      </ThemedView>
      <ThemedText style={styles.checkboxLabel}>Is Ad active?</ThemedText>
    </TouchableOpacity>

    {/* Save Button */}
    {data.media && (
      <TouchableOpacity
        onPress={() => handleSave(key)}
        style={styles.saveBtn}
        disabled={loadingSaveId === key}
      >
        {loadingSaveId === key ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.saveBtnText}>Save</ThemedText>
        )}
      </TouchableOpacity>
    )}

    {/* Change Image Button */}
    <TouchableOpacity
      onPress={() => advertGallery.openGallery()}
      style={styles.changeBtn}
    >
      <ThemedText style={styles.changeBtnText}>
        {data.media ? "Change Image" : "Select Image"}
      </ThemedText>
    </TouchableOpacity>

    <advertGallery.MediaGallery />
  </ThemedView>
))}

    </ScrollView>
  );
}


