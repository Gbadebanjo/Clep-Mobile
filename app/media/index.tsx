"use client";
import Header from "@/components/Header";
import { ThemedLoader } from "@/components/ThemedLoader";
import { formatChatDate, formatFileSize } from "@/helpers/data-utils";
import { useAuthStore } from "@/store";
import { useMediaStore } from "@/store/useMediaStore";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "./style";

export default function MediaGalleryScreen() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { user } = useAuthStore();
  const {
    media,
    fetchMedia,
    isLoading,
    totalPages,
    totalDocs,
    currentPage,
    nextPage,
    prevPage,
    usage,
    fetchUsage,
    isUsageLoading,
    deleteMedia,
  } = useMediaStore();

  useEffect(() => {
    fetchMedia();
    fetchUsage();
  }, [currentPage]);

  const handleDelete = (id: string) => {
    Alert.alert("Delete Media", "Are you sure you want to delete this file?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteMedia(id) },
    ]);
  };

  // ✅ Info Modal
  const handleInfo = (item: any) => {
    Alert.alert(
      "Media Info",
      `Name: ${item.filename}\nSize: ${formatFileSize(
        item.filesize
      )}\nUploaded: ${formatChatDate(item.createdAt)}`
    );
  };
  if (isUsageLoading) return <ThemedLoader />;

  const handleUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your media library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) return;

      const file = result.assets[0];
      console.log("📸 Picked file:", file);

      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.fileName || "upload.jpg",
        type: file.mimeType || "image/jpeg",
      } as any);

      // ✅ Add required metadata
      formData.append("uploadedBy", user?.name);

      // Debug
      for (const pair of formData as any) {
        console.log("🧾 FormData =>", pair[0], pair[1]);
      }

      Toast.show({
        type: "info",
        text1: "Uploading...",
        text2: "Please wait while we upload your file.",
      });

      await useMediaStore.getState().uploadMedia(formData);
    } catch (err) {
      console.error("Upload error:", err);
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: "Something went wrong while uploading the file.",
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Fixed Header (not scrollable) */}
      <Header title="Media Gallery" />
      <View style={styles.titleSection}>
        <Text style={styles.subtitle}>
          Manage your media files in one place. You can view, select, upload,
          and delete your media files.
        </Text>
      </View>
      {/* ✅ Scrollable content below */}
      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        {/* Storage Card */}
        <View style={styles.storageCard}>
          <Text style={styles.storageTitle}>Storage Usage</Text>

          {isUsageLoading ? (
          <ThemedLoader />
          ) : usage ? (
            <>
              <View>
                <View style={styles.storageRow}>
                  <Text style={styles.storageLabel}>Used:</Text>
                  <Text style={styles.storageValue}>
                    {(usage.usedStorage / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </View>
                <View style={styles.storageRow}>
                  <Text style={styles.storageLabel}>Limit:</Text>
                  <Text style={styles.storageValue}>
                    {usage.isUnlimited
                      ? "Unlimited"
                      : usage.storageLimit
                      ? `${(usage.storageLimit / 1024 / 1024).toFixed(2)} MB`
                      : "N/A"}
                  </Text>
                </View>
              </View>

              {/* ✅ Dynamic Progress Bar */}
              {(() => {
                const totalStorage = 2048000000;
                const usedPercent = Math.min(
                  (usage.usedStorage / totalStorage) * 100,
                  100
                );

                return (
                  <>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          { width: `${usedPercent}%` },
                        ]}
                      />
                    </View>

                    <Text style={styles.storageNote}>
                      Unlimited storage available
                    </Text>
                  </>
                );
              })()}
            </>
          ) : (
            <Text style={{ color: "#999" }}>No usage data available</Text>
          )}
        </View>

        {/* View Controls */}
        <View style={styles.controlsRow}>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === "grid" && styles.toggleButtonActive,
              ]}
              onPress={() => setViewMode("grid")}
            >
              <Feather
                name="grid"
                size={16}
                color={viewMode === "grid" ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.toggleText,
                  viewMode === "grid" && styles.toggleTextActive,
                ]}
              >
                Grid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === "list" && styles.toggleButtonActive,
              ]}
              onPress={() => setViewMode("list")}
            >
              <Feather
                name="list"
                size={16}
                color={viewMode === "list" ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.toggleText,
                  viewMode === "list" && styles.toggleTextActive,
                ]}
              >
                List
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => {
              fetchMedia();
              fetchUsage();
            }}
          >
            <Feather name="refresh-cw" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search media..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={async (text) => {
              setSearchQuery(text);
              if (!text.trim()) return fetchMedia(1);

              try {
                setIsSearching(true);
                await fetchMedia(1, text);
              } finally {
                setIsSearching(false);
              }
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={async () => {
              try {
                setIsSearching(true);
                await fetchMedia(1, searchQuery);
              } finally {
                setIsSearching(false);
              }
            }}
          >
            <Feather name="search" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Feather name="upload" size={18} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>

        {/* ✅ Media Section */}
        {isLoading && !isSearching ? (
         <ThemedLoader />
        ) : media.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Feather name="upload" size={48} color="#ccc" />
            <Text
              style={{
                color: "#999",
                fontSize: 16,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              No media items found
            </Text>
            {/* Upload Button */}
            <TouchableOpacity
              style={styles.uploadButtonEmpty}
              onPress={handleUpload}
            >
              <Feather name="plus" size={18} color="#fff" />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        ) : viewMode === "grid" ? (
          <View style={styles.mediaGrid}>
            {media.map((item) => (
              <TouchableOpacity key={item?.id} style={styles.mediaItem}>
                <Image
                  source={{ uri: item?.url }}
                  style={styles.mediaImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.mediaList}>
            {media.map((item) => (
              <TouchableOpacity key={item.id} style={styles.listItem}>
                <Image
                  source={{ uri: item.url }}
                  style={styles.listImage}
                  resizeMode="cover"
                />
                <View style={styles.listTextContainer}>
                  <Text style={styles.listTitle}>{item?.filename}</Text>
                  <Text style={styles.listFileSize}>
                    {formatFileSize(item?.filesize)}
                  </Text>
                  <Text style={styles.listFileSize}>
                    {formatChatDate(item?.createdAt)}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionIcons}>
                  <TouchableOpacity
                    onPress={() => handleInfo(item)}
                    style={styles.iconButton}
                  >
                    <Feather name="info" size={18} color="#3b82f6" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.iconButton}
                  >
                    <Feather name="trash" size={18} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Pagination */}
        {media.length > 0 && totalPages > 1 && (
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              {totalDocs} items • Page {currentPage} of {totalPages || 1}
            </Text>
            <View style={styles.paginationButtons}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.paginationButtonDisabled,
                ]}
                disabled={currentPage === 1}
                onPress={prevPage}
              >
                <Feather
                  name="chevron-left"
                  size={20}
                  color={currentPage === 1 ? "#ccc" : "#000"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.paginationButtonDisabled,
                ]}
                disabled={currentPage === totalPages}
                onPress={nextPage}
              >
                <Feather
                  name="chevron-right"
                  size={20}
                  color={currentPage === totalPages ? "#ccc" : "#000"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
