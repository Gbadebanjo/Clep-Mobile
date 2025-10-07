import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { safeAmountFormatter } from "@/helpers/data-utils";
import { useCart } from "@/hooks/useCart";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useCartStore } from "@/store";
import { product } from "@/types/product";
import { useAuth } from '@/hooks/useAuth';
import { router } from "expo-router";
import { FontAwesome, MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { ThemedText } from "../../ThemedText";
import { ThemedView } from "../../ThemedView";
import { ProductDetailStyles } from "./style";
import { Colors } from "@/constants/Colors";


interface ProductDetailProps {
  product: product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [quantity, setQuantity] = useState(1);
  // const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart, items, removeFromCart } = useCartStore();
  const { hasSelectedItems } = useCart();
  const { changeQuantity } = useCart();
    const { user } = useAuth();


  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const colorScheme = useColorScheme();

  const styles = ProductDetailStyles(colorScheme);

  const flatListRef = useRef<FlatList>(null);

  const handleCartToggle = () => {
    if (isAddedToCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product, product.variations, quantity);
    }
  };

  useEffect(() => {
    const isAdded = items.find((item) => item?.product.id === product.id);
    setIsAddedToCart(!!isAdded);
  }, [items, product.id]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / styles.slide.width);
    setActiveIndex(index);
  };

  const renderImage = ({ item }: { item: { url: string } }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {product.default_images.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, activeIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );

  // const handleQuantityChange = (amount: number) => {
  //   const newQuantity = Math.max(1, quantity + amount);
  //   setQuantity((prev) => Math.max(1, newQuantity));

  //   if (isAddedToCart) {
  //     changeQuantity(product.id, newQuantity);
  //   }
  // };

  const increment = () => {
    if (quantity < product.variations[0]?.quantity ) {
      setQuantity((prev) => prev + 1);
      if (isAddedToCart) {
        changeQuantity(product.id, quantity + 1);
      }
    } else {
      Toast.show({
        type: "error",
        text1: `Only ${product.variations[0]?.quantity} product${
          product.variations[0]?.quantity > 1 ? "s" : ""
        } left in stock.`,
      });
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      if (isAddedToCart) {
        changeQuantity(product.id, quantity - 1);
      }
    }
  };

  const handleCheckout = () => {
      if (!user) {
        router.push('/customer/login');
        return;
      }
      if (!hasSelectedItems) return;
      router.push('/checkout');
    };
  // Mock data for sizes, should come from product
  // const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={product.default_images.map((url, index) => {
            return { url: (url?.image as any)?.url ?? url?.image ?? "" };
          })}
          key={product.id}
          renderItem={renderImage}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          keyExtractor={(item, index) => `product-image-${index}`}
        />
        {renderPagination()}
      </ThemedView>

      <ThemedView style={styles.detailsContainer}>
        <ThemedText style={styles.productName}>{product.name}</ThemedText>

        {/* Rating Placeholder */}
        <View style={styles.ratingContainer}>
          <ThemedText>0.0</ThemedText>
        </View>

        <View style={styles.priceContainer}>
          {product.base_sale_price < product.base_price && (
            <ThemedText style={styles.originalPrice}>
              {safeAmountFormatter(product.base_price)}
            </ThemedText>
          )}
          <ThemedText style={styles.discountedPrice}>
            {safeAmountFormatter(product.base_sale_price)}
          </ThemedText>
          {product.base_sale_price < product.base_price && (
            <ThemedText style={styles.discountPercentage}>
              {Math.round(
                ((product.base_price - product.base_sale_price) /
                  product.base_price) *
                  100
              )}
              % OFF
            </ThemedText>
          )}
        </View>

        {/* Stock Placeholder */}
        <ThemedText style={styles.stock}>
          Only {product.variations[0].quantity} left in stock - order soon
        </ThemedText>

        <ThemedText style={styles.shortDescription}>
          {product.summary}
        </ThemedText>

        {/* Variations Placeholder */}
        {product.variations.map((variation, index) => {
          const attributes = variation.attributes?.filter(
            (attribute) => attribute.name && attribute.value.length > 2
          );
          return (
            <View style={styles.variationContainer} key={index}>
              {attributes &&
                attributes.map((attribute, index) => {
                  return (
                    attribute.name &&
                    attribute.value && (
                      <View style={styles.variationRow} key={index}>
                        <ThemedText style={styles.variationLabel}>
                          {attribute.name}
                        </ThemedText>
                        <ThemedText style={styles.variationValue}>
                          {attribute.value}
                        </ThemedText>
                      </View>
                    )
                  );
                })}
            </View>
          );
        })}

        {/* Size Selection */}
        {/* <View style={styles.sizeContainer}>
          <ThemedText style={styles.sizeLabel}>Size</ThemedText>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeOption, selectedSize === size && styles.activeSize]}
                onPress={() => setSelectedSize(size)}
              >
                <ThemedText style={styles.sizeText}>{size}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        {/* Quantity Toggle */}
        <View style={styles.quantityContainer}>
          <ThemedText style={styles.quantityLabel}>Quantity</ThemedText>
          <View style={styles.quantityToggle}>
            <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
              <ThemedText style={styles.quantityButtonText}>-</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.quantity}>{quantity}</ThemedText>
            <TouchableOpacity onPress={increment} style={styles.quantityButton}>
              <ThemedText style={styles.quantityButtonText}>+</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <ThemedTouchableOpacity
            onPress={handleCartToggle}
            lightColor="#000"
            darkColor="#fff"
            style={styles.addToCartButton}
          >
            <Feather name="shopping-bag" size={18} color={Colors[colorScheme].background} />
            <ThemedText
              darkColor="#000"
              lightColor="#fff"
              style={styles.buttonText}
            >
              {isAddedToCart ? "Remove from cart" : "Add to cart"}
            </ThemedText>
          </ThemedTouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <FontAwesome name="shopping-cart" size={18} color={Colors[colorScheme].text} />
            <ThemedText style={styles.buttonText}>Buy Now</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customOrderButton}>
            <ThemedText style={styles.buttonText2}>Custom Order</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Entypo name="chat" size={18} color={Colors[colorScheme].text} />
            <ThemedText style={styles.buttonText}>Bargain</ThemedText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 24,
            paddingTop: 24,
          }}
        >
          {/* Fast shipping */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <MaterialIcons
              name="check-circle"
              size={18}
              color="#16a34a"
              style={{ marginTop: 2 }}
            />
            <View>
              <ThemedText>Fast shipping</ThemedText>
              <ThemedText style={{ fontSize: 12, color: "#6b7280" }}>
                Free delivery
              </ThemedText>
            </View>
          </View>
          {/* Easy returns */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <MaterialIcons
              name="check-circle"
              size={18}
              color="#16a34a"
              style={{ marginTop: 2 }}
            />
            <View>
              <ThemedText style={{ fontSize: 14, fontWeight: "500" }}>
                Easy returns
              </ThemedText>
              <ThemedText style={{ fontSize: 12, color: "#6b7280" }}>
                72-hr return policy
              </ThemedText>
            </View>
          </View>
          {/* Secure checkout */}
          <View
            style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}
          >
            <MaterialIcons
              name="check-circle"
              size={18}
              color="#16a34a"
              style={{ marginTop: 2 }}
            />
            <View>
              <ThemedText style={{ fontSize: 14, fontWeight: "500" }}>
                Secure checkout
              </ThemedText>
              <ThemedText style={{ fontSize: 12, color: "#6b7280" }}>
                SSL encrypted payment
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {["Description", "Specifications", "Reviews"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <ThemedText style={styles.tabText}>
                {tab} {tab === "Reviews" && "(0)"}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === "Description" && (
            <ThemedText>{product.description}</ThemedText>
          )}
          {activeTab === "Specifications" && (
            <View style={styles.specificationsContainer}>
              <View style={styles.specRow}>
                <ThemedText style={styles.specLabel}>SKU</ThemedText>
                <ThemedText style={styles.specValue}>
                  {product.variations[0].sku}
                </ThemedText>
              </View>
              <View style={styles.specRow}>
                <ThemedText style={styles.specLabel}>Categories</ThemedText>
                <ThemedText style={styles.specValue}>
                  {(product.categories[0].category as any)?.name ||
                    product.categories[0].category}
                </ThemedText>
              </View>
              <View style={styles.specRow}>
                <ThemedText style={styles.specLabel}>Store</ThemedText>
                <ThemedText style={styles.specValue}>
                  {product.store?.storeName}
                </ThemedText>
              </View>
            </View>
          )}
          {activeTab === "Reviews" && (
            <View style={styles.reviewContainer}>
              <ThemedText style={styles.noReviewsText}>
                No reviews yet
              </ThemedText>
              <ThemedTouchableOpacity style={styles.writeReviewButton}>
                <ThemedText style={styles.writeReviewButtonText}>
                  Write a Review
                </ThemedText>
              </ThemedTouchableOpacity>
            </View>
          )}
        </View>
      </ThemedView>
      <Toast />
    </ScrollView>
  );
};

export default ProductDetail;
