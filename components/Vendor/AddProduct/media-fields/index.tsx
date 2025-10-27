
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import { MediaItem } from "../media-gallery-modal";
import { useMediaGallery } from "../use-media-gallery";
import { MediaFieldStyles } from "./style";

interface IProps {
  error?: Record<string, any>;
  setValues?: any;
  keyToStore: string;
  title: string;
  maxFiles?: number;
  value?: any; 
}

export default function MediaFields({
  error,
  setValues,
  keyToStore,
  title,
  maxFiles = 1,
  value = [], 
}: IProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = MediaFieldStyles(colorScheme);

  // ✅ Prefill images from formData (edit mode)
  useEffect(() => {
    if (value && value.length > 0) {
      const normalized = value
        .map((img: any) => {
          const url = img?.image?.url || img?.url || img?.image;
          if (!url) return null;
          return {
            id: img?.image?.id || img?.id || Date.now().toString(),
            url,
          } as MediaItem;
        })
        .filter(Boolean);

      console.log("🖼️ Normalized Images:", normalized);
      setSelectedMedia(normalized);
    }
  }, [value]);

  const mediaGallery = useMediaGallery({
    multiple: maxFiles > 1,
    maxItems: maxFiles,
    onSelect: (media) => {
      const items = Array.isArray(media) ? media : [media];
      setSelectedMedia(items);

      const images = items.map((m) => ({ image: m }));
      console.log("📸 Selected media:", items);
      console.log("🧩 Updating form key:", keyToStore, "with images:", images);
      if (setValues) {
        setValues((prev: any) => ({
          ...prev,
          [keyToStore]: images,
        }));
      }
    },
  });

  const removeImage = (media: MediaItem) => {
    const updated = selectedMedia.filter((i) => i.id !== media.id);
    setSelectedMedia(updated);
    const images = updated.map((m) => ({ image: m }));
    setValues?.((prev: any) => ({
      ...prev,
      [keyToStore]: images,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>{title}</ThemedText>

        <ThemedView style={styles.grid}>
          {selectedMedia.map((media) => (
            <ThemedView key={media.id} style={styles.imageWrapper}>
              <Image
                source={{
                  uri: media.url || media.image?.url || media.image,
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeImage(media)}
              >
                <Ionicons name="trash-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </ThemedView>
          ))}

          {selectedMedia.length < maxFiles && (
            <TouchableOpacity
              style={styles.addBox}
              onPress={mediaGallery.openGallery}
            >
              <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              <ThemedText style={styles.addText}>Add Image</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        <ThemedView>{mediaGallery.MediaGallery()}</ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
