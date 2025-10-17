import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  useColorScheme,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
  Heart,
  Star,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  ShoppingBag,
  Filter,
  Grid3X3,
  List as ListIcon,
} from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

// Import your actual APIs
import { StoreAPI } from "@/apis/store-api";
import { ProductAPI } from "@/apis/product-api";
import { StoreCategoryAPI } from "@/apis/store-category-api";
import { VendorFollowAPI } from "@/apis/vendor-follow-api";
import { useAuthStore } from "@/store";

const { width } = Dimensions.get("window");

interface Product {
  id: string;
  name: string;
  description: string;
  base_price?: number;
  base_sale_price?: number;
  price?: number;
  is_on_sale?: boolean;
  is_featured?: boolean;
  best_seller?: boolean;
  rating?: number;
  average_rating?: number;
  currency?: string;
  default_images?: Array<{ image: { url: string; id: string } }>;
  images?: Array<{ url: string }>;
  createdAt: string;
}

interface Store {
  id: string;
  storeNumber: string;
  storeName: string;
  description?: string;
  branding?: { logo?: { url: string } };
  vendor?: any;
  contact?: {
    email: string;
    phone: string;
    address?: { country: string };
  };
  hero_slides?: any[];
  analytics?: { views: number; orders: number };
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  image?: { url: string };
}

