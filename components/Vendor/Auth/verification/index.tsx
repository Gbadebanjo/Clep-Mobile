import { ThemedInput } from '@/components/ThemedInput';
import { ThemedLoader } from '@/components/ThemedLoader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { verificationStyles } from './style';

export default function VendorVerificationComponent() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = verificationStyles(colorScheme);
  const { user, setUser } = useAuthStore();

  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join('');

    if (otp.length !== 6) {
      showError('Please enter the complete 6-digit code');
      return;
    }

    if (!user?.email) {
      showError('User email not found. Please try signing up again.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.verifyEmail(user.email, otp);

      if (response.success) {
        // Update user verification status
        setUser({ ...user, emailVerified: true });

        // Navigate to NIN verification screen
        router.push('/vendor/identity-verification');
      } else {
        showError(response.error || 'Verification failed');
      }
    } catch (error: any) {
      showError(error.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!user?.email) {
      showError('User email not found');
      return;
    }

    try {
      // Call resend verification endpoint
      const response = await AuthService.resendEmailVerification(user.email);

      if (response.success) {
        setCountdown(59);
        showError('Verification code sent successfully');
      }
    } catch (error: any) {
      showError('Failed to resend verification code');
    }
  };

  if (isLoading) {
    return <ThemedLoader text="Verifying your email..." />;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <SearchNavCompo /> */}

        <View style={styles.content}>
          <ThemedText style={styles.title}>Enter verification code</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
            We sent a verification code to {user?.email || 'your email'}, please enter the 6 digit code that was sent to
            your email.
          </ThemedText>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <ThemedInput
                key={index}
                data-index={index}
                style={[styles.codeInput, index === 0 && styles.codeInputActive]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                darkColor="#fff"
                ref={(input) => (inputs.current[index] = input)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
                    // Move to previous input if current is empty
                    inputs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </View>

          <Text style={styles.resendText}>
            {countdown > 0 ? `Resend after ${countdown} seconds` : 'You can now resend the code'}
          </Text>

          <ThemedTouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <ThemedText lightColor="#fff" darkColor="#000" style={styles.verifyButtonText}>
              Verify Code
            </ThemedText>
          </ThemedTouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.noEmailText}>Haven&apos;t gotten the email yet? </Text>
            <TouchableOpacity onPress={handleResendEmail} disabled={countdown > 0}>
              <ThemedText type="link" style={[styles.resendLinkText, countdown > 0 && { opacity: 0.5 }]}>
                Resend email
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
