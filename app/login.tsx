// import { loginStyles } from '@/components/Auth/login-styles';
import { loginStyles } from '@/components/Auth/login-styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
          <TextInput
            style={loginStyles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

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
