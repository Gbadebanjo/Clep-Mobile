import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CreateProductForm } from "@/types/product";
import React, { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
    useColorScheme
} from "react-native";
import { PreviewStyles } from "./style";

interface PreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: CreateProductForm;
}



const PreviewDrawer: React.FC<PreviewDrawerProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(price);

  const displayTags =
    product.tags?.filter((tag) => tag.tag.trim() !== "") || [];

    const getFirstImageUrl = (): string => {
        const fallbackImage =
          "https://via.placeholder.com/300x300.png?text=No+Image";
        try {
          if (!product?.default_images?.length) return fallbackImage;
      
          const firstImageObj = product.default_images[0].image;
      
          if (typeof firstImageObj === "string") {
            return firstImageObj.startsWith("http")
              ? firstImageObj
              : fallbackImage;
          }
      
          if (typeof firstImageObj === "object" && firstImageObj?.url) {
            return firstImageObj.url;
          }
      
          return fallbackImage;
        } catch {
          return fallbackImage;
        }
      };
      

  const firstImageUrl = getFirstImageUrl();
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = PreviewStyles(colorScheme);
  return (
    <Modal visible={isOpen} animationType="slide" onRequestClose={onClose}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Product Preview</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeText}>×</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedText style={styles.description}>
          This is how your product will appear to customers
        </ThemedText>

        {/* Tabs */}
        <ThemedView style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("desktop")}
            style={[
              styles.tab,
              activeTab === "desktop" && styles.tabActive,
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === "desktop" && styles.tabTextActive,
              ]}
            >
              Desktop View
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("mobile")}
            style={[
              styles.tab,
              activeTab === "mobile" && styles.tabActive,
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === "mobile" && styles.tabTextActive,
              ]}
            >
              Mobile View
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === "desktop" ? (
            <ThemedView style={styles.desktopView}>
              <ThemedView style={styles.imageSection}>
                <Image
                  source={{ uri: firstImageUrl }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </ThemedView>

              <ThemedView style={styles.detailsSection}>
                <ThemedText style={styles.productName}>
                  {product.name || "Product Name"}
                </ThemedText>

                {/* Tags */}
                <ThemedView style={styles.tagContainer}>
                  {displayTags.map((tag, i) => (
                    <ThemedView key={i} style={styles.badge}>
                      <ThemedText style={styles.badgeText}>{tag.tag}</ThemedText>
                    </ThemedView>
                  ))}
                </ThemedView>

                {/* Price */}
                <ThemedText style={styles.price}>
                  {formatPrice(
                    product?.variations?.[0]?.sale_price > 0
                      ? product.variations[0].sale_price
                      : product?.variations?.[0]?.price || 0
                  )}
                </ThemedText>

                {/* Description */}
                <ThemedView style={styles.section}>
                  <ThemedText style={styles.sectionTitle}>Description</ThemedText>
                  <ThemedText style={styles.sectionText}>
                    {product.description || "No description provided."}
                  </ThemedText>
                </ThemedView>


                {/* Buttons */}
                <ThemedView style={styles.buttonRow}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <ThemedText style={styles.primaryButtonText}>Add to Cart</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <ThemedText style={styles.secondaryButtonText}>Wishlist</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          ) : (
            // Mobile View
            <ThemedView style={styles.mobileView}>
              <Image
                source={{ uri: firstImageUrl }}
                style={styles.mobileImage}
                resizeMode="contain"
              />

              <ThemedText style={styles.mobileName}>
                {product.name || "Product Name"}
              </ThemedText>

              {/* Tags */}
              <ThemedView style={styles.tagContainer}>
                {displayTags.slice(0, 3).map((tag, i) => (
                  <ThemedView key={i} style={styles.badge}>
                    <ThemedText style={styles.badgeText}>{tag.tag}</ThemedText>
                  </ThemedView>
                ))}
                {displayTags.length > 3 && (
                  <ThemedView style={styles.badge}>
                    <ThemedText style={styles.badgeText}>
                      +{displayTags.length - 3} more
                    </ThemedText>
                  </ThemedView>
                )}
              </ThemedView>

              <ThemedText style={styles.mobilePrice}>
                {formatPrice(
                  product?.variations?.[0]?.sale_price > 0
                    ? product.variations[0].sale_price
                    : product?.variations?.[0]?.price || 0
                )}
              </ThemedText>

              <ThemedText style={styles.mobileDesc} numberOfLines={3}>
                {product.description || "No description provided."}
              </ThemedText>

              <ThemedView style={styles.buttonRow}>
                <TouchableOpacity style={styles.primaryButtonSmall}>
                  <ThemedText style={styles.primaryButtonText}>Add to Cart</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButtonSmall}>
                  <ThemedText style={styles.secondaryButtonText}>Wishlist</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          )}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};

export default PreviewDrawer;


