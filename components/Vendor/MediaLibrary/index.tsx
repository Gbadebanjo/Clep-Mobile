import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, useColorScheme } from "react-native";
import { MediaLibraryStyles } from "./style";

interface MediaLibraryProps {
  media: any[];
  usage?: { usedStorage: number; percentUsed: number };
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ media, usage }) => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = MediaLibraryStyles(colorScheme);

  return (
    <ThemedView style={[styles.card, { width: "90%" }]}>
      <ThemedView style={styles.header}>
        <Ionicons name="image-outline" size={22} color="#000" />
        <ThemedText style={styles.headerThemedText}>Media Library</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText style={styles.label}>Storage Usage</ThemedText>
        <ThemedText style={styles.value}>
          {usage ? (usage.usedStorage / 1024 / 1024).toFixed(2) : "0.00"} MB
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedView style={styles.fileCount}>
          <Image
            source={require("../../../assets/images/dashboard/Vector (1).png")}
            style={{ width: 16, height: 16 }}
            resizeMode="contain"
          />
          <ThemedText style={styles.fileThemedText}>
            {media?.length} files
          </ThemedText>
        </ThemedView>
        <ThemedText style={styles.percentThemedText}>
          {usage?.percentUsed ?? 0}% Used
        </ThemedText>
      </ThemedView>

      <TouchableOpacity
        style={styles.manageButton}
        onPress={() => router.push("/media")}
      >
        <ThemedText style={styles.manageThemedText}>
          Manage Media Library
        </ThemedText>
        <Ionicons name="open-outline" size={16} color="#000" />
      </TouchableOpacity>
    </ThemedView>
  );
};
