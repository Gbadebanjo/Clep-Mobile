import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { showError, showSuccess } from '@/services/api';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { paymentStyles } from './style';

interface PaymentComponentProps {
  email: string;
  amount: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PaymentComponent({ email, amount, onSuccess, onCancel }: PaymentComponentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const paystackWebViewRef = useRef<any>(null);

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = paymentStyles(colorScheme);

  const handlePaymentSuccess = (res: any) => {
    setIsProcessing(false);
    showSuccess('Payment successful!');
    onSuccess?.();
    router.push('/order-confirmation');
  };

  const handlePaymentCancel = () => {
    setIsProcessing(false);
    showError('Payment cancelled');
    onCancel?.();
  };

  const initializePayment = () => {
    setIsProcessing(true);
    paystackWebViewRef.current?.startTransaction();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Complete Payment</ThemedText>

        <View style={styles.paymentInfo}>
          <ThemedText style={styles.amountText}>₦{amount.toLocaleString()}</ThemedText>
          <ThemedText style={styles.emailText}>{email}</ThemedText>
        </View>

        <ThemedTouchableOpacity
          style={[styles.payButton, isProcessing && styles.disabledButton]}
          onPress={initializePayment}
          disabled={isProcessing}
        >
          <ThemedText style={styles.payButtonText}>{isProcessing ? 'Processing...' : 'Pay Now'}</ThemedText>
        </ThemedTouchableOpacity>

        {/* <Paystack
          ref={paystackWebViewRef}
          paystackKey="pk_test_your_paystack_public_key"
          amount={amount}
          billingEmail={email}
          activityIndicatorColor="green"
          onCancel={handlePaymentCancel}
          onSuccess={handlePaymentSuccess}
          autoStart={false}
        /> */}
      </View>
    </ThemedView>
  );
}
