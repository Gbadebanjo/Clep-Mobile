import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { showError } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import PaymentComponent from '../Payment';
import { checkoutStyles } from './style';
import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/Cart/CartItem';

export default function CheckoutComponent() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('NG');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = checkoutStyles(colorScheme);

  const { items, getItemDiscount } = useCart();
  const email = 'test@example.com'; // Replace with actual user email

  // ✅ Calculate total price manually
  const totalPrice = items.reduce((acc, item) => {
    const discount = getItemDiscount ? getItemDiscount(item) : 0;
    const priceAfterDiscount = item.price - discount;
    return acc + priceAfterDiscount * (item.quantity || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, 0);

  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  ];

  const handleContinue = () => {
    if (!street || !city || !state || !zipcode) {
      showError('Please fill in all required fields');
      return;
    }
    setShowPayment(true);
  };

  const handleStateSelect = (selectedState: string) => {
    setState(selectedState);
    setShowStateDropdown(false);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <PaymentComponent
        email={email}
        amount={totalPrice}
        onSuccess={handlePaymentSuccess}
        onCancel={handlePaymentCancel}
      />
    );
  }

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
                  <ThemedText style={[styles.dropdownText, !state && styles.placeholder]}>
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
                          <ThemedText style={styles.dropdownItemText}>{stateOption}</ThemedText>
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
                  <CartItem key={item.id} item={item} discount={getItemDiscount(item)} />
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

          <ThemedTouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <ThemedText lightColor="#fff" darkColor="#000" style={styles.continueButtonText}>
              Continue to Payment
            </ThemedText>
          </ThemedTouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
