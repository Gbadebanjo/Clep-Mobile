import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { safeAmountFormatter } from '@/helpers/data-utils';
import { useCart } from '@/hooks/useCart';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import CartItem from './CartItem';
import { cartStyles } from './style';

// Mock data - replace with actual cart store
const mockCartItems = [
  {
    id: '1',
    product: {
      id: '1',
      name: "Men's shirt",
      store: { storeName: 'nice fashion' },
      default_images: [{ image: { url: 'https://via.placeholder.com/100' } }],
      base_price: 45000,
      base_sale_price: 5000,
    },
    quantity: 1,
    variation: { id: '1', name: 'Default' },
  },
];

interface CartProps {
  cartItems?: any[];
}

const Cart: React.FC<CartProps> = () => {
  // const isEmpty = cartItems.length === 0;
  const isOnSale = (item: any) => item.product.base_sale_price < item.product.base_price;
  const { items, isEmpty, totals, hasSelectedItems, getItemDiscount, clearCart } = useCart();

  const getDiscount = (item: any) => {
    if (!isOnSale(item)) return 0;
    return Math.round(((item.product.base_price - item.product.base_sale_price) / item.product.base_price) * 100);
  };

  const handleStartShopping = () => {
    router.push('/');
  };

  const handleCheckout = () => {
    if (!hasSelectedItems) return;
    router.push('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (isEmpty) {
    return (
      <ThemedView style={cartStyles.container}>
        <ThemedText style={cartStyles.title}>Shopping Cart</ThemedText>

        <View style={cartStyles.emptyContainer}>
          <View style={cartStyles.emptyIconContainer}>
            <Image source={require('@/assets/images/cart/empty_cart.png')} style={{ width: 60, height: 60 }}></Image>
          </View>

          <ThemedText style={cartStyles.emptyTitle}>Your shopping cart is empty</ThemedText>
          <ThemedText style={cartStyles.emptySubtitle}>
            Items added to your cart will be displayed here.{'\n'}
            Start shopping to add items to your cart.
          </ThemedText>

          <ThemedTouchableOpacity
            lightColor="#000000"
            darkColor="#ffffff"
            style={cartStyles.startShoppingButton}
            onPress={handleStartShopping}
          >
            <ThemedText lightColor="#ffffff" darkColor="#000000" style={cartStyles.startShoppingText}>
              Start shopping
            </ThemedText>
          </ThemedTouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={cartStyles.container}>
      <View style={cartStyles.titleContainer}>
        <ThemedText style={cartStyles.title}>Shopping Cart</ThemedText>
        <ThemedTouchableOpacity style={cartStyles.clearButton}>
          <ThemedText style={{ color: 'white', fontWeight: 600 }} onPress={handleClearCart}>
            Clear Cart
          </ThemedText>
        </ThemedTouchableOpacity>
      </View>

      <ScrollView style={cartStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} discount={getItemDiscount(item)} />
        ))}
      </ScrollView>

      <View style={cartStyles.totalsContainer}>
        <ThemedText style={cartStyles.totalsTitle}>Totals</ThemedText>
        <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ThemedText style={{ ...cartStyles.totalsText, fontWeight: '700' }}>Subtotal</ThemedText>
          <ThemedText style={cartStyles.totalsText}>{safeAmountFormatter(totals.subtotal)}</ThemedText>
        </ThemedView>

        {/* <ThemedText style={cartStyles.totalsText}>Shipping: {safeAmountFormatter(totals.shipping)}</ThemedText>
        <ThemedText style={cartStyles.totalsText}>Tax: {safeAmountFormatter(totals.tax)}</ThemedText>
        <ThemedText style={cartStyles.totalsText}>Total: {safeAmountFormatter(totals.total)}</ThemedText> */}
      </View>

      <ThemedTouchableOpacity style={cartStyles.checkoutButton} onPress={handleCheckout}>
        <ShoppingCart size={20} color="white" />
        <ThemedText lightColor="#ffffff" darkColor="#000000" style={cartStyles.checkoutText}>
          Checkout
        </ThemedText>
      </ThemedTouchableOpacity>
    </ThemedView>
  );
};

export default Cart;
