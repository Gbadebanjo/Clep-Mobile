"use client";

import { ProductAPI } from "@/apis/product-api";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import CategoryFields from "@/components/Vendor/AddProduct/category-field";
import KeywordField from "@/components/Vendor/AddProduct/keyword-field.tsx";
import MediaFields from "@/components/Vendor/AddProduct/media-fields";
import PreviewDrawer from "@/components/Vendor/AddProduct/preview-drawer";
import SeoFields from "@/components/Vendor/AddProduct/seo-fields";
import StatusFields from "@/components/Vendor/AddProduct/status-fields";
import TagField from "@/components/Vendor/AddProduct/tag-fields";
import VariationManager from "@/components/Vendor/AddProduct/variation-manager";
import { showError, showSuccess } from "@/services/api";
import { useAuthStore } from "@/store";
import { CreateProductForm, Variation } from "@/types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
  useColorScheme
} from "react-native";
import { AddProductsStyles } from "./style";

// --- Helper: debounce function ---
const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const AddProductScreen = () => {
  const productAPI = new ProductAPI();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = Boolean(id);

  const [variations, setVariations] = useState<Variation[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const { user } = useAuthStore();
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = AddProductsStyles(colorScheme);

  // ✅ Default form structure
  const [formData, setFormData] = useState<CreateProductForm>({
    name: "",
    description: "",
    summary: "",
    categories: [{ category: "" }],
    tags: [],
    status: "draft",
    seo: {
      title: "Vazzel product from NIN verify",
      description: "Discover premium products powered by NIN verify on Vazzel.",
      keywords: "Vazzel, Fashion, NIN verify",
    },
    variations: [],
    default_images: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Handle input change
  const handleInputChange = (field: keyof CreateProductForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ✅ Handle functional updates from child components
  const handleSetValues = (update: any) => {
    if (typeof update === "function") {
      setFormData(update);
    } else if (
      typeof update === "object" &&
      update.key &&
      update.value !== undefined
    ) {
      setFormData((prev) => ({ ...prev, [update.key]: update.value }));
    }
  };

  const getFieldProps = (key: keyof CreateProductForm) => formData[key];


  // ✅ Build final data
  const buildPreviewData = (): CreateProductForm => ({
    ...formData,
    variations:
      variations.length > 0
        ? variations
        : [
            {
              id: "default",
              name: "Default",
              price: 0,
              sale_price: 0,
              stock: 1,
              quantity: 0,
              sku: "",
              attributes: [],
              is_visible: true,
              low_stock_threshold: 5,
              image: null,
            },
          ],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isEditing) return;

      try {
        setLoading(true);
        const response = await productAPI.getProductById(id!);
        const product = response.data;

        const normalizedImages = (product.default_images || [])
          .map((img: any) => {
            const imageUrl = img?.image?.url || img?.url;
            if (imageUrl) {
              return {
                image: {
                  id: img?.image?.id || img?.id || Date.now().toString(),
                  url: imageUrl,
                  filename: img?.image?.filename || img?.filename || "",
                  mimeType:
                    img?.image?.mimeType || img?.mimeType || "image/jpeg",
                },
              };
            }
            return null;
          })
          .filter(Boolean);

        // 🧠 Map the response to your form structure
        setFormData({
          name: product.name || "",
          description: product.description || "",
          summary: product.summary || "",
          categories: product.categories || [{ category: "" }],
          tags: product.tags || [],
          status: product.status || "draft",
          seo: {
            title: product.seo?.title || "",
            description: product.seo?.description || "",
            keywords: product.seo?.keywords || "",
          },
          variations: product.variations || [],
          default_images: normalizedImages,
        });

        setVariations(product.variations || []);
      } catch (error) {
        console.error("Failed to load product for editing:", error);
        Alert.alert("Error", "Unable to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // --- Load saved draft ---
  useEffect(() => {
    const loadDraft = async () => {
      try {
        const draft = await AsyncStorage.getItem("product_draft");
        if (draft) {
          setFormData(JSON.parse(draft));
          setDraftLoaded(true);
          showSuccess("ℹ️ Draft Loaded", "Previous product draft restored.");
          // Alert.alert("ℹ️ Draft Loaded", "Previous product draft restored.");
        }
      } catch (error) {
        console.error("Failed to load draft", error);
      }
    };
    loadDraft();
  }, []);

  // --- Auto-save draft every 30s ---
  useEffect(() => {
    if (!formData.name.trim()) return;

    const saveDraft = async () => {
      setIsSaving(true);
      try {
        await AsyncStorage.setItem(
          "product_draft",
          JSON.stringify({ ...formData, status: "draft" })
        );
        setLastSaved(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Failed to save draft", error);
      } finally {
        setIsSaving(false);
      }
    };

    const debouncedSave = debounce(saveDraft, 1000);
    const interval = setInterval(() => debouncedSave(), 30000);

    return () => {
      clearInterval(interval);
      saveDraft();
    };
  }, [formData]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, variations }));
  }, [variations]);

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Product description is required";
    if (!formData.categories[0]?.category)
      newErrors.categories = "At least one category is required";

    setErrors(newErrors);
    return newErrors;
  };

  // ✅ Enhanced handleSaveProduct()
  const handleSaveProduct = async () => {
    const validationErrors = validateForm();

    // 🧠 If there are validation errors, show the first one
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const firstErrorMsg = validationErrors[firstErrorKey];
    showError("Validation Error", firstErrorMsg);
      return;
    }
    try {
      setLoading(true);

      const cleanedData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        summary: formData.summary || formData.description,
        currency: "NGN",
        categories: formData.categories,
        user: user?.id,
        best_seller: false,
        is_featured: false,
        status: formData.status || "draft",

        default_images: (formData.default_images || [])
          .map((img: any) => img.image)
          .filter((i: any) => i?.id && i?.url)
          .map((i: any) => ({
            image: {
              id: i.id,
              url: i.url,
              filename: i.filename || "",
              mimeType: i.mimeType || "image/jpeg",
              createdAt: i.createdAt || "",
              filesize: i.filesize || 0,
            },
          })),

        tags: (formData.tags || []).map((tag: any) => ({
          tag: tag.tag || tag,
        })),

        seo: {
          title: formData.seo?.title || "",
          description: formData.seo?.description || "",
          keywords: formData.seo?.keywords || "",
        },

        variations:
          variations && variations.length > 0
            ? variations.map((v: any) => ({
                id: v.id || `${Date.now()}`,
                name: v.name || formData.name,
                price: Number(v.price) || 0,
                sale_price: Number(v.sale_price) || 0,
                stock: Number(v.stock || 0),
                quantity: Number(v.quantity || 0),
                attributes: v.attributes || [],
                is_visible: true,
                low_stock_threshold: 5,
                sku: v.sku || "",
                image: v.image || null,
              }))
            : [],
      };

      let response;

      if (isEditing) {
        response = await productAPI.updateProduct(id!, cleanedData);
        showSuccess("✅ Success", "Product updated successfully!");
      } else {
        response = await productAPI.createProduct(cleanedData);
        showSuccess("✅ Success", "Product created successfully!");
      }

      // 🧹 Clear form & local draft
      setFormData({
        name: "",
        description: "",
        summary: "",
        categories: [{ category: "" }],
        tags: [],
        status: "draft",
        seo: {
          title: "Vazzel product from NIN verify",
          description:
            "Discover premium products powered by NIN verify on Vazzel.",
          keywords: "Vazzel, Fashion, NIN verify",
        },
        variations: [],
        default_images: [],
      });

      setVariations([]);
      await AsyncStorage.removeItem("product_draft");

      // 🧭 Navigate to product list
      setTimeout(() => {
        router.push("/dashboard/vendor/products");
      }, 500);
    } catch (err: any) {
      console.error("❌ Product save failed:", err);

      // 💬 Show backend validation or API error clearly
      const apiError =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save product.";
        showError(apiError)
      // Alert.alert("Error", apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header title={isEditing ? "Edit Product" : "Add New Product"} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* GENERAL INFO */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.card}>
            <ThemedText style={styles.sectionTitle}>
              General Information
            </ThemedText>

            {/* Product Name */}
            <ThemedView style={styles.formGroup}>
              <ThemedText style={styles.label}>Product Name</ThemedText>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Type product name here..."
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
              />
              {errors.name && (
                <ThemedText style={styles.errorText}>{errors.name}</ThemedText>
              )}
            </ThemedView>

            {/* Description */}
            <ThemedView style={styles.formGroup}>
              <ThemedText style={styles.label}>Description</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  errors.description && styles.inputError,
                ]}
                placeholder="Type product description here..."
                placeholderTextColor="#999"
                value={formData.description}
                onChangeText={(value) =>
                  handleInputChange("description", value)
                }
                multiline
                numberOfLines={4}
              />
              {errors.description && (
                <ThemedText style={styles.errorText}>
                  {errors.description}
                </ThemedText>
              )}
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* CATEGORIES */}
        <CategoryFields
          setValues={setFormData}
          categoryVal={formData.categories}
          error={errors}
        />
        {/* MEDIA */}
        <MediaFields
          keyToStore="default_images"
          title="Product Images"
          maxFiles={5}
          setValues={handleSetValues}
          value={formData.default_images}
        />

        {/* TAGS */}
        <TagField
          tags={formData.tags}
          setValues={setFormData}
          errors={errors}
          getFieldProps={getFieldProps}
        />

        {/* KEYWORDS */}
        <KeywordField value={formData.seo.keywords} setValues={setFormData} />

        {/* STATUS */}
        <StatusFields value={formData.status} setValues={setFormData} />

        {/* SEO */}
        <SeoFields
          values={formData.seo}
          setValues={setFormData}
          errors={errors}
          touched={{}}
        />

        {/* VARIATIONS */}
        <VariationManager
          variations={variations}
          updateVariations={setVariations}
          setValues={setFormData}
          productName={formData.name}
        />

        {/* PREVIEW DRAWER */}
        <PreviewDrawer
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          product={buildPreviewData()}
        />

        {/* ACTION BUTTONS */}
        <ThemedView style={styles.actionButtons}>
          <ThemedView style={styles.previewBtn}>
            <ThemedTouchableOpacity
              style={styles.previewButton}
              onPress={() => setPreviewOpen(true)}
            >
              <ThemedText style={styles.previewButtonText}>
                👁️ Preview
              </ThemedText>
            </ThemedTouchableOpacity>
          </ThemedView>

          <ThemedTouchableOpacity
            style={[styles.createButton, loading && { opacity: 0.8 }]}
            onPress={!loading ? handleSaveProduct : undefined}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
              </>
            ) : (
              <ThemedText style={styles.createButtonText}>
                {isEditing ? "Update Product" : "Create Product"}
              </ThemedText>
            )}
          </ThemedTouchableOpacity>
        </ThemedView>

        <ThemedView style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
};

export default AddProductScreen;
