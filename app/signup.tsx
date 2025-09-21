import { signupStyles } from '@/components/Auth/styles/signup-styles';
import { ThemedInput } from '@/components/ThemedInput';
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
          <ThemedInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ThemedInput placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />

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
