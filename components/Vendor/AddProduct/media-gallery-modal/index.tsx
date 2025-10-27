"use client"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { api, showError, showSuccess } from "@/services/api"
import { Feather } from "@expo/vector-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  useColorScheme,
} from "react-native"
import { MediaGalleryModalStyles } from "./style"

const { width } = Dimensions.get("window")

export interface MediaItem {
  id: string
  url: string
  filename: string
  filesize: number
  mimeType: string
  createdAt: string
}

interface MediaGalleryModalProps {
  visible: boolean
  onClose: () => void
  onSelect: (item: MediaItem | MediaItem[]) => void
  multiple?: boolean
  maxItems?: number
}

// ✅ Fetch user media (only images)
async function fetchUserMedia(page = 1) {
  const response = await fetch(`${api.getBaseURL()}/media/user-media?page=${page}&limit=20`)
  console.log("response", response)
  if (!response.ok) throw new Error("Failed to fetch media")

  const json = await response.json()

  // ✅ Filter only image files
  const filtered = {
    ...json,
    data: {
      ...json.data,
      docs: json.data?.docs?.filter((item: any) => item.mimeType?.startsWith("image/")) || [],
    },
  }

  console.log("🖼️ Filtered images:", JSON.stringify(filtered.data.docs, null, 2))
  return filtered
}

// ✅ Delete media
async function deleteMedia(mediaId: string) {
  const response = await fetch(`${api.getBaseURL()}/media/user-media`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mediaId }),
  })
  if (!response.ok) throw new Error("Failed to delete media")
  return response.json()
}

// ✅ Upload media (images only)
async function uploadMediaFiles(files: any[]) {
  const formData = new FormData()
  files.forEach((file) => formData.append("file", file))

  const response = await fetch(`${api.getBaseURL()}/upload-media`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) throw new Error("Upload failed")
  return response.json()
}

export default function MediaGalleryModal({
  visible,
  onClose,
  onSelect,
  multiple = true,
  maxItems = 10,
}: MediaGalleryModalProps) {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<MediaItem[]>([])
  const [tab, setTab] = useState<"browse" | "upload">("browse")
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-media", page],
    queryFn: () => fetchUserMedia(page),
    enabled: visible,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMedia,
    onSuccess: () => {
      Alert.alert("Deleted", "Media deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["user-media"] })
    },
  })

  const uploadMutation = useMutation({
    mutationFn: uploadMediaFiles,
    onSuccess: async () => {
     showSuccess("Success", "Files uploaded successfully")
  
      // ✅ Step 1: Refresh media list
      await queryClient.invalidateQueries({ queryKey: ["user-media"] })
  
      // ✅ Step 2: Switch tab to "browse"
      setTab("browse")
  
      // ✅ Step 3: Refetch & reload page 1
      setPage(1)
  
      // Optional short delay for smoother transition
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["user-media"] })
      }, 500)
    },
    onError: (err: any) => {
      console.error("❌ Upload failed:", err)
      showError("Upload Failed", "Something went wrong. Please try again.")
    },
  })
  

  // ✅ Select image item
  const handleSelect = (item: MediaItem) => {
    if (multiple) {
      setSelected((prev) => {
        const exists = prev.some((i) => i.id === item.id)
        if (exists) return prev.filter((i) => i.id !== item.id)
        if (prev.length >= maxItems) {
          Alert.alert("Limit", `You can only select ${maxItems} items.`)
          return prev
        }
        return [...prev, item]
      })
    } else {
      setSelected([item])
    }
  }

  // ✅ Pick only images from gallery
  const pickFiles = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to grant media access to upload files.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Only images
      allowsMultipleSelection: multiple,
      quality: 1,
    })

    if (result.canceled) return

    const files = result.assets.map((asset, index) => ({
      uri: asset.uri,
      name: asset.fileName || `image_${index}.jpg`,
      type: asset.mimeType || "image/jpeg",
    }))

    uploadMutation.mutate(files)
  }

  const confirmSelection = () => {
    if (multiple) onSelect(selected)
    else onSelect(selected[0])
    handleClose()
  }

  const handleClose = () => {
    setSelected([])
    setTab("browse")
    setPage(1)
    onClose()
  }

  const colorScheme = useColorScheme() as "light" | "dark"
  const styles = MediaGalleryModalStyles(colorScheme)

  // ✅ Render item — images only
  const renderItem = ({ item }: { item: MediaItem }) => {
    if (!item.mimeType.startsWith("image/")) return null // skip non-images
    const isSelected = selected.some((i) => i.id === item.id)
    return (
      <TouchableOpacity
        style={[styles.mediaItem, isSelected && styles.mediaItemSelected]}
        onPress={() => handleSelect(item)}
        onLongPress={() =>
          Alert.alert("Delete Media", "Are you sure you want to delete this image?", [
            { text: "Cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => deleteMutation.mutate(item.id),
            },
          ])
        }
      >
        <Image source={{ uri: item.url }} style={styles.image} />
        {isSelected && (
          <ThemedView style={styles.checkmark}>
            <Feather name="check" size={16} color="#fff" />
          </ThemedView>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modal}>
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>Media Gallery</ThemedText>
            <TouchableOpacity onPress={handleClose}>
              <Feather name="x" size={22} color="#333" />
            </TouchableOpacity>
          </ThemedView>

          {/* Tabs */}
          <ThemedView style={styles.tabs}>
            <TouchableOpacity
              onPress={() => setTab("browse")}
              style={[styles.tab, tab === "browse" && styles.activeTab]}
            >
              <ThemedText style={[styles.tabText, tab === "browse" && styles.activeTabText]}>
                Browse
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab("upload")}
              style={[styles.tab, tab === "upload" && styles.activeTab]}
            >
              <ThemedText style={[styles.tabText, tab === "upload" && styles.activeTabText]}>
                Upload
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* Content */}
          {tab === "browse" ? (
            isLoading ? (
              <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />
            ) : isError ? (
              <ThemedText style={styles.errorText}>Error loading media</ThemedText>
            ) : (
              <FlatList
                data={data?.data?.docs || []}
                numColumns={3}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.grid}
                scrollEnabled={true}
                style={styles.contentContainer}
              />
            )
          ) : (
            <ThemedView style={styles.uploadContainer}>
              {uploadMutation.isPending ? (
                <ActivityIndicator size="large" color="#007bff" />
              ) : (
                <ThemedView style={styles.uploadContent}>
                  <ThemedView style={styles.uploadIcon}>
                    <Feather name="upload" size={56} color="#6B0C2D" />
                  </ThemedView>
                  <ThemedText style={styles.uploadTitle}>Upload Images</ThemedText>
                  <ThemedText style={styles.uploadSubtitle}>10MB max per image</ThemedText>
                  <TouchableOpacity style={styles.uploadButton} onPress={pickFiles}>
                    <ThemedText style={styles.uploadButtonText}>Select from Gallery</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              )}
            </ThemedView>
          )}

          {/* Footer */}
          {(tab === "browse" || selected.length > 0) && (
            <ThemedView style={styles.footer}>
              {/* <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                <ThemedText>Cancel</ThemedText>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[styles.selectButton, selected.length === 0 && { opacity: 0.5 }]}
                onPress={confirmSelection}
                disabled={selected.length === 0}
              >
                <ThemedText style={{ color: "#fff" }}>
                  {selected.length > 0 ? `Select ${selected.length}` : "Select"}
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </Modal>
  )
}
