"use client"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import { CheckCircleIcon, ChevronDown, ChevronUp, Heart, Mail, Phone, ShoppingBag, Sliders, Star, TrendingUp } from "lucide-react-native"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

// Import your actual APIs
import { ProductAPI } from "@/apis/product-api"
import { StoreAPI } from "@/apis/store-api"
import { StoreCategoryAPI } from "@/apis/store-category-api"
import { VendorFollowAPI } from "@/apis/vendor-follow-api"
import CustomHeader from "@/components/Header"
import { useAuthStore } from "@/store"
import { Feather, Ionicons } from "@expo/vector-icons"
import { VendorStyles } from "./styles"

const { width } = Dimensions.get("window")

interface Product {
  id: string
  name: string
  description: string
  base_price?: number
  base_sale_price?: number
  price?: number
  is_on_sale?: boolean
  is_featured?: boolean
  best_seller?: boolean
  rating?: number
  average_rating?: number
  currency?: string
  default_images?: Array<{ image: { url: string; id: string } }>
  images?: Array<{ url: string }>
  createdAt: string
}

interface Store {
  id: string
  storeNumber: string
  storeName: string
  description?: string
  branding?: { logo?: { url: string } }
  vendor?: any
  contact?: {
    email: string
    phone: string
    address?: { country: string }
  }
  hero_slides?: any[]
  analytics?: { views: number; orders: number }
  createdAt: string
}

interface Category {
  id: string
  name: string
  image?: { url: string }
}
interface Filters {
  minPrice: string
  maxPrice: string
  minRating: number
  saleOnly: boolean
  availability: {
    inStock: boolean
    onSale: boolean
    featured: boolean
    newArrivals: boolean
  }
}

// Product Card Component
const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => {
  const productImages = useMemo(() => {
    if (product?.default_images?.length > 0) {
      return product.default_images.map((img) => img.image?.url || "")
    } else if (product?.images?.length > 0) {
      return product.images.map((img) => img.url || "")
    }
    return ["https://via.placeholder.com/200x200?text=No+Image"]
  }, [product])

  const getCurrencySymbol = (code?: string) => {
    switch (code) {
      case "USD":
        return "$"
      case "EUR":
        return "€"
      case "NGN":
        return "₦"
      default:
        return "$"
    }
  }

  const price = product?.is_on_sale ? product?.base_sale_price : product?.base_price || product?.price
  const originalPrice = product?.base_price || product?.price

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
      <Image source={{ uri: productImages[0] }} style={{ width: "100%", height: 180, backgroundColor: "#f3f4f6" }} />

      {/* Sale Badge */}
      {product.is_on_sale && (
        <ThemedView
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
          <ThemedText style={{ color: "#fff", fontSize: 11, fontWeight: "600" }}>SALE</ThemedText>
        </ThemedView>
      )}

      {/* Product Info */}
      <ThemedView style={{ padding: 12 }}>
        <ThemedText
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 4,
            color: "#1f2937",
          }}
          numberOfLines={1}
        >
          {product.name}
        </ThemedText>

        {/* Rating */}
        <ThemedView style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <ThemedText style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
            {product.rating || product.average_rating || "4.5"}
          </ThemedText>
        </ThemedView>

        {/* Price */}
        <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText style={{ fontSize: 16, fontWeight: "700", color: "#9f0e42" }}>
            {getCurrencySymbol(product.currency)}
            {price?.toFixed(0)}
          </ThemedText>
          {product.is_on_sale && originalPrice && (
            <ThemedText
              style={{
                fontSize: 12,
                color: "#6b7280",
                textDecorationLine: "line-through",
                marginLeft: 8,
              }}
            >
              {getCurrencySymbol(product.currency)}
              {originalPrice.toFixed(0)}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  )
}

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
    <ThemedView
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
      <ThemedText style={{ color: "#fff", fontSize: 12, fontWeight: "600" }} numberOfLines={1}>
        {category.name}
      </ThemedText>
    </ThemedView>
  </TouchableOpacity>
)

