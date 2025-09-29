import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { safeAmountFormatter } from '@/helpers/data-utils';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { product } from '@/types/product';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedText } from '../../ThemedText';
import { ThemedView } from '../../ThemedView';
import { ProductDetailStyles } from './style';
// Assuming the type definition is here

interface ProductDetailProps {
  product: product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Description');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const colorScheme = useColorScheme();

  const styles = ProductDetailStyles(colorScheme);

  const flatListRef = useRef<FlatList>(null);

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
        <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
      ))}
    </View>
  );

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  // Mock data for sizes, should come from product
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={product.default_images.map((url, index) => {
            return { url: (url?.image as any)?.url ?? url?.image ?? '' };
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
            <ThemedText style={styles.originalPrice}>{safeAmountFormatter(product.base_price)}</ThemedText>
          )}
          <ThemedText style={styles.discountedPrice}>{safeAmountFormatter(product.base_sale_price)}</ThemedText>
          {product.base_sale_price < product.base_price && (
            <ThemedText style={styles.discountPercentage}>
              {Math.round(((product.base_price - product.base_sale_price) / product.base_price) * 100)}% OFF
            </ThemedText>
          )}
        </View>

        {/* Stock Placeholder */}
        <ThemedText style={styles.stock}>Only {product.variations[0].quantity} left in stock - order soon</ThemedText>

        <ThemedText style={styles.shortDescription}>{product.summary}</ThemedText>

        {/* Variations Placeholder */}
        {product.variations.map((variation, index) => {
          return (
            <View style={styles.variationContainer} key={index}>
              {variation.attributes?.map((attribute, index) => {
                return (
                  <View style={styles.variationRow} key={index}>
                    <ThemedText style={styles.variationLabel}>{attribute.name}</ThemedText>
                    <ThemedText style={styles.variationValue}>{attribute.value}</ThemedText>
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* Size Selection */}
        <View style={styles.sizeContainer}>
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
        </View>

        {/* Quantity Toggle */}
        <View style={styles.quantityContainer}>
          <ThemedText style={styles.quantityLabel}>Quantity</ThemedText>
          <View style={styles.quantityToggle}>
            <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.quantityButton}>
              <ThemedText style={styles.quantityButtonText}>-</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.quantity}>{quantity}</ThemedText>
            <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.quantityButton}>
              <ThemedText style={styles.quantityButtonText}>+</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <ThemedTouchableOpacity lightColor="#000" darkColor="#fff" style={styles.addToCartButton}>
            <ThemedText darkColor="#000" lightColor="#fff" style={styles.buttonText}>
              Add to Cart
            </ThemedText>
          </ThemedTouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <ThemedText style={styles.buttonText}>Buy Now</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {['Description', 'Specifications', 'Reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <ThemedText style={styles.tabText}>
                {tab} {tab === 'Reviews' && '(0)'}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === 'Description' && <ThemedText>{product.description}</ThemedText>}
          {activeTab === 'Specifications' && (
            <View style={styles.specificationsContainer}>
              <View style={styles.specRow}>
                <ThemedText style={styles.specLabel}>SKU</ThemedText>
                <ThemedText style={styles.specValue}>{product.variations[0].sku}</ThemedText>
              </View>
              <View style={styles.specRow}>
                <ThemedText style={styles.specLabel}>Categories</ThemedText>
                <ThemedText style={styles.specValue}>
                  {(product.categories[0].category as any)?.name || product.categories[0].category}
                </ThemedText>
              </View>
              <View style={styles.specRow}>
                <ThemedText style={styles.specLabel}>Store</ThemedText>
                <ThemedText style={styles.specValue}>{product.store?.storeName}</ThemedText>
              </View>
            </View>
          )}
          {activeTab === 'Reviews' && (
            <View style={styles.reviewContainer}>
              <ThemedText style={styles.noReviewsText}>No reviews yet</ThemedText>
              <ThemedTouchableOpacity style={styles.writeReviewButton}>
                <ThemedText style={styles.writeReviewButtonText}>Write a Review</ThemedText>
              </ThemedTouchableOpacity>
            </View>
          )}
        </View>
      </ThemedView>
    </ScrollView>
  );
};

export default ProductDetail;
