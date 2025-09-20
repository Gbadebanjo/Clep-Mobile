import { vendorLoginStyles } from '@/components/Auth/styles/vendor-login-styles';
import SearchNav from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AppleIcon, LucideGoal } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VendorLoginScreen() {
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('**********');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    <ThemedView style={vendorLoginStyles.container}>
      <ScrollView contentContainerStyle={vendorLoginStyles.scrollContainer}>
        <SearchNav />

        {/* Content */}
        <View style={vendorLoginStyles.content}>
          <ThemedText lightColor="#747778" darkColor="#fff" style={vendorLoginStyles.welcomeText}>
            WELCOME BACK
          </ThemedText>
          <ThemedText style={vendorLoginStyles.title}>Sign in as a Vendor</ThemedText>

          <View style={vendorLoginStyles.formContainer}>
            <ThemedText style={vendorLoginStyles.label}>Email</ThemedText>
            <TextInput
              style={vendorLoginStyles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <ThemedText style={vendorLoginStyles.label}>Password</ThemedText>
            <View style={vendorLoginStyles.passwordContainer}>
              <TextInput
                style={vendorLoginStyles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={vendorLoginStyles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={vendorLoginStyles.optionsRow}>
              <TouchableOpacity style={vendorLoginStyles.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
                <ThemedView style={[vendorLoginStyles.checkbox, rememberMe && vendorLoginStyles.checkboxChecked]}>
                  {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
                </ThemedView>
                <ThemedText style={vendorLoginStyles.rememberText}>Remember Me</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForgotPassword}>
                <ThemedText style={vendorLoginStyles.forgotText}>Forgot Password?</ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedTouchableOpacity style={vendorLoginStyles.signInButton} onPress={handleLogin}>
              <ThemedText lightColor="#fff" darkColor="#000" style={vendorLoginStyles.signInButtonText}>
                Sign In
              </ThemedText>
            </ThemedTouchableOpacity>

            <View style={vendorLoginStyles.signUpContainer}>
              <ThemedText style={vendorLoginStyles.noAccountText}>No Account yet? </ThemedText>
              <TouchableOpacity onPress={handleSignUp}>
                <ThemedText style={vendorLoginStyles.signUpText}>Sign Up</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={vendorLoginStyles.dividerContainer}>
              <View style={vendorLoginStyles.dividerLine} />
              <Text style={vendorLoginStyles.dividerText}>Or</Text>
              <View style={vendorLoginStyles.dividerLine} />
            </View>

            <TouchableOpacity style={vendorLoginStyles.socialButton} onPress={handleGoogleSignIn}>
              <ThemedText style={vendorLoginStyles.socialButtonText}>
                <LucideGoal
                  size={16}
                  style={{
                    paddingTop: 5,
                  }}
                />{' '}
                Sign in with Google
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={vendorLoginStyles.socialButton} onPress={handleAppleSignIn}>
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
