import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { forgotPasswordVerificationStyles } from './style';

export default function CustomerForgotPasswordVerificationComponent() {
  const [code, setCode] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(59);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = forgotPasswordVerificationStyles(colorScheme);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleVerifyCode = () => {
    router.push('/customer/reset-password');
  };

  const handleResendEmail = () => {
    setCountdown(59);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <SearchNavCompo /> */}

        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('@/assets/images/auth/forgot-password-2.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ThemedText style={styles.title}>Enter verification code</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
            We sent a reset link to john@example.com, please enter the 4 digit code that was sent to your email.
          </ThemedText>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={[styles.codeInput, digit && styles.codeInputFilled, index === 0 && styles.codeInputActive]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <ThemedText style={styles.resendText}>Resend after {countdown} seconds</ThemedText>

          <ThemedTouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
            <ThemedText lightColor="#fff" darkColor="#000" style={styles.verifyButtonText}>
              Verify Code
            </ThemedText>
          </ThemedTouchableOpacity>

          <View style={styles.resendContainer}>
            <ThemedText style={styles.noEmailText}>Haven&apos;t gotten the email yet? </ThemedText>
            <TouchableOpacity onPress={handleResendEmail}>
              <ThemedText style={styles.resendLinkText}>Resend email</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
