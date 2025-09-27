import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { safeAmountFormatter } from '@/helpers/data-utils';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { useWishlist } from '@/hooks/useWishlist';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { wishItemStyles } from './style';

interface WishlistItemProps {
  item: {
    id: string;
    product: {
      id: string;
      name: string;
      store?: { storeName: string };
      default_images?: { image: { url: string } }[];
      base_price: number;
      base_sale_price: number;
    };
    quantity: number;
    variation: { id: string; name: string };
    selected: boolean;
    price: number;
  };
  discount?: number;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, discount = 0 }) => {
  const { product, quantity, selected } = item;
  const { removeItemFromWishlist, changeQuantity, toggleSelection, isOnSale } = useWishlist();

  const colorScheme = useColorScheme();
  const styles = wishItemStyles(colorScheme);

  const handleRemoveItem = () => {
    removeItemFromWishlist(item.id);
  };

  const increaseQuantity = () => {
    changeQuantity(item.id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      changeQuantity(item.id, quantity - 1);
    }
  };

  const handleToggleSelection = () => {
    toggleSelection(item.id);
  };

  return (
    <TouchableOpacity
      style={[styles.container, !selected && styles.containerUnselected]}
      onPress={handleToggleSelection}
      // disabled={!selected}
    >
      <View style={styles.cartContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.default_images?.[0]?.image?.url || 'https://via.placeholder.com/100',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View style={styles.productInfo}>
              <ThemedText style={styles.productName}>{product.name}</ThemedText>
              {product.store && <ThemedText style={styles.storeName}>{product.store.storeName}</ThemedText>}
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.priceContainer}>
              <ThemedText style={styles.salePrice}>{safeAmountFormatter(item.price)}</ThemedText>
              {isOnSale(item) && (
                <View style={styles.originalPriceRow}>
                  <ThemedText style={styles.originalPrice}>{safeAmountFormatter(product.base_price)}</ThemedText>
                  {discount > 0 && (
                    <View style={styles.discountBadge}>
                      <ThemedText style={styles.discountText}>-{discount}%</ThemedText>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleRemoveItem} style={styles.deleteButton}>
              <Trash2 size={18} color={Colors[colorScheme].primary700} />
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                disabled={quantity <= 1}
              >
                <Minus size={16} color={quantity <= 1 ? '#d1d5db' : '#374151'} />
              </TouchableOpacity>

              <ThemedText style={styles.quantityText}>{quantity}</ThemedText>

              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Plus size={16} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WishlistItem;
