import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { safeAmountFormatter } from '@/helpers/data-utils';
import { useCart } from '@/hooks/useCart';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Link } from 'expo-router';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { cartItemStyles } from './style';
import Toast from 'react-native-toast-message';

interface CartItemProps {
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

const CartItem: React.FC<CartItemProps> = ({ item, discount = 0 }) => {
  const { product, quantity } = item;
  const { removeItemFromCart, changeQuantity, toggleSelection, isOnSale } = useCart();

  const colorScheme = useColorScheme();
  const styles = cartItemStyles(colorScheme);

  const handleRemoveItem = () => {
    removeItemFromCart(item.id);
  };

  const getMaxQty = () => {
  try {
    let variationObj = null;
    // console.log(item)

    // Variation can be ARRAY or OBJECT — determine correctly
    if (Array.isArray(item.variation)) {
      // If multiple variations exist, pick the FIRST or SELECTED one
      variationObj = item.variation[0];
    } else if (item.variation && typeof item.variation === "object") {
      variationObj = item.variation;
    }

    // 1️⃣ If variation quantity exists
    if (variationObj?.quantity != null) {
      return Number(variationObj.quantity);
    }

    // 2️⃣ If product has variations (fallback)
    const productVariation = item.product?.variations?.[0];
    if (productVariation?.quantity != null) {
      return Number(productVariation.quantity);
    }

    // 3️⃣ If nothing exists, assume unlimited or fallback
    return Infinity;
  } catch (e) {
    return Infinity;
  }
};


  const increaseQuantity = () => {
    // const maxQty = item.variation?.[0]?.quantity ?? 999999;
    const maxQty = getMaxQty();
    console.log({maxQty})
    if (quantity < maxQty) {
      changeQuantity(item.id, quantity + 1);
    } else {
      Toast.show({
         type: 'error',
        text1: `Only ${maxQty} product${maxQty > 1 ? 's' : ''} left in stock.`,
      });
  }
  };

  //  const incrementQuantity = () => {
  //           console.log(product.variations[0]?.quantity)
  //     if (quantity < product.variations[0]?.quantity) {
  //       setQuantity((prev) => prev + 1);
  //       if (isAddedToCart) {
  //         changeQuantity(product.id, quantity + 1);
  //       }
  //     } else {
  //       Toast.show({
  //         type: "error",
  //         text1: `Only ${product.variations[0]?.quantity} product${
  //           product.variations[0]?.quantity > 1 ? "s" : ""
  //         } left in stock.`,
  //       });
  //     }
  //   };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      changeQuantity(item.id, quantity - 1);
    }
  };

  const handleToggleSelection = () => {
    toggleSelection(item.id);
  };

  return (
    <Link
      href={{ pathname: '/product/[id]', params: { id: product.id } }}
      asChild
      style={[styles.container]}
      //!selected && styles.containerUnselected
    >
      <TouchableOpacity
        style={[styles.container]}
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
    </Link>
  );
};

export default CartItem;
