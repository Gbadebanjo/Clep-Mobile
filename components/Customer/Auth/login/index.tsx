import { ThemedInput } from '@/components/ThemedInput';
import { ThemedLoader } from '@/components/ThemedLoader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { vendorLoginStyles } from './style';

export default function CustomerLoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const styles = vendorLoginStyles(colorScheme);

  const handleLogin = async () => {
    if (!email || !password) {
      showError('Please enter your email and password');
      return;
    }
    setIsLoading(true);
    const response = await AuthService.login({ email, password });
    setIsLoading(false);
    console.log('Login response:', response);
    if (response.success) {
      if (response.data?.data.user?.emailVerified) {
        router.push('/user' as any);
        return;
      }
      router.push('/customer/verification' as any);
    }
    // router.push('/vendor/verification' as any);
  };

  const handleSignUp = () => {
    router.push('/customer/signup' as any);
  };

  const handleForgotPassword = () => {
    router.push('/customer/forgot-password' as any);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
  };

  const handleAppleSignIn = () => {
    console.log('Apple sign in');
  };

  if (isLoading) {
    return <ThemedLoader text="Logging in your account..." />;
  }

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
          <ThemedText style={styles.title}>Sign in as a Customer</ThemedText>

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

            <ThemedTouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <ThemedText lightColor="#fff" darkColor="#fff" style={styles.signInButtonText}>
                Sign In
              </ThemedText>
            </ThemedTouchableOpacity>

            <View style={styles.customerSignInContainer}>
              <TouchableOpacity onPress={() => router.push('/vendor/login' as any)}>
                <ThemedText style={styles.customerSignInText}>Sign in as Vendor</ThemedText>
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
            <ThemedText style={styles.bannerTitle}>Shop with Confidence</ThemedText>
            <ThemedText style={styles.bannerSubtitle}>Discover amazing products from trusted vendors</ThemedText>
          </View>
        </LinearGradient>

        {/* Bottom Banner */}
      </ScrollView>
    </ThemedView>
  );
}