// Store Header Component
const StoreHeader = ({
  store,
  isFollowed,
  onFollowPress,
  isFollowLoading,
  isOwnStore,
}: {
  store: Store
  isFollowed: boolean
  onFollowPress: () => void
  isFollowLoading: boolean
  isOwnStore: boolean
}) => (
  <ThemedView style={{ backgroundColor: "#fff"}}>
    {/* Hero Image */}
    {store?.hero_slides?.[0]?.slide?.url ? (
      <Image
        source={{ uri: store.hero_slides[0].slide.url }}
        style={{ width: "100%", height: 130, backgroundColor: "#e5e7eb" }}
      />
    ) : (
      <Image
        source={require("@/assets/images/product-cloth.png")}
        style={{ width: "100%", height: 130, backgroundColor: "#e5e7eb" }}
      />
    )}

    {/* Store Info */}
    <ThemedView style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <ThemedView style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        {/* Store Logo */}
        <ThemedView
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
            <Image source={{ uri: store.branding.logo.url }} style={{ width: 48, height: 48 }} />
          ) : (
            <ThemedText style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              {store?.storeName?.charAt(0)?.toUpperCase() || "S"}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedView style={{ flex: 1 }}>
          <ThemedText style={{ fontSize: 16, fontWeight: "700", color: "#1f2937" }}>{store?.storeName}</ThemedText>
          <ThemedView style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                color={star <= 4 ? "#fbbf24" : "#d1d5db"}
                fill={star <= 4 ? "#fbbf24" : "none"}
              />
            ))}
            <ThemedText style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
              4.8 ({store?.analytics?.views || 0} views)
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {!isOwnStore && (
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
              <Heart size={16} color={isFollowed ? "#9f0e42" : "#fff"} fill={isFollowed ? "#9f0e42" : "none"} />
              <ThemedText
                style={{
                  marginLeft: 8,
                  fontWeight: "600",
                  color: isFollowed ? "#9f0e42" : "#fff",
                }}
              >
                {isFollowed ? "Following" : "Follow Store"}
              </ThemedText>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Contact Info */}
      {store?.contact && (
        <ThemedView style={{ marginTop: 12, gap: 8 }}>
          {store.contact.email && (
            <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
              <Mail size={14} color="#6b7280" />
              <ThemedText style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>{store.contact.email}</ThemedText>
            </ThemedView>
          )}
          {store.contact.phone && (
            <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
              <Phone size={14} color="#6b7280" />
              <ThemedText style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>{store.contact.phone}</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      )}
    </ThemedView>
  </ThemedView>
)


const SubHeader = ({
  activeSection,
  onSectionPress,
  sections,
}: {
  activeSection: string
  onSectionPress: (section: string) => void
  sections: Array<{ label: string; value: string }>
}) => (
  <ThemedView
    style={{
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      // paddingVertical: 8,
      zIndex: 10,
    }}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
      {sections.map((section) => (
        <TouchableOpacity
          key={section.value}
          onPress={() => onSectionPress(section.value)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderBottomWidth: activeSection === section.value ? 2 : 0,
            borderBottomColor: activeSection === section.value ? "#9f0e42" : "transparent",
          }}
        >
          <ThemedText
            style={{
              fontSize: 12,
              fontWeight: activeSection === section.value ? "700" : "500",
              color: activeSection === section.value ? "#9f0e42" : "#6b7280",
              whiteSpace: "nowrap",
            }}
          >
            {section.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </ThemedView>
)

// Main StoreFront Component
export default function StoreFront() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { isAuthenticated } = useAuthStore()
  const { user } = useAuthStore()
  const storeId = user?.store?.id
  const colorScheme = useColorScheme() as "light" | "dark"
  const styles = VendorStyles(colorScheme)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [store, setStore] = useState<Store | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [isFollowed, setIsFollowed] = useState(false)
  const [isFollowLoading, setIsFollowLoading] = useState(false)
  // Active section state for sub-header navigation
  const [activeSection, setActiveSection] = useState("special-offers")
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    minPrice: "",
    maxPrice: "",
    minRating: 0,
    saleOnly: false,
    availability: {
      inStock: false,
      onSale: false,
      featured: false,
      newArrivals: false,
    },
  })
  const [tempFilters, setTempFilters] = useState<Filters>(filters)

  const toggleViewType = () => setViewType((prev) => (prev === "grid" ? "list" : "grid"))
  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low", value: "price-low" },
    { label: "Price: High", value: "price-high" },
    { label: "Rating", value: "rating" },
  ]

  const [sortMenuVisible, setSortMenuVisible] = useState(false)

  const horizontalScrollRef = useRef<ScrollView>(null)
  const sectionOffsetsRef = useRef<{ [key: string]: number }>({})
  const isScrollingRef = useRef(false)
  const lastScrollXRef = useRef(0)

  const storeAPI = new StoreAPI()
  const productAPI = new ProductAPI()
  const storeCatAPI = new StoreCategoryAPI()
  const vendorFollowAPI = new VendorFollowAPI()

  const sections = [
    { label: "Cat", value: "special-offers" },
    { label: "New", value: "new-arrivals" },
    { label: "All", value: "exclusive" },
    { label: "Hot", value: "products" },
  ]

  const loadData = useCallback(
    async (refresh = false) => {
      if (refresh) setRefreshing(true)
      try {
        // Fetch store data
        const storeRes = await storeAPI.getStoreById(id as string)
        setStore(storeRes.data)

        // Fetch categories
        const catRes = await storeCatAPI.getCategories({
          where: { "store.storeNumber": { equals: id } },
        })
        setCategories(catRes.data.docs || [])

        // Fetch products
        const prodRes = await productAPI.getProducts({
          where: {
            store: { equals: storeRes.data.id },
            status: { equals: "published" },
          },
          limit: 50,
        })
        setProducts(prodRes.data.docs || [])

        // Check follow status
        if (isAuthenticated && storeRes.data?.vendor?.user) {
          try {
            const followsRes = await vendorFollowAPI.getFollows()
            const followed = followsRes.docs?.some((f: any) => f.vendor.id === storeRes.data.vendor.user.id)
            setIsFollowed(followed || false)
          } catch (error) {
            // Continue even if follow check fails
          }
        }
      } catch (err: any) {
        Toast.show({
          type: "error",
          text1: "Failed to load store",
          text2: err?.message || "Please try again",
        })
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [id, isAuthenticated],
  )

  useEffect(() => {
    loadData()
  }, [id, loadData])

  const handleFollowPress = async () => {
    if (!isAuthenticated) {
      router.push({
        pathname: "/login",
        params: { redirect: `/vendor-store/${id}` },
      })
      return
    }

    setIsFollowLoading(true)
    try {
      await vendorFollowAPI.toggleFollow(store?.vendor?.user)
      setIsFollowed(!isFollowed)
      Toast.show({
        type: "success",
        text1: isFollowed ? "Unfollowed" : "Followed",
        text2: `Store ${isFollowed ? "unfollowed" : "followed"} successfully`,
      })
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not update follow status",
      })
    } finally {
      setIsFollowLoading(false)
    }
  }

  const applyFilters = () => {
    setFilters(tempFilters)
    setFilterModalVisible(false)
  }

  const resetFilters = () => {
    const defaultFilters: Filters = {
      minPrice: "",
      maxPrice: "",
      minRating: 0,
      saleOnly: false,
      availability: {
        inStock: false,
        onSale: false,
        featured: false,
        newArrivals: false,
      },
    }
    setTempFilters(defaultFilters)
    setFilters(defaultFilters)
    setFilterModalVisible(false)
  }

  // Sort and filter products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Apply filters
    result = result.filter((product) => {
      const price = product?.is_on_sale ? product?.base_sale_price : product?.base_price || product?.price || 0
      const minPrice = filters.minPrice ? Number.parseFloat(filters.minPrice) : 0
      const maxPrice = filters.maxPrice ? Number.parseFloat(filters.maxPrice) : Number.POSITIVE_INFINITY

      if (price < minPrice || price > maxPrice) return false

      const rating = product.average_rating || product.rating || 0
      if (rating < filters.minRating) return false

      if (filters.saleOnly && !product.is_on_sale) return false

      if (filters.availability.inStock && !product.base_price) return false // Assuming base_price being present means in stock
      if (filters.availability.onSale && !product.is_on_sale) return false
      if (filters.availability.featured && !product.is_featured) return false
      if (filters.availability.newArrivals) {
        const daysSinceCreation = (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceCreation > 30) return false
      }

      return true
    })

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.base_price || a.price || 0) - (b.base_price || b.price || 0))
        break
      case "price-high":
        result.sort((a, b) => (b.base_price || b.price || 0) - (a.base_price || a.price || 0))
        break
      case "rating":
        result.sort((a, b) => (b.average_rating || b.rating || 0) - (a.average_rating || a.rating || 0))
        break
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    return result
  }, [products, sortBy, filters])

  const handleHorizontalScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const screenWidth = Dimensions.get("window").width

    const sectionIndex = Math.round(contentOffsetX / screenWidth)
    const newActiveSection = sections[Math.min(sectionIndex, sections.length - 1)]?.value

    if (newActiveSection && newActiveSection !== activeSection) {
      setActiveSection(newActiveSection)
    }

    lastScrollXRef.current = contentOffsetX
  }

  const handleMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const screenWidth = Dimensions.get("window").width

    const sectionIndex = Math.round(contentOffsetX / screenWidth)
    const targetX = sectionIndex * screenWidth

    if (Math.abs(contentOffsetX - targetX) > 10) {
      horizontalScrollRef.current?.scrollTo({
        x: targetX,
        animated: true,
      })
    }
  }

  const handleSectionPress = (section: string) => {
    const sectionIndex = sections.findIndex((s) => s.value === section)
    if (sectionIndex !== -1) {
      const screenWidth = Dimensions.get("window").width
      horizontalScrollRef.current?.scrollTo({
        x: sectionIndex * screenWidth,
        animated: true,
      })
      setActiveSection(section)
    }
  }

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
    )
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
        <ThemedText style={{ fontSize: 16, fontWeight: "600", marginTop: 12, color: "#374151" }}>Store not found</ThemedText>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 16, paddingHorizontal: 16, paddingVertical: 8 }}
        >
          <ThemedText style={{ color: "#9f0e42", fontWeight: "600" }}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    )
  }

  return (
    <>
      <ThemedView style={{ paddingTop: "7%", backgroundColor: "#fff" }}></ThemedView>
      <CustomHeader title="My Font Store" />

      <ThemedView
        style={{
          flex: 1,
          backgroundColor: colorScheme === "dark" ? "#000" : "#f9fafb",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => loadData(true)} tintColor="#9f0e42" />
          }
          stickyHeaderIndices={[1]}
        >
          {/* Store Header */}
          <StoreHeader
            store={store}
            isFollowed={isFollowed}
            onFollowPress={handleFollowPress}
            isFollowLoading={isFollowLoading}
            isOwnStore={String(id) === String(storeId)}
          />

          {store && <SubHeader activeSection={activeSection} onSectionPress={handleSectionPress} sections={sections} />}

          <ThemedView style={{ flex: 1, width: "100%" }}>
            <ScrollView
              ref={horizontalScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={handleHorizontalScroll}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              onScrollBeginDrag={() => {
                isScrollingRef.current = true
              }}
              onScrollEndDrag={() => {
                isScrollingRef.current = false
              }}
              decelerationRate="fast"
              style={{ flex: 1 }}
            >
              {/* Special Offers Section */}
              <ThemedView style={{ width: Dimensions.get("window").width, paddingVertical: 20 }}>
                <LinearGradient
                  colors={["#3B82F6", "#9333EA"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{
                    alignItems: "center",
                    paddingVertical: 202,
                    borderRadius: 10,
                    margin: 20,
                    justifyContent: "center",
                  }}
                >
                  <ThemedText style={{ fontSize: 20, fontWeight: "700", marginTop: 12, color: "#fff" }}>
                    Special Offers
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 12,
                      color: "#fff",
                      paddingHorizontal: 25,
                      justifyContent: "center",
                      alignContent: "center",
                      textAlign: "center",
                    }}
                  >
                    Discover amazing deals on our featured products
                  </ThemedText>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 20,
                      marginTop: 15,
                    }}
                  >
                    <ThemedText style={{ color: "#2563EB" }}>Shop Now</ThemedText>
                  </TouchableOpacity>
                </LinearGradient>
              </ThemedView>

              {/* New Arrivals Section */}
              <ThemedView style={{ width: Dimensions.get("window").width, paddingVertical: 20 }}>
                <LinearGradient
                  colors={["#22C55E", "#0D9488"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    alignItems: "center",
                    paddingVertical: 52,
                    borderRadius: 10,
                    margin: 20,
                    justifyContent: "center",
                  }}
                >
                  <ThemedText style={{ fontSize: 20, fontWeight: "700", marginTop: 12, color: "#fff" }}>
                    New Arrivals
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 12,
                      color: "#fff",
                      paddingHorizontal: 25,
                      justifyContent: "center",
                      alignContent: "center",
                      textAlign: "center",
                    }}
                  >
                    Check out our latest collection
                  </ThemedText>
                </LinearGradient>
              </ThemedView>

              {/* Exclusive Section */}
              <ThemedView style={{ width: Dimensions.get("window").width, paddingHorizontal: 16, paddingVertical: 20 }}>
                {/* Categories Section */}
                {categories.length > 0 ? (
                  <ThemedView style={{ marginBottom: 16 }}>
                    <ThemedText style={{ fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#1f2937" }}>
                      Categories
                    </ThemedText>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true}>
                      {categories.map((category) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          onPress={() => router.push(`/product-category/${store.storeNumber}/${category.id}`)}
                        />
                      ))}
                    </ScrollView>
                  </ThemedView>
                ) : (
                  <ThemedText style={{ textAlign: "center", paddingVertical: 20 }}>
                    No recent products available
                  </ThemedText>
                )}

                <LinearGradient
                  colors={["#9333EA", "#EC4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    alignItems: "center",
                    paddingVertical: 32,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <ThemedText style={{ fontSize: 20, fontWeight: "700", marginTop: 12, color: "#fff" }}>
                    Exclusive Collection
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      marginTop: 12,
                      color: "#fff",
                      paddingHorizontal: 25,
                      justifyContent: "center",
                      alignContent: "center",
                      textAlign: "center",
                    }}
                  >
                    Discover premium quality products curated just for you
                  </ThemedText>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 20,
                      marginTop: 15,
                    }}
                  >
                    <ThemedText style={{ color: "#9333EA" }}>Explore Now</ThemedText>
                  </TouchableOpacity>
                </LinearGradient>
              </ThemedView>

              {/* Products Section */}
              <ThemedView style={{ width: Dimensions.get("window").width, paddingHorizontal: 20, paddingVertical: 16 }}>
                {/* Sort and Filter Options */}
                <ThemedView style={{ marginBottom: 8, flexDirection: "row", alignItems: "center", gap: 6 }}>
                  {/* Sort by */}
                  <ThemedText style={{fontWeight:"700"}}>Sort by:</ThemedText>
                  <ThemedView style={{ position: "relative", flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => setSortMenuVisible(true)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#f3f4f6",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 8,
                        borderWidth:1,
                        borderColor:"#f5ccda"
                      }}
                    >
                      <ThemedText style={{ fontSize: 14, color: "#374151", fontWeight: "500" }}>
                        {sortOptions.find((opt) => opt.value === sortBy)?.label || "Sort by"}
                      </ThemedText>
                      {sortMenuVisible ? (
                        <ChevronUp size={16} color="#6b7280" />
                      ) : (
                        <ChevronDown size={16} color="#6b7280" />
                      )}
                    </TouchableOpacity>

                    <Modal transparent visible={sortMenuVisible} animationType="fade">
                      <TouchableOpacity
                        onPress={() => setSortMenuVisible(false)}
                        style={{
                          flex: 1,
                          backgroundColor: "rgba(0,0,0,0.3)",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ThemedView
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            width: "80%",
                            paddingVertical: 10,
                            shadowColor: "#000",
                            shadowOpacity: 0.15,
                            shadowRadius: 5,
                            elevation: 5,
                          }}
                        >
                          <FlatList
                            data={sortOptions}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                onPress={() => {
                                  setSortBy(item.value)
                                  setSortMenuVisible(false)
                                }}
                                style={{
                                  paddingVertical: 12,
                                  paddingHorizontal: 20,
                                  backgroundColor: sortBy === item.value ? "#fce7f3" : "#fff",
                                }}
                              >
                                <ThemedText
                                  style={{
                                    fontSize: 14,
                                    fontWeight: sortBy === item.value ? "600" : "400",
                                    color: sortBy === item.value ? "#9f0e42" : "#374151",
                                  }}
                                >
                                  {item.label}
                                </ThemedText>
                              </TouchableOpacity>
                            )}
                          />
                        </ThemedView>
                      </TouchableOpacity>
                    </Modal>
                  </ThemedView>

                  <TouchableOpacity
                    onPress={() => {
                      setTempFilters(filters)
                      setFilterModalVisible(true)
                    }}
                    style={{
                      backgroundColor: "#f3f4f6",
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                        borderWidth:1,
                        borderColor:"#f5ccda"
                    }}
                  >
                    <Sliders size={16} color="#374151" />
                    <ThemedText style={{ fontSize: 14, color: "#374151", fontWeight: "500" }}>Filter</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
                <Modal transparent visible={filterModalVisible} animationType="slide">
                  <ThemedView
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ThemedView
                      style={{
                        backgroundColor: "#fff",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        paddingBottom: 30,
                        maxHeight: "80%",
                      }}
                    >
                      <ThemedView
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                      >
                        <ThemedText style={{ fontSize: 18, fontWeight: "700", color: "#1f2937" }}>Filters</ThemedText>
                        <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                          <ThemedText style={{ fontSize: 24, color: "#6b7280" }}>✕</ThemedText>
                        </TouchableOpacity>
                      </ThemedView>

                      <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Price Range Filter */}
                        <ThemedView style={{ marginBottom: 14 }}>
                          <ThemedText style={{ fontSize: 14, fontWeight: "600", color: "#1f2937", marginBottom: 12 }}>
                            Price Range
                          </ThemedText>
                          <ThemedView style={{ flexDirection: "row", gap: 12 }}>
                            <ThemedView style={{ flex: 1 }}>
                              <ThemedText style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Min Price</ThemedText>
                              <TextInput
                                placeholder="0"
                                value={tempFilters.minPrice}
                                onChangeText={(text) => setTempFilters({ ...tempFilters, minPrice: text })}
                                keyboardType="decimal-pad"
                                style={{
                                  borderWidth: 1,
                                  borderColor: "#e5e7eb",
                                  borderRadius: 8,
                                  paddingHorizontal: 12,
                                  paddingVertical: 10,
                                  fontSize: 14,
                                  color: "#1f2937",
                                }}
                              />
                            </ThemedView>
                            <ThemedView style={{ flex: 1 }}>
                              <ThemedText style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Max Price</ThemedText>
                              <TextInput
                                placeholder="999999"
                                value={tempFilters.maxPrice}
                                onChangeText={(text) => setTempFilters({ ...tempFilters, maxPrice: text })}
                                keyboardType="decimal-pad"
                                style={{
                                  borderWidth: 1,
                                  borderColor: "#e5e7eb",
                                  borderRadius: 8,
                                  paddingHorizontal: 12,
                                  paddingVertical: 10,
                                  fontSize: 14,
                                  color: "#1f2937",
                                }}
                              />
                            </ThemedView>
                          </ThemedView>
                        </ThemedView>

                        <ThemedView style={{ flexDirection: "row", gap: 20, marginBottom: 24 }}>
                          {/* Rating Section - Left Column */}
                          <ThemedView style={{ flex: 1 }}>
                            <ThemedView style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                              <Ionicons name="star-outline" size={18} color="#a21749" fill="#fbbf24" />
                              <ThemedText style={{ fontSize: 14, fontWeight: "600", color: "#1f2937", marginLeft: 6 }}>
                                Rating
                              </ThemedText>
                            </ThemedView>

                            {[5, 4, 3, 2, 1].map((rating) => (
                              <TouchableOpacity
                                key={rating}
                                onPress={() => setTempFilters({ ...tempFilters, minRating: rating })}
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  paddingVertical: 8,
                                  paddingHorizontal: 0,
                                }}
                              >
                                <ThemedView
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 4,
                                    borderWidth: 2,
                                    borderColor: tempFilters.minRating === rating ? "#9f0e42" : "#e5e7eb",
                                    backgroundColor: tempFilters.minRating === rating ? "#9f0e42" : "#fff",
                                    marginRight: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {tempFilters.minRating === rating && (
                                    <ThemedText style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>✓</ThemedText>
                                  )}
                                </ThemedView>
                                <ThemedView style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                  {[...Array(rating)].map((_, i) => (
                                    <Star key={i} size={14} color="#fbbf24" fill="#fbbf24" />
                                  ))}
                                  {[...Array(5 - rating)].map((_, i) => (
                                    <Star key={`empty-${i}`} size={14} color="#d1d5db" fill="none" />
                                  ))}
                                </ThemedView>
                                <ThemedText style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>{`& Up`}</ThemedText>
                              </TouchableOpacity>
                            ))}
                          </ThemedView>

                          {/* Availability Section - Right Column */}
                          <ThemedView style={{ flex: 1 }}>
                         
                               <ThemedView style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                              <CheckCircleIcon size={18} color="#a21749"  />
                              <ThemedText style={{ fontSize: 14, fontWeight: "600", color: "#1f2937", marginLeft: 6 }}>
                              Availability
                              </ThemedText>
                            </ThemedView>

                            {/* In Stock */}
                            <TouchableOpacity
                              onPress={() =>
                                setTempFilters({
                                  ...tempFilters,
                                  availability: {
                                    ...tempFilters.availability,
                                    inStock: !tempFilters.availability.inStock,
                                  },
                                })
                              }
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 8,
                                paddingHorizontal: 0,
                              }}
                            >
                              <ThemedView
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 4,
                                  borderWidth: 2,
                                  borderColor: tempFilters.availability.inStock ? "#9f0e42" : "#e5e7eb",
                                  backgroundColor: tempFilters.availability.inStock ? "#9f0e42" : "#fff",
                                  marginRight: 10,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {tempFilters.availability.inStock && (
                                  <ThemedText style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>✓</ThemedText>
                                )}
                              </ThemedView>
                              <ThemedText style={{ fontSize: 12, color: "#374151" }}>In Stock</ThemedText>
                            </TouchableOpacity>

                            {/* On Sale */}
                            <TouchableOpacity
                              onPress={() =>
                                setTempFilters({
                                  ...tempFilters,
                                  availability: {
                                    ...tempFilters.availability,
                                    onSale: !tempFilters.availability.onSale,
                                  },
                                })
                              }
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 8,
                                paddingHorizontal: 0,
                              }}
                            >
                              <ThemedView
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 4,
                                  borderWidth: 2,
                                  borderColor: tempFilters.availability.onSale ? "#9f0e42" : "#e5e7eb",
                                  backgroundColor: tempFilters.availability.onSale ? "#9f0e42" : "#fff",
                                  marginRight: 10,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {tempFilters.availability.onSale && (
                                  <ThemedText style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>✓</ThemedText>
                                )}
                              </ThemedView>
                              <ThemedText style={{ fontSize: 12, color: "#374151" }}>On Sale</ThemedText>
                            </TouchableOpacity>

                            {/* Featured */}
                            <TouchableOpacity
                              onPress={() =>
                                setTempFilters({
                                  ...tempFilters,
                                  availability: {
                                    ...tempFilters.availability,
                                    featured: !tempFilters.availability.featured,
                                  },
                                })
                              }
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 8,
                                paddingHorizontal: 0,
                              }}
                            >
                              <ThemedView
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 4,
                                  borderWidth: 2,
                                  borderColor: tempFilters.availability.featured ? "#9f0e42" : "#e5e7eb",
                                  backgroundColor: tempFilters.availability.featured ? "#9f0e42" : "#fff",
                                  marginRight: 10,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {tempFilters.availability.featured && (
                                  <ThemedText style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>✓</ThemedText>
                                )}
                              </ThemedView>
                              <ThemedText style={{ fontSize: 12, color: "#374151" }}>Featured</ThemedText>
                            </TouchableOpacity>

                            {/* New Arrivals */}
                            <TouchableOpacity
                              onPress={() =>
                                setTempFilters({
                                  ...tempFilters,
                                  availability: {
                                    ...tempFilters.availability,
                                    newArrivals: !tempFilters.availability.newArrivals,
                                  },
                                })
                              }
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 8,
                                paddingHorizontal: 0,
                              }}
                            >
                              <ThemedView
                                style={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: 4,
                                  borderWidth: 2,
                                  borderColor: tempFilters.availability.newArrivals ? "#9f0e42" : "#e5e7eb",
                                  backgroundColor: tempFilters.availability.newArrivals ? "#9f0e42" : "#fff",
                                  marginRight: 10,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {tempFilters.availability.newArrivals && (
                                  <ThemedText style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>✓</ThemedText>
                                )}
                              </ThemedView>
                              <ThemedText style={{ fontSize: 12, color: "#374151" }}>New Arrivals</ThemedText>
                            </TouchableOpacity>
                          </ThemedView>
                        </ThemedView>

                      </ScrollView>


                      {/* Buttons */}
                      <ThemedView style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
                        <TouchableOpacity
                          onPress={resetFilters}
                          style={{
                            flex: 1,
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            borderRadius: 8,
                            backgroundColor: "#f3f4f6",
                            alignItems: "center",
                          }}
                        >
                          <ThemedText style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}>Reset</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={applyFilters}
                          style={{
                            flex: 1,
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            borderRadius: 8,
                            backgroundColor: "#9f0e42",
                            alignItems: "center",
                          }}
                        >
                          <ThemedText style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>Apply Filters</ThemedText>
                        </TouchableOpacity>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>
                </Modal>
          
                {/* View Controls */}
                <ThemedView style={styles.controlsRow}>
                  <ThemedView style={styles.viewToggle}>
                    <TouchableOpacity
                      style={[styles.toggleButton, viewType === "grid" && styles.toggleButtonActive]}
                      onPress={toggleViewType}
                    >
                      <Feather name="grid" size={16} color={viewType === "grid" ? "#fff" : "#000"} />
                      <ThemedText style={[styles.toggleText, viewType === "grid" && styles.toggleTextActive]}>
                        Grid
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.toggleButton, viewType === "list" && styles.toggleButtonActive]}
                      onPress={() => setViewType("list")}
                    >
                      <Feather name="list" size={16} color={viewType === "list" ? "#fff" : "#000"} />
                      <ThemedText style={[styles.toggleText, viewType === "list" && styles.toggleTextActive]}>
                        List
                      </ThemedText>
                    </TouchableOpacity>
                  </ThemedView>
                </ThemedView>

                {/* Products Grid/List */}
                <ThemedView style={{ paddingHorizontal: 0, marginTop: 10 }}>
                  {filteredAndSortedProducts.length > 0 ? (
                    <FlatList
                      data={filteredAndSortedProducts}
                      key={viewType === "grid" ? "g" : "l"}
                      numColumns={viewType === "grid" ? 2 : 1}
                      keyExtractor={(item) => item.id}
                      scrollEnabled={false}
                      columnWrapperStyle={viewType === "grid" ? { justifyContent: "space-between" } : undefined}
                      renderItem={({ item }) => (
                        <ThemedView style={{ flex: viewType === "grid" ? 0.48 : 1, marginBottom: 12 }}>
                          <ProductCard product={item} onPress={() => router.push(`/product-details/${item.id}`)} />
                        </ThemedView>
                      )}
                    />
                  ) : (
                    <ThemedView
                      style={{
                        alignItems: "center",
                        paddingVertical: 32,
                        backgroundColor: "#fff",
                        margin: 15,
                        borderRadius: 10,
                      }}
                    >
                      <ShoppingBag size={48} color="#F5CCDA" />
                      <ThemedText style={{ fontSize: 16, fontWeight: "600", marginTop: 12, color: "#374151" }}>
                        No products found
                      </ThemedText>
                      <ThemedText style={{ fontSize: 12, fontWeight: "400", marginTop: 12, color: "#6B7280" }}>
                        We couldn&apos;t find any products that match your filters
                      </ThemedText>
                      <TouchableOpacity
                        onPress={resetFilters}
                        style={{
                          backgroundColor: "#850D37",
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          borderRadius: 10,
                          marginTop: 15,
                        }}
                      >
                        <ThemedText style={{ color: "#fff" }}>Reset Filters</ThemedText>
                      </TouchableOpacity>
                    </ThemedView>
                  )}
                </ThemedView>

                {/* Trending Section */}
                {filteredAndSortedProducts.length > 0 ? (
                  <>
                    <ThemedText style={{ fontSize: 16, fontWeight: "600", paddingTop: 20 }}>
                      Trending Products
                    </ThemedText>
                    <FlatList
                      data={filteredAndSortedProducts}
                      numColumns={viewType === "grid" ? 2 : 1}
                      key={viewType === "grid" ? "grid-trend" : "list-trend"}
                      keyExtractor={(item) => item.id}
                      scrollEnabled={false}
                      renderItem={({ item }) => (
                        <ThemedView style={{ flex: viewType === "grid" ? 0.48 : 1, marginBottom: 12 }}>
                          <ProductCard product={item} onPress={() => router.push(`/product-details/${item.id}`)} />
                        </ThemedView>
                      )}
                    />
                  </>
                ) : (
                  <ThemedView
                    style={{
                      alignItems: "center",
                      paddingVertical: 32,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      marginVertical: 20,
                    }}
                  >
                    <TrendingUp size={48} color="#9CA3AF" />
                    <ThemedText style={{ fontSize: 16, fontWeight: "600", marginTop: 12, color: "#374151" }}>
                      No trending products yet
                    </ThemedText>
                    <ThemedText style={{ fontSize: 12, fontWeight: "400", marginTop: 12, color: "#6B7280" }}>
                      Check back soon for trending products from this store
                    </ThemedText>
                  </ThemedView>
                )}
              </ThemedView>
            </ScrollView>
          </ThemedView>
        </ScrollView>

        <Toast />
      </ThemedView>
    </>
  )
}
