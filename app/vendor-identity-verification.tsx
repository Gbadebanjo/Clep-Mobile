import SearchNavCompo from '@/components/General/search-nav';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { identityVerificationStyles } from '@/components/Vendor/identity-verification-styles';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function VendorIdentityVerificationScreen() {
  const [nin, setNin] = useState('**********');
  const [showNin, setShowNin] = useState(false);

  const handleNext = () => {
    router.push('/vendor-store-setup');
  };

  const handlePrevious = () => {
    router.back();
  };

  const handleSignIn = () => {
    router.push('/vendor-login');
  };

  return (
    <ThemedView style={identityVerificationStyles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={identityVerificationStyles.gradientOverlay}
      />

      <SearchNavCompo />

      <View style={identityVerificationStyles.content}>
        <ThemedText style={identityVerificationStyles.title}>Verify your Identity</ThemedText>
        <ThemedText lightColor="#747778" darkColor="#fff" style={identityVerificationStyles.subtitle}>
          To protect your account and confirm your identity, we require your National Identification Number (NIN) for
          verification
        </ThemedText>

        <View style={identityVerificationStyles.formContainer}>
          <ThemedInput
            label="Verify your NIN"
            value={nin}
            onChangeText={setNin}
            isPassword={true}
            keyboardType="numeric"
            maxLength={11}
          />

          <View style={identityVerificationStyles.buttonContainer}>
            <TouchableOpacity style={identityVerificationStyles.previousButton} onPress={handlePrevious}>
              <ThemedText style={identityVerificationStyles.previousButtonText}>Previous</ThemedText>
            </TouchableOpacity>
            <ThemedTouchableOpacity style={identityVerificationStyles.nextButton} onPress={handleNext}>
              <ThemedText lightColor="#fff" darkColor="#000" style={identityVerificationStyles.nextButtonText}>
                Next
              </ThemedText>
            </ThemedTouchableOpacity>
          </View>

          <View style={identityVerificationStyles.signInContainer}>
            <ThemedText style={identityVerificationStyles.haveAccountText}>Already have an Account? </ThemedText>
            <TouchableOpacity onPress={handleSignIn}>
              <ThemedText style={identityVerificationStyles.signInText}>Sign In</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
