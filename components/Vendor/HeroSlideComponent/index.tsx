import { StoreAPI } from "@/apis/store-api";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MediaFields from "@/components/Vendor/AddProduct/media-fields";
import { showError, showSuccess } from "@/services/api";
import { useAuthStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { HeroSlideStyles } from "./style";

const MAX_SLIDES = 5;

export default function HeroSlideScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const storeAPI = useMemo(() => new StoreAPI(), []);
  const storeId = user?.store?.id;
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = HeroSlideStyles(colorScheme);

  // 🧠 Fetch latest store with hero slides
  const { data: storeResponse, isLoading } = useQuery({
    queryKey: ["my-store"],
    queryFn: async () => {
      const res = await storeAPI.getMyStores();
      return res?.data;
    },
  });

  const store = storeResponse;

  const defaultSlides = useMemo(
    () =>
      store?.hero_slides?.map((item: any, index: number) => ({
        key: `slide${index + 1}`,
        media: item.slide
          ? {
              id: item.slide.id,
              url: item.slide.url,
              filename: item.slide.filename || "slide.jpg",
            }
          : null,
        caption: item.caption || "",
        link: item.link || "",
      })) || [],
    [store?.hero_slides]
  );

  const [heroSlides, setHeroSlides] = useState(defaultSlides);

  useEffect(() => {
    if (store?.hero_slides) {
      setHeroSlides(defaultSlides);
    }
  }, [store]);

  const firstSlideRef = useRef<any>(null);

  useEffect(() => {
    if (heroSlides.length > 0 && !heroSlides[0].media) {
      const timeout = setTimeout(() => {
        firstSlideRef.current?.openPicker?.();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [heroSlides]);

  const handleAddSlide = () => {
    if (heroSlides.length >= MAX_SLIDES) {
      showError("Limit reached", `You can only add ${MAX_SLIDES} slides.`);
      return;
    }
    setHeroSlides((prev) => [
      ...prev,
      { key: `slide${prev.length + 1}`, media: null, caption: "", link: "" },
    ]);
  };

  const handleRemoveSlide = (index: number) => {
    setHeroSlides((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: "caption" | "link",
    value: string
  ) => {
    setHeroSlides((prev) =>
      prev.map((slide, i) =>
        i === index ? { ...slide, [field]: value } : slide
      )
    );
  };

  const handleSelectMedia = (index: number, selectedMedia: any[]) => {
    if (selectedMedia.length > 0) {
      setHeroSlides((prev) =>
        prev.map((slide, i) =>
          i === index ? { ...slide, media: selectedMedia[0] } : slide
        )
      );
    }
  };

  const updateHeroSlide = useMutation({
    mutationFn: (slides: any[]) =>
      storeAPI.updateStoreHeroSlides(storeId, slides),
    onSuccess: () => {
      showSuccess("Success", "Hero slides updated successfully!");
      router.back();
    },
    onError: (error: any) => {
      console.error(error);
      showError("Error", error.message || "Failed to update hero slides");
    },
  });

  const handleSaveHeroSlides = () => {
    const slidesToSave = heroSlides
      .filter((slide) => slide.media?.id)
      .map(({ media, caption, link }) => ({
        slide: media?.id,
        caption,
        link,
      }));

    if (slidesToSave.some((s) => !s.caption)) {
      showError(
        "Missing caption",
        "Please fill in a caption for all slides before saving."
      );
      return;
    }

    if (slidesToSave.length === 0) {
      showError("No slides", "Please add at least one slide image.");
      return;
    }

    updateHeroSlide.mutate(slidesToSave);
  };

  if (isLoading) return <ThemedLoader />;

  const renderSlide = ({ item, index }: { item: any; index: number }) => (
    <ThemedView style={styles.slideContainer}>
      {index > 0 && (
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleRemoveSlide(index)}
        >
          <Ionicons name="trash" size={18} color="#fff" />
        </TouchableOpacity>
      )}

      <ThemedText style={styles.slideTitle}>Hero Slide {index + 1}</ThemedText>

      <MediaFields
        keyToStore={`hero_slide_${index}`}
        title=""
        maxFiles={1}
        setValues={(media: any) => {
          let resolvedMedia: any[] = [];

          if (typeof media === "function") {
            const resolved = media();
            if (resolved && resolved[`hero_slide_${index}`]) {
              resolvedMedia = resolved[`hero_slide_${index}`].map(
                (m: any) => m.image || m
              );
            }
          } else if (Array.isArray(media)) {
            resolvedMedia = media;
          } else if (media && media[`hero_slide_${index}`]) {
            resolvedMedia = media[`hero_slide_${index}`].map(
              (m: any) => m.image || m
            );
          }
          handleSelectMedia(index, resolvedMedia);
        }}
        value={item.media ? [item.media] : []}
        addBoxStyle={{
          width: "100%",
          paddingVertical: 40,
          backgroundColor: "#f9fafb",
        }}
        extraText="Recommended size: 1200x600px"
      />

      <ThemedText style={styles.label}>Slide Caption</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter caption"
        value={item.caption}
        onChangeText={(val) => handleInputChange(index, "caption", val)}
      />

      <ThemedText style={styles.label}>Redirect Link (Optional)</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="https://example.com"
        value={item.link}
        onChangeText={(val) => handleInputChange(index, "link", val)}
      />
    </ThemedView>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.headerRow}>
        <ThemedText style={styles.headerText}>Hero Slides</ThemedText>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSaveHeroSlides}
          disabled={updateHeroSlide.isPending}
        >
          {updateHeroSlide.isPending ? (
            <ThemedLoader />
          ) : (
            <ThemedText style={styles.saveBtnText}>Save</ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={heroSlides}
        keyExtractor={(item) => item.key}
        renderItem={renderSlide}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 16 }}
      />

      {heroSlides.length < MAX_SLIDES && (
        <TouchableOpacity style={styles.addSlideBox} onPress={handleAddSlide}>
          <Ionicons name="add" size={28} color="#666" />
          <ThemedText style={styles.addSlideText}>Add Another Slide</ThemedText>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
