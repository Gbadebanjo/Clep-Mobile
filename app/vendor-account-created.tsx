import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { accountCreatedStyles } from '@/components/Vendor/account-created-styles';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function VendorAccountCreatedScreen() {
  const handleContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <ThemedView style={accountCreatedStyles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={accountCreatedStyles.gradientOverlay}
      />

      <SearchNavCompo />

      <View style={accountCreatedStyles.content}>
        <View style={accountCreatedStyles.successContainer}>
          <View style={accountCreatedStyles.checkmarkContainer}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>

          <ThemedText style={accountCreatedStyles.title}>Voila, your Account{'\n'}has been Created</ThemedText>

          <ThemedText lightColor="#747778" darkColor="#fff" style={accountCreatedStyles.subtitle}>
            Click the button To continue.
          </ThemedText>

          <ThemedTouchableOpacity style={accountCreatedStyles.continueButton} onPress={handleContinue}>
            <ThemedText lightColor="#fff" darkColor="#000" style={accountCreatedStyles.continueButtonText}>
              Continue
            </ThemedText>
          </ThemedTouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
