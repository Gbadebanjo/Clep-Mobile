import { SubmitButton } from '@/components/General/SubmitButton';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { vendorLoginStyles } from './style';

export default function VendorLoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = vendorLoginStyles(colorScheme);
  const { setUser } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      showError('Please enter your email and password');
      return;
    }
    setIsLoading(true);
    const response = await AuthService.vendorLogin({ email, password });
    if (response.success) {
      if (response.data?.data.user?.emailVerified) {
        router.push('/' as any);
        return;
      }
      router.push('/vendor/verification' as any);
    }
    setIsLoading(false);
  };

  const handleSignUp = () => {
    router.push('/vendor/signup' as any);
  };

  const handleForgotPassword = () => {
    router.push('/vendor/forgot-password' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/logo.webp')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Sign Up Link */}
        <View style={styles.topSignUpContainer}>
          <ThemedText style={styles.noAccountText}>No account yet? </ThemedText>
          <TouchableOpacity onPress={handleSignUp}>
            <ThemedText style={styles.topSignUpText}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.title}>Sign in as a Vendor</ThemedText>

          <View style={styles.formContainer}>
            <ThemedInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <ThemedInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              placeholder="Enter your password"
            />

            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Ionicons name="checkmark" size={12} color="#fff" />}
                </View>
                <ThemedText style={styles.rememberText}>Remember me</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
              </TouchableOpacity>
            </View>

            <SubmitButton
              text="Sign In"
              isLoading={isLoading}
              onPress={handleLogin}
              buttonStyle={styles.signInButton}
              textStyle={styles.signInButtonText}
            />

            <View style={styles.customerSignInContainer}>
              <TouchableOpacity onPress={() => router.push('/customer/login' as any)}>
                <ThemedText style={styles.customerSignInText}>Sign in as Customer</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={['#E85E90', '#9F0E42']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bottomBanner}
        >
          <View style={styles.bannerOverlay}>
            <ThemedText style={styles.bannerTitle}>Optimise Your Operations</ThemedText>
            <ThemedText style={styles.bannerSubtitle}>
              Join Vazzel to manage customers, and streamline your operations
            </ThemedText>
          </View>
        </LinearGradient>

        {/* Bottom Banner */}
      </ScrollView>
    </ThemedView>
  );
}
