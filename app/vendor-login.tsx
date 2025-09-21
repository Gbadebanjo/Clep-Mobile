import { vendorLoginStyles } from '@/components/Auth/styles/vendor-login-styles';
import SearchNav from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppleIcon, LucideGoal } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function VendorLoginScreen() {
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('**********');
  const [rememberMe, setRememberMe] = useState(false);
  const colorScheme = useColorScheme();
  const styles = vendorLoginStyles(colorScheme);

  const handleLogin = () => {
    router.push('/vendor-verification' as any);
  };

  const handleSignUp = () => {
    router.push('/vendor-signup' as any);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
  };

  const handleAppleSignIn = () => {
    console.log('Apple sign in');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SearchNav />

        {/* Content */}
        <View style={styles.content}>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.welcomeText}>
            WELCOME BACK
          </ThemedText>
          <Text style={styles.title}>Sign in as a Vendor</Text>

          <View style={styles.formContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <ThemedText style={styles.label}>Password</ThemedText>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
              </TouchableOpacity>
            </View>

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
              <Text style={styles.dividerText}>Or</Text>
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
              <ThemedText style={vendorLoginStyles.socialButtonText}>
                <AppleIcon size={16} /> Sign in with Apple
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
