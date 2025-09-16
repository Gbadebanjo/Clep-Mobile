// ProductCard.tsx
import { Heart, ShoppingBag, Store } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
// import { useCartStore } from '@/store/cartStore';
// import { useWishlistStore } from '@/store/wishlistStore';
// import { useAuthStore } from '@/store/authStore';
import { Colors } from '@/constants/Colors';
import { safeAmountFormatter } from '@/helpers/data-utils';
import { product } from '@/types/product';
import { ProductCardStyles as styles } from './styles/product-card';

interface IProps {
  product: product;
  isFavorite?: boolean;
  action?: boolean;
}

// Badge component
const Badge = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const PopularityBadge = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);
const ProductCard = ({ product, isFavorite, action = true }: IProps) => {
  // const { user } = useAuthStore((store) => store);
  // const { addToCart, carts, removeFromCart } = useCartStore((store) => store);
  // const { addToWishlist, removeFromWishlist, Wishlists } = useWishlistStore((store) => store);

  // const isVendor = user && user.role === 'vendor';
  // const isAddedToCart = carts?.find((item) => item?.id === product.id);
  // const isAddedToWishlist = Wishlists?.find((item) => item?.id === product.id);
  const isVendor = false;
  const isAddedToCart = false;
  const isAddedToWishlist = false;

  const isOnSale = product.base_sale_price < product.base_price;
  const discount = isOnSale
    ? Math.round(((product.base_price - product.base_sale_price) / product.base_price) * 100)
    : 0;

  const isOutOfStock = product.variations[0].quantity === 0;

  const handleCartToggle = () => {
    // !isAddedToCart ? addToCart(product) : removeFromCart(product.id);
  };

  const handleWishlistToggle = () => {
    // !isAddedToWishlist ? addToWishlist(product) : removeFromWishlist(product.id);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: (product?.default_images?.[0]?.image as any)?.url ?? 'https://via.placeholder.com/500',
          }}
          resizeMode="cover"
          style={styles.image}
        />

        {/* Wishlist & Cart Buttons */}
        <View style={styles.actionButtons}>
          {isVendor && (
            <TouchableOpacity onPress={handleWishlistToggle} style={styles.iconButton}>
              <Heart size={18} color={isAddedToWishlist ? 'red' : 'black'} fill={isAddedToWishlist ? 'red' : 'none'} />
            </TouchableOpacity>
          )}
          {action && !isVendor && !isOutOfStock && (
            <TouchableOpacity onPress={handleCartToggle} style={styles.iconButton}>
              <ShoppingBag size={18} color={isAddedToCart ? 'white' : 'black'} />
            </TouchableOpacity>
          )}
        </View>

        {isOnSale && <Badge>{discount}% OFF</Badge>}
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.productName}>
          {product.name}
        </Text>

        {/* Store Info */}
        {product?.store && (
          <View style={styles.storeInfo}>
            <Store size={12} color={Colors.light.primary700} />
            <Text numberOfLines={1} style={styles.storeName}>
              {product.store.storeName}
            </Text>
          </View>
        )}

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.salePrice}>{safeAmountFormatter(product.base_sale_price)}</Text>
          {isOnSale && <Text style={styles.originalPrice}>{safeAmountFormatter(product.base_price)}</Text>}
        </View>

        {/* Stock/Cart Button */}
        {!isVendor && (
          <View style={styles.cartButtonWrapper}>
            {isOutOfStock ? (
              <Text style={styles.outOfStock}>Out of Stock</Text>
            ) : (
              <TouchableOpacity onPress={handleCartToggle} style={styles.addToCartButton}>
                <ShoppingBag size={16} color="white" />
                <Text style={styles.addToCartText}>{isAddedToCart ? 'Remove from cart' : 'Add to cart'}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductCard;