// Product Card Component
const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => {
  const productImages = useMemo(() => {
    if (product?.default_images?.length > 0) {
      return product.default_images.map((img) => img.image?.url || "");
    } else if (product?.images?.length > 0) {
      return product.images.map((img) => img.url || "");
    }
    return ["https://via.placeholder.com/200x200?text=No+Image"];
  }, [product]);

  const getCurrencySymbol = (code?: string) => {
    switch (code) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "NGN":
        return "₦";
      default:
        return "$";
    }
  };

  const price = product?.is_on_sale
    ? product?.base_sale_price
    : product?.base_price || product?.price;
  const originalPrice = product?.base_price || product?.price;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
      }}
    >
      {/* Product Image */}
      <Image
        source={{ uri: productImages[0] }}
        style={{ width: "100%", height: 180, backgroundColor: "#f3f4f6" }}
      />

      {/* Sale Badge */}
      {product.is_on_sale && (
        <View
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "#ef4444",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            zIndex: 1,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 11, fontWeight: "600" }}>
            SALE
          </Text>
        </View>
      )}

      {/* Product Info */}
      <View style={{ padding: 12 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 4,
            color: "#1f2937",
          }}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        {/* Rating */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <Text style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
            {product.rating || product.average_rating || "4.5"}
          </Text>
        </View>

        {/* Price */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#9f0e42" }}>
            {getCurrencySymbol(product.currency)}
            {price?.toFixed(0)}
          </Text>
          {product.is_on_sale && originalPrice && (
            <Text
              style={{
                fontSize: 12,
                color: "#6b7280",
                textDecorationLine: "line-through",
                marginLeft: 8,
              }}
            >
              {getCurrencySymbol(product.currency)}
              {originalPrice.toFixed(0)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Category Card Component
const CategoryCard = ({ category, onPress }: { category: Category; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      marginRight: 12,
      marginVertical: 8,
      borderRadius: 8,
      overflow: "hidden",
      width: (width - 48) / 3,
      height: 120,
    }}
  >
    <Image
      source={{
        uri: category.image?.url || "https://via.placeholder.com/120x120?text=Category",
      }}
      style={{ width: "100%", height: "100%", backgroundColor: "#e5e7eb" }}
    />
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 8,
        justifyContent: "flex-end",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }} numberOfLines={1}>
        {category.name}
      </Text>
    </View>
  </TouchableOpacity>
);

// Store Header Component
const StoreHeader = ({
  store,
  isFollowed,
  onFollowPress,
  isFollowLoading,
}: {
  store: Store;
  isFollowed: boolean;
  onFollowPress: () => void;
  isFollowLoading: boolean;
}) => (
  <View style={{ backgroundColor: "#fff", paddingBottom: 16 }}>
    {/* Hero Image */}
    {store?.hero_slides?.[0]?.slide?.url && (
      <Image
        source={{ uri: store.hero_slides[0].slide.url }}
        style={{ width: "100%", height: 200, backgroundColor: "#e5e7eb" }}
      />
    )}

    {/* Store Info */}
    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        {/* Store Logo */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: store?.branding?.logo?.url ? "#fff" : "#9f0e42",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
            overflow: "hidden",
          }}
        >
          {store?.branding?.logo?.url ? (
            <Image
              source={{ uri: store.branding.logo.url }}
              style={{ width: 48, height: 48 }}
            />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              {store?.storeName?.charAt(0)?.toUpperCase() || "S"}
            </Text>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#1f2937" }}>
            {store?.storeName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                color={star <= 4 ? "#fbbf24" : "#d1d5db"}
                fill={star <= 4 ? "#fbbf24" : "none"}
              />
            ))}
            <Text style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
              4.8 ({store?.analytics?.views || 0} views)
            </Text>
          </View>
        </View>
      </View>

      {/* Follow Button */}
      <TouchableOpacity
        onPress={onFollowPress}
        disabled={isFollowLoading}
        style={{
          backgroundColor: isFollowed ? "#f3f4f6" : "#9f0e42",
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isFollowLoading ? (
          <ActivityIndicator size="small" color={isFollowed ? "#6b7280" : "#fff"} />
        ) : (
          <>
            <Heart
              size={16}
              color={isFollowed ? "#9f0e42" : "#fff"}
              fill={isFollowed ? "#9f0e42" : "none"}
            />
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "600",
                color: isFollowed ? "#9f0e42" : "#fff",
              }}
            >
              {isFollowed ? "Following" : "Follow Store"}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Contact Info */}
      {store?.contact && (
        <View style={{ marginTop: 12, gap: 8 }}>
          {store.contact.email && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Mail size={14} color="#6b7280" />
              <Text style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>
                {store.contact.email}
              </Text>
            </View>
          )}
          {store.contact.phone && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Phone size={14} color="#6b7280" />
              <Text style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>
                {store.contact.phone}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  </View>
);

// Main StoreFront Component
export default function StoreFront() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isFollowed, setIsFollowed] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const storeAPI = new StoreAPI();
  const productAPI = new ProductAPI();
  const storeCatAPI = new StoreCategoryAPI();
  const vendorFollowAPI = new VendorFollowAPI();

  const loadData = useCallback(
    async (refresh = false) => {
      if (refresh) setRefreshing(true);
      try {
        // Fetch store data
        const storeRes = await storeAPI.getStoreById(id as string);
        setStore(storeRes.data);

        // Fetch categories
        const catRes = await storeCatAPI.getCategories({
          where: { "store.storeNumber": { equals: id } },
        });
        setCategories(catRes.data.docs || []);

        // Fetch products
        const prodRes = await productAPI.getProducts({
          where: {
            store: { equals: storeRes.data.id },
            status: { equals: "published" },
          },
          limit: 50,
        });
        setProducts(prodRes.data.docs || []);

        // Check follow status
        if (isAuthenticated && storeRes.data?.vendor?.user) {
          try {
            const followsRes = await vendorFollowAPI.getFollows();
            const followed = followsRes.docs?.some(
              (f: any) => f.vendor.id === storeRes.data.vendor.user.id
            );
            setIsFollowed(followed || false);
          } catch (error) {
            // Continue even if follow check fails
          }
        }
      } catch (err: any) {
        Toast.show({
          type: "error",
          text1: "Failed to load store",
          text2: err?.message || "Please try again",
        });
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id, isAuthenticated]
  );

  useEffect(() => {
    loadData();
  }, [id, loadData]);

  const handleFollowPress = async () => {
    if (!isAuthenticated) {
      router.push({
        pathname: "/login",
        params: { redirect: `/vendor-store/${id}` },
      });
      return;
    }

    setIsFollowLoading(true);
    try {
      await vendorFollowAPI.toggleFollow(store?.vendor?.user);
      setIsFollowed(!isFollowed);
      Toast.show({
        type: "success",
        text1: isFollowed ? "Unfollowed" : "Followed",
        text2: `Store ${isFollowed ? "unfollowed" : "followed"} successfully`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not update follow status",
      });
    } finally {
      setIsFollowLoading(false);
    }
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => (a.base_price || a.price || 0) - (b.base_price || b.price || 0));
        break;
      case "price-high":
        sorted.sort((a, b) => (b.base_price || b.price || 0) - (a.base_price || a.price || 0));
        break;
      case "rating":
        sorted.sort(
          (a, b) =>
            (b.average_rating || b.rating || 0) - (a.average_rating || a.rating || 0)
        );
        break;
      default:
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return sorted;
  }, [products, sortBy]);

  if (loading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top,
        }}
      >
        <ActivityIndicator size="large" color="#9f0e42" />
      </ThemedView>
    );
  }

  if (!store) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top,
        }}
      >
        <ShoppingBag size={48} color="#d1d5db" />
        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 12, color: "#374151" }}>
          Store not found
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 16, paddingHorizontal: 16, paddingVertical: 8 }}
        >
          <Text style={{ color: "#9f0e42", fontWeight: "600" }}>Go Back</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#000" : "#f9fafb",
        paddingTop: insets.top,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadData(true)}
            tintColor="#9f0e42"
          />
        }
      >
        {/* Store Header */}
        <StoreHeader
          store={store}
          isFollowed={isFollowed}
          onFollowPress={handleFollowPress}
          isFollowLoading={isFollowLoading}
        />

        {/* Categories Section */}
        {categories.length > 0 && (
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#1f2937" }}>
              Categories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            >
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onPress={() =>
                    router.push(`/product-category/${store.storeNumber}/${category.id}`)
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Sort Options */}
        <View style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#6b7280" }}>
            Sort by:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ gap: 8 }}
          >
            {[
              { label: "Newest", value: "newest" },
              { label: "Price: Low", value: "price-low" },
              { label: "Price: High", value: "price-high" },
              { label: "Rating", value: "rating" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setSortBy(option.value)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: sortBy === option.value ? "#9f0e42" : "#e5e7eb",
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    color: sortBy === option.value ? "#fff" : "#6b7280",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Section */}
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#1f2937", paddingHorizontal: 8 }}>
            Products
          </Text>
          {sortedProducts.length > 0 ? (
            <FlatList
              data={sortedProducts}
              numColumns={2}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  onPress={() => router.push(`/product-details/${item.id}`)}
                />
              )}
            />
          ) : (
            <View style={{ alignItems: "center", paddingVertical: 32 }}>
              <ShoppingBag size={48} color="#d1d5db" />
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 12, color: "#374151" }}>
                No products available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Toast />
    </ThemedView>
  );
}