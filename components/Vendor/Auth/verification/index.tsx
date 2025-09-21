import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { verificationStyles } from './style';

export default function VendorVerificationScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(59);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = verificationStyles(colorScheme);

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

  const handleVerify = () => {
    // Show success modal
    router.push('/login-success');
  };

  const handleResendEmail = () => {
    setCountdown(59);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <SearchNavCompo />

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
                style={[styles.codeInput, index === 0 && styles.codeInputActive]}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <Text style={styles.resendText}>Resend after {countdown} seconds</Text>

          <ThemedTouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <ThemedText lightColor="#fff" darkColor="#000" style={styles.verifyButtonText}>
              Verify Code
            </ThemedText>
          </ThemedTouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.noEmailText}>Haven&apos;t gotten the email yet? </Text>
            <TouchableOpacity onPress={handleResendEmail}>
              <ThemedText type="link" style={styles.resendLinkText}>
                Resend email
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
