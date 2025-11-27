import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { showError, showSuccess } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { usePaystack } from 'react-native-paystack-webview';
import React, { use, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { checkoutStyles } from './style';
import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/Cart/CartItem';
import { useAuthStore } from "@/store";
import axios from 'axios'; // 🆕 API handling
import { useNavigation } from '@react-navigation/native'; // 🆕 For routing after order

export default function CheckoutComponent() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('NG');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [loading, setLoading] = useState(false); // 🆕
  const { popup } = usePaystack();
  const navigation = useNavigation(); // 🆕
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = checkoutStyles(colorScheme);
  const { items, getItemDiscount, clearCart } = useCart(); 
  const { user } = useAuthStore((store) => store);

  // ✅ Calculate total price
 const totalPrice = items.reduce((acc, item) => {
  return acc + item.price * item.quantity;
}, 0);


  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  ];

  const handleStateSelect = (selectedState: string) => {
    setState(selectedState);
    setShowStateDropdown(false);
  };

  // 🆕 Refund handler (fallback if order fails)
  const refundPayment = async (reference: string) => {
    try {
      await axios.post(
        'https://api.paystack.co/refund',
        { transaction: reference, amount: totalPrice * 100 },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_SECRET_KEY}`,
          },
        }
      );
      showSuccess('Refund initiated');
    } catch (err) {
      console.error('Refund failed', err);
    }
  };

  // 🆕 Create order after successful payment
  // const createOrder = async (reference: string) => {
  //   try {
  //     const payload = {
  //       items: items.map((i) => ({
  //         product: i.id,
  //         quantity: i.quantity,
  //         price: i.price,
  //       })),
  //       total_amount: totalPrice,
  //       shipping_address: { street, city, state, zipcode, country },
  //       payment_info: {
  //         method: 'paystack',
  //         reference,
  //       },
  //     };

  //     const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/orders`, payload);

  //     showSuccess('Order placed successfully');
  //     clearCart();
  //     navigation.navigate('OrderHistory', { orderId: res.data.id });
  //   } catch (err) {
  //     console.error('Order creation failed', err);
  //     showError('Order creation failed. Initiating refund...');
  //     refundPayment(reference);
  //   }
  // };

  const createOrder = async (reference: string) => {
  try {
    const payload = {
      items: items.map((i) => ({
        product: i.id,
        quantity: i.quantity,
        price: i.price,
      })),
      total_amount: totalPrice,
      shipping_address: { street, city, state, zipcode, country },
      payment_info: {
        method: "paystack",
        reference,
      },
    };

    const res = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/orders`,
      payload
    );

    showSuccess("Order placed successfully!");

    clearCart();

    navigation.navigate("OrderHistory", {
      orderId: res.data.id,
    });
  } catch (err) {
    console.log("Order creation failed:", err);
    showError("Order creation failed. Please contact support.");
  }
};


  // 🆕 Main Paystack payment handler
  // const handlePayment = () => {
  //   if (!street || !city || !state || !zipcode) {
  //     showError('Please fill in all required fields');
  //     return;
  //   }

  //   const reference = "ref-" + Date.now();
    
  //   popup.checkout({
  //     email: user?.email,
  //     amount: totalPrice, // Paystack expects kobo
  //     reference,
  //     onSuccess: (res) => {
  //       const reference = res.data.transactionRef.reference;
  //       console.log('✅ Payment success:', reference);
  //       createOrder(reference);
  //     },
  //     onCancel: () => {
  //       console.log('❌ Payment cancelled');
  //     },
  //     onError: (err) => {
  //       console.log('🚨 Payment error:', err);
  //     },
  //   });
  // };

  const handlePayment = () => {
  if (!street || !city || !state || !zipcode) {
    showError("Please fill in all required fields");
    return;
  }

  const reference = "ref-" + Date.now();

  popup.checkout({
    email: user?.email,
    amount: totalPrice, // 🟩 Paystack requires KOBO
    reference,

    onSuccess: (res) => {
      try {
        const paidRef = res.transactionRef.reference;

        // console.log("✅ Payment success:", paidRef);

        createOrder(paidRef); // ⬅️ Create order right away
      } catch (err) {
        console.log("Parse error:", err);
        showError("Payment failed. Please try again.");
      }
    },

    onCancel: () => {
      console.log("❌ Payment cancelled");
      showError("Payment was cancelled");
    },

    onError: (err) => {
      console.log("🚨 Payment error:", err);
      showError("Payment failed. Please try again.");
    },
  });
};


  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <ThemedText style={styles.title}>Checkout</ThemedText>

          {/* 🧾 Delivery Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Delivery</ThemedText>
              <View style={styles.underline} />
            </View>

            <View style={styles.formContainer}>
              {/* Street */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Street</ThemedText>
                <ThemedInput
                  value={street}
                  onChangeText={setStreet}
                  placeholder="Enter your street address"
                  style={styles.input}
                />
              </View>

              {/* City */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>City</ThemedText>
                <ThemedInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="Your city"
                  style={styles.input}
                />
              </View>

              {/* State Dropdown */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>State</ThemedText>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowStateDropdown(!showStateDropdown)}
                >
                  <ThemedText
                    style={[styles.dropdownText, !state && styles.placeholder]}
                  >
                    {state || 'Select State'}
                  </ThemedText>
                  <Ionicons
                    name={showStateDropdown ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colorScheme === 'dark' ? '#fff' : '#666'}
                  />
                </TouchableOpacity>

                {showStateDropdown && (
                  <View style={styles.dropdownList}>
                    <ScrollView style={styles.dropdownScroll}>
                      {states.map((stateOption) => (
                        <TouchableOpacity
                          key={stateOption}
                          style={styles.dropdownItem}
                          onPress={() => handleStateSelect(stateOption)}
                        >
                          <ThemedText style={styles.dropdownItemText}>
                            {stateOption}
                          </ThemedText>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Zipcode */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Zipcode</ThemedText>
                <ThemedInput
                  value={zipcode}
                  onChangeText={setZipcode}
                  placeholder="Enter your Zip Code"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>

              {/* Country */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Country</ThemedText>
                <ThemedInput
                  value={country}
                  onChangeText={setCountry}
                  placeholder="NG"
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          {/* 🛒 Cart Items Section */}
          {items.length > 0 && (
            <View style={styles.cartSection}>
              <ThemedText style={styles.sectionTitle}>Summary</ThemedText>
              <View style={styles.cartItemsContainer}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    discount={getItemDiscount(item)}
                  />
                ))}
              </View>

              <View style={styles.totalContainer}>
                <ThemedText style={styles.totalText}>Total:</ThemedText>
                <ThemedText style={styles.totalText}>
                  ₦{totalPrice.toLocaleString()}
                </ThemedText>
              </View>
            </View>
          )}

          <ThemedTouchableOpacity
            style={styles.continueButton}
            onPress={handlePayment}
          >
            <ThemedText
              lightColor="#fff"
              darkColor="#000"
              style={styles.continueButtonText}
            >
              Continue to Payment
            </ThemedText>
          </ThemedTouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
