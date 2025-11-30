import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { showError, showSuccess } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { usePaystack } from 'react-native-paystack-webview';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import { checkoutStyles } from './style';
import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/Cart/CartItem';
import { useAuthStore } from '@/store';
import { ProductAPI } from '@/apis/product-api';
import { FezAPI } from '@/apis/fez-api';
import { CustomerAPI } from '@/apis/customers-api';
import { OrderAPI } from '@/apis/order-api';
import { useNavigation } from '@react-navigation/native';
import { Address } from '@/types/customer';
import { DeliveryRequest } from '@/types/fez';

export default function CheckoutComponent() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('NG');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetchingAddresses, setIsFetchingAddresses] = useState(false);
  const [enterAddressManually, setEnterAddressManually] = useState(false);
  const [disablePaymentBtn, setDisablePaymentBtn] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [paymentReference, setPaymentReference] = useState('');

  const { popup } = usePaystack();
  const navigation = useNavigation();
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = checkoutStyles(colorScheme);
  const { items, getItemDiscount, clearCart } = useCart();
  const { user } = useAuthStore((store) => store);

  const productAPI = new ProductAPI();
  const fezAPI = new FezAPI();
  const customerAPI = new CustomerAPI();
  const orderAPI = new OrderAPI();

  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  ];

  // Calculate total price
  const totalPrice = useMemo(
    () =>
      items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0),
    [items]
  );

  // Fetch saved addresses on mount
  useEffect(() => {
    if (user?.customerProfile?.id) {
      fetchSavedAddresses();
    }
  }, [user?.customerProfile?.id]);

  const fetchSavedAddresses = async () => {
    try {
      setIsFetchingAddresses(true);
      const response = await customerAPI.getCustomer(user?.customerProfile?.id);
      // console.log(response)
      setSavedAddresses(response.data.customer.shippingAddresses || []);
      
      // If no saved addresses, show manual entry form
      if (response.data.customer.shippingAddresses.length === 0) {
        setEnterAddressManually(true);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setEnterAddressManually(true);
    } finally {
      setIsFetchingAddresses(false);
    }
  };

  const handleStateSelect = (selectedState: string) => {
    setState(selectedState);
    setShowStateDropdown(false);
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setStreet(address.street);
    setCity(address.city);
    setState(address.state);
    setZipcode(address.postalCode);
    setCountry(address.country || 'NG');
  };

  const toggleEnterAddressManually = () => {
    setEnterAddressManually(!enterAddressManually);
    setSelectedAddress(null);
  };

  // Validate stock before payment
  const validateStockBeforePayment = async (): Promise<boolean> => {
    try {
      const stockErrors: string[] = [];

      for (const cartItem of items) {
        try {
          const response = await productAPI.getProductById(cartItem.product.id);
          const product = response.data;

          // Check if product exists
          if (!product) {
            stockErrors.push(`${cartItem.product.name} is no longer available`);
            continue;
          }

          // Check if product is in draft status
          if (product.status === 'draft') {
            stockErrors.push(`${cartItem.product.name} is currently unavailable`);
            continue;
          }

          // Check stock for the specific variation
          const cartVariation = cartItem.variation;
          const variation =
            product.variations?.find((v) => v.sku === cartVariation?.sku) ||
            product.variations?.find((v) => v.id === cartVariation?.id);

          if (!variation) {
            stockErrors.push(
              `Selected variation of ${cartItem.product.name} (${cartVariation?.name || 'variation'}) is no longer available`
            );
            continue;
          }

          // Check if enough stock is available
          if (variation.quantity < cartItem.quantity) {
            if (variation.quantity === 0) {
              stockErrors.push(
                `${cartItem.product.name} (${cartVariation?.name || 'variation'}) is out of stock`
              );
            } else {
              stockErrors.push(
                `Only ${variation.quantity} unit(s) of ${cartItem.product.name} (${cartVariation?.name || 'variation'}) available. You selected ${cartItem.quantity}`
              );
            }
          }
        } catch (error) {
          console.error(`Error checking stock for ${cartItem.product.name}:`, error);
          stockErrors.push(`Could not verify stock for ${cartItem.product.name}`);
        }
      }

      if (stockErrors.length > 0) {
        stockErrors.forEach((error) => showError(error));
        setDisablePaymentBtn(false);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Stock validation error:', error);
      showError('Unable to verify product availability. Please try again.');
      setDisablePaymentBtn(false);
      return false;
    }
  };

  // Refund payment (fallback if order fails)
  const refundPayment = async (reference: string) => {
    try {
      // Note: You'll need to implement this on your backend
      // Paystack refunds should be done server-side for security
      showError('Order creation failed. Please contact support for refund.');
    } catch (err) {
      console.error('Refund process failed', err);
      showError('Please contact support immediately.');
    }
  };

  // Create FEZ delivery orders
  const createFezOrders = async (reference: string) => {
    try {
      const fezOrderData: DeliveryRequest = items.map((item) => {
        // Extract business name
        const businessName = item.product.store?.vendor?.businessDetails?.businessName;
        let senderName = '';

        if (businessName) {
          if (businessName.includes('@')) {
            senderName = businessName
              .split('@')[0]
              .replace(/[._-]/g, ' ')
              .split(' ')
              .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(' ');
          } else {
            senderName = String(businessName);
          }
        }

        if (!senderName || senderName.trim() === '') {
          senderName =
            item.product.store?.storeName ||
            item.product.store?.vendor?.name ||
            'Vazzel';
        }

        // Extract and format phone numbers
        let senderPhone = String(
          item.product.store?.vendor?.businessDetails?.businessPhone || ''
        ).trim();

        if (!senderPhone || senderPhone === 'undefined' || senderPhone === 'null') {
          senderPhone = String(
            item.product.store?.vendor?.phoneNumber ||
              item.product.store?.vendor?.user?.phoneNumber ||
              '07068649001'
          );
        }

        const recipientPhone = String(user?.phoneNumber || '');

        return {
          recipientAddress: `${street} ${city}, ${state}`,
          recipientState: state,
          recipientName: user?.name || '',
          recipientPhone: recipientPhone,
          uniqueID: item.id, // Using cart item ID as uniqueID
          BatchID: reference,
          valueOfItem: `${item.price}`,
          itemDescription: item.product.description || item.product.name,
          pickUpState: item.product.store?.vendor?.businessDetails?.businessState,
          senderAddress: `${item.product.store?.vendor?.businessDetails?.businessAddress} ${item.product.store?.vendor?.businessDetails?.businessCity}, ${item.product.store?.vendor?.businessDetails?.businessState}`,
          senderName: senderName,
          senderPhone: senderPhone,
          thirdparty: 'true',
        };
      });

      const fezResponse = await fezAPI.createOrder(fezOrderData);
      return fezResponse.data;
    } catch (error) {
      console.error('FEZ order creation failed:', error);
      throw error;
    }
  };

  // Create main order
  const createOrder = async (reference: string, fezOrderNumbers: any) => {
    try {
      const orderPayload = {
        user: user?.id,
        items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          price: item.price,
          store: item.product.store?.id,
          fezOrderNumber: fezOrderNumbers?.orderNos?.[item.id],
        })),
        total_amount: totalPrice,
        subtotal: totalPrice,
        shipping_cost: totalPrice,
        payment_info: {
          method: 'paystack',
          payment_reference: reference,
        },
        shipping_address: {
          street,
          city,
          state,
          zip_code: zipcode,
          country,
        },
        store: '',
      };
      console.log(orderPayload)
      const res = await orderAPI.createOrder(orderPayload);
      console.log('Order created successfully:', res);
      showSuccess('Order placed successfully!');
      clearCart();
      
      // Navigate to order details
      navigation.navigate('OrderHistory', {
        orderId: res.data.doc.id,
      });
    } catch (err) {
      console.error('Order creation failed:', err);
      showError('Order creation failed. Please contact support.');
      // Attempt refund
      refundPayment(reference);
    }
  };

  // Main payment handler
  const handlePayment = async () => {
    // Validate address fields
    if (selectedAddress) {
      // Address selected, use it
    } else if (!street || !city || !state || !zipcode) {
      showError('Please fill in all required fields');
      return;
    }

    setDisablePaymentBtn(true);
    setLoading(true);

    // Validate stock
    showSuccess('Verifying product availability...');
    const stockValid = await validateStockBeforePayment();

    if (!stockValid) {
      setLoading(false);
      return;
    }

    // Generate payment reference
    const reference = 'ref-' + Date.now();
    setPaymentReference(reference);

    // Initialize Paystack payment
    popup.checkout({
      email: user?.email,
      amount: totalPrice, 
      reference,
      onSuccess: async (res) => {
        try {
          console.log('Full Paystack response:', JSON.stringify(res, null, 2));
    
    // Try multiple possible paths for the reference
    const paidRef = 
      res?.data?.transactionRef?.reference || 
      res?.transactionRef?.reference || 
      res?.data?.reference ||
      res?.reference ||
      reference; // Fallback to the generated reference
    
    console.log('Extracted payment reference:', paidRef);
    
    if (!paidRef) {
      console.error('Payment reference not found in response');
      showError('Payment reference missing. Please contact support.');
      return;
    }
          
          showSuccess('Payment successful! Creating your delivery order...');

          // Create FEZ delivery orders
          const fezResponse = await createFezOrders(paidRef);

          // Create main order
          await createOrder(paidRef, fezResponse);
        } catch (err) {
          console.error('Post-payment error:', err);
          showError('Payment succeeded but order creation failed. Please contact support.');
          refundPayment(reference);
        } finally {
          setLoading(false);
          setDisablePaymentBtn(false);
        }
      },
      onCancel: () => {
        console.log('❌ Payment cancelled');
        showError('Payment was cancelled');
        setLoading(false);
        setDisablePaymentBtn(false);
      },
      onError: (err) => {
        console.log('🚨 Payment error:', err);
        showError('Payment failed. Please try again.');
        setLoading(false);
        setDisablePaymentBtn(false);
      },
    });
  };

  const checkoutDisabled = useMemo(() => {
    if (selectedAddress) return false;
    return !street || !state || !city || !zipcode || !country;
  }, [street, state, city, zipcode, country, selectedAddress]);

  // Loading state for fetching addresses
  if (isFetchingAddresses) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9F0E42" />
          <ThemedText style={styles.loadingText}>Loading addresses...</ThemedText>
        </View>
      </ThemedView>
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

          {/* Saved Addresses Section */}
          {!enterAddressManually && savedAddresses.length > 0 ? (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>
                  Select Delivery Address
                </ThemedText>
                <View style={styles.underline} />
              </View>

              <View style={styles.addressListContainer}>
                {savedAddresses.map((address) => (
                  <TouchableOpacity
                    key={address.id}
                    style={[
                      styles.addressCard,
                      selectedAddress?.id === address.id && styles.addressCardSelected,
                    ]}
                    onPress={() => handleSelectAddress(address)}
                  >
                    <View style={styles.addressCardContent}>
                      <ThemedText style={styles.addressStreet}>
                        {address.street}
                      </ThemedText>
                      <ThemedText style={styles.addressDetails}>
                        {address.city}, {address.state} {address.postalCode}
                      </ThemedText>
                    </View>
                    {selectedAddress?.id === address.id && (
                      <Ionicons name="checkmark-circle" size={24} color="#9F0E42" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <ThemedTouchableOpacity
                style={styles.manualEntryButton}
                onPress={toggleEnterAddressManually}
              >
                <ThemedText
                  lightColor="#9F0E42"
                  darkColor="#E85E90"
                  style={styles.manualEntryText}
                >
                  Enter address manually
                </ThemedText>
              </ThemedTouchableOpacity>
            </View>
          ) : (
            /* Manual Address Entry Section */
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <ThemedText style={styles.sectionTitle}>Delivery Address</ThemedText>
                <View style={styles.underline} />
              </View>

              {savedAddresses.length > 0 && (
                <ThemedTouchableOpacity
                  style={styles.backButton}
                  onPress={toggleEnterAddressManually}
                >
                  <Ionicons name="arrow-back" size={20} color="#9F0E42" />
                  <ThemedText
                    lightColor="#9F0E42"
                    darkColor="#E85E90"
                    style={styles.backButtonText}
                  >
                    Back to saved addresses
                  </ThemedText>
                </ThemedTouchableOpacity>
              )}

              <View style={styles.formContainer}>
                {/* Street */}
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>Street *</ThemedText>
                  <ThemedInput
                    value={street}
                    onChangeText={setStreet}
                    placeholder="Enter your street address"
                    style={styles.input}
                  />
                </View>

                {/* City */}
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>City *</ThemedText>
                  <ThemedInput
                    value={city}
                    onChangeText={setCity}
                    placeholder="Your city"
                    style={styles.input}
                  />
                </View>

                {/* State Dropdown */}
                <View style={styles.inputContainer}>
                  <ThemedText style={styles.label}>State *</ThemedText>
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
                  <ThemedText style={styles.label}>Zipcode *</ThemedText>
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
                  <ThemedText style={styles.label}>Country *</ThemedText>
                  <ThemedInput
                    value={country}
                    onChangeText={setCountry}
                    placeholder="NG"
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Cart Items Section */}
          {items.length > 0 && (
            <View style={styles.cartSection}>
              <ThemedText style={styles.sectionTitle}>Order Summary</ThemedText>
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
            style={[
              styles.continueButton,
              (checkoutDisabled || disablePaymentBtn || loading) &&
                styles.disabledButton,
            ]}
            onPress={handlePayment}
            disabled={checkoutDisabled || disablePaymentBtn || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <ThemedText
                lightColor="#fff"
                darkColor="#000"
                style={styles.continueButtonText}
              >
                Continue to Payment
              </ThemedText>
            )}
          </ThemedTouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}