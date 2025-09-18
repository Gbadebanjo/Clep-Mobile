import { signupStyles } from '@/components/Auth/signup-styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    console.log('Signup:', { email, password, phoneNumber });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={signupStyles.container}>
      <ImageBackground source={require('@/assets/images/banner3.png')} style={signupStyles.imageSection}>
        <View style={signupStyles.imageOverlay}>
          <Text style={signupStyles.imageTitle}>Create</Text>
          <Text style={signupStyles.imageTitle2}>Account</Text>
        </View>
      </ImageBackground>

      <ThemedView style={signupStyles.contentSection}>
        <View style={signupStyles.formContainer}>
          <TextInput
            style={signupStyles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={signupStyles.passwordContainer}>
            <TextInput
              style={signupStyles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={signupStyles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={signupStyles.phoneContainer}>
            <View style={signupStyles.countryCode}>
              <Text style={signupStyles.flag}>🇬🇧</Text>
              <Ionicons name="chevron-down" size={16} color="#999" />
            </View>
            <TextInput
              style={signupStyles.phoneInput}
              placeholder="Your number"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={signupStyles.submitButton} onPress={handleSignup}>
            <ThemedText style={signupStyles.submitButtonText}>Done</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel}>
            <ThemedText style={signupStyles.cancelText}>Cancel</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );
}
