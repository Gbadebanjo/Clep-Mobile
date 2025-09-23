import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { forgotPasswordStyles } from './style';

export default function VendorForgotPasswordComponent() {
  const [email, setEmail] = useState('john@example.com');
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = forgotPasswordStyles(colorScheme);

  const handleResetPassword = () => {
    router.push('/vendor/forgot-password-verification');
  };

  const handleSignIn = () => {
    router.push('/vendor/login');
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

            <ThemedTouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
              <ThemedText lightColor="#fff" darkColor="#000" style={styles.resetButtonText}>
                Reset Password
              </ThemedText>
            </ThemedTouchableOpacity>

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
