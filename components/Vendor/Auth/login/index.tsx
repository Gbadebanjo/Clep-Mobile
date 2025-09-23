import { ThemedInput } from '@/components/ThemedInput';
import { ThemedLoader } from '@/components/ThemedLoader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppleIcon, LucideGoal } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { vendorLoginStyles } from './style';

export default function VendorLoginComponent() {
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
      router.push('/vendor/verification' as any);
    }
    // router.push('/vendor/verification' as any);
  };

  const handleSignUp = () => {
    router.push('/vendor/signup' as any);
  };

  const handleForgotPassword = () => {
    router.push('/vendor/forgot-password' as any);
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
        {/* <SearchNav /> */}

        {/* Content */}
        <View style={styles.content}>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.welcomeText}>
            WELCOME BACK
          </ThemedText>
          <ThemedText style={styles.title}>Sign in as a Vendor</ThemedText>

          <View style={styles.formContainer}>
            <ThemedInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email"
              label="Email"
            />

            <ThemedInput label="Password" value={password} onChangeText={setPassword} isPassword={true} />

            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
                <ThemedView
                  style={[styles.checkbox, rememberMe && { backgroundColor: Colors[colorScheme].background }]}
                >
                  {rememberMe && <Ionicons name="checkmark" size={16} color={Colors[colorScheme].text} />}
                </ThemedView>
                <ThemedText style={styles.rememberText}>Remember Me</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForgotPassword}>
                <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedTouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <ThemedText lightColor="#fff" darkColor="#000" style={styles.signInButtonText}>
                Sign In
              </ThemedText>
            </ThemedTouchableOpacity>

            <View style={styles.signUpContainer}>
              <ThemedText style={styles.noAccountText}>No Account yet? </ThemedText>
              <TouchableOpacity onPress={handleSignUp}>
                <ThemedText style={styles.signUpText}>Sign Up</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>Or</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
              <ThemedText style={styles.socialButtonText}>
                <LucideGoal
                  size={16}
                  style={{
                    paddingTop: 5,
                  }}
                />{' '}
                Sign in with Google
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
              <ThemedText style={styles.socialButtonText}>
                <AppleIcon size={16} /> Sign in with Apple
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
