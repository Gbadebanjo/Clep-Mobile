import { loginStyles } from '@/components/Auth/styles/login-styles';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
  };

  const handleCancel = () => {
    router.back();
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  return (
    <ThemedView style={loginStyles.container}>
      <ImageBackground source={require('@/assets/images/banner1.png')} style={loginStyles.imageSection}>
        <View style={loginStyles.imageOverlay}>
          <Text style={loginStyles.imageTitle}>Login</Text>
          <Text style={loginStyles.imageSubtitle}>Good to see you back!</Text>
        </View>
      </ImageBackground>

      <ThemedView style={loginStyles.contentSection}>
        <View style={loginStyles.formContainer}>
          <ThemedInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ThemedInput placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />

          <TouchableOpacity onPress={handleForgotPassword}>
            <ThemedText style={loginStyles.forgotText}>Forgot your password?</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={loginStyles.submitButton} onPress={handleLogin}>
            <ThemedText style={loginStyles.submitButtonText}>Next</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel}>
            <ThemedText style={loginStyles.cancelText}>Cancel</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
