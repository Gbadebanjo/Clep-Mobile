import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { useWishlist } from '@/hooks/useWishlist';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import WishlistItem from './WishItem';
import { wishlistStyles } from './style';

interface WishlistProps {
  cartItems?: any[];
}

const Wishlist: React.FC<WishlistProps> = () => {
  // const isEmpty = cartItems.length === 0;
  const isOnSale = (item: any) => item.product.base_sale_price < item.product.base_price;
  const { items, isEmpty, totals, hasSelectedItems, getItemDiscount, clearWishlist } = useWishlist();

  const getDiscount = (item: any) => {
    if (!isOnSale(item)) return 0;
    return Math.round(((item.product.base_price - item.product.base_sale_price) / item.product.base_price) * 100);
  };

  const handleStartShopping = () => {
    router.push('/');
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  const handleCheckout = () => {
    if (!hasSelectedItems) return;
    router.push('/checkout');
  };

  if (isEmpty) {
    return (
      <ThemedView style={wishlistStyles.container}>
        <ThemedText style={wishlistStyles.title}>Wishlist</ThemedText>

        <View style={wishlistStyles.emptyContainer}>
          <View style={wishlistStyles.emptyIconContainer}>
            <Image source={require('@/assets/images/cart/empty_cart.png')} style={{ width: 60, height: 60 }}></Image>
          </View>

          <ThemedText style={wishlistStyles.emptyTitle}>Your wishlist is empty</ThemedText>
          <ThemedText style={wishlistStyles.emptySubtitle}>
            Items added to your wishlist will be displayed here.{'\n'}
            Start shopping to add items to your wishlist.
          </ThemedText>

          <ThemedTouchableOpacity
            lightColor="#000000"
            darkColor="#ffffff"
            style={wishlistStyles.startShoppingButton}
            onPress={handleStartShopping}
          >
            <ThemedText lightColor="#ffffff" darkColor="#000000" style={wishlistStyles.startShoppingText}>
              Start shopping
            </ThemedText>
          </ThemedTouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={wishlistStyles.container}>
      <View style={wishlistStyles.titleContainer}>
        <ThemedText style={wishlistStyles.title}>Wishlist</ThemedText>
        <ThemedTouchableOpacity style={wishlistStyles.clearButton}>
          <ThemedText style={{ color: 'white', fontWeight: 600 }} onPress={handleClearWishlist}>
            Clear Wishlist
          </ThemedText>
        </ThemedTouchableOpacity>
      </View>

      <ScrollView style={wishlistStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <WishlistItem key={item.id} item={item} discount={getItemDiscount(item)} />
        ))}
      </ScrollView>

      <ThemedTouchableOpacity style={wishlistStyles.checkoutButton} onPress={handleCheckout}>
        <ShoppingCart size={20} color="white" />
        <ThemedText lightColor="#ffffff" darkColor="#000000" style={wishlistStyles.checkoutText}>
          Checkout
        </ThemedText>
      </ThemedTouchableOpacity>
    </ThemedView>
  );
};

export default Wishlist;
