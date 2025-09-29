import { SubmitButton } from '@/components/General/SubmitButton';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { forgotPasswordStyles } from './style';

export default function CustomerForgotPasswordComponent() {
  const [email, setEmail] = useState('');
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = forgotPasswordStyles(colorScheme);
  const [isLoading, setIsLoading] = useState(false);

  const { setResetEmail } = useAuthStore();

  const handleResetPassword = async () => {
    try {
      if (!email) {
        showError('Please enter your email');
        return;
      }
      setIsLoading(true);
      const response = await AuthService.forgotPassword(email);
      if (response.success) {
        setResetEmail(email);
        router.push('/customer/forgot-password-verification' as any);
      } else {
        showError(response.error);
      }
    } catch (error) {
      showError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push('/customer/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <SearchNavCompo /> */}

        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('@/assets/images/auth/forgot-password-1.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ThemedText style={styles.title}>Forgot Password?</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
            Please enter your email to reset the password
          </ThemedText>

          <View style={styles.formContainer}>
            <ThemedInput
              label="Your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="john@example.com"
            />

            <SubmitButton
              text="Reset Password"
              isLoading={isLoading}
              onPress={handleResetPassword}
              buttonStyle={styles.resetButton}
              textStyle={styles.resetButtonText}
            />

            <View style={styles.signInContainer}>
              <ThemedText style={styles.rememberText}>Remember? </ThemedText>
              <TouchableOpacity onPress={handleSignIn}>
                <ThemedText style={styles.signInText}>Sign In</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
